import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout";
import { useSession } from "next-auth/react";

const menuItems = [
  {
    label: "Profile",
    shortcut: "⇧⌘P",
    href: "/clients/profile/edit",
  },
  {
    label: "Billing",
    shortcut: "⌘B",
    href: "/billings",
  },
];

export function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {user && (
  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
    <Avatar className="h-8 w-8">
      <AvatarImage 
        src={user.profileImage || "/user1.png"} 
        alt="Me" 
        onError={(event) => console.error('Error loading image:', event)}
      />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  </Button>
)}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <DropdownMenuItem>
                {item.label}
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
