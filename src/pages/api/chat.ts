import { OpenAIStream, streamToResponse } from "ai";
import { type NextApiRequest, type NextApiResponse } from "next";
import openai from "~/utils/openai";

// https://sdk.vercel.ai/docs/guides/frameworks/nextjs-pages

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body:", req.body);
  console.log("messages:", messages);

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      { role: "user", content: "What are some fun things to do in London?" },
    ],
  });

  const stream = OpenAIStream(aiResponse);

  /**
   * Converts the stream to a Node.js Response-like object
   */
  return streamToResponse(stream, res);
}
