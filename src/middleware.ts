import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in/[[...index]]",
    "/splash",
    "/api/trpc/posts.getAll", // Can be deleted
    "/api/trpc/city.getAll", // Get cities to populate combobox
    "/api/chat", // Chatbot
    "/api/completion", // Chatbot
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
