import OpenAI from "openai";

const openai = new OpenAI({
  // apiKey: process.env.ANTHONY_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  apiKey: process.env.OPENAI_API_KEY, // my key is still throttled
});

export default openai;
