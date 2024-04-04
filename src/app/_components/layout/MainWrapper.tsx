import React from "react";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 overflow-hidden px-2 supports-[overflow:clip]:overflow-clip md:px-10 lg:px-20">
      {children}
    </main>
  );
};

export default MainWrapper;
