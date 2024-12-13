"use client";
import Topbar from "@/components/layout/TopBar";
import RightSideBar from "@/components/layout/RightSideBar";
import FooterBar from "@/components/layout/FooterBar";
import Container from "@/components/layout/Container";
import SideNavBar from "@/components/layout/SideNavBar";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }) => {
  const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);

  const toggleRightSidebar = () => {
    setRightSidebarVisible((prev) => !prev);
  };

  return (
    <SessionProvider>
      <div className="min-h-screen w-full flex">
        <SideNavBar />
        <div className="flex flex-1 flex-col">
          <Topbar onToggleSidebar={toggleRightSidebar} />
          <Container>{children}</Container>
          <FooterBar />
        </div>
        {isRightSidebarVisible && <RightSideBar />}
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
