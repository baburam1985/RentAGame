import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartDrawer from "./CartDrawer";

const mockItems = [
  { gameName: "Giant Jenga", pricePerDay: 35, days: 1 },
  { gameName: "Cornhole Set", pricePerDay: 35, days: 1 },
];

describe("CartDrawer", () => {
  it("AC-1: renders a list of items when passed a non-empty items prop", () => {
    render(
      <CartDrawer items={mockItems} onRemove={vi.fn()} isOpen={true} />
    );
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("AC-2: each item in the list displays the gameName", () => {
    render(
      <CartDrawer items={mockItems} onRemove={vi.fn()} isOpen={true} />
    );
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
  });

  it("AC-3: displays a total equal to the sum of pricePerDay × days across all items", () => {
    render(
      <CartDrawer items={mockItems} onRemove={vi.fn()} isOpen={true} />
    );
    expect(screen.getByText(/\$70/)).toBeInTheDocument();
  });

  it("AC-4: clicking the Remove button calls onRemove with the item index", async () => {
    const onRemove = vi.fn();
    render(
      <CartDrawer items={mockItems} onRemove={onRemove} isOpen={true} />
    );
    const user = userEvent.setup();
    await user.click(screen.getAllByRole("button", { name: /remove/i })[0]);
    expect(onRemove).toHaveBeenCalledWith(0);
  });
});
