import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
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
    const allLikes = await ctx.db.likes.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return allLikes;
  }),

  getAllByUserInCity: publicProcedure
    .input(z.object({ cityId: z.string() }))
    .query(async ({ ctx, input }) => {
      const likesByUserInThisCity = await ctx.db.likes.findMany({
        where: {
          userId: ctx.userId ?? "",
          cityId: input.cityId,
        },
      });

      if (!likesByUserInThisCity) throw new TRPCError({ code: "NOT_FOUND" });

      return likesByUserInThisCity;
    }),

  create: protectedProcedure
    .input(
      z.object({
        cityId: z.string(),
        placeId: z.string(),

        displayName: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newLike = await ctx.db.likes.create({
        data: {
          cityId: input.cityId,
          displayName: input.displayName,
          placeId: input.placeId,
          userId,
        },
      });

      return newLike;
    }),

  delete: protectedProcedure
    .input(z.object({ cityId: z.string(), placeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await ctx.db.likes.deleteMany({
        where: {
          cityId: input.cityId,
          placeId: input.placeId,
          userId,
        },
      });
    }),

  // More routers here...
});
