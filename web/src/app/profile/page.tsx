"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  name: string;
  email: string;
  createdAt: string;
};

function formatDate(isoString: string): string {
  return isoString.slice(0, 10);
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("rg_user");
    if (!stored) {
      router.push("/login");
      return;
    }
    try {
      const userData = JSON.parse(stored) as UserData;
      setUser(userData);
      setNameInput(userData.name);
    } catch {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveName() {
    if (!user) return;
    const updated = { ...user, name: nameInput };
    localStorage.setItem("rg_user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") saveName();
    if (e.key === "Escape") {
      setNameInput(user?.name ?? "");
      setEditing(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("rg_user");
    router.push("/");
  }

  if (!user) return null;

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen py-16 px-4" style={{ background: "#fffde1" }}>
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl bg-white shadow-lg p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div
              className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl font-bold"
              aria-label={`Avatar for ${user.name}`}
            >
              {initial}
            </div>

            {/* Name (inline editable) */}
            {editing ? (
              <input
                type="text"
                aria-label="Edit name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={saveName}
                onKeyDown={handleKeyDown}
                className="text-xl font-semibold text-center border-b-2 border-blue-500 outline-none bg-transparent"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="text-xl font-semibold text-blue-800 hover:underline cursor-pointer bg-transparent border-none"
              >
                {user.name}
              </button>
            )}
          </div>

          {/* Profile details */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Member since</span>
              <span className="text-gray-800">{formatDate(user.createdAt)}</span>
            </div>
          </div>

          {/* Log out */}
          <button
            onClick={handleLogout}
            className="w-full border border-red-400 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}
