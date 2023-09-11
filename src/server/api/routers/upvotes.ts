import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const upvotesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const upvotes = await ctx.prisma.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return upvotes;
  }),

  getAllByUserInCity: publicProcedure
    .input(z.object({ cityId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const upvotesByUserInThisCity = await ctx.prisma.upvotes.findMany({
        where: { userId: input.userId, attraction: { cityId: input.cityId } },
      });

      if (!upvotesByUserInThisCity) throw new TRPCError({ code: "NOT_FOUND" });

      return upvotesByUserInThisCity;
    }),

  create: privateProcedure
    .input(z.object({ attractionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newUpvote = await ctx.prisma.upvotes.create({
        data: {
          attraction: { connect: { id: input.attractionId } },
          user: { connect: { id: authorId } },
        },
      });

      return newUpvote;
    }),

  // More routers here...
});
