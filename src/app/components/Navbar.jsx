"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-yellow-300">
            Home
          </Link>
          <ul className="flex gap-4">
            <Link href="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-400">
              Register
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
