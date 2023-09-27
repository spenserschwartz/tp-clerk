import type { NextApiRequest, NextApiResponse } from "next";
import openai from "~/utils/openai";

interface Data {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Can you generate a response to list the top 3 attractions in London? The response should be in JSON format and include the name, description, and location of each attraction.",
      },
    ],
  });

  const responseText =
    chatCompletion.choices[0]?.message.content ?? "No AI response found";
  //   res.status(200).json({ responseText });

  const responseObject = JSON.parse(responseText);
  res.status(200).json(responseObject);

  // Receive some text, ask ChatGPT to generate something
}
