import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { timestamps } from "./timestamps";

export const projects = pgTable("projects", {
    id: serial().primaryKey().notNull(),
    userId: text()
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    ...timestamps,
});

export const projectGroups = pgTable("project_groups", {
    id: serial().primaryKey().notNull(),
    projectId: integer()
        .references(() => projects.id, { onDelete: "cascade" })
        .notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: text(),
    ...timestamps,
});

export const projectRelations = relations(projects, ({ one, many }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    groups: many(projectGroups),
}));
