import { APIProvider } from "@vis.gl/react-google-maps";
import SplashComponent from "~/components/splash";

const SplashPage = () => {
  return (
    <APIProvider apiKey={process.env.GOOGLE_DETAILS_API_KEY ?? ""}>
      <SplashComponent />
    </APIProvider>
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
