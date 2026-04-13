import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import OrderConfirmationPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("OrderConfirmationPage", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "rg_orders",
      JSON.stringify([
        {
          id: "ABC123",
          gameName: "Giant Jenga",
          startDate: "2026-06-01",
          endDate: "2026-06-03",
          totalPrice: 90,
          email: "a@b.com",
        },
      ])
    );
  });

  it("AC-1: renders without error when rg_orders contains at least one order", () => {
    render(<OrderConfirmationPage />);
    expect(document.body).toBeTruthy();
  });

  it("AC-2: displays the id field from the most recent order in rg_orders", () => {
    render(<OrderConfirmationPage />);
    expect(screen.getByText("ABC123")).toBeInTheDocument();
  });

  it("AC-3: displays the gameName field from the most recent order", () => {
    render(<OrderConfirmationPage />);
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
  });

  it("AC-4: renders a Browse More Games link with href '/'", () => {
    render(<OrderConfirmationPage />);
    const link = screen.getByRole("link", { name: "Browse More Games" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
