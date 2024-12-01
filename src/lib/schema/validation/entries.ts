import { createInsertSchema } from "drizzle-valibot";
import { entries } from "../db/entries";

export const insertEntrySchema = createInsertSchema(entries);
