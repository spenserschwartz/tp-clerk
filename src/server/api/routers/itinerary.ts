import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { unknownClerkUser } from "~/app/_components/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const itineraryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const itineraries = await ctx.db.itinerary.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return itineraries;
  }),
  // More routers here...
});
