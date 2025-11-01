import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { apiKeyTypes } from "../enums";
import { users } from "./users";
import { timestamps } from "./timestamps";

export const apiKeys = pgTable("api_keys", {
    id: serial().primaryKey().notNull(),
    label: varchar({ length: 100 }).notNull(),
    userId: text()
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    key: text().notNull().unique(),
    type: apiKeyTypes().notNull().default("full_access"),
    ...timestamps,
});

export const apiKeyRelations = relations(apiKeys, ({ one }) => ({
    user: one(users, {
        fields: [apiKeys.userId],
        references: [users.id],
    }),
}));
