import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/splash",
    "/api/trpc/posts.getAll", // Can be deleted
    "/api/trpc/city.getAll", // Get cities to populate combobox
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
