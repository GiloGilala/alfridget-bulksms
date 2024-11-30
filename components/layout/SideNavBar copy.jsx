import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, CircleChevronUpIcon } from "lucide-react"; // Only necessary icons imported

import Nav from "../Nav";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SideNavItem } from "@/lib/constants";

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={cn(
        "flex-col items-center relative border-r pb-10 hidden md:block p-4 top-0 left-0 md:transition-width duration-500 ease-out",
        isCollapsed ? "w-22" : "w-64"
      )}
    >
      {/* Toggle button */}
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight className={isCollapsed ? "" : "rotate-180"} />
        </Button>
      </div>

      {/* Profile */}
      <div
        className={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <Button
          variant="outline"
          role="combobox"
          className="flex w-full justify-between"
        >
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage src="/Alfridget-Logo.jpeg" alt="Me" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <span className="hidden md:block">Alfridget</span>
              <CircleChevronUpIcon className="ml-auto h-5 w-5 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </div>

      <Separator className="my-2" />

      {/* Navigation */}
      <Nav isCollapsed={isCollapsed} links={SideNavItem} />

      {!isCollapsed && (
        <div className="flex justify-center absolute bottom-0 left-0 right-0 m-4">
          <Card className="pb-3 md:block">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SideNavBar;
