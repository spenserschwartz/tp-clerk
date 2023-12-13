import Image from "next/image";
import React from "react";

const PageHeader = () => {
  return (
    <div className="relative h-60 w-full overflow-hidden border-2 border-blue-500">
      <Image
        src="https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Page Header Image"
        layout="fill"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
      />
    </div>
  );
};

export default PageHeader;
