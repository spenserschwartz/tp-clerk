import type { ImageGridProps, UserUpvoteMemo } from "./types";
import GridElement from "./components/gridElement";

const ImageGrid = ({
  cityData,
  userUpvoteData,
  filterInputValue,
}: ImageGridProps) => {
  if (!cityData) return null;
  const { attractions } = cityData;

  const userUpvoteMemo: UserUpvoteMemo = {};
  userUpvoteData?.forEach((upvote) => {
    userUpvoteMemo[upvote.attractionId] = true;
  });

  const filteredAttractions = attractions?.filter((attraction) => {
    if (!filterInputValue) return true;
    return attraction.name
      .toLowerCase()
      .includes(filterInputValue.toLowerCase());
  });

  return (
    <ul
      role="list"
      className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {filteredAttractions?.map((attraction) => {
        const userHasUpvotedAttraction = !!userUpvoteMemo[attraction.id];

        return (
          <GridElement
            key={attraction.id}
            attraction={attraction}
            userHasUpvotedAttraction={userHasUpvotedAttraction}
          />
        );
      })}
    </ul>
  );
};

export default ImageGrid;
