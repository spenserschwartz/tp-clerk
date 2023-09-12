import { createTRPCRouter } from "~/server/api/trpc";
import {
  attractionsRouter,
  cityRouter,
  postsRouter,
  profileRouter,
  upvotesRouter,
  usersRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  attractions: attractionsRouter,
  city: cityRouter,
  posts: postsRouter,
  profile: profileRouter,
  upvotes: upvotesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
