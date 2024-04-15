import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const attractionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const attractions = await ctx.db.attraction.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: { upvotes: true },
    });
    return attractions;
  }),

  getAttractionsByCity: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const attractions = await ctx.db.attraction.findMany({
        take: 100,
        orderBy: [{ createdAt: "desc" }],
        where: { city: { name: input.name } },
      });

      return attractions;
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const attraction = await ctx.db.attraction.findFirst({
        where: { name: input.name },
        include: { upvotes: true },
      });

      return attraction;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const attraction = await ctx.db.attraction.findFirst({
        where: { id: input.id },
        include: { upvotes: true },
      });

      if (!attraction) throw new TRPCError({ code: "NOT_FOUND" });

      return attraction;
    }),

  // More routers here...
});
