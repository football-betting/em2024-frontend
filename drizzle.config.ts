import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schemas/schema.ts",
    out: "./migrations",
    verbose: true,
    strict: true,
} satisfies Config;
