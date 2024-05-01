import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { data } = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!data?.[0]) {
        // if we hit here we need a unsantized username so hit api once more and find the user.
        const { data: userList } = await clerkClient.users.getUserList({
          limit: 200,
        });
        const user = userList.find((user) =>
          user.externalAccounts.find(
            (account) => account.username === input.username,
          ),
        );
        if (!user) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "User not found",
          });
        }
        return filterUserForClient(user);
      } else return filterUserForClient(data[0]);
    }),

  // ! This file needs to be cleaned up and refactored.
  getUserById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      // const [user] = await clerkClient.users.getUserList({
      //   userId: [input.userId],
      // });
      const userData = await clerkClient.users.getUser(input.userId);

      // if (!userData) {
      //   // if we hit here we need a unsantized username so hit api once more and find the user.
      //   const users = await clerkClient.users.getUserList({
      //     limit: 200,
      //   });
      //   const user = users.find((user) =>
      //     user.externalAccounts.find(
      //       (account) => account.username === input.userId,
      //     ),
      //   );
      //   if (!user) {
      //     throw new TRPCError({
      //       code: "INTERNAL_SERVER_ERROR",
      //       message: "User not found",
      //     });
      //   }

      //   return filterUserForClient(user);
      // }

      return filterUserForClient(userData);
    }),
});
