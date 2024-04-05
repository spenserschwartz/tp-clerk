// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import {
  attractionsRouter,
  cityRouter,
  googleRouter,
  itineraryRouter,
  openAIRouter,
  postRouter,
  profileRouter,
  recommendedDaysInCityRouter,
  tripAdvisorRouter,
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
  google: googleRouter,
  itinerary: itineraryRouter,
  openAI: openAIRouter,
  post: postRouter,
  profile: profileRouter,
  recommendedDaysInCity: recommendedDaysInCityRouter,
  tripAdvisor: tripAdvisorRouter,
  upvotes: upvotesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
