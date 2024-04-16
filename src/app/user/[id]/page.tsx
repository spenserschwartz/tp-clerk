"use client";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";

import { ItineraryImageGrid, LoadingPage } from "@/components";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface UserPageProps {
  params: { id: string };
}

const UserPage = ({ params }: UserPageProps) => {
  const { id: userId } = params;

  const { data: userData, isLoading: userDataIsLoading } =
    api.profile.getUserById.useQuery({ userId });
  const { data: itinerariesByUser, isLoading: itinerariesDataIsLoading } =
    api.itinerary.getByUserId.useQuery({ userId });

  // const userData = await api.profile.getUserById({ userId });
  // const itinerariesByUser = await api.itinerary.getByUserId({ userId });

  const pageTitle =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : userId;

  if (userDataIsLoading || itinerariesDataIsLoading) return <LoadingPage />;
  if (!userData) return <div>User not found</div>;
  return (
    <main className="flex w-full flex-col items-center px-2">
      <div className="relative flex w-full items-center justify-center">
        <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          {pageTitle}
        </h1>
      </div>
      <ItineraryImageGrid
        itineraries={itinerariesByUser as ItineraryWithCityInfoType[]}
      />
    </main>
  );
};

export default UserPage;
