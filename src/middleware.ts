import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, _evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
