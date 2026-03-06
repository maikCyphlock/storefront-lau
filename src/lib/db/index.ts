import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/lib/db/schema";

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.TURSO_DATABASE_URL ??
  "file:local.db";

const authToken =
  process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url: databaseUrl,
  authToken,
});

export const db = drizzle(client, { schema });
export { client as tursoClient };
