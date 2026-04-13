import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import AdminOverview from "./AdminOverview";

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

type User = { name: string; email: string; createdAt: string };

const sampleOrders: Order[] = [
  {
    id: "AAA11111",
    customerName: "Alice",
    customerEmail: "alice@example.com",
    gameName: "Giant Jenga",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    totalPrice: 90,
    status: "confirmed",
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "BBB22222",
    customerName: "Bob",
    customerEmail: "bob@example.com",
    gameName: "Cornhole Set",
    startDate: "2026-05-05",
    endDate: "2026-05-06",
    totalPrice: 35,
    status: "fulfilled",
    createdAt: "2026-04-11T10:00:00Z",
  },
  {
    id: "CCC33333",
    customerName: "Carol",
    customerEmail: "carol@example.com",
    gameName: "Giant Jenga",
    startDate: "2026-05-07",
    endDate: "2026-05-08",
    totalPrice: 45,
    status: "pending",
    createdAt: "2026-04-12T10:00:00Z",
  },
];

const sampleUsers: User[] = [
  { name: "Alice", email: "alice@example.com", createdAt: "2026-04-10T10:00:00Z" },
  { name: "Bob", email: "bob@example.com", createdAt: "2026-04-11T10:00:00Z" },
];

function seedData(orders: Order[], users: User[] = []) {
  localStorage.setItem("rg_orders", JSON.stringify(orders));
  if (users.length > 0) {
    // Store users array for KPI (stored individually in rg_user or separately)
    localStorage.setItem("rg_users", JSON.stringify(users));
  }
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("AdminOverview", () => {
  it("renders 4 KPI cards with the correct labels", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    expect(screen.getByText(/total revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/active rentals/i)).toBeInTheDocument();
    expect(screen.getByText(/total customers/i)).toBeInTheDocument();
    expect(screen.getByText(/most popular game/i)).toBeInTheDocument();
  });

  it("shows total revenue from all orders", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    // Total = 90 + 35 + 45 = 170
    expect(screen.getByText(/\$170/)).toBeInTheDocument();
  });

  it("shows active rentals count (pending + confirmed orders)", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    // confirmed (1) + pending (1) = 2 active
    // The '2' for active rentals
    const kpiValues = screen.getAllByText("2");
    expect(kpiValues.length).toBeGreaterThan(0);
  });

  it("shows most popular game name", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    // Giant Jenga appears 2 times vs Cornhole Set 1 time
    expect(screen.getByText(/Giant Jenga/i)).toBeInTheDocument();
  });

  it("renders a bar chart section for orders per game", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    // Chart should have a heading or label
    expect(screen.getByText(/orders per game/i)).toBeInTheDocument();
  });

  it("bar chart uses only CSS or SVG (no canvas element)", () => {
    seedData(sampleOrders);
    const { container } = render(<AdminOverview />);
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("shows Recent Orders section with last 5 orders", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    expect(screen.getByText(/recent orders/i)).toBeInTheDocument();
  });

  it("shows a link to /admin/orders in the Recent Orders section", () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    const links = screen.getAllByRole("link");
    const ordersLink = links.find((l) => l.getAttribute("href") === "/admin/orders");
    expect(ordersLink).toBeInTheDocument();
  });

  it("auto-refreshes data every 30 seconds", async () => {
    seedData(sampleOrders);
    render(<AdminOverview />);
    // Add a new order to localStorage
    const newOrder: Order = {
      id: "DDD44444",
      customerName: "Dave",
      customerEmail: "dave@example.com",
      gameName: "Bocce Ball Set",
      startDate: "2026-05-10",
      endDate: "2026-05-11",
      totalPrice: 30,
      status: "pending",
      createdAt: "2026-04-13T10:00:00Z",
    };
    localStorage.setItem("rg_orders", JSON.stringify([...sampleOrders, newOrder]));

    // Advance timer by 30 seconds
    await act(async () => {
      vi.advanceTimersByTime(30000);
    });

    // Total should now be 170 + 30 = 200
    expect(screen.getByText(/\$200/)).toBeInTheDocument();
  });

  it("shows 'No orders yet' when localStorage is empty", () => {
    render(<AdminOverview />);
    expect(screen.getByText(/no orders/i)).toBeInTheDocument();
  });
});
