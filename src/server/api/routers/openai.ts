import OpenAI from "openai";
import { privateProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const OpenAIRouter = createTRPCRouter({
  generateTripItinerary: privateProcedure
    .input(
      z.object({
        cityName: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            // { role: "user", content: `Repeat this word 3 times: ${input}` },
            {
              role: "user",
              content: `Give a 3 day itinerary to ${input.cityName}. Return the reply as a JSON object`,
            },
          ],
        });

        return chatCompletion;
      } catch (err) {
        console.log(err);
      }
    }),

  // More routers here...
});
