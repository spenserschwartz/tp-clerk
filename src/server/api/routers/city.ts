import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cities = await ctx.prisma.cityPost.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return cities;
  }),

  getByName: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx }) => {
      const city = await ctx.prisma.cityPost.findFirst({
        where: {
          city: "London",
        },
      });

      if (!city) throw new TRPCError({ code: "NOT_FOUND" });

      const attractions = await ctx.prisma.attraction.findMany({
        where: {
          cityPostId: city.id,
        },
      });

      return { city, attractions };
    }),
});
