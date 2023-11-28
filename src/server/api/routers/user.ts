import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return users;
  }),

  // More routers here...
});
