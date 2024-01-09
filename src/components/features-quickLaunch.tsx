import { FadeUpWrapper } from "./framer-motion";
import QuickLaunch from "./quickLaunch";

const FeaturesQuickLaunch = () => {
  return (
    <FadeUpWrapper>
      <section className="relative" id="quick_launch">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className="pointer-events-none absolute inset-0 top-1/2 bg-gray-100 md:my-24 lg:mt-0"
          aria-hidden="true"
        ></div>

        <div className="relative mx-auto max-w-6xl px-3 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div
              className="mx-auto max-w-3xl pb-2 text-center md:pb-20"
              data-aos="fade-up"
            >
              <h2 className="h2 mb-4">Plan a trip in seconds</h2>
              <p className="text-xl text-gray-600">
                Want a quick itinerary? Fill out the form below and we will
                generate a trip for you using the best attractions in the city.
              </p>
            </div>
          </div>
          <QuickLaunch />
        </div>
      </section>
    </FadeUpWrapper>
  );
};

export default FeaturesQuickLaunch;
