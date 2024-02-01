import React from "react";

interface StarRatingsProps {
  value: number;
  numberOfStars?: number;
}

const StarRatings = ({ value, numberOfStars = 5 }: StarRatingsProps) => {
  const valuePercentage = (value / numberOfStars) * 100; // Calculate the percentage of the total rating
  const percentagePerStar = 100 / numberOfStars;
  const arrayOfStars = new Array(numberOfStars).fill(null);

  function getFill(i: number) {
    const minPercentageAtStar = i * percentagePerStar;
    const maxPercentageAtStar = (i + 1) * percentagePerStar;

    const fill =
      valuePercentage >= maxPercentageAtStar
        ? 100
        : Math.max(
            0,
            (valuePercentage - minPercentageAtStar) / percentagePerStar
          ) * 100;

    return fill;
  }

  return (
    <div className="flex">
      {arrayOfStars.map((_, i) => (
        <Star key={i} fill={getFill(i)} />
      ))}
    </div>
  );
};

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

export default StarRatings;
