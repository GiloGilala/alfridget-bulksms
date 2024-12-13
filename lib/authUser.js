import { auth } from "@/auth";

export const currentUser = async (req) => {
  const session = await auth(req);
  console.log("currentUser: ", session);

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  console.log("currentRole: ", session);
  return session?.user?.role;
};
