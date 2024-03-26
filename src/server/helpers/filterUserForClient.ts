// import type { User } from "@clerk/nextjs/dist/types/server";

import type { User } from "@clerk/nextjs/server";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl,
    externalUsername:
      user.externalAccounts.find(
        (externalAccount) => externalAccount.provider === "oauth_github",
      )?.username ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
