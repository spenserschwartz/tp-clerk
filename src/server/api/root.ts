import { createTRPCRouter } from "~/server/api/trpc";
import {
  attractionsRouter,
  cityRouter,
  itineraryRouter,
  OpenAIRouter,
  postsRouter,
  profileRouter,
  recommendedDaysInCityRouter,
  upvotesRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  attractions: attractionsRouter,
  city: cityRouter,
  itinerary: itineraryRouter,
  openAI: OpenAIRouter,
  posts: postsRouter,
  profile: profileRouter,
  recommendedDaysInCity: recommendedDaysInCityRouter,
  upvotes: upvotesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
