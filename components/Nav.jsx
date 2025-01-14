"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

const Nav = ({ links, isCollapsed, userRole }) => {
  const pathName = usePathname();
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleSubmenu = useCallback((index) => {
    setExpandedIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  // Filter links based on user's role
  // Memoized visible links based on user role
  const filteredLinks = useMemo(() => {
    return links.filter((link) => link.visible.includes(userRole));
  }, [links, userRole]);

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[data-collapsed=true]:justify-center group-[data-collapsed=true]:px-2">
          {filteredLinks.map((link, index) =>
            link.submenu ? (
              isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={index} className="flex flex-col py-1">
                  <div
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between"
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "sm",
                        }),
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "w-full flex items-center justify-between"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.title}
                      {link.label && (
                        <span
                          className={cn(
                            link.variant === "default" &&
                              "text-background dark:text-white"
                          )}
                        >
                          {link.label}
                        </span>
                      )}
                      <ChevronDown
                        className={`ml-auto transition-transform ${
                          expandedIndexes[index] ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                  </div>
                  {expandedIndexes[index] && (
                    <div className="pl-6 py-1">
                      {link.subMenuItems
                        .filter((subLink) => subLink.visible.includes(userRole))
                        .map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subLink.href}
                            className={cn(
                              buttonVariants({
                                variant:
                                  subLink.href === pathName
                                    ? "default"
                                    : "ghost",
                                size: "sm",
                              }),
                              link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                              "justify-start flex items-center my-1"
                            )}
                          >
                            {subLink.icon && (
                              <subLink.icon className="mr-2 h-4 w-4" />
                            )}
                            {subLink.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )
            ) : isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : "ghost",
                    size: "sm",
                  }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
};
export default Nav;
