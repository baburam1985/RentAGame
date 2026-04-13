"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

type UserData = { name: string; email: string; createdAt: string; admin?: boolean };

const NAV_LINKS = [
  { label: "Overview", href: "/admin" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("rg_user");
    if (!stored) {
      router.push("/login");
      return;
    }
    try {
      const user = JSON.parse(stored) as UserData;
      if (!user.admin) {
        router.push("/login");
        return;
      }
      setAuthorized(true);
    } catch {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen bg-[#fffde1]">
      {/* Sidebar */}
      <nav className="w-56 bg-blue-900 flex flex-col py-8 px-4 gap-2 shrink-0">
        <p className="text-yellow-400 font-black italic text-lg mb-6 px-2">Admin</p>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-yellow-400 text-blue-900"
                  : "text-white/80 hover:bg-blue-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
