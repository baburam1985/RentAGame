"use client";

import Link from "next/link";

export type Order = {
  id: string;
  gameName: string;
  eventDate: string;
  returnDate: string;
  totalPrice: number;
  status: "confirmed";
  createdAt: string;
};

type Props = {
  orders: Order[];
};

export default function OrderHistory({ orders }: Props) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No orders yet.</p>
        <Link
          href="/"
          className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Browse Games
        </Link>
      </div>
    );
  }

  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 pr-4 font-semibold text-gray-700">Order #</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">Game</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">Dates</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">Total</th>
            <th className="py-3 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((order) => (
            <tr key={order.id} className="border-b border-gray-100">
              <td className="py-3 pr-4 text-gray-900 font-mono">{order.id}</td>
              <td className="py-3 pr-4 text-gray-900">{order.gameName}</td>
              <td className="py-3 pr-4 text-gray-600">
                {order.eventDate} – {order.returnDate}
              </td>
              <td className="py-3 pr-4 text-gray-900">${order.totalPrice}</td>
              <td className="py-3">
                <span className="inline-block rounded-full bg-green-100 text-green-800 px-3 py-0.5 text-xs font-semibold">
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
