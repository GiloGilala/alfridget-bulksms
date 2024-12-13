// middleware.js
import { auth } from "@/auth";
import { SideNavItem } from "@/lib/constants";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "guest";

  // console.log("isLoggedIn: ", isLoggedIn);
  // console.log("userRole: ", userRole);
  // console.log("user: ", req.auth?.user);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // API auth routes always pass through
  if (isApiAuthRoute) {
    return null;
  }

  // Helper function to check if a route is accessible for a given role
  const isRouteAccessible = (route) => {
    for (const navItem of SideNavItem) {
      // Check main route
      if (
        navItem.href === route &&
        (!navItem.visible || navItem.visible.includes(userRole))
      ) {
        return true;
      }

      // Check submenu routes
      if (navItem.submenu && navItem.subMenuItems) {
        const submenuItem = navItem.subMenuItems.find(
          (subItem) =>
            subItem.href === route &&
            (!subItem.visible || subItem.visible.includes(userRole))
        );
        if (submenuItem) return true;
      }
    }
    return false;
  };

  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Check route accessibility based on user role
  if (isLoggedIn) {
    if (!isRouteAccessible(nextUrl.pathname)) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Redirect unauthenticated users from non-public routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
