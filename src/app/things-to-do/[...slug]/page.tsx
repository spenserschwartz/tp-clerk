import { api } from "~/trpc/server";

import { Table } from "@/components";

interface ThingsToDoPageProps {
  params: { slug: string[] };
}

const ThingsToDoPage = async ({ params }: ThingsToDoPageProps) => {
  const query: string = params.slug.reverse().join(" ");
  const searchByTextData = await api.google.searchByTextForCity({ query });

  const placeResult =
    searchByTextData && !("error" in searchByTextData)
      ? searchByTextData?.results[0]
      : null;
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
    <div className="flex w-full justify-center">
      <Table
        places={prominentPlacesData?.places}
        cityId={placeResult?.place_id ?? ""}
        allLikesByUserInCity={allLikesByUserInCity}
      />
    </div>
  );
};

export default ThingsToDoPage;
