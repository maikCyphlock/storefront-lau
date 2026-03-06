import { count } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "@/lib/db";
import { accounts, sessions, users, verifications } from "@/lib/db/schema";

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000";
const secret =
  process.env.BETTER_AUTH_SECRET ??
  "8f4a2be77c974b1da9f65e1c28c34d5ff31a40d29a0c5b5df3e7c0a18b42f6d1";

export const auth = betterAuth({
  baseURL,
  secret,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.BETTER_AUTH_URL,
  ].filter((value): value is string => Boolean(value)),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const [{ value: existingUsers }] = await db
            .select({ value: count() })
            .from(users);

          const normalizedEmail = user.email.toLowerCase();
          const canSelfRegister =
            existingUsers === 0 ||
            (adminEmail ? normalizedEmail === adminEmail : false);

          if (!canSelfRegister) {
            return false;
          }

          const role =
            existingUsers === 0 || normalizedEmail === adminEmail
              ? "admin"
              : "user";

          return {
            data: {
              ...user,
              role,
            },
          };
        },
      },
    },
  },
});
