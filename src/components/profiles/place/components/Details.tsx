import { GoogleIcon } from "public/icons";
import React from "react";

import { StarRatings } from "~/components";
import { type AttractionByNameType } from "~/types/router";

interface PlaceDetailsProps {
  databaseData: AttractionByNameType;
}

const Star = ({ fill }: { fill: number }) => {
  return (
    <div className="relative inline-block">
      <svg
        className="h-6 w-6 text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Empty star */}
        <path d="M12 .587l3.515 7.11 7.85.692-5.673 5.203 1.342 7.708-6.934-3.645-6.934 3.645 1.342-7.708-5.673-5.203 7.85-.692z" />
      </svg>
      <div
        className="absolute left-0 top-0 h-full w-full overflow-hidden"
        style={{ width: `${fill}%` }}
      >
        <svg
          className="h-6 w-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Filled star */}
          <path d="M12 .587l3.515 7.11 7.85.692-5.673 5.203 1.342 7.708-6.934-3.645-6.934 3.645 1.342-7.708-5.673-5.203 7.85-.692z" />
        </svg>
      </div>
    </div>
  );
};

const Rating = ({ value }: { value: number }) => {
  const MAX_RATING = 5;
  const starPercentage = (value / MAX_RATING) * 100; // Calculate the percentage of the total rating

  return (
    <div className="flex">
      {[1, 1, 1, 1, 1].map((_, i) => {
        const percentagePerStar = 100 / MAX_RATING;
        const minPercentageAtStar = i * percentagePerStar;
        const maxPercentageAtStar = (i + 1) * percentagePerStar;

        const fill =
          starPercentage >= maxPercentageAtStar
            ? 100
            : Math.max(
                0,
                (starPercentage - minPercentageAtStar) / percentagePerStar
              ) * 100;

        console.log("minPercentageAtStar", minPercentageAtStar);
        console.log("maxPercentageAtStar", maxPercentageAtStar);
        console.log("fill", fill);
        return <Star key={i} fill={fill} />;
      })}
    </div>
  );
};

const PlaceDetails = ({ databaseData }: PlaceDetailsProps) => {
  if (!databaseData) return null;
  const { description } = databaseData;

  return (
    <>
      <StarRatings value={4.5} />
      <GoogleIcon />
    </>
  );
};

export default PlaceDetails;
