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

  //More routers here...
});
