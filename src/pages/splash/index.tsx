import { api } from "~/utils/api";

const SplashPage = () => {
  const { data } = api.tripAdvisor.getLocationDetails.useQuery({
    locationId: "196239", // ! hard coded for now to Berlin Wall
  });

  console.log("data", data);

  return <div className="px-5">splash</div>;
};

export default SplashPage;
