import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const CitiesPage: NextPage = () => {
  const { data: cityNames } = api.city.getAllCityNames.useQuery();

  return (
    <div>
      <p>These are the current cities that TravelPerfect is working with:</p>
      <ul>
        {cityNames?.map((cityName) => (
          <Link key={`CitiesList:${cityName}`} href={`/${cityName}`}>
            {cityName}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;
