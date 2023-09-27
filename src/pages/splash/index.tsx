import { type MouseEvent, useState } from "react";
import { LoadingSpinner } from "~/components";

const SplashPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTextWithAI = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("handleGenerateTextWithAI");

    try {
      setIsLoading(true);
      console.log("trying to hit..");
      const res = await fetch(`/api/openai`);
      if (res.status !== 200) console.error("Error generating text with AI");
      else {
        console.log("hit");
        const data = await res.json();
        console.log("data", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner size={64} />
      ) : (
        <button onClick={handleGenerateTextWithAI}>Click for AI</button>
      )}
    </div>
  );
};

export default SplashPage;
