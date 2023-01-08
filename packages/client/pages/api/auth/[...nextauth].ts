import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "~/server/prisma";
import { SERVER_ENV } from "~/config/serverEnv";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;

        const userData = await prisma.user.findFirst({
          where: { id: user.id },
        });

        if (userData) {
          session.user.role = userData.role;
        }
      }

      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: SERVER_ENV.GOOGLE_CLIENT_ID,
      clientSecret: SERVER_ENV.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
