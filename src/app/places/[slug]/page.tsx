import { api } from "~/trpc/server";

import { LoadingPage, PlacesProfile } from "@/components";
// import PageLayout from "~/components/layout/Page";
import { convertSlugToDatabaseName } from "~/lib/utils";

const PlacePage = async ({ params }: { params: { slug: string } }) => {
  const databaseData = await api.attractions.getByName({
    name: convertSlugToDatabaseName(params.slug),
  });

  const tripAdvisorData = await api.tripAdvisor.getLocationDetails({
    locationId: databaseData?.tripAdvisorLocationId ?? "",
  });

  // if ((isFetching && !databaseData) || isInitialLoading || !apiKey)
  //   return <LoadingPage />;
  return (
    <main>
      <PlacesProfile
        databaseData={databaseData}
        tripAdvisorData={tripAdvisorData}
      />
    </main>
  );
};

export default PlacePage;
