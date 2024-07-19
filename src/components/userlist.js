"use client";

export default function UsersList({ users }) {
    console.log(users)
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
}
