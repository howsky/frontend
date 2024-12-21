'use client';

import Posts from '@/components/post';
import { useActionContext } from '@/context/actionContext';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/maps'), { ssr: false });

export default function Maps() {
  const { buttonState } = useActionContext();
  console.log(buttonState);

  return (
    <div className="relative flex h-full flex-col bg-stone-200">
      <DynamicMap noFlyTo={buttonState} />
      {buttonState ? <Posts /> : null}
    </div>
  );
}
