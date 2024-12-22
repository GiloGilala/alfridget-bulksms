import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  authRequiredApiRoutes,
  publicApiRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "guest";

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiAuthRequired = authRequiredApiRoutes.includes(nextUrl.pathname);
  const isApiPublicRoute = publicApiRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow public API routes
  if (isApiRoute && isApiPublicRoute) {
    return null;
  }

  // Block API routes requiring auth if not logged in
  if (isApiRoute && isApiAuthRequired && !isLoggedIn) {
    return Response.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`,
        nextUrl
      )
    );
  }

  // API routes requiring auth pass through if logged in
  if (isApiRoute && isApiAuthRequired && isLoggedIn) {
    return null;
  }

  // Handle non-API routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Handle redirect for unauthenticated users attempting to access non-public routes
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = nextUrl.search
      ? `${nextUrl.pathname}${nextUrl.search}`
      : nextUrl.pathname;

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", // Skip Next.js internals and static files
    "/(api|trpc)(.*)", // Always run for API routes
  ],
};
