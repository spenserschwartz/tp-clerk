import { z } from "zod";
import type {
  NearbySearchResponse,
  Place,
  PlaceNew,
  PlaceResult,
  PlacesTextSearchResponse,
} from "~/types/google";
import { createTRPCRouter, publicProcedure } from "../trpc";

const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? "";

interface PlaceResultCandidates {
  candidates: PlaceResult[];
  status: string;
}

export const googleRouter = createTRPCRouter({
  findPlace: publicProcedure
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

  getPlaceDetails: publicProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input }) => {
      // https://developers.google.com/maps/documentation/places/web-service/place-details
      const fieldsArray: (keyof PlaceNew)[] = [
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

  searchByTextForCity: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const queryParams = new URLSearchParams({
        // input: input.query,
        // inputtype: "textquery",
        // fields:
        //   "formatted_address,name,rating,opening_hours,geometry,user_ratings_total",
        query: input.query,
        key: apiKey,
        type: "(cities)",
      }).toString();
      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?${queryParams}`;

      try {
        const response = await fetch(apiUrl); // GET request doesn't need options for headers or body
        if (!response.ok) {
          const errorResponse = (await response.json()) as PlaceResult;
          console.error("Error Response:", errorResponse);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // const data = (await response.json()) as PlaceResultCandidates;
        const data = (await response.json()) as PlacesTextSearchResponse;
        return data;
      } catch (error) {
        console.error("Error fetching data from Google Places API:", error);
        return { error: "Failed to fetch data from Google" };
      }
    }),

  searchProminentPlacesByLocation: publicProcedure
    .input(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
        radius: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { latitude, longitude, radius } = input;
      // TODO: Currently hardcoded to London
      const queryParams = new URLSearchParams({
        // location: "51.5074,-0.1278", // London
        location: `${latitude},${longitude}`,
        radius: `${radius}`, //required
        key: apiKey,
        type: "tourist_attraction",
      }).toString();
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${queryParams}`;

      try {
        const response = await fetch(apiUrl); // GET request doesn't need options for headers or body
        if (!response.ok) {
          const errorResponse = (await response.json()) as PlaceResult;
          console.error("Error Response:", errorResponse);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as NearbySearchResponse;
        return data;
      } catch (error) {
        console.error("Error fetching data from Google Places API:", error);
        return { error: "Failed to fetch data from Google" };
      }
    }),
  searchProminentPlacesByLocationNew: publicProcedure
    .input(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
        radius: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { latitude, longitude, radius } = input;
        const response = await fetch(
          `https://places.googleapis.com/v1/places:searchNearby`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              // "X-Goog-FieldMask":
              //   "places.displayName,places.types,places.userRatingCount,places.photos",
              "X-Goog-FieldMask": "*",
            },
            body: JSON.stringify({
              languageCode: "en",
              rankPreference: "POPULARITY",
              includedTypes: ["tourist_attraction"],
              locationRestriction: {
                circle: {
                  center: {
                    latitude,
                    longitude,
                  },
                  radius,
                },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching places: ${response.statusText}`);
        }
        const data = (await response.json()) as Place[];
        return data;
      } catch (err) {
        console.log("error", err);
      }
    }),
});
