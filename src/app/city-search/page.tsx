import { CitySearch, LoadingPage } from "@/components";

const CitySearchPage = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <LoadingPage />;
  return <CitySearch />;
};

export default CitySearchPage;
