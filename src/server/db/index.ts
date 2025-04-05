import { createClient, type Client } from "@libsql/client";
// import { drizzle } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";

import { env } from "~/env";
// import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ?? createClient({ url: env.DATABASE_URL });
if (env.NODE_ENV !== "production") globalForDb.client = client;

const pool = mysql.createPool(env.SINGLESTORE_DATABASE_URL as string);

export const db = drizzle({ client: pool });
