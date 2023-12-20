import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/events/:id", "/api/webhook/cleark", "/api/webhook/stripe", "/api/uploadthing"],
  ignoredRoutes: ["/api/webhook/cleark", "/api/webhook/stripe", "/api/uploadthing"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 