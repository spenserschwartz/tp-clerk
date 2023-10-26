// import OpenAI from "openai";
import { z } from "zod";
import openai from "~/utils/openai";
import { createTRPCRouter, privateProcedure } from "../trpc";

interface QueryInputInterface {
  cityName: string;
  startDate: string;
  endDate: string;
  attractions?: string[];
}

const generateQuery = (input: QueryInputInterface) => {
  return `
          [no prose]
          [Output only JSON]
          Give a day-to-day itinerary to ${input.cityName} from ${
    input.startDate
  } to ${input.endDate}.
          Return the reply in the following format. 
          ${
            input.attractions?.length
              ? `Make sure to include the following attractions: ${input.attractions.join(
                  ", "
                )}`
              : ""
          }

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
        attractions: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log("before chat completion");
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              // content: "What is 2 + 2",
              content: generateQuery(input), // Query goes here
            },
          ],
          max_tokens: 750,
        });
        console.log("after chat completion");
        console.log(chatCompletion);

        return chatCompletion;
      } catch (err) {
        console.log(err);
      }
    }),

  // More routers here...
});
