import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

// export const generateSSGHelper = () =>
//   createServerSideHelpers({
//     router: appRouter,
//     ctx: { prisma, userId: null },
//     transformer: superjson, // optional - adds superjson serialization
//   });

// export const getStaticProps: GetStaticProps = async (context) => {
//   const cityName = context.params?.slug;
//   const ssg = generateSSGHelper();
//   // This line works because of the `prefetch` call in the `getStaticProps` of the page
//   await ssg.city.getCityDataByName.prefetch({ name: cityName });
//   //await ssg.routerThatRequiresMutation   << Intellisense says this doesn't exist either

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       cityName,
//     },
//   };
// };

const SlugPage = () =>
  // props: InferGetStaticPropsType<typeof getStaticProps>
  {
    // const { data: cityData } = api.city.getCityDataByName.useQuery({
    //   name: cityName as string,
    // });

    // // Calling fetchData will trigger the mutation infinitely
    // const fetchData = api.apiRouterThatRequiresMutation.useMutation();

    return null;
  };

export default SlugPage;
