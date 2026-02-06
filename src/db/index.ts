import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.ts";

const url = process.env.POSTGRES_URL;
if (!url) throw new Error("POSTGRES_URL environment variable is required");
export const db = drizzle(url, { schema });
