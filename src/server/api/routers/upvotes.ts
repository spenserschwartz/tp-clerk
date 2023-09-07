import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const upvotesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const upvotes = await ctx.prisma.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return upvotes;
  }),

  getAllByUserInCity: publicProcedure
    .input(z.object({ cityId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const upvotesByUserInThisCity = await ctx.prisma.upvotes.findMany({
        where: { userId: input.userId, attraction: { cityId: input.cityId } },
      });

      if (!upvotesByUserInThisCity) throw new TRPCError({ code: "NOT_FOUND" });

      return upvotesByUserInThisCity;
    }),

  // More routers here...
});
