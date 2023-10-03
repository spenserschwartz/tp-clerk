import type { NextApiRequest, NextApiResponse } from "next";
import openai from "~/utils/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Repeat this word 3 times: boom`,
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
