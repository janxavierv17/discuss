import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./db";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET)
  throw new Error("Define github client ID & client secret in .env");

export const {
  handlers: { GET, POST }, // related to our OAuth setup
  auth, // Whether or not the user is logged in or not
  signOut, // Signs out the user
  signIn, // Signs in the user
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  callbacks: {
    // Usually not needed, here we're fixing a bug in nextauth
    async session({ session, user }: any) {
      if (session && user) session.user.id = user.id;

      return session;
    },
  },
});
