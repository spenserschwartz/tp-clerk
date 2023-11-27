import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in/[[...index]]",
    "/city/:slug", // Access city page without logging in
    "/itinerary/:id", // Access itinerary page without logging in

    "/api/trpc/:path+", // Public API to allow TRPC handle route protection (via publicProcedure, privateProcedure, etc.)
    "/api/chat:additionalDetails*", // Chatbot

    "/api/webhook/user", // Webhooks
    "/api/webhook(.*)", // Open any webhooks up
    "api/test",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
