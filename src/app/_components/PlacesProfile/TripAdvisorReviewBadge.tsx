import { StarRatings } from "@/components";
import { TripAdvisorIcon } from "@/icons";
import type { LocationDetails } from "~/types/tripAdvisor";

interface TripAdvisorReviewBadgeProps {
  tripAdvisorData?: LocationDetails;
}

const TripAdvisorReviewBadge = ({
  tripAdvisorData,
}: TripAdvisorReviewBadgeProps) => {
  if (!tripAdvisorData) return null;
  const { rating, review_rating_count, web_url } = tripAdvisorData;

  // Reviews count
  let totalCount = 0;
  Object.values(review_rating_count).forEach((count) => {
    totalCount += parseInt(count, 10); // Convert each count to a number and add to the total
  });

  return (
    <div className="w-60 overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-6 text-center shadow-lg">
      <a href={web_url} target="_blank">
        <div className="mb-4 flex justify-center">
          <TripAdvisorIcon />
        </div>
        <p className="mb-2  text-lg text-gray-700">TripAdvisor Reviews</p>
        <h2 className="mb-2 text-4xl font-bold text-gray-900">
          {rating ?? null}
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          {`Based on ${totalCount?.toLocaleString("en-us")} reviews` ?? null}
        </p>
        <div className="flex justify-center">
          <StarRatings value={Number(rating) ?? 0} />
        </div>
      </a>
    </div>
  );
};

export default TripAdvisorReviewBadge;
