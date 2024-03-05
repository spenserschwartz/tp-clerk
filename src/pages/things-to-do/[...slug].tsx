import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

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
  console.log("ThingsToDo props", props);
  const { query } = props;
  const { data: searchByTextData } = api.google.searchByTextForCity.useQuery({
    query,
  });

  console.log("searchByTextData", searchByTextData);

  return <div>ThingsToDoPage</div>;
};

export default ThingsToDoPage;

ThingsToDoPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;
  // Catch-all segments ([...slug]) should always be an array
  if (!Array.isArray(slug)) throw new Error("no slug"); //

  // Make query for Google SearchByText API
  const query: string = slug.reverse().join(" ");
  await ssg.google.searchByTextForCity.prefetch({ query });

  return { props: { trpcState: ssg.dehydrate(), query } };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
