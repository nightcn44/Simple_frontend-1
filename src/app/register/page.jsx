"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import axios from "../utils/api"; // Import Axios Instance ที่เราสร้างไว้

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages
    setLoading(true);

    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/register", form); // ใช้ Instance ที่สร้าง

      setMessage("✅ Register success! You can now login.");
      setLoading(false);
      setForm({ username: "", email: "", password: "" }); // Clear form after successful registration
    } catch (error) {
      setError(`❌ ${error.response?.data?.message || error.message}`); // Default to err.message
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center border-b border-white/70 text-white py-2">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
              />
            </label>

            <label className="flex items-center border-b border-white/70 text-white py-2">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m8 0a4 4 0 00-8 0m8 0a4 4 0 01-8 0"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
              />
            </label>

            <label className="flex items-center border-b border-white/70 text-white py-2">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0-6a4 4 0 110 8 4 4 0 010-8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
            {message && (
              <p className="mt-2 text-sm text-green-500 text-center">
                {message}
              </p>
            )}
          </form>
          <hr className="my-4" />
          <p className="text-center text-white">
            already have an account? go to{" "}
            <Link className="text-black hover:underline" href="/login">
              login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
