import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
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

export const upvotesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allUpvotes = await ctx.db.upvotes.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return allUpvotes;
  }),

  getAllByUserInCity: publicProcedure
    .input(z.object({ cityId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const upvotesByUserInThisCity = await ctx.db.upvotes.findMany({
        where: { userId: input.userId, attraction: { cityId: input.cityId } },
        include: { attraction: true },
      });

      if (!upvotesByUserInThisCity) throw new TRPCError({ code: "NOT_FOUND" });

      return upvotesByUserInThisCity;
    }),

  getByUserAndId: publicProcedure
    .input(z.object({ attractionId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const upvotedAttraction = await ctx.db.upvotes.findFirst({
        where: { userId: input.userId, attractionId: input.attractionId },
      });

      return upvotedAttraction;
    }),

  create: protectedProcedure
    .input(z.object({ attractionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newUpvote = await ctx.db.upvotes.create({
        data: {
          attraction: { connect: { id: input.attractionId } },
          userId: authorId,
        },
      });

      return newUpvote;
    }),

  delete: protectedProcedure
    .input(z.object({ attractionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await ctx.db.upvotes.deleteMany({
        where: {
          attractionId: input.attractionId,
          userId: authorId,
        },
      });
    }),

  // More routers here...
});
