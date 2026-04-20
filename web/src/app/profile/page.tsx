"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OrderHistory, { type Order } from "@/components/OrderHistory";

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
  const [orders, setOrders] = useState<Order[]>([]);
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

    const storedOrders = localStorage.getItem("rg_orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders) as Order[]);
      } catch {
        setOrders([]);
      }
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
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white shadow-lg p-8 mb-8">
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
                onKeyDown={handleKeyDown}
                onBlur={saveName}
                autoFocus
                className="text-xl font-bold text-center border-b-2 border-yellow-400 outline-none bg-transparent"
              />
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors cursor-pointer bg-transparent border-0"
              >
                {user.name}
              </button>
            )}

            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs">
              Member since {formatDate(user.createdAt)}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="rounded-2xl bg-white shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
          <OrderHistory orders={orders} />
        </div>
      </div>
    </main>
  );
}
