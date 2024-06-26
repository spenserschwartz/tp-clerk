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

export const recommendedDaysInCityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allRecs = await ctx.db.recommendedDaysInCity.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return allRecs;
  }),

  getAllByCity: publicProcedure
    .input(z.object({ cityName: z.string() }))
    .query(async ({ ctx, input }) => {
      const recs = await ctx.db.recommendedDaysInCity.findMany({
        take: 100,
        orderBy: [{ createdAt: "desc" }],
        where: { city: { name: input.cityName } },
      });

      return recs;
    }),

  getUserRecommendation: publicProcedure
    .input(z.object({ cityName: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const rec = await ctx.db.recommendedDaysInCity.findFirst({
        where: { city: { name: input.cityName }, userId: userId ?? "" },
      });

      return rec;
    }),

  create: protectedProcedure
    .input(z.object({ cityId: z.string(), recommendedDays: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const recommendation = await ctx.db.recommendedDaysInCity.create({
        data: {
          city: { connect: { id: input.cityId } },
          recommendedDays: input.recommendedDays,
          userId: userId ?? "userNotFound",
        },
      });

      return recommendation;
    }),

  upsert: protectedProcedure
    .input(
      z.object({
        cityId: z.string().optional(),
        cityName: z.string().optional(),

        id: z.string(),
        recommendedDays: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const recommendation = await ctx.db.recommendedDaysInCity.upsert({
        where: { id: input.id },
        update: {
          recommendedDays: input.recommendedDays,
        },
        create: {
          city: { connect: { id: input.cityId } },
          recommendedDays: input.recommendedDays,
          userId: userId ?? "userNotFound",
        },
      });

      return recommendation;
    }),

  //More routers here...
});
