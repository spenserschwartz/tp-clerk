import "server-only";

import { type inferRouterOutputs } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
    auth: getAuth(
      new NextRequest("https://notused.com", { headers: headers() }),
    ),
  });
});

export const api = createCaller(createContext);

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
