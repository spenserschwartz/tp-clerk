import { GoogleReviewBadge } from "~/components/profiles/place/components";
import { api } from "~/utils/api";

const SplashPage = () => {
  const { data } = api.google.getPlaceDetails.useQuery({
    placeId: "ChIJj61dQgK6j4AR4GeTYWZsKWw",
  });

  console.log("SPLASH DATA", data);

  return (
    <div className="">
      <GoogleReviewBadge googleData={{ user_ratings_total: 34, rating: 3.2 }} />
    </div>
  );
};

export default SplashPage;
