import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import Feed from "~/components/postFeed";
import CreatePostWizard from "~/components/createPostWizard";
import { PageLayout } from "~/components/layout";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { data, isLoading: cityLoading } = api.city.getAll.useQuery();
  const { data: newData } = api.city.getByName.useQuery({ id: "test" });

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  console.log("City?", data);

  console.log("london?", newData);

  return (
    <PageLayout>
      <SignOutButton />
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>

      {/* Post Feed */}
      <Feed />
    </PageLayout>
  );
};

export default Home;
