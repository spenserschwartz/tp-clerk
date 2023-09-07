import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center bg-purple-800 p-10">
      <div className="flex h-full w-full max-w-6xl flex-col rounded-xl border-2 border-slate-800  bg-slate-600">
        {props.children}
      </div>
    </main>
  );
};
