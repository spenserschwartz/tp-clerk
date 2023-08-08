import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const cityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cities = await ctx.prisma.cityPost.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return cities;
  }),
});
