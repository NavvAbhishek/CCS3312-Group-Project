"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        setError("Please fill all the fields");
        return;
      }
      const response = await axios.post("/api/login", user);
      console.log("Login success", response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setUser({
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Navbar />
      <div className="flex flex-grow justify-center items-center">
        <div className="login-form flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
          <h1 className="mb-10 text-3xl font-bold text-pink">
            {loading ? "⏳ Processing..." : "🔐 Login"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center space-y-4"
          >
            <label className="font-semibold dark:text-black">Enter Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-80 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent dark:bg-white"
            />
            <label className="font-semibold dark:text-black">Enter password:</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-80 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent dark:bg-white"
            />
            <button className="w-80 mt-4 px-4 py-2 bg-pink text-white rounded-lg hover:bg-purple transition-colors">
              Login
            </button>
            <div>
              {error ? (
                <p className="text-sm font-semibold text-red-600">{error}</p>
              ) : (
                <p className="text-sm invisible">a</p>
              )}
              <div className="text-center">
                <p className="mt-4 text-sm dark:text-black">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-pink hover:text-blue-700 font-medium"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
