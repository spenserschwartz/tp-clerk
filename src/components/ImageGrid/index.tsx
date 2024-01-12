import GridElement from "./components/gridElement";
import type { ImageGridProps, UserUpvoteMemo } from "./types";

const ImageGrid = ({
  cityData,
  userUpvoteData,
  filterInputValue,
  setIsMutating,
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
      className="mt-4 grid grid-cols-1 place-items-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-5"
    >
      {filteredAttractions?.map((attraction) => {
        const userHasUpvotedAttraction = !!userUpvoteMemo[attraction.id];

        return (
          <GridElement
            key={attraction.id}
            attraction={attraction}
            cityName={cityData.name}
            setIsMutating={setIsMutating}
            userHasUpvotedAttraction={userHasUpvotedAttraction}
          />
        );
      })}
    </ul>
  );
};

export default ImageGrid;
