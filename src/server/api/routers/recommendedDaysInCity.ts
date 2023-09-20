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

export const recommendedDaysInCityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allRecs = await ctx.prisma.recommendedDaysInCity.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return allRecs;
  }),

  getAllByCity: publicProcedure
    .input(z.object({ cityName: z.string() }))
    .query(async ({ ctx, input }) => {
      const recs = await ctx.prisma.recommendedDaysInCity.findMany({
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
      const rec = await ctx.prisma.recommendedDaysInCity.findFirst({
        where: { city: { name: input.cityName }, userId: userId ?? "" },
      });

      return rec;
    }),

  create: privateProcedure
    .input(z.object({ cityId: z.string(), recommendedDays: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const recommendation = await ctx.prisma.recommendedDaysInCity.create({
        data: {
          city: { connect: { id: input.cityId } },
          recommendedDays: input.recommendedDays,
          userId: "user_2T2MppjE6PnFtHWN32Td3co50J9",
        },
      });

      return recommendation;
    }),

  upsert: privateProcedure
    .input(
      z.object({
        cityId: z.string(),
        id: z.string(),
        recommendedDays: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const recommendation = await ctx.prisma.recommendedDaysInCity.upsert({
        where: { id: input.id },
        update: {
          recommendedDays: input.recommendedDays,
        },
        create: {
          city: { connect: { id: input.cityId } },
          recommendedDays: input.recommendedDays,
          userId: "user_2T2MppjE6PnFtHWN32Td3co50J9",
        },
      });

      return recommendation;
    }),

  //More routers here...
});
