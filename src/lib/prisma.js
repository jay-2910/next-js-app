import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
    const allUsers = await prisma.users.findMany();
    return allUsers;
}

export async function getUser(id) {
    const allUsers = await prisma.users.findMany();
    return allUsers;
}