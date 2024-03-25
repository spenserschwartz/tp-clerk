import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in/[[...index]]",
    "/city/:slug", // Access city page without logging in
    "/city-search",
    "/itinerary/:id", // Access itinerary page without logging in
    "/user/:id", // Access user page without logging in
    "/places/:slug", // Access place page without logging in
    "/quick-launch",
    "/spenser",
    "/things-to-do/:slug*",
    "/splash",

    "/api/trpc/:path+", // Public API to allow TRPC handle route protection (via publicProcedure, privateProcedure, etc.)
    "/api/chat:additionalDetails*", // Chatbot
    "/api/webhook/user", // Webhooks
    "/api/webhook(.*)", // Open any webhooks up
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
