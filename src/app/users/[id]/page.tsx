export const runtime = 'edge';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function UserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = createClient();

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single();

  console.log(data);

  const avatarUrl = `https://ui-avatars.com/api/?name=${data?.username}`;
  const userName = data?.username;

  if (!data) return <div>指定したユーザーが見つかりませんでした。</div>;

  return (
    <div>
      <Image
        src={avatarUrl}
        alt={userName}
        width={100}
        height={100}
        className="rounded-full p-5"
      />
      <div className="p-5">
        <h1>Twitter</h1>
        {data.twitter_url ? data.twitter_url : ''}
      </div>
    </div>
  );
}
