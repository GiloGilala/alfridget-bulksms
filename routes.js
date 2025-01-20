// routes.js
/**
 *
 *
 */

import {
  LayoutDashboard,
  UsersRound,
  Settings,
  HelpCircle,
  DollarSign,
  Smartphone,
  UserPlus,
} from "lucide-react";

export const SideNavItem = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    visible: ["superAdmin", "user"],
    variant: "default",
    submenu: false,
  },
  {
    title: "Admin Dashboard",
    href: "/adminUsers",
    icon: LayoutDashboard,
    visible: ["superAdmin", "admin"],
    variant: "default",
    submenu: false,
  },
  {
    title: "Users",
    href: "#",
    icon: UsersRound,
    variant: "ghost",
    visible: ["superAdmin", "admin", "user"],
    // label: "43",
    submenu: true,
    subMenuItems: [
      {
        title: "Users",
        href: "/adminUsers/users",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add",
        href: "/adminUser/id/slug",
        visible: ["superAdmin", "admin"],
      },
      // { title: "Active", href: "/users/active",visible: ["superAdmin", "admin"] },
      // { title: "Inactive", href: "/users/inactive" },
    ],
  },

  {
    title: "Contacts",
    href: "#",
    icon: UserPlus,
    visible: ["superAdmin", "user"],
    submenu: true,
    // label: "23",
    subMenuItems: [
      {
        title: "Contacts",
        href: "/clients/contacts",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add Contact",
        href: "/clients/contacts/add",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Groups",
        href: "/clients/contacts/groups",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add Group",
        href: "/clients/contacts/groups/add",
        visible: ["superAdmin", "admin", "user"],
      }, // Updated for uniqueness
      {
        title: "Import Contacts",
        href: "/clients/contacts/import",
        visible: ["superAdmin", "admin", "user"],
      },
    ],
  },
  // {
  //   title: "Messages",
  //   href: "/messages",
  //   icon: MessageSquare,
  //   visible: ["superAdmin", "user"],
  //   submenu: true,
  //   label: "137",
  //   subMenuItems: [
  //     { title: "Inbox", href: "/messages/inbox", icon: MessageSquare },
  //     { title: "Sent", href: "/messages/sent", icon: MessageSquare },
  //     { title: "Drafts", href: "/messages/drafts", icon: MessageSquare },
  //     { title: "Trash", href: "/messages/trash", icon: MessageSquare },
  //     { title: "Compose", href: "/messages/compose", icon: MessageSquare },
  //     { title: "Templates", href: "/messages/templates", icon: MessageSquare },
  //   ],
  // },
  // {
  //   title: "Email",
  //   href: "/email",
  //   icon: Mail,
  //   visible: ["superAdmin", "admin", "user"],
  //   submenu: true,
  //   label: "56",
  //   subMenuItems: [
  //     { title: "Inbox", href: "/email/inbox" },
  //     { title: "Compose", href: "/email/compose" },
  //     { title: "Sent", href: "/email/sent" },
  //     { title: "Drafts", href: "/email/drafts" },
  //     { title: "Templates", href: "/email/templates" },
  //     { title: "Email Settings", href: "/email/settings" },
  //   ],
  // },
  {
    title: "SMS",
    href: "#",
    icon: Smartphone,
    visible: ["superAdmin", "admin", "user"],
    submenu: true,
    subMenuItems: [
      {
        title: "Send SMS",
        href: "/clients/sms/send",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "SMS History",
        href: "/clients/sms",
        visible: ["superAdmin", "admin", "user"],
      },
      // { title: "SMS Templates", href: "/sms/templates" },
      // { title: "SMS Settings", href: "/sms/settings" },
    ],
  },
  // {
  //   title: "WhatsApp",
  //   href: "/whatsapp",
  //   icon: MessageCircle,
  //   visible: ["superAdmin", "admin", "user"],
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Send Message", href: "/whatsapp/send" },
  //     { title: "Message History", href: "/whatsapp/history" },
  //     { title: "Templates", href: "/whatsapp/templates" },
  //     { title: "WhatsApp Settings", href: "/whatsapp/settings" },
  //     { title: "WhatsApp API", href: "/whatsapp/api" },
  //   ],
  // },
  // {
  //   title: "Campaigns",
  //   href: "/campaigns",
  //   icon: Briefcase,
  //   visible: ["superAdmin", "admin", "user"],
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Create Campaign", href: "/campaigns/create" },
  //     { title: "Campaign List", href: "/campaigns/list" },
  //     { title: "Campaign Templates", href: "/campaigns/templates" },
  //     { title: "Campaign Reports", href: "/campaigns/reports" },
  //     { title: "Campaign Settings", href: "/campaigns/settings" },
  //   ],
  // },
  {
    title: "Plans",
    href: "#",
    icon: DollarSign,
    visible: ["superAdmin", "admin", "user"],
    submenu: true,
    subMenuItems: [
      {
        title: "Plans",
        href: "/clients/plan",
        visible: ["superAdmin", "admin", "user"],
      },
      // { title: "Add Plan", href: "/plans/add" },
    ],
  },
  {
    title: "Billing",
    href: "#",
    icon: UsersRound,
    variant: "ghost",
    visible: ["superAdmin", "admin", "user"],
    // label: "43",
    submenu: true,
    subMenuItems: [
      {
        title: "Topup",
        href: "/billings/topup",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Billing History",
        href: "/billings",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Payment",
        href: "/billings/checkout",
        visible: ["superAdmin", "admin", "user"],
      },
      // { title: "Active", href: "/users/active",visible: ["superAdmin", "admin"] },
      // { title: "Inactive", href: "/users/inactive" },
    ],
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
    visible: ["superAdmin", "admin", "user"],
    submenu: true,
    subMenuItems: [
      {
        title: "Account",
        href: "/settings/account",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Service Providers",
        href: "/admin/providers",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add Provider",
        href: "/admin/accounts/add",
        visible: ["superAdmin", "admin"],
      },
      {
        title: "Privacy",
        href: "/settings/privacy",
        visible: ["superAdmin", "admin", "user"],
      },
      // {
      //   title: "Security",
      //   href: "/settings/security",
      //   visible: ["superAdmin", "admin", "user"],
      // },
    ],
  },

  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
    submenu: false,
    visible: ["superAdmin", "admin", "user"],
  },
];

export const DEFAULT_LOGIN_REDIRECT = "/clients/users";

// Centralized Route Configuration
export const ROUTES = {
  DEFAULT: {
    LOGIN_REDIRECT: process.env.DEFAULT_LOGIN_REDIRECT || "/clients/users",
  },
  API: {
    PREFIX: "/api",
    AUTH_REQUIRED: [
      "/api/contact/add",
      "/api/group/add",
      "/api/users/add",
      "/api/campaign/sms",
    ],
    PUBLIC: ["/api/services", "/api/plan", "/api/payment"],
    ADMIN: ["/api/users/delete", "/api/users/add", "/api/staff"],
  },
  PUBLIC: ["/", "/new-verification", "/reset", "/error", "/help"],
  AUTH: ["/login", "/signup", "/error"],
};

// Role-based Route Permissions
export const ROLE_ROUTE_PERMISSIONS = {
  superAdmin: ["*"], // Full access
  admin: ["/clients", "/admin", "/settings"],
  user: [
    "/clients/users",
    "/clients/contacts",
    "/settings/account",
    "/clients/sms/send",
  ],
  guest: [],
};
