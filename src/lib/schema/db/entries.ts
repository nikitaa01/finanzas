import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const entries = sqliteTable("entries", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    isNecessary: integer("is_necessary", {
        mode: "boolean",
    }).notNull(),
    date: integer("date").notNull(),
    amount: integer("amount").notNull(),
    categoryId: integer("category_id")
        .references(() => categories.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
});

export type EntrySelect = typeof entries.$inferSelect;
export type EntryInsert = typeof entries.$inferInsert;
