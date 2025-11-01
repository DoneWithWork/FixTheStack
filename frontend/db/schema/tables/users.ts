import { boolean, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { roles, plans } from "../enums";
import { timestamps } from "./timestamps";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text().notNull(),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: roles().notNull().default("student"),
    onBoarded: boolean().notNull().default(false),
    lastLogin: timestamp(),
    isActive: boolean().notNull().default(false),
    plans: plans().notNull().default("free"),
    ...timestamps,
});
