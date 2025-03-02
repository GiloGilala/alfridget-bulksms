import { auth } from "@/auth";
import { SideNavItem, DEFAULT_LOGIN_REDIRECT, ROUTES } from "@/routes";

// Utility function to log messages
const log = (message) => console.log(`[Auth Middleware] ${message}`);

// Utility function to check if the route is public or API auth-related
const isPublicOrAuthAPI = (route) => {
  return (
    ROUTES.PUBLIC.includes(route) ||
    route.startsWith("/api/auth") ||
    route === "/login"
  );
};

// Utility function to check if the route requires authentication
const isProtectedRoute = (route) => {
  return (
    ROUTES.API.AUTH_REQUIRED.includes(route) || 
    (route.startsWith("/api") && !ROUTES.API.PUBLIC.includes(route))
  );
};

// Utility function to check if the user has permission for the route
const hasPermissionForRoute = (route, userRole) => {
   // Use role-based permissions instead of SideNavItem
   if (userRole === "superAdmin") return true; // Wildcard access


  const matchesNavItem = SideNavItem.some((item) => {
    const isVisible = item.visible?.includes(userRole);

    const matchesSubmenu =
      item.submenu &&
      item.subMenuItems?.some(
        (subItem) =>
          subItem.href === route && subItem.visible?.includes(userRole)
      );
    return (item.href === route && isVisible) || matchesSubmenu;
  });

 

  return matchesNavItem ;
};

// Define the session validation function
const validateSession = (auth) => {
  return (
    auth?.user?.id && 
    ["superAdmin", "admin", "user", "guest"].includes(auth?.user?.role)
  );
};

// Middleware for authentication and authorization
export default auth((req) => {
  const { nextUrl } = req;
  const route = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "guest";

  try {
     // 1. Allow authentication-related API routes
     if (route.startsWith(ROUTES.API.API_AUTH_PREFIX)) {
      log(`Bypassing authentication for auth-related API route: ${route}`);
      return null;
    }

    // 3. Redirect authenticated users away from authentication routes
    if (ROUTES.AUTH.includes(route) && isLoggedIn) {
      log(`Authenticated user attempting to access auth route: ${route}`);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // 2. Allow public routes, auth-related API routes, and the login route
    if (isPublicOrAuthAPI(route)) {
      log(`Public route or login page: ${route}`);
      return null;
    }
   
    // 4. Handle API routes requiring authentication
    if (route.startsWith(ROUTES.API.PREFIX) && isProtectedRoute(route) && !isLoggedIn) {
      log(`Redirecting unauthenticated user from protected API route: ${route}`);
      return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(route)}`, nextUrl));
    }

    // 5. Redirect unauthenticated users from protected routes
    if (!isLoggedIn) {
      log(`Unauthenticated user attempting to access protected route: ${route}`);
      return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(route)}`, nextUrl));
    }

    // 6. Validate logged-in session
    if (isLoggedIn && !validateSession(req.auth)) {
      log("Invalid session. Redirecting to logout.");
      return Response.redirect(new URL("/logout", nextUrl));
    }

    // 7. Check route accessibility based on user role
    if (!hasPermissionForRoute(route, userRole)) {
      log(`Access denied to route: ${route} for role: ${userRole}`);
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    // 8. Grant access to valid routes
    log(`Access granted to route: ${route}`);
    return null;

  } catch (error) {
    console.error(`Middleware error for route: ${route}`, error);
    return Response.redirect(new URL("/error", nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
