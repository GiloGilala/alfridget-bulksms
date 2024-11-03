// pages/api/auth/[...nextauth].ts or app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
