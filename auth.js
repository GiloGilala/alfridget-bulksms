import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConn";
import User from "@/models/User";
import bcrypt from "bcryptjs";
// import myAxios from "@/lib/axiosConfig";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();

        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          // Find user by email
          const user = await User.findOne({
            $or: [{ email: credentials.email }, { phone: credentials.phone }],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Check if password is correct
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Incorrect password");
          }

          // If password is correct, return user
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Login error:", error.message);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback called with token:", token, "and user:", user);
      if (user) {
        token.id = user.id;
        // console.log("JWT token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;

        // console.log("Session:", session);-
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
