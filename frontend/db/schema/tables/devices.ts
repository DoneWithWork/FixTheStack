import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { projectGroups } from "./projects";
import { deviceStatus } from "../enums";
import { timestamps } from "./timestamps";

export const devices = pgTable("devices", {
    id: serial().primaryKey().notNull(),
    userId: text()
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    name: text().notNull(),
    description: text(),
    status: deviceStatus().notNull().default("offline"),
    projectGroupId: integer()
        .references(() => projectGroups.id, { onDelete: "cascade" }),
    lastActiveAt: timestamp(),
    ...timestamps,
});

export const deviceRelations = relations(devices, ({ one }) => ({
    user: one(users, {
        fields: [devices.userId],
        references: [users.id],
    }),
    group: one(projectGroups, {
        fields: [devices.projectGroupId],
        references: [projectGroups.id],
    }),
}));
