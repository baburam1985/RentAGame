import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderHistory from "./OrderHistory";
import RentalForm from "./RentalForm";

export type Order = {
  id: string;
  gameName: string;
  eventDate: string;
  returnDate: string;
  totalPrice: number;
  status: "confirmed";
  createdAt: string;
};

const sampleOrders: Order[] = [
  {
    id: "A1B2C3D4",
    gameName: "Giant Jenga",
    eventDate: "2026-07-04",
    returnDate: "2026-07-06",
    totalPrice: 90,
    status: "confirmed",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "E5F6G7H8",
    gameName: "Bocce Ball Set",
    eventDate: "2026-08-10",
    returnDate: "2026-08-12",
    totalPrice: 70,
    status: "confirmed",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
];

describe("OrderHistory", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("AC-1: renders table with column headers Order #, Game, Dates, Total, Status for non-empty orders", () => {
    render(<OrderHistory orders={sampleOrders} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Order #")).toBeInTheDocument();
    expect(screen.getByText("Game")).toBeInTheDocument();
    expect(screen.getByText("Dates")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("AC-2: each row displays order id, gameName, date range, totalPrice, and status", () => {
    render(<OrderHistory orders={sampleOrders} />);
    expect(screen.getByText("A1B2C3D4")).toBeInTheDocument();
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("2026-07-04 – 2026-07-06")).toBeInTheDocument();
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("AC-3: empty orders array renders Browse Games link instead of table", () => {
    render(<OrderHistory orders={[]} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse games/i })).toBeInTheDocument();
  });

  it("AC-4: orders displayed in reverse chronological order — later createdAt appears first in DOM", () => {
    const earlierOrder: Order = {
      id: "A1B2C3D4",
      gameName: "Giant Jenga",
      eventDate: "2026-07-04",
      returnDate: "2026-07-06",
      totalPrice: 90,
      status: "confirmed",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    const laterOrder: Order = {
      id: "E5F6G7H8",
      gameName: "Bocce Ball Set",
      eventDate: "2026-08-10",
      returnDate: "2026-08-12",
      totalPrice: 70,
      status: "confirmed",
      createdAt: "2026-08-01T10:00:00.000Z",
    };
    render(<OrderHistory orders={[earlierOrder, laterOrder]} />);
    const rows = screen.getAllByRole("row");
    // rows[0] is header row, rows[1] should be laterOrder (E5F6G7H8), rows[2] earlierOrder (A1B2C3D4)
    expect(rows[1]).toHaveTextContent("E5F6G7H8");
    expect(rows[2]).toHaveTextContent("A1B2C3D4");
  });

  it("AC-5: status cell contains confirmed for orders with status confirmed", () => {
    render(<OrderHistory orders={sampleOrders} />);
    const statusCells = screen.getAllByText("confirmed");
    expect(statusCells.length).toBeGreaterThan(0);
    statusCells.forEach((cell) => expect(cell).toBeInTheDocument());
  });

  it("AC-6: RentalForm submit saves object with status confirmed to rg_orders in localStorage", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Your Name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/Email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/Phone/i), "5551234567");
    await userEvent.type(screen.getByLabelText(/Event Address/i), "123 Main St");
    const gamesField = document.getElementById("games") as HTMLTextAreaElement;
    await userEvent.clear(gamesField);
    await userEvent.type(gamesField, "Giant Jenga");
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-04");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-06");
    await userEvent.click(screen.getByText("Send Rental Request"));
    await waitFor(() => {
      const stored = localStorage.getItem("rg_orders");
      expect(stored).not.toBeNull();
      const orders = JSON.parse(stored!);
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[orders.length - 1].status).toBe("confirmed");
    });
  });
});
