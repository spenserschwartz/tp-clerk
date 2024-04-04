import React from "react";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-hiddensupports-[overflow:clip]:overflow-clip flex-1 px-2 md:px-10 lg:px-20">
      {children}
    </div>
  );
};

export default MainWrapper;
