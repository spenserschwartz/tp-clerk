import { api } from "~/trpc/server";

import { Table, ThingsToDoProfile } from "@/components";
import { PlaceResult, PlaceResultWithLatLng } from "~/types/google";

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
  const { place_id } = placeResult as unknown as PlaceResult;

  const googleData = await api.google.getPlaceDetails({
    // placeId: "ChIJZ-hVgPnW3IARYLErmquJqwE" ?? "",
    placeId: place_id ?? "",
  });

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
      <ThingsToDoProfile placeResult={placeResult} googleData={googleData} />

      <h1 className="mt-4 text-2xl font-bold">Prominent Places</h1>
      <Table
        places={prominentPlacesData?.places}
        cityId={placeResult?.place_id ?? ""}
        allLikesByUserInCity={allLikesByUserInCity}
      />
    </div>
  );
};

export default ThingsToDoPage;
