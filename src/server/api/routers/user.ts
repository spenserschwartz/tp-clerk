import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return users;
  }),

  // More routers here...
});
