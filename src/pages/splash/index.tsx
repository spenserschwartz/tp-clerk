import { GoogleReviewBadge } from "~/components/profiles/place/components";
import { api } from "~/utils/api";

const SplashPage = () => {
  return (
    <div className="">
      <GoogleReviewBadge googleData={{ user_ratings_total: 34, rating: 3.2 }} />
    </div>
  );
};

export default SplashPage;
