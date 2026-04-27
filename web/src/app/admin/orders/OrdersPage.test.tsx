import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import OrdersPage from "./OrdersPage";

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

function seedOrders(orders: Order[]) {
  localStorage.setItem("rg_orders", JSON.stringify(orders));
}

const mockOrders: Order[] = [
  {
    id: "ABC12345",
    customerName: "Alice Smith",
    customerEmail: "alice@example.com",
    gameName: "Giant Jenga",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    totalPrice: 90,
    status: "pending",
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "DEF67890",
    customerName: "Bob Jones",
    customerEmail: "bob@example.com",
    gameName: "Cornhole Set",
    startDate: "2026-05-05",
    endDate: "2026-05-06",
    totalPrice: 35,
    status: "confirmed",
    createdAt: "2026-04-11T10:00:00Z",
  },
];

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("OrdersPage", () => {
  it("renders all orders from localStorage", () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    expect(screen.getByText("ABC12345")).toBeInTheDocument();
    expect(screen.getByText("DEF67890")).toBeInTheDocument();
  });

  it("shows empty state when no orders exist", () => {
    render(<OrdersPage />);
    expect(screen.getByText(/no orders/i)).toBeInTheDocument();
  });

  it("shows table column headers", () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    expect(screen.getByRole("columnheader", { name: /order/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /customer/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /game/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /total/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /status/i })).toBeInTheDocument();
  });

  it("shows aggregate stats at top: Total Orders, Total Revenue, Pending Count", () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    expect(screen.getByText(/total orders/i)).toBeInTheDocument();
    expect(screen.getByText(/total revenue/i)).toBeInTheDocument();
    // Use getAllByText to handle "Pending" appearing in both the stat label and filter option
    expect(screen.getAllByText(/pending/i).length).toBeGreaterThanOrEqual(1);
    // Total orders = 2
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows status dropdown for each order", () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    // 2 row selects + 1 filter select = 3 total comboboxes
    const rowSelects = screen.getAllByRole("combobox", { name: /change status for order/i });
    expect(rowSelects.length).toBe(2);
  });

  it("status dropdown has all four status options", () => {
    seedOrders([mockOrders[0]]);
    render(<OrdersPage />);
    // Scope to the row status select using its aria-label
    const select = screen.getByRole("combobox", { name: /change status for order ABC12345/i });
    expect(select).toBeInTheDocument();
    const options = Array.from(select.querySelectorAll("option"));
    const optionTexts = options.map((o) => o.textContent?.toLowerCase());
    expect(optionTexts.some((t) => t?.includes("pending"))).toBe(true);
    expect(optionTexts.some((t) => t?.includes("confirmed"))).toBe(true);
    expect(optionTexts.some((t) => t?.includes("fulfilled"))).toBe(true);
    expect(optionTexts.some((t) => t?.includes("cancelled"))).toBe(true);
  });

  it("changing status persists to localStorage", async () => {
    seedOrders([mockOrders[0]]);
    render(<OrdersPage />);
    // Scope to the row status select using its aria-label
    const select = screen.getByRole("combobox", { name: /change status for order ABC12345/i });
    fireEvent.change(select, { target: { value: "confirmed" } });
    await waitFor(() => {
      const stored = localStorage.getItem("rg_orders");
      expect(stored).not.toBeNull();
      const orders = JSON.parse(stored!) as Order[];
      expect(orders[0].status).toBe("confirmed");
    });
  });

  it("export button is present", () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
  });

  it("filter by status shows only matching orders", async () => {
    seedOrders(mockOrders);
    render(<OrdersPage />);
    // Find the status filter (not the row dropdowns)
    const filterSelect = screen.getByRole("combobox", { name: /filter by status/i });
    fireEvent.change(filterSelect, { target: { value: "pending" } });
    await waitFor(() => {
      expect(screen.getByText("ABC12345")).toBeInTheDocument();
      expect(screen.queryByText("DEF67890")).not.toBeInTheDocument();
    });
  });
});
