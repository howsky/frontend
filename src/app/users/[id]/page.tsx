export const runtime = 'edge';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function UserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = createClient();

  const { data } = await (await supabase)
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single();

  console.log(data);

  const avatarUrl = `https://ui-avatars.com/api/?name=${data?.username}`;
  const userName = data?.username;
  const description = data?.description;

  if (!data) return <div>指定したユーザーが見つかりませんでした。</div>;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-10">
      <div className="flex w-full max-w-lg flex-col items-center bg-white p-6">
        <Image
          src={avatarUrl}
          alt={userName ?? 'User avatar'}
          width={100}
          height={100}
          className="mb-4 h-24 w-24 rounded-full"
        />
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          {userName}
        </h1>
        <p className="mb-4 text-center text-lg text-gray-600">
          {description || 'No description'}
        </p>
      </div>
    </div>
  );
}
