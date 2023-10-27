import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in/[[...index]]",
    "/city/:slug", // Access city page without logging in
    "/cities",

    "/api/trpc/city.getAll:additionalDetails*", // City Page
    "/api/trpc/city.getCityByName:additionalDetails*",

    "/api/chat:additionalDetails*", // Chatbot
    "/api/trpc/openAI.generateTripItinerary:additionalDetails*", // Generate itinerary
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
