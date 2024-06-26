import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

import { unknownClerkUser } from "~/lib/constants";
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

  getAllWithCityInfo: protectedProcedure.query(async ({ ctx }) => {
    const itineraries = await ctx.db.itinerary.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: { city: true },
    });

    return itineraries;
  }),

  getByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const itinerary = await ctx.db.itinerary.findUnique({
        where: { id: input.id },
        include: { city: true },
      });

      if (!itinerary) throw new TRPCError({ code: "NOT_FOUND" });

      return itinerary;
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const itinerariesByUser = await ctx.db.itinerary.findMany({
        where: { userId: input.userId },
        include: { city: true },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });

      return itinerariesByUser;
    }),

  create: publicProcedure
    .input(
      z.object({
        cityId: z.string(),
        cityName: z.string(),
        details: z.array(
          z.object({
            dayOfWeek: z.string(),
            date: z.string(),
            morning: z.string(),
            afternoon: z.string(),
            evening: z.string(),
          }),
        ),
        title: z.string().nullable(),
        imageURL: z.optional(z.string()),
        placeId: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId ?? unknownClerkUser.id;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newItinerary = await ctx.db.itinerary.create({
        data: {
          city: { connect: { id: input.cityId } },
          cityName: input.cityName,
          user: { connect: { id: userId } },
          details: input.details,
          title: input.title ?? null,
          imageURL: input.imageURL ?? null,
          placeId: input.placeId ?? null,
        },
      });

      return newItinerary;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const itinerary = await ctx.db.itinerary.findUnique({
        where: { id: input.id },
      });

      if (!itinerary) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.itinerary.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  editTitle: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Ensure there is a logged-in user or fallback to a known ID (make sure this is handled correctly in your app logic).
      const userId = ctx.userId ?? unknownClerkUser.id;

      // Retrieve the existing itinerary to check if the current user is allowed to update it.
      const existingItinerary = await ctx.db.itinerary.findUnique({
        where: { id: input.id },
      });

      // If the itinerary does not exist or the user does not have permission, handle accordingly.
      if (!existingItinerary || existingItinerary.userId !== userId) {
        throw new Error("Unauthorized or itinerary not found");
      }

      // If the user is authorized, update the itinerary title.
      const newItinerary = await ctx.db.itinerary.update({
        where: { id: input.id },
        data: { title: input.title },
      });

      // Optionally, return the updated itinerary or a success message.
      return newItinerary;
    }),

  editUserNotes: protectedProcedure
    .input(z.object({ id: z.string(), userNotes: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      // Ensure there is a logged-in user or fallback to a known ID (make sure this is handled correctly in your app logic).
      const userId = ctx.userId ?? unknownClerkUser.id;

      // Retrieve the existing itinerary to check if the current user is allowed to update it.
      const existingItinerary = await ctx.db.itinerary.findUnique({
        where: { id: input.id },
      });

      // If the itinerary does not exist or the user does not have permission, handle accordingly.
      if (!existingItinerary || existingItinerary.userId !== userId) {
        throw new Error("Unauthorized or itinerary not found");
      }

      const newItinerary = await ctx.db.itinerary.update({
        where: { id: input.id },
        data: { userNotes: input.userNotes },
      });

      return newItinerary;
    }),

  // More routers here...
});
