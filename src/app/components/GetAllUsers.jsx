"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GetAllUsers = () => {
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
            href="/getallusers"
            className="text-xl font-bold hover:text-yellow-300"
          >
            GetAllUsers
          </Link>
          <ul className="flex gap-4">
            <li>
              <Link href="/profile" className="hover:text-yellow-300">
                Back
              </Link>
            </li>
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
};

export default GetAllUsers;