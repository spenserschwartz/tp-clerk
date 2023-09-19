import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

  //More routers here...
});
