/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  dialect: "singlestore",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    port: env.SINGLESTORE_PORT,
    database: env.SINGLESTORE_DATABASE_NAME,
    ssl: {
      rejectUnauthorized: true
    },
  },
});
