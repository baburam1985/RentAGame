"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@rentagame.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  function validate(): boolean {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;

    // Admin login
    if (email === ADMIN_EMAIL) {
      const adminUser = { name: "Admin", email: ADMIN_EMAIL, createdAt: new Date().toISOString(), admin: true };
      localStorage.setItem("rg_user", JSON.stringify(adminUser));
      router.push("/admin");
      return;
    }

    // Regular user login
    const stored = localStorage.getItem("rg_user");
    if (!stored) {
      setAuthError("No account found with that email.");
      return;
    }
    try {
      const userData = JSON.parse(stored) as { name: string; email: string; createdAt: string };
      if (userData.email !== email) {
        setAuthError("No account found with that email.");
        return;
      }
    } catch {
      setAuthError("No account found with that email.");
      return;
    }
    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fffde1] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Log In</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
          </div>
          {authError && <p className="text-red-600 text-sm">{authError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-700 underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
