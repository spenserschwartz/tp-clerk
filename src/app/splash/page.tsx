"use client";
import { HeartIcon } from "@/icons";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";

const SplashPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <HeartIcon enabled={false} />
    </div>
  );
};

export default SplashPage;

// Tower of London GoogleId
// ChIJ3TgfM0kDdkgRZ2TV4d1Jv6g
