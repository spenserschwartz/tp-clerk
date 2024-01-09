// import OpenAI from "openai";
import { z } from "zod";
import openai from "~/utils/openai";
import { createTRPCRouter, publicProcedure } from "../trpc";

interface QueryInputInterface {
  cityName: string;
  startDate: string;
  endDate: string;
  attractions?: string[];

  adventureToggle?: boolean;
  relaxationToggle?: boolean;
}

const generateQuery = (input: QueryInputInterface) => {
  // General query that does not change between requests
  const generalQuery = `
  [no prose]
  [Output only JSON]
  Give a day-to-day itinerary to ${input.cityName} from ${input.startDate} to ${input.endDate}.
  `;

  //  Attractions query if attractions are specified to be included
  const attractionsQuery = input.attractions?.length
    ? `Make sure to include the following attractions: ${input.attractions.join(
        ", "
      )}. Fill in any additional time with other popular attractions. `
    : "";

  // Format query in proper JSON format
  const formatQuery = `Return the reply in the following format. 
         
  Example response for September 29, 2023 to September 30, 2023 to Paris:
  
  [
    {"dayOfWeek": "Friday",
    "date": "September 29, 2023",
    "morning": "",
    "afternoon": "",
    "evening": ""},

    {"dayOfWeek": "Saturday",
    "date": "September 30, 2023",
    "morning": "",
    "afternoon": "",
    "evening": ""}
  ]

  Give at least two sentences of context for morning, afternoon, and evening activities.
  `;

  const adventureQuery = input.adventureToggle
    ? "Choose more adventurous activities. "
    : "";
  const relaxationQuery = input.relaxationToggle
    ? "Give at least one day a week to relax with nothing on that day's itinerary."
    : "";

  return (
    generalQuery +
    attractionsQuery +
    formatQuery +
    adventureQuery +
    relaxationQuery
  );
};

export const OpenAIRouter = createTRPCRouter({
  generateTripItinerary: publicProcedure
    .input(
      z.object({
        cityName: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        attractions: z.array(z.string()).optional(),
        adventureToggle: z.boolean().optional(),
        relaxationToggle: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "user",
              content: generateQuery(input), // Query goes here
            },
          ],
          max_tokens: 750,
        });

        return chatCompletion;
      } catch (err) {
        console.log(err);
      }
    }),

  // More routers here...
});
