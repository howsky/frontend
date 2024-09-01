'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Heart, HeartOff } from 'lucide-react';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const supabase = createClient();
  const [data, setData] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (!error) {
        setData(data);
      }
    };

    const getMeAndFavorites = async () => {
      const { data: auth, error } = await supabase.auth.getUser();
      if (error || !auth?.user) {
        redirect('/login');
      }
      const { data: favorites } = await supabase
        .from('favorites')
        .select('*, posts(*)')
        .eq('user_id', auth.user.id);
      setUser(auth.user);
      setFavorites(favorites);
    };

    getMeAndFavorites();
    fetchPosts();
  }, [supabase]);

  async function favoritePost(post_id: string) {
    if (!favorites) return;
    await supabase
      .from('favorites')
      .insert({ user_id: user.id, post_id: post_id });
    setFavorites([
      ...favorites,
      {
        post_id: post_id,
        user_id: user.id,
      },
    ]);
  }

  async function removeFavoritePost(post_id: string) {
    if (!favorites) return;
    setFavorites(
      favorites.filter((favorite: any) => favorite.post_id != post_id),
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', post_id);
  }

  function checkFavorite(post_id: string) {
    return favorites?.some((favorite) => favorite.post_id === post_id);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll">
      <div className="flex h-full w-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">投稿</h1>
        <div className="flex flex-col space-y-4">
          {data?.map((post: any) => (
            <div
              key={post.id}
              className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow"
            >
              <h1 className="mb-2 text-xl font-semibold text-gray-900">
                {post.name}
              </h1>
              <p className="mb-4 text-base text-gray-600">
                一緒に行けるペット: {post.animals}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs text-gray-500">
                    作成日:{' '}
                    {dayjs(post.created_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </p>
                  <p className="text-xs text-gray-500">
                    更新日:{' '}
                    {dayjs(post.updated_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {checkFavorite(post.id) ? (
                    <Heart
                      fill="currentColor"
                      className="cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => removeFavoritePost(post.id)}
                    />
                  ) : (
                    <Heart
                      className="cursor-pointer text-red-300 hover:text-red-400"
                      onClick={() => favoritePost(post.id)}
                    />
                  )}
                  <span className="text-sm text-red-600">{post.like}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
