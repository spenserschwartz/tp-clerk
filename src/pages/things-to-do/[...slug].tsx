import type { GetStaticProps } from "next";
import { useEffect, useState, type ReactElement } from "react";

import { Table } from "~/components";
import { RootLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

interface ThingsToDoPageStaticProps {
  query: string;
}

const ThingsToDoPage: NextPageWithLayout<ThingsToDoPageStaticProps> = (
  props
) => {
  const { query } = props;
  const [cityId, setCityId] = useState<string | null>(null);
  const { mutate, data: prominentPlacesData } =
    api.google.searchProminentPlacesByLocationNew.useMutation({});
  const { data: searchByTextData } = api.google.searchByTextForCity.useQuery(
    {
      query,
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const prominentPlaces = prominentPlacesData?.places;

  // Fetch prominent places by location once the searchByTextData is available
  useEffect(() => {
    if (searchByTextData && !("error" in searchByTextData)) {
      const placeResult = searchByTextData?.results[0];
      setCityId(placeResult?.place_id ?? null);
      const latitude = placeResult?.geometry?.location?.lat ?? 0;
      const longitude = placeResult?.geometry?.location?.lng ?? 0;

      console.log("latitude", latitude);
      mutate({ latitude, longitude, radius: 50000 });
    }
  }, [searchByTextData, mutate]);

  if (!cityId) return <>No city found</>;
  return (
    <div className="flex w-full justify-center">
      <Table places={prominentPlaces} cityId={cityId} />
    </div>
  );
};

export default ThingsToDoPage;

ThingsToDoPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps: GetStaticProps = (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;
  // Catch-all segments ([...slug]) should always be an array
  if (!Array.isArray(slug)) throw new Error("no slug");

  // Make query for Google SearchByText API
  const query: string = slug.reverse().join(" ");
  //   await ssg.google.searchByTextForCity.prefetch({ query });

  return { props: { trpcState: ssg.dehydrate(), query } };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
