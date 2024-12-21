'use client';

import { createClient } from '@/utils/supabase/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Favorite {
  id: string;
  post_id: string;
  user_id: string;
  posts: {
    id: string;
    name: string;
    animals: string;
    created_at: string;
    updated_at: string;
  };
}

interface User {
  id: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Favorites() {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [supabase]);

  async function removeFavoritePost(post_id: string) {
    setFavorites(
      favorites?.filter(
        (favorite: Favorite) => favorite.posts.id !== post_id,
      ) || [],
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user?.id)
      .eq('post_id', post_id);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll">
      <div className="flex h-full w-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">いいねした投稿</h1>
        <div className="flex flex-col divide-y divide-gray-200">
          {favorites?.map((favorite: Favorite) => (
            <div key={favorite.id} className="block bg-white py-4">
              <h1 className="mb-2 text-xl font-semibold text-gray-900">
                {favorite.posts.name}
              </h1>
              <p className="mb-4 text-base text-gray-600">
                一緒に行けるペット: {favorite.posts.animals}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs text-gray-500">
                    投稿日:{' '}
                    {dayjs(favorite.posts.created_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY/MM/DD HH:mm')}
                  </p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => removeFavoritePost(favorite.posts.id)}
                >
                  いいねを解除する
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
