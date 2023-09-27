import { MouseEvent } from "react";

const SplashPage = () => {
  const handleGenerateTextWithAI = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("handleGenerateTextWithAI");

    try {
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
    }
  };

  return (
    <div>
      <button onClick={handleGenerateTextWithAI}>Click for AI</button>
    </div>
  );
};

export default SplashPage;
