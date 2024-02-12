import { GoogleReviewBadge } from "~/components/profiles/place/components";
import { api } from "~/utils/api";

const SplashPage = () => {
  const query = "Chrysler Building, New York";

  const { data } = api.google.getPlaceDetails.useQuery({
    placeId: "ChIJ2dGMjMMEdkgRqVqkuXQkj7c",
  });

  const { rating, userRatingCount, displayName } = data ?? {};

  const { data: textData } = api.google.searchByTextNew.useQuery({
    query,
  });

  console.log("textData", textData);

  const { data: originalData } = api.google.searchByText.useQuery({
    query,
  });

  const candidates = originalData?.candidates ?? [
    { name: "No name", rating: 0, user_ratings_total: 0 },
  ];

  console.log("originalData", originalData);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center border-4 border-red-400">
      <div className="mt-8">NEW</div>
      <div>{displayName?.text}</div>
      <div>Rating: {rating}</div>
      <div>Count: {userRatingCount}</div>

      <div className="mt-8">searchByText OG</div>
      <div>{candidates[0].name}</div>
      <div>{candidates[0].rating}</div>
      <div>{candidates[0].user_ratings_total}</div>
      <div>{}</div>
    </div>
  );
};

export default SplashPage;

// ChIJ2dGMjMMEdkgRqVqkuXQkj7c   Big Ben
// ChIJlwm8OUgbdkgRWsaTM35CDTM   Dickens Museum
// ChIJN1t_tDeuEmsRUsoyG83frY4   Google Office Sydney
// ChIJj61dQgK6j4AR4GeTYWZsKWw   from example on

// curl -L -X GET 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Big%20Ben%20%20London&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cuser_ratings_total&key=AIzaSyBFPo3i-80eWrthWehZU-nBaKRQ-F11R58'

// curl -L -X GET 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=The%20Shard%20%20London&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Cuser_ratings_total&key=AIzaSyBFPo3i-80eWrthWehZU-nBaKRQ-F11R58'

// curl -X POST -d '{
//   "textQuery" : "Charles Dickens Museum London"
// }' \
// -H 'Content-Type: application/json' -H 'X-Goog-Api-Key: AIzaSyBFPo3i-80eWrthWehZU-nBaKRQ-F11R58' \
// -H 'X-Goog-FieldMask: *' \
// 'https://places.googleapis.com/v1/places:searchText'
