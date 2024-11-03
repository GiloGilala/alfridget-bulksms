import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/layout/TopBar";
import LeftSideBar from "@/components/layout/SideNavBar";
import RightSideBar from "@/components/layout/RightSideBar";
import FooterBar from "@/components/layout/FooterBar";
import { ToasterProvider } from "@/lib/ToasterProvider";
import Container from "@/components/layout/Container";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex ">
      <ToasterProvider />

      <LeftSideBar />

      <div className="flex-1 flex">
        <div className=" flex-col">
          <Topbar />
          <Container>{children}</Container>
          {/* <FooterBar /> */}
        </div>
        <div className="  bg-[#bc6af2]">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
