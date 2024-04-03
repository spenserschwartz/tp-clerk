import { z } from "zod";
import { type LocationDetails } from "~/types/tripAdvisor";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tripAdvisorRouter = createTRPCRouter({
  getLocationDetails: publicProcedure
    .input(z.object({ locationId: z.string() }))
    .query(async ({ input }) => {
      const { locationId } = input;
      const apiKey = process.env.TRIP_ADVISOR_API_KEY ?? ""; // Ensure this is set in your environment
      const apiUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${apiKey}`;

      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as LocationDetails;
        return data; // Ensure that the data is returned
      } catch (error) {
        console.error("Error fetching data from TripAdvisor API:", error);
        return { error: "Failed to fetch data from TripAdvisor" }; // Return an error object instead of throwing
      }
    }),
});
