'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Favorites() {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

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
      favorites.filter((favorite: any) => favorite.posts.id != post_id),
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', post_id);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">いいねした投稿</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-16 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {favorites?.map((favorite: any) => (
              <div
                key={favorite.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-102"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {favorite.posts.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{favorite.posts.animals}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>作成日: {new Date(favorite.posts.created_at).toLocaleDateString()}</span>
                    <span>更新日: {new Date(favorite.posts.updated_at).toLocaleDateString()}</span>
                  </div>
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={() => removeFavoritePost(favorite.posts.id)}
                  >
                    いいねを解除する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
