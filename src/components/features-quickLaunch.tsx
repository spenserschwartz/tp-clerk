import React from "react";

const FeaturesQuickLaunch = () => {
  return (
    <section className="relative border-2 border-red-300">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="pointer-events-none absolute inset-0 top-1/2 bg-green-900 md:mt-24 lg:mt-0"
        aria-hidden="true"
      ></div>
      <div className="absolute bottom-0 left-0 right-0 m-auto h-20 w-px translate-y-1/2 transform bg-gray-200 p-px"></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">Plan a trip in seconds</h2>
            <p className="text-xl text-gray-600">
              Want a quick itinerary? Fill out the form below and we will
              generate a trip for you using the best attractions in the city.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesQuickLaunch;
