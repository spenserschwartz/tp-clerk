import { z } from "zod";
import type { PlaceDetailsNewResponse, PlaceResult } from "~/types/google";
import { createTRPCRouter, publicProcedure } from "../trpc";

const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? "";

interface PlaceResultCandidates {
  candidates: PlaceResult[];
  status: string;
}

export const googleRouter = createTRPCRouter({
  getPlaceDetails: publicProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input }) => {
      // https://developers.google.com/maps/documentation/places/web-service/place-details
      const fieldsArray: (keyof PlaceDetailsNewResponse)[] = [
        "displayName",
        "photos",
        "rating",
        "reviews",
        "userRatingCount",
        "websiteUri",
      ];
      const fields = fieldsArray.join(",");
      const apiUrl = `https://places.googleapis.com/v1/places/${input.placeId}?fields=${fields}&key=${apiKey}&languageCode=en&regionCode=US`;

      try {
        const options = {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        };

        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          const notOkaydata = (await response.json()) as PlaceResult;
          console.log("Error Response:", notOkaydata);
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

  searchByText: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const queryParams = new URLSearchParams({
        input: input.query,
        inputtype: "textquery",
        fields:
          "formatted_address,name,rating,opening_hours,geometry,user_ratings_total",
        key: apiKey,
        // Add language parameter if necessary, e.g., "&language=en"
      }).toString();
      const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${queryParams}`;

      try {
        const response = await fetch(apiUrl); // GET request doesn't need options for headers or body
        if (!response.ok) {
          const errorResponse = (await response.json()) as PlaceResult;
          console.error("Error Response:", errorResponse);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as PlaceResultCandidates;
        return data;
      } catch (error) {
        console.error("Error fetching data from Google Places API:", error);
        return { error: "Failed to fetch data from Google" };
      }
    }),

  // WARNING: This endpoint is inconsistent with getting "places.rating" and "places.userRatingCount". Use  "searchByText" instead (Google API issue)
  // https://developers.google.com/maps/documentation/places/web-service/text-search
  // searchByTextNew: publicProcedure
  //   .input(z.object({ query: z.string() }))
  //   .query(async ({ input }) => {
  //     const apiUrl = "https://places.googleapis.com/v1/places:searchText";
  //     const body = JSON.stringify({
  //       textQuery: input.query,
  //       languageCode: "en",
  //     });
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Goog-Api-Key": apiKey,
  //         "X-Goog-FieldMask":
  //           "places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.userRatingCount",
  //       },
  //       languageCode: "en",
  //       regionCode: "US",
  //       body: body,
  //     };

  //     try {
  //       const response = await fetch(apiUrl, options);
  //       if (!response.ok) {
  //         // Assuming PlaceResult can handle error scenarios
  //         const errorResponse = (await response.json()) as PlaceResult;
  //         console.error("Error Response:", errorResponse);
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       const data = await response.json();
  //       return data as PlaceDetailsNewResponse; // Add type assertion
  //     } catch (error) {
  //       console.error("Error fetching data from Google Places API:", error);
  //       return { error: "Failed to fetch data from Google" };
  //     }
  //   }),
});

// ChIJ2dGMjMMEdkgRqVqkuXQkj7c   Big Ben
// ChIJN1t_tDeuEmsRUsoyG83frY4   Google Office Sydney
// ChIJj61dQgK6j4AR4GeTYWZsKWw   from example on https://developers.google.com/maps/documentation/places/web-service/place-details

// https://developers.google.com/maps/documentation/places/web-service/place-details#required-parameters
