export const runtime = 'edge';

export default function NotFound(): React.ReactElement {
  return (
    <div className="absolute left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <p className="flex flex-col text-center font-semibold">
            このページはご利用いただけません
            <span className="mt-1 font-medium text-zinc-600">
              リンクに問題があるか、ページが削除された可能性があります。
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
