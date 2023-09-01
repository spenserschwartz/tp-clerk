import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const upvotesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const upvotes = await ctx.prisma.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return upvotes;
  }),

  // More routers here...
});
