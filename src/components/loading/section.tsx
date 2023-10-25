import { LoadingSpinner } from "../loading";

const LoadingSection = () => {
  return (
    <div className="min-h-48 flex w-full max-w-xl flex-col items-center rounded-xl border border-gray-600 bg-gray-300 p-6">
      <LoadingSpinner size={100} />
      <p className="mb-8 text-gray-600">
        Our AI robots are hard at work making your itinerary!
      </p>

      <p>{"Live life with no excuses, travel with no regret. -Oscar Wilde "}</p>
    </div>
  );
};

export default LoadingSection;
