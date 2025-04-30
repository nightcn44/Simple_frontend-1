"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/profile"
            className="text-xl font-bold hover:text-yellow-300"
          >
            Profile
          </Link>
          <ul className="flex gap-4">
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="hover:text-red-400">
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="hover:text-blue-400">
                    Login
                  </Link>
                  <Link href="/register" className="hover:text-blue-400">
                    Register
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
