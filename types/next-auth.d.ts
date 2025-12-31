import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "FARMER" | "STUDENT" | "RESEARCHER" | "COMPANY" | "ENTHUSIAST";
    } & DefaultSession["user"];
  }

  interface User {
    role: "FARMER" | "STUDENT" | "RESEARCHER" | "COMPANY" | "ENTHUSIAST";
  }
}
