'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const cookie = new Cookies();
// const user_id = cookie.get("id");

export default function NavBar() {
  const router = useRouter();
  const logout = () => {
    cookie.remove("token", { path: "/" });
    router.push("/auth");
  }
  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex justify-end space-x-4">
      {/* <div className="rounded bg-gray-700 px-3 py-2 text-white">
          {user_id}
        </div> */}
        <Link
          href="/home"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          Home
        </Link>
        <Link
          href="/account"
          className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
        >
          Account
        </Link>
        <svg
          onClick={logout}
          className="rounded cursor-pointer w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </nav>
    </header>
  );
}
