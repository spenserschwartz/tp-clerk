import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isTestingRoute = createRouteMatcher(["/splash(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Restrict testing routes to users signed in
  if (isTestingRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
