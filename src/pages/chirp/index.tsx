import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import CreatePostWizard from "~/components/createPostWizard";
import Feed from "~/components/postFeed";

const ChirpPage: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { data } = api.city.getAll.useQuery();
  const { data: londonData } = api.city.getCityByName.useQuery({
    name: "london",
  });

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  console.log("getAll", data);
  console.log("london", londonData);

  return (
    <>
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
    </>
  );
};

export default ChirpPage;
