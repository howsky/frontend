export default function Container({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div id="container" className="flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-[9999] hidden h-screen w-screen items-center justify-center bg-white md:flex">
        <NotSupported />
      </div>
      {children}
    </div>
  );
}

function NotSupported() {
  return (
    <div className="z-[9999] flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Icon />
        <p className="text-center font-semibold">
          現在このデバイスはサポートされていません
          <br />
          スマホでご利用ください
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className="h-16 w-16 cursor-pointer transition-transform hover:scale-110"
      fill="currentColor"
    >
      <title>Icon</title>
      <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
    </svg>
  );
}
