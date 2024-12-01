import { createInsertSchema } from "drizzle-valibot";
import { categories } from "../db/categories";

export const insertCategorySchema = createInsertSchema(categories);
