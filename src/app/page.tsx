'use client';

import { createClient } from '@/utils/supabase/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const supabase = createClient();
  interface Post {
    id: string;
    name: string;
    animals: string;
    created_at: string;
    updated_at: string;
    like: number;
  }

  interface User {
    id: string;
    email: string | undefined;
  }

  interface Favorite {
    post_id: string;
    user_id: string;
  }

  const [data, setData] = useState<Post[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);

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
      setUser({
        id: auth.user.id,
        email: auth.user.email,
      });
      setFavorites(favorites);
    };

    getMeAndFavorites();
    fetchPosts();
  }, [supabase]);

  async function favoritePost(post_id: string) {
    if (!favorites) return;
    if (!user) return;
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
      favorites.filter((favorite: Favorite) => favorite.post_id !== post_id),
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user?.id)
      .eq('post_id', post_id);
  }

  function checkFavorite(post_id: string) {
    return favorites?.some((favorite) => favorite.post_id === post_id);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll">
      <div className="flex h-full w-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">投稿</h1>
        <div className="flex flex-col divide-y divide-gray-200">
          {data?.map((post: Post) => (
            <div key={post.id} className="block bg-white py-4">
              <Link href={`/maps/${post.id}`}>
                <h1 className="mb-2 text-xl font-semibold text-gray-900">
                  {post.name}
                </h1>
              </Link>
              <p className="mb-4 text-base text-gray-600">
                一緒に行けるペット: {post.animals}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs text-gray-500">
                    投稿日:{' '}
                    {dayjs(post.created_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY/MM/DD HH:mm')}
                  </p>
                </div>
                <div className="block space-x-2 cursor-pointer z-10">
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
