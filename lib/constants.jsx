export const SideNavItem = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="home" width="24" height="24" />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <Icon icon="folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <Icon icon="mail" width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Icon icon="settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <Icon icon="help-circle" width="24" height="24" />,
  },
];
