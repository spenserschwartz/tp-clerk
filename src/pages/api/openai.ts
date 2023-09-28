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
        content: `Repeat this word 3 times: ${req.query.input}`,
      },
    ],
  });

  const responseText =
    chatCompletion.choices[0]?.message.content ?? "No AI response found";
  res.status(200).json({ responseText });

  // const responseObject = JSON.parse(responseText);
  // res.status(200).json(responseObject);

  // Receive some text, ask ChatGPT to generate something
}
