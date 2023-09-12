import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cities = await ctx.prisma.city.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return cities;
  }),

  getAllWithAttractions: publicProcedure.query(async ({ ctx }) => {
    const cities = await ctx.prisma.city.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: { attractions: true },
    });

    return cities;
  }),

  getCityByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const city = await ctx.prisma.city.findFirst({
        where: { name: input.name },
        include: { attractions: { include: { upvotes: true } } },
      });
      return city;
    }),

  // More routers here...
});
