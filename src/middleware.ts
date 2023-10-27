import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in/[[...index]]",
    "/city/:slug", // Access city page without logging in

    "/api/trpc/city.getAll", // Get cities to populate combobox
    "/api/chat", // Chatbot
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
