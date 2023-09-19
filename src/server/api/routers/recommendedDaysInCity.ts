import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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

  create: privateProcedure
    .input(z.object({ cityId: z.string(), recommendedDays: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const recommendation = await ctx.prisma.recommendedDaysInCity.create({
        data: {
          city: { connect: { id: input.cityId } },
          recommendedDays: input.recommendedDays,
          userId,
        },
      });

      return recommendation;
    }),

  //More routers here...
});
