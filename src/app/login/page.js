import Login from "@/components/login.js";
import { getAllUsers } from '@/lib/prisma';

export default async function Page() {
    const users = await getAllUsers();

    return <Login users={users} />;
}
