import { useChat } from "ai/react";
import GooglePlaces from "~/components/google/places";

const SplashPage = () => {
  const { messages, handleSubmit, input, handleInputChange } = useChat();

  return (
    <div className="h-screen w-screen border-2 border-red-400">
      <GooglePlaces />
    </div>
  );
};

export default SplashPage;
