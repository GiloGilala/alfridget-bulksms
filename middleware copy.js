// routes.js
import {
  LayoutDashboard,
  UsersRound,
  Settings,
  HelpCircle,
  DollarSign,
  Smartphone,
  UserPlus,
} from "lucide-react";

// Existing SideNavItem, ROUTES, and ROLE_ROUTE_PERMISSIONS configurations remain the same

// Enhanced Route Checking Utility
const RouteChecker = {
  // Comprehensive route accessibility check
  isAccessible: (route, userRole) => {
    // Early return for public routes
    if (ROUTES.PUBLIC.includes(route)) return true;

    // Check API routes
    if (route.startsWith(ROUTES.API.PREFIX)) {
      // Public API routes
      if (ROUTES.API.PUBLIC.includes(route)) return true;

      // Auth-required API routes
      if (ROUTES.API.AUTH_REQUIRED.includes(route)) {
        return userRole && ["superAdmin", "admin", "user"].includes(userRole);
      }

      // Admin-only API routes
      if (ROUTES.API.ADMIN.includes(route)) {
        return userRole === "superAdmin" || userRole === "admin";
      }
    }

    // Check navigation-based route permissions
    const matchesNavItem = SideNavItem.some((item) => {
      // Check main item visibility
      const isMainItemVisible =
        item.href === route && item.visible?.includes(userRole);

      // Check submenu item visibility
      const isSubmenuItemVisible =
        item.submenu &&
        item.subMenuItems?.some(
          (subItem) =>
            subItem.href === route && subItem.visible?.includes(userRole)
        );

      return isMainItemVisible || isSubmenuItemVisible;
    });

    // Check role-based route permissions
    const hasRolePermission = ROLE_ROUTE_PERMISSIONS[userRole]?.some(
      (perm) => perm === "*" || route.startsWith(perm)
    );

    return matchesNavItem && hasRolePermission;
  },

  // Simplified session validation
  validateSession: (auth) => {
    return (
      auth?.user?.id &&
      ["superAdmin", "admin", "user"].includes(auth?.user?.role)
    );
  },
};

// Enhanced Middleware
export default auth((req) => {
  const { nextUrl } = req;
  const route = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "guest";

  // Centralized logging
  const log = (message, level = "info") => {
    const levels = {
      info: console.log,
      warn: console.warn,
      error: console.error,
    };
    levels[level](`[Auth Middleware] ${message}`);
  };

  try {
    // Authentication routes handling
    if (ROUTES.AUTH.includes(route)) {
      if (isLoggedIn) {
        log(`Redirecting authenticated user from auth route: ${route}`);
        return Response.redirect(
          new URL(ROUTES.DEFAULT.LOGIN_REDIRECT, nextUrl)
        );
      }
      return null;
    }

    // Unauthenticated user handling
    if (!isLoggedIn) {
      // Check if route requires authentication
      if (!RouteChecker.isAccessible(route, "guest")) {
        log(`Unauthenticated access attempt: ${route}`);
        return Response.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(route)}`, nextUrl)
        );
      }
      return null;
    }

    // Authenticated user checks
    if (isLoggedIn) {
      // Validate session
      if (!RouteChecker.validateSession(req.auth)) {
        log("Invalid session detected", "warn");
        return Response.redirect(new URL("/logout", nextUrl));
      }

      // Check route accessibility for user role
      if (!RouteChecker.isAccessible(route, userRole)) {
        log(`Access denied to route: ${route} for role: ${userRole}`, "warn");
        return Response.redirect(new URL("/access-denied", nextUrl));
      }

      // Grant access
      log(`Access granted to route: ${route}`);
      return null;
    }
  } catch (error) {
    log(`Unexpected middleware error: ${error.message}`, "error");
    return Response.redirect(new URL("/error", nextUrl));
  }
});

// Route matcher configuration
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
