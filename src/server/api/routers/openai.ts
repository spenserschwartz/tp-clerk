import OpenAI from "openai";
import { privateProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface QueryInputInterface {
  cityName: string;
  startDate: string;
  endDate: string;
}

const generateQuery = (input: QueryInputInterface) => {
  return `Give a day-to-day itinerary to ${input.cityName} from ${input.startDate} to ${input.endDate}.
          Return the reply as a JSON object.
          
          Example response for September 29, 2023 to September 30, 2023 to Paris: 
          [
            {"dayOfWeek: "Friday", 
            "date": "September 29, 2023", 
            "morning": "Visit the Eiffel Tower", 
            "afternoon": "Visit the Louvre", 
            "evening": "Visit the Arc de Triomphe"},
            {"dayOfWeek: "Saturday",
            "date": "September 30, 2023",
            "morning": "Visit the Notre Dame",
            "afternoon": "Visit the Sacre Coeur",
            "evening": "Visit the Moulin Rouge"}
          ]

          Give at least two sentences of context for morning, afternoon, and evening activities. 
          `;
};

export const OpenAIRouter = createTRPCRouter({
  generateTripItinerary: privateProcedure
    .input(
      z.object({
        cityName: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: generateQuery(input), // Query goes here
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
