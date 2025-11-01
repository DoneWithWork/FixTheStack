import { apiKeyTypes } from "@/db/schema/enums";
import z from "zod";

export const createApiKeySchema = z.object({
    label: z.string().min(1, { error: "Label is required" }).max(100, { error: "Label must be less than 100 characters" }).default(""),
    type: z.enum(apiKeyTypes.enumValues),
})