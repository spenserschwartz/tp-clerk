// import { OpenAIStream, streamToResponse } from "ai";
// import { type NextApiRequest, type NextApiResponse } from "next";
// import openai from "~/utils/openai";

// https://sdk.vercel.ai/docs/guides/frameworks/nextjs-pages

//! To be updated with latest OpenAI; currently not used
// export const runtime = "edge";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("This is req.body", req.body);

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
//   const parsed = JSON.parse(req.body);

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   console.log("messages", parsed.messages[0].content);

//   const aiResponse = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     stream: true,
//     messages: [
//       { role: "user", content: "What are some fun things to do in London?" },
//     ],
//   });

//   const stream = OpenAIStream(aiResponse);

//   /**
//    * Converts the stream to a Node.js Response-like object
//    */
//   return streamToResponse(stream, res);
// }
