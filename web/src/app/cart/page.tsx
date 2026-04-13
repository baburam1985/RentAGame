import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart — RentAGame",
  description: "Review your rental cart and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
