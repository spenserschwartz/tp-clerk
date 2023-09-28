import OpenAI from "openai";
import { privateProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const OpenAIRouter = createTRPCRouter({
  generateTripItinerary: publicProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: `Repeat this word 3 times: boom` },
          ],
        });

        return chatCompletion;
      } catch (err) {
        console.log(err);
      }
    }),

  // More routers here...
});
