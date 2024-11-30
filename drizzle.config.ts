import type { Config } from "drizzle-kit";
import { globbySync } from "globby";
import { join } from "path";

const schemaFiles = globbySync("./src/lib/db/schema/*.ts").map((file) =>
    join(process.cwd(), file)
);

export default {
    schema: schemaFiles,
    out: "./src/lib/drizzle",
    dialect: "sqlite",
    driver: "expo",
    verbose: true,
} satisfies Config;
