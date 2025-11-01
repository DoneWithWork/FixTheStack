import { pgEnum } from "drizzle-orm/pg-core"

export const roles = pgEnum("roles", ["educator", "student", "admin"])
export const apiKeyTypes = pgEnum("api_key_types", ["data_read", "data_write", "full_access"])
export const plans = pgEnum("plans", ["free", "power", "enterprise"])
export const deviceStatus = pgEnum("device_status", ["online", "offline", "error"])