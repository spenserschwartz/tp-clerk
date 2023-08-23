import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center bg-purple-800">
      <div className="flex h-full w-full max-w-6xl flex-col border-x border-slate-400 ">
        {props.children}
      </div>
    </main>
  );
};
