import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login" className="d-block">Login</Link>
      <br />
      <br />
      <Link href="/userlist">User List</Link>
    </main>
  );
}
