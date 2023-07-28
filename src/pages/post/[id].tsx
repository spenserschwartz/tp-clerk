import { SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

const SinglePostPage = () => {
  const { isLoaded: userLoaded } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageLayout>
        <SignOutButton />
        Single Post Page
      </PageLayout>
    </>
  );
};

export default SinglePostPage;
