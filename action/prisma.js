import { PrismaClient } from '@prisma/client';


export default async function Prisma() {    
    const prisma = new PrismaClient();
    const allUsers = await prisma.users.findMany();
    return {
        props: {
            users: allUsers,
        },
    };
}