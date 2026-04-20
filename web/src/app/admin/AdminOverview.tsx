"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  gameName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "fulfilled" | "cancelled";
  createdAt: string;
};

type DashboardData = {
  totalRevenue: number;
  activeRentals: number;
  totalCustomers: number;
  mostPopularGame: string;
  ordersPerGame: Array<{ game: string; count: number }>;
  recentOrders: Order[];
};

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("rg_orders");
    if (!stored) return [];
    return JSON.parse(stored) as Order[];
  } catch {
    return [];
  }
}

function loadCustomerCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem("rg_users");
    if (stored) {
      const users = JSON.parse(stored) as unknown[];
      return users.length;
    }
    // Fallback: count unique customer emails from orders
    return 0;
  } catch {
    return 0;
  }
}

function computeDashboard(): DashboardData {
  const orders = loadOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const activeRentals = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length;

  // Count unique customers from orders
  const uniqueEmails = new Set(orders.map((o) => o.customerEmail));
  const storedCustomers = loadCustomerCount();
  const totalCustomers = storedCustomers > 0 ? storedCustomers : uniqueEmails.size;

  // Most popular game
  const gameCounts: Record<string, number> = {};
  for (const order of orders) {
    gameCounts[order.gameName] = (gameCounts[order.gameName] ?? 0) + 1;
  }
  const mostPopularGame =
    Object.entries(gameCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  // Orders per game (sorted by count descending)
  const ordersPerGame = Object.entries(gameCounts)
    .map(([game, count]) => ({ game, count }))
    .sort((a, b) => b.count - a.count);

  // Recent orders: last 5, sorted by createdAt descending
  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return {
    totalRevenue,
    activeRentals,
    totalCustomers,
    mostPopularGame,
    ordersPerGame,
    recentOrders,
  };
}

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminOverview() {
  const [data, setData] = useState<DashboardData>(() => computeDashboard());

  const refresh = useCallback(() => {
    setData(computeDashboard());
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 30_000);
    return () => clearInterval(interval);
  }, [refresh]);

  const maxBarValue = Math.max(...data.ordersPerGame.map((g) => g.count), 1);
  const hasOrders = data.recentOrders.length > 0;

  return (
    <div className="min-h-screen bg-[#fffde1] p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-gray-900">${data.totalRevenue}</p>
        </div>

        {/* Active Rentals */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Active Rentals
          </p>
          <p className="text-3xl font-bold text-blue-800">{data.activeRentals}</p>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Total Customers
          </p>
          <p className="text-3xl font-bold text-gray-900">{data.totalCustomers}</p>
        </div>

        {/* Most Popular Game */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Most Popular Game
          </p>
          <p className="text-lg font-bold text-yellow-600 truncate">
            {data.mostPopularGame}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      {data.ordersPerGame.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Orders Per Game</h2>
          <div className="space-y-3">
            {data.ordersPerGame.map(({ game, count }) => {
              const barWidth = `${Math.round((count / maxBarValue) * 100)}%`;
              return (
                <div key={game} className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden" title={game}>
                    <div
                      role="meter"
                      aria-label={`${game}: ${count} orders`}
                      aria-valuenow={count}
                      aria-valuemin={0}
                      aria-valuemax={maxBarValue}
                      className="bg-blue-900 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: barWidth }}
                    >
                      <span className="text-xs font-semibold text-white">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-blue-800 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            View all →
          </Link>
        </div>

        {!hasOrders ? (
          <p className="text-gray-400 text-sm text-center py-8">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Order #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-3 py-2 text-gray-700">{order.customerName}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500 text-xs">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
