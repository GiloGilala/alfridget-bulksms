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

const menuItems = [
  {
    label: "Profile",
    shortcut: "⇧⌘P",
    action: () => console.log("Go to Profile"),
  },
  {
    label: "Billing",
    shortcut: "⌘B",
    action: () => console.log("Go to Billing"),
  },
  {
    label: "Settings",
    shortcut: "⌘S",
    action: () => console.log("Open Settings"),
  },
  {
    label: "New Team",
    shortcut: null,
    action: () => console.log("Create New Team"),
  },
];

export function UserNav() {
  const handleLogout = () => console.log("Logged out");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user1.png" alt="Me" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* User Information */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Main Menu Group */}
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index}>
              {item.label}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Log Out */}
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
