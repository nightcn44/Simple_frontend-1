"use client";

import Link from "next/link";
import Profile from "../components/Profile";

export default function ProfilePage() {
  return (
    <div>
      <Profile></Profile>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 p-8 rounded shadow-md w-full max-w-md">
          <div className="text-center text-white py-3">
            <Link
              href="/getallusers"
              className="text-xl font-bold hover:text-yellow-300"
            >
              GetAllUsers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
