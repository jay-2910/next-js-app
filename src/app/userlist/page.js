import { getAllUsers } from '@/lib/prisma';

export default async function Page() {
    const users = await getAllUsers();
    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.first_name}</li>
                ))}
            </ul>
        </div>
    );

    /* return <UsersList users={users} />; */
}
