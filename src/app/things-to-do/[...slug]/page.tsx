import { api } from "~/trpc/server";

import { Table, ThingsToDoProfile } from "@/components";
import type { PlaceResultWithLatLng } from "~/types/google";

interface ThingsToDoPageProps {
  params: { slug: string[] };
}

const ThingsToDoPage = async ({ params }: ThingsToDoPageProps) => {
  const query: string = params.slug.reverse().join(" ");
  const searchByTextData = await api.google.searchByTextForCity({ query });

  const placeResult: PlaceResultWithLatLng | undefined =
    searchByTextData && !("error" in searchByTextData)
      ? searchByTextData?.results[0]
      : undefined;
  const latitude = placeResult?.geometry?.location?.lat ?? 0;
  const longitude = placeResult?.geometry?.location?.lng ?? 0;

  const prominentPlacesData =
    await api.google.searchProminentPlacesByLocationNew({
      latitude,
      longitude,
      radius: 50000,
    });

  const allLikesByUserInCity = await api.likes.getAllByUserInCity({
    cityId: placeResult?.place_id ?? "",
  });


  return (
    <div className="flex w-full flex-col justify-center">
      <ThingsToDoProfile
        allLikesByUserInCity={allLikesByUserInCity}
        placeResult={placeResult}
      />

      <h1 className="mt-4 text-2xl font-bold">Prominent Places</h1>
      <Table
        allLikesByUserInCity={allLikesByUserInCity}
        cityId={placeResult?.place_id ?? ""}
        cityName={placeResult?.formatted_address ?? placeResult?.name ?? ""}
        places={prominentPlacesData?.places}
      />
    </div>
  );
};

export default ThingsToDoPage;
