import React from "react";
import { api } from "~/trpc/server";

interface CityPageProps {
  params: { slug: string };
}

const CityPage = ({ params }: CityPageProps) => {
  const cityData = api.city.getCityDataByName({ name: params.slug });

  return <div>CityPage</div>;
};

export default CityPage;
