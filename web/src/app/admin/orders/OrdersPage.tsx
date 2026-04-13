"use client";

import { useState, useEffect } from "react";

export type Order = {
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

type StatusFilter = "all" | Order["status"];

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

function saveOrders(orders: Order[]): void {
  localStorage.setItem("rg_orders", JSON.stringify(orders));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ordersToCSV(orders: Order[]): string {
  const headers = [
    "Order #",
    "Customer Name",
    "Customer Email",
    "Game",
    "Start Date",
    "End Date",
    "Total ($)",
    "Status",
    "Created At",
  ].join(",");
  const rows = orders.map((o) =>
    [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      `"${o.gameName}"`,
      o.startDate,
      o.endDate,
      o.totalPrice,
      o.status,
      o.createdAt,
    ].join(",")
  );
  return [headers, ...rows].join("\n");
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const STATUS_OPTIONS: Array<{ value: Order["status"]; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  function handleStatusChange(orderId: string, newStatus: Order["status"]) {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );
      saveOrders(updated);
      return updated;
    });
  }

  function handleExport() {
    const csv = ordersToCSV(filteredOrders);
    downloadCSV(csv, "orders.csv");
  }

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (startDateFilter && o.createdAt < startDateFilter) return false;
    if (endDateFilter && o.createdAt > endDateFilter + "T23:59:59Z") return false;
    return true;
  });

  // Aggregate stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#fffde1] p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders Management</h1>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${totalRevenue}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="start-date" className="text-sm text-gray-600">
            From:
          </label>
          <input
            id="start-date"
            type="date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="end-date" className="text-sm text-gray-600">
            To:
          </label>
          <input
            id="end-date"
            type="date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={handleExport}
          aria-label="Export orders as CSV"
          className="ml-auto rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found.</p>
          <p className="text-gray-400 text-sm mt-1">
            {orders.length === 0
              ? "Orders will appear here after customers complete checkout."
              : "Try adjusting your filters to see more results."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Order #
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Game
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Dates
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Total
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Created at
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{order.gameName}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {formatDate(order.startDate)} – {formatDate(order.endDate)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ${order.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      aria-label={`Change status for order ${order.id}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as Order["status"])
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
