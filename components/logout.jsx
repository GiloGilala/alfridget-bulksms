import { Button } from "@/components/ui/button"; // Adjust the import path to your shadcn Button component
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to homepage or desired URL after logout
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
