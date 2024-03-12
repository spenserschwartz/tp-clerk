import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Create a new ratelimiter, that allows 10 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});

export const likesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allLikes = await ctx.prisma.likes.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return allLikes;
  }),

  // More routers here...
});
