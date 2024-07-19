import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
    try {
        const allUsers = await prisma.users.findMany();
        return allUsers;
    } catch (error) { }
    return null;
}

export async function getUser(id) {
    try {
        return await prisma.users.findUnique({
            where: { id },
        });
    } catch (error) { }
    return null;
}
export async function getUserByEmail(email) {
    try {
        return await prisma.users.findUnique({
            where: { email },
        });
    } catch (e) { }
    return null;
}
export async function getAllSettings() {
    try {
        const settings = await prisma.settings.findMany({
            include: {
                setting_translations: true,
            },
        });
        return settings;
    } catch (error) {}
    return null;
}
