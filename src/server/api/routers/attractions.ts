import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const attractionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const attractions = await ctx.prisma.attraction.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return attractions;
  }),

  getAttractionsByCity: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const attractions = await ctx.prisma.attraction.findMany({
        take: 100,
        orderBy: [{ createdAt: "desc" }],
        where: { city: { name: input.name } },
      });

      return attractions;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const attraction = await ctx.prisma.attraction.findFirst({
        where: { id: input.id },
        include: { upvotes: true },
      });

      if (!attraction) throw new TRPCError({ code: "NOT_FOUND" });

      return attraction;
    }),

  // More routers here...
});
