import Link from "next/link";
import { api } from "~/trpc/server";

const CitiesPage = async () => {
  const cityNames = await api.city.getAllCityNames();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-center">
        These are the current cities that TravelPerfect is working with:
      </p>
      <p className="text-orange-400">(Click to navigate to city)</p>
      <ul className="flex flex-col  text-center">
        {cityNames?.sort().map((cityName) => (
          <Link
            className="mt-2"
            key={`CitiesList:${cityName}`}
            href={`/city/${cityName}`}
          >
            {cityName}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;
