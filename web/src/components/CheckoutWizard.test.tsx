import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutWizard from "./CheckoutWizard";

describe("CheckoutWizard", () => {
  it("renders Step 1 — Date Selection on initial render", () => {
    render(<CheckoutWizard />);
    expect(screen.getByText(/date selection/i)).toBeInTheDocument();
  });

  it("shows a progress indicator with step 1 of 3 initially", () => {
    render(<CheckoutWizard />);
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument();
  });

  it("Next button advances from Step 1 to Contact Info step", async () => {
    const user = userEvent.setup();
    render(<CheckoutWizard />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/contact info/i)).toBeInTheDocument();
  });

  it("Back button on Step 2 returns to Date Selection", async () => {
    const user = userEvent.setup();
    render(<CheckoutWizard />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/date selection/i)).toBeInTheDocument();
  });

  it("form state persists when navigating between steps", async () => {
    const user = userEvent.setup();
    render(<CheckoutWizard />);
    fireEvent.change(screen.getByLabelText(/event date/i), {
      target: { value: "2026-06-15" },
    });
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByLabelText(/event date/i)).toHaveValue("2026-06-15");
  });

  it("Step 1 shows computed rental days and total price from dates", () => {
    render(<CheckoutWizard pricePerDay={10} />);
    fireEvent.change(screen.getByLabelText(/event date/i), {
      target: { value: "2026-06-10" },
    });
    fireEvent.change(screen.getByLabelText(/return date/i), {
      target: { value: "2026-06-13" },
    });
    expect(screen.getByText(/3 days/i)).toBeInTheDocument();
    expect(screen.getByText(/\$30/i)).toBeInTheDocument();
  });

  it("Step 3 shows Review & Confirm heading with Place Order button", async () => {
    const user = userEvent.setup();
    render(<CheckoutWizard />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/review & confirm/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /place order/i })).toBeInTheDocument();
  });

  it("Place Order button submits and shows Order Confirmed success message", async () => {
    const user = userEvent.setup();
    render(<CheckoutWizard />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
  });
});
