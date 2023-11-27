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

export const userRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return users;
  }),

  create: publicProcedure
    .input(z.object({ id: z.string(), image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId ?? "not-logged-in";
      console.log("CREATE userId", userId);

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const newItinerary = await ctx.prisma.user.create({
        data: {
          id: input.id,
          image: input.image,
        },
      });

      return newItinerary;
    }),

  // More routers here...
});
