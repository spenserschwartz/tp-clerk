import Combobox from "src/components/combobox";
import { LoadingPage } from "src/components/loading";
import { PageLayout } from "~/components";
import { api } from "~/utils/api";

const Home = () => {
  const { data, isLoading } = api.city.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  const comboboxOptions = data?.map((city) => {
    return { name: city.name, id: city.id };
  }) ?? [{ name: "no cities found", id: "nocitiesfound" }];

  return (
    <PageLayout>
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          {/* Gradient */}
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#000000] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>

          {/* Main stuff */}
          <div className="mx-auto flex max-w-7xl justify-center  px-6 pb-20 pt-10">
            {/* Center most of everything */}
            <div className="mx-auto flex max-w-2xl flex-shrink-0 flex-col items-center  px-2 lg:mx-0 lg:max-w-xl lg:pt-8">
              {/* Title */}
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-8xl">
                TravelPerfect
              </h1>

              {/* Subtitle */}
              <h2 className="my-5 text-center text-4xl font-bold tracking-tight text-white sm:text-4xl">
                Where do you want to go?
              </h2>

              {/* Container for input and DatePicker */}
              <div className="mt-2 w-80">
                <Combobox options={comboboxOptions} />
              </div>

              {/* Flavor Text */}
              <p className="mt-6 text-justify text-lg leading-8 text-gray-300">
                TravelPerfect is a travel planning tool that helps you find the
                perfect destination for your next vacation. Enter a city and
                your desired travel dates to get started.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Home;
