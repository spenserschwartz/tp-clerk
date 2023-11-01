import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const itineraryRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const itineraries = await ctx.prisma.itinerary.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return itineraries;
  }),

  getByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const itinerary = await ctx.prisma.itinerary.findUnique({
        where: { id: input.id },
      });

      if (!itinerary) throw new TRPCError({ code: "NOT_FOUND" });

      return itinerary;
    }),

  create: privateProcedure
    .input(
      z.object({
        cityId: z.string(),
        details: z.array(
          z.object({
            dayOfWeek: z.string(),
            date: z.string(),
            morning: z.string(),
            afternoon: z.string(),
            evening: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newItinerary = await ctx.prisma.itinerary.create({
        data: {
          city: { connect: { id: input.cityId } },
          userId: userId,
        },
      });

      return newItinerary;
    }),

  // More routers here...
});
