// import OpenAI from "openai";
import { z } from "zod";
import { type PlaceResult } from "~/types/google";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const googleRouter = createTRPCRouter({
  getPlaceDetails: publicProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input }) => {
      const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4";
      const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? ""; // Ensure this is set in your environment
      const apiUrl = `https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=${apiKey}`;
      // const apiUrl = `https://places.googleapis.com/v1/places/${placeId}`;

      try {
        const options = {
          method: "GET",
          headers: { "content-type": "application/json" },
        };

        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as PlaceResult;
        return data; // Ensure that the data is returned
      } catch (error) {
        console.error(
          "Error fetching data from Google Place Details API:",
          error
        );
        return { error: "Failed to fetch data from Google" }; // Return an error object instead of throwing
      }
    }),
});

// ChIJ2dGMjMMEdkgRqVqkuXQkj7c   Big Ben
// ChIJN1t_tDeuEmsRUsoyG83frY4   Google Office Sydney
// ChIJj61dQgK6j4AR4GeTYWZsKWw   from example on https://developers.google.com/maps/documentation/places/web-service/place-details
