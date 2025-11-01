"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { apiKeys } from "@/db/schema/tables/apiKeys";
import { createApiKeySchema } from "@/lib/schemas";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
export async function createNewApiKey(prevState: unknown, values: z.infer<typeof createApiKeySchema>) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            redirect("/signin");
        }

        const parsed = createApiKeySchema.safeParse(values);

        if (!parsed.success) {
            return { success: false, errors: z.treeifyError(parsed.error) }
        }
        const { label, type } = parsed.data;

        const { rawKey, hashedKey } = await newKey();

        const newApiKey = await db.insert(apiKeys).values({
            label,
            type,
            key: hashedKey,
            userId: session.user.id!
        })
        if (!newApiKey) throw new Error("Failed to save api key in db")
        updateTag(`user_apiKeys_${session.user.id!}`)
        return { success: true, key: rawKey }
    }
    catch (err) {
        if (typeof err === "string") {
            console.error(`Error in creating new api key: `, err)
        } else if (err instanceof Error) {
            console.error(`Error in creating new api key: `, err.message)

        }
        return { success: false, error: "Failed to create new api key!" }
    }

}

export async function deleteApiKey(prevState: unknown, id: string) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            redirect("/signin");
        }

        const deletedApiKey = await db.delete(apiKeys).where(
            eq(apiKeys.userId, session.user.id!)
        )
        if (!deletedApiKey) throw new Error("Failed to delete key")
        updateTag(`user_apiKeys_${session.user.id!}`)

        return { success: true }
    }
    catch (err) {
        if (typeof err === "string") {
            console.error(`Error in creating new api key: `, err)
        } else if (err instanceof Error) {
            console.error(`Error in creating new api key: `, err.message)

        }
        return { success: false, error: "Failed to delete api key!" }
    }


}


async function newKey() {
    const rawKey = `fts_${crypto.randomBytes(24).toString("hex")}`;
    const hash = crypto.createHash('sha256');
    hash.update(rawKey);
    const hashedKey = hash.digest("hex");

    return { rawKey, hashedKey };
}
async function compareKeys(hashedKey: string, dbKey: string) {
    return hashedKey === dbKey;
}