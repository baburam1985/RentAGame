"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderData = {
  id: string;
  gameName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  email: string;
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rg_orders");
    if (stored) {
      try {
        const orders = JSON.parse(stored) as OrderData[];
        if (Array.isArray(orders) && orders.length > 0) {
          setOrder(orders[orders.length - 1]);
        }
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  return (
    <main className="min-h-screen py-20" style={{ background: "#fffde1" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-gray-200 p-10 shadow-sm text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thanks for your rental request. We will contact you within 24 hours.
          </p>

          {order ? (
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-6 text-left mb-8">
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">Order ID:</dt>
                  <dd className="font-mono font-bold text-gray-900">{order.id}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">Game:</dt>
                  <dd className="text-gray-900">{order.gameName}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">Start Date:</dt>
                  <dd className="text-gray-900">{order.startDate}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">End Date:</dt>
                  <dd className="text-gray-900">{order.endDate}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">Total Price:</dt>
                  <dd className="font-semibold text-gray-900">${order.totalPrice}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-700">Email:</dt>
                  <dd className="text-gray-900">{order.email}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-8">No order details found.</p>
          )}

          <Link
            href="/"
            className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Browse More Games
          </Link>
        </div>
      </div>
    </main>
  );
}
