import type {
  GetCityDataByNameType,
  GetUpvotesByUserInCityType,
} from "~/types/router";
import GridElement from "./GridElement";

type UserUpvoteMemo = Record<string, boolean>;
interface ImageGridProps {
  cityData: GetCityDataByNameType;
  filterInputValue?: string;
  setIsMutating: (isMutating: boolean) => void;
  userUpvoteData: GetUpvotesByUserInCityType | undefined; // undefined if user is not logged in
}

const ImageGrid = ({
  cityData,
  userUpvoteData,
  filterInputValue,
  setIsMutating,
}: ImageGridProps) => {
  if (!cityData) return null;
  const { attractions } = cityData;

  // Put user upvote data into a memo for faster lookups
  const userUpvoteMemo: UserUpvoteMemo = {};
  userUpvoteData?.forEach((upvote) => {
    userUpvoteMemo[upvote.attractionId] = true;
  });

  // Filter attractions based on user input in the search bar
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
