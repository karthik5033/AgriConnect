import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/profile/create",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          // Check if user exists in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            console.log("User not found:", credentials.email);
            return null;
          }

          // Verify password with bcryptjs
          const bcrypt = require('bcryptjs');
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email);
            return null;
          }

          console.log("User authenticated:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl: nextAuthBaseUrl }) {
      const actualBaseUrl = nextAuthBaseUrl || baseUrl;
      console.log("[REDIRECT] url:", url, "baseUrl:", actualBaseUrl);
      
      // If URL is the signin URL, don't redirect to it (loop prevention)
      if (url.includes('/api/auth/signin') || url.includes('/api/auth/callback')) {
        console.log("[REDIRECT] Intercepted auth URL, redirecting to /feed");
        return `${actualBaseUrl}/feed`;
      }
      
      // If the URL is just the base URL (no path), redirect to /feed
      if (url === actualBaseUrl || url === `${actualBaseUrl}/`) {
        console.log("[REDIRECT] Base URL only, redirecting to /feed");
        return `${actualBaseUrl}/feed`;
      }
      
      // If URL contains /feed, /profile, or /dashboard, keep it
      if (url.includes('/feed') || url.includes('/profile') || url.includes('/dashboard')) {
        console.log("[REDIRECT] Dashboard path found, keeping URL");
        return url;
      }
      
      // If URL starts with baseUrl and has a path, keep it
      if (url.startsWith(actualBaseUrl + '/')) {
        const path = url.slice(actualBaseUrl.length);
        console.log("[REDIRECT] Absolute URL with path:", path);
        if (path && path !== '/' && path !== '') {
          return url;
        }
      }
      
      // Default: redirect to /feed
      console.log("[REDIRECT] Default case, redirecting to /feed");
      return `${actualBaseUrl}/feed`;
    },
    async signIn({ user, account }) {
      console.log("[SIGNIN CALLBACK] User:", user?.email, "Provider:", account?.provider);
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
  },
};
