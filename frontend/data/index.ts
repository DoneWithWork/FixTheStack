import { db } from '@/db'
import { devices as devicesSchema } from '@/db/schema/tables/devices'
import { apiKeys as apiKeysSchema } from '@/db/schema/tables/apiKeys'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getDevices = cache(async (userId: string) => {
    const devices = await db.query.devices.findMany({
        where: eq(devicesSchema.userId, userId),
    });
    return devices;
})
export const getSingleDevice = cache(async (deviceId: number, userId: string) => {
    const device = await db.query.devices.findFirst({
        where: and(eq(devicesSchema.id, deviceId), eq(devicesSchema.userId, userId)),
    });
    return device;
})
export const getCachedSingleDevice = (deviceId: number, userId: string) => {

    return unstable_cache(
        async () => {
            return await getSingleDevice(deviceId, userId);
        },
        [deviceId.toString(), userId],
        { tags: [`user_device_${userId}_${deviceId}`] }
    )
}
export const getApiKeys = cache(async (userId: string) => {
    const keys = await db.query.apiKeys.findMany({
        where: eq(apiKeysSchema.userId, userId),
    });
    return keys;
})
export const getCachedApiKeys = (userId: string) => {

    return unstable_cache(
        async () => {
            return await getApiKeys(userId);
        },
        [userId],
        { tags: [`user_apiKeys_${userId}`] }
    )

}
export const getCachedDevices = (userId: string) => {

    return unstable_cache(
        async () => {
            return await getDevices(userId);
        },
        [userId],
        { tags: [`user_devices_${userId}`] }
    )

}
