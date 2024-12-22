import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConn";
import bcrypt from "bcryptjs";
import User from "@/app/modals/User";
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
        // console.log("credentials auth:", credentials);

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
          console.log("credentials user:", user);

          // If password is correct, return user
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            credits: user.credits,
            phone: user.phone,
            role: user.role,
            profileImage: user.profileImage,
            terms: user.terms,
            isActive: user.isActive,
          };
        } catch (error) {
          console.error("Login error:", error.message);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Merge the full user data into the JWT token
        return {
          ...token,
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          credits: user.credits,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          terms: user.terms,
        };
      }
      // console.log("JWT token:", token);
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Attach full user data to the session object
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          credits: token.credits,
          phone: token.phone,
          role: token.role,
          profileImage: token.profileImage,
          terms: token.terms,
        };
        // console.log("Session Auth:", session);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
