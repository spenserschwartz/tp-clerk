import { api } from "~/trpc/server";

import { PlacesProfile } from "@/components";
import { convertSlugToDatabaseName } from "~/lib/utils";

const PlacePage = async ({ params }: { params: { slug: string } }) => {
  const databaseData = await api.attractions.getByName({
    name: convertSlugToDatabaseName(params.slug),
  });

  const tripAdvisorData = await api.tripAdvisor.getLocationDetails({
    locationId: databaseData?.tripAdvisorLocationId ?? "",
  });

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
