import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import { LoadingPage } from "~/components";
import { api } from "~/utils/api";

const CitiesPage: NextPage = () => {
  const { data: cityNames, isLoading } = api.city.getAllCityNames.useQuery();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <p className="text-center">
            These are the current cities that TravelPerfect is working with:
          </p>
          <p className="text-orange-400">(Click to navigate to city)</p>
          <ul className="flex flex-col  text-center">
            {cityNames?.map((cityName) => (
              <Link
                className="mt-2"
                key={`CitiesList:${cityName}`}
                href={`/city/${cityName}`}
              >
                {cityName}
              </Link>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CitiesPage;
