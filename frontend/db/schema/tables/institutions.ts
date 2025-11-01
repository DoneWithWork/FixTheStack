import { integer, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { plans } from "../enums";
import { timestamps } from "./timestamps";

export const institutions = pgTable("institutions", {
    id: serial().primaryKey().notNull(),
    institutionName: text().notNull().unique(),
    description: text(),
    plan: plans().notNull().default("free"),
    domain: text().notNull().unique(),
    logoUrl: text(),
    ...timestamps,
});

export const usersToInstitutions = pgTable(
    "users_to_institutions",
    {
        userId: text()
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        institutionId: integer()
            .references(() => institutions.id, { onDelete: "cascade" })
            .notNull(),
        ...timestamps,
    },
    (table) => [
        primaryKey({
            columns: [table.userId, table.institutionId],
            name: "user_institution_pk",
        }),
    ]
);

export const usersToInstitutionsRelations = relations(usersToInstitutions, ({ one }) => ({
    user: one(users, {
        fields: [usersToInstitutions.userId],
        references: [users.id],
    }),
    institution: one(institutions, {
        fields: [usersToInstitutions.institutionId],
        references: [institutions.id],
    }),
}));

export const institutionRelations = relations(institutions, ({ many }) => ({
    usersToInstitutions: many(usersToInstitutions),
}));
