const SinglePostPage = () => {
  return <div>unused page</div>;
};

// import type { GetStaticProps, NextPage } from "next";
// import Head from "next/head";
// import { RootLayout } from "~/components/Layout";
// import { PostView } from "~/components/PostView";
// import { generateSSGHelper } from "~/server/helpers/ssgHelper";
// import { api } from "~/utils/api";

// const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
//   const { data } = api.posts.getById.useQuery({
//     id,
//   });
//   if (!data) return <div>404</div>;

//   return (
//     <>
//       <Head>
//         <title>{`${data.post.content} - @${data.author.username}`}</title>
//       </Head>
//       <RootLayout>
//         <PostView {...data} />
//       </RootLayout>
//     </>
//   );
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   const id = context.params?.id;

//   if (typeof id !== "string") throw new Error("no id");

//   await ssg.posts.getById.prefetch({ id });

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       id,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

export default SinglePostPage;
