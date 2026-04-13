import type { Metadata } from "next";
import CheckoutStep1Client from "./CheckoutStep1Client";

export const metadata: Metadata = {
  title: "Checkout — Step 1: Dates & Contact — RentAGame",
  description:
    "Select your rental dates and enter your contact information to continue checkout.",
};

export default function CheckoutPage() {
  return <CheckoutStep1Client />;
}
