import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker";
import Footer from "./components/footer";
import { useState } from "react";

const SplashPage = () => {
  const [datePickerValue, setDatePickerValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerChange = (newValue: typeof datePickerValue) => {
    setDatePickerValue(newValue);
  };

  return (
    <div className="h-screen bg-purple-950">
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            {/* Gradient */}
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#000000] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto flex max-w-7xl justify-center px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
            <div className="mx-auto flex max-w-2xl flex-shrink-0 flex-col items-center border border-red-500 px-2 lg:mx-0 lg:max-w-xl lg:pt-8">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-8xl">
                TravelPerfect
              </h1>
              <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-white sm:text-4xl">
                Where do you want to go?
              </h2>
              <div className="mt-2 w-80 border border-red-400">
                <input
                  type="destination"
                  name="destination"
                  id="destination"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter a city"
                />
              </div>
              <p className="mt-6 border border-white text-lg leading-8 text-gray-300">
                Insert some text here Anim aute id magna aliqua ad ad non
                deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                amet fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Start your journey
                </a>
              </div>

              <Datepicker
                value={datePickerValue}
                onChange={handleDatePickerChange}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SplashPage;
