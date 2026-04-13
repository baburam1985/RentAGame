import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPageClient from "./CartPageClient";
import type { CartItem } from "@/context/CartContext";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mutable state shared across tests
let mockItems: CartItem[] = [];
const mockRemoveItem = vi.fn();
const mockUpdateDays = vi.fn();
const mockClearCart = vi.fn();

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    items: mockItems,
    removeItem: mockRemoveItem,
    updateDays: mockUpdateDays,
    clearCart: mockClearCart,
  }),
}));

const cartItem: CartItem = {
  gameId: "cornhole-set",
  gameName: "Cornhole Set",
  pricePerDay: 25,
  days: 3,
  image: "/cornhole.jpg",
};

describe("CartPageClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("empty state", () => {
    beforeEach(() => {
      mockItems = [];
    });

    it("shows empty state message when cart has no items", () => {
      render(<CartPageClient />);
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("shows Browse Games link in empty state", () => {
      render(<CartPageClient />);
      const link = screen.getByText("Browse Games");
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", "/#catalog");
    });

    it("does not show cart heading in empty state", () => {
      render(<CartPageClient />);
      expect(screen.queryByText("Your Cart")).not.toBeInTheDocument();
    });
  });

  describe("cart with items", () => {
    beforeEach(() => {
      mockItems = [cartItem];
    });

    it("renders the cart heading", () => {
      render(<CartPageClient />);
      expect(screen.getByText("Your Cart")).toBeInTheDocument();
    });

    it("renders the game name", () => {
      render(<CartPageClient />);
      expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    });

    it("renders price per day", () => {
      render(<CartPageClient />);
      expect(screen.getByText("$25/day")).toBeInTheDocument();
    });

    it("renders line total (pricePerDay * days)", () => {
      render(<CartPageClient />);
      // $25 × 3 = $75 — appears as line total and in order summary
      const totals = screen.getAllByText("$75");
      expect(totals.length).toBeGreaterThan(0);
    });

    it("renders the order summary subtotal label", () => {
      render(<CartPageClient />);
      expect(screen.getByText("Subtotal")).toBeInTheDocument();
    });

    it("renders Proceed to Checkout link", () => {
      render(<CartPageClient />);
      const link = screen.getByText("Proceed to Checkout");
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", "/checkout");
    });

    it("calls removeItem when Remove button is clicked", async () => {
      render(<CartPageClient />);
      const removeBtn = screen.getByLabelText("Remove Cornhole Set from cart");
      await userEvent.click(removeBtn);
      expect(mockRemoveItem).toHaveBeenCalledWith("cornhole-set");
    });

    it("calls clearCart when Clear cart button is clicked", async () => {
      render(<CartPageClient />);
      await userEvent.click(screen.getByText("Clear cart"));
      expect(mockClearCart).toHaveBeenCalled();
    });

    it("calls updateDays with incremented value when + is clicked", async () => {
      render(<CartPageClient />);
      const increaseBtn = screen.getByLabelText(
        "Increase days for Cornhole Set"
      );
      await userEvent.click(increaseBtn);
      expect(mockUpdateDays).toHaveBeenCalledWith("cornhole-set", 4);
    });

    it("calls updateDays with decremented value when - is clicked", async () => {
      render(<CartPageClient />);
      const decreaseBtn = screen.getByLabelText(
        "Decrease days for Cornhole Set"
      );
      await userEvent.click(decreaseBtn);
      expect(mockUpdateDays).toHaveBeenCalledWith("cornhole-set", 2);
    });
  });
});
