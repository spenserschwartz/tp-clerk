import React from "react";
import type { PlaceResult } from "~/types/google";

import { GoogleIcon } from "public/icons";
import { StarRatings } from "~/components";

interface GoogleReviewBadgeProps {
  googleData?: PlaceResult;
}

const GoogleReviewBadge = ({ googleData }: GoogleReviewBadgeProps) => {
  if (!googleData) return null;
  const { user_ratings_total, rating, url } = googleData;

  if (!user_ratings_total || !rating || !url) return null;
  return (
    <div className="w-60 overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-6 text-center shadow-lg">
      <a href={url} target="_blank">
        <div className="mb-4 flex justify-center">
          <GoogleIcon />
        </div>
        <p className="mb-2  text-lg text-gray-700">Google Reviews</p>
        <h2 className="mb-2 text-4xl font-bold text-gray-900">
          {rating ?? null}
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          {`Based on ${user_ratings_total?.toLocaleString("en-us")} reviews` ??
            null}
        </p>
        <div className="flex justify-center">
          <StarRatings value={rating ?? 0} />
        </div>
      </a>
    </div>
  );
};

export default GoogleReviewBadge;
