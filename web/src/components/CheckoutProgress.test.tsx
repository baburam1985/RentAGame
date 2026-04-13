import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckoutProgress from "./CheckoutProgress";

const steps = [
  { label: "Cart Review" },
  { label: "Contact Info" },
  { label: "Confirm Order" },
];

describe("CheckoutProgress", () => {
  it("renders the current step label with step number and total", () => {
    render(<CheckoutProgress currentStep={2} steps={steps} />);
    expect(screen.getByText(/Step 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Info/i)).toBeInTheDocument();
  });

  it("marks prior steps as completed", () => {
    render(<CheckoutProgress currentStep={2} steps={steps} />);
    const step1 = screen.getByLabelText(/Step 1 of 3.*completed/i);
    expect(step1).toBeInTheDocument();
  });

  it("does not mark current step or future steps as completed", () => {
    render(<CheckoutProgress currentStep={2} steps={steps} />);
    const step3Label = screen.getByLabelText(/Step 3 of 3/i);
    expect(step3Label.getAttribute("aria-label")).not.toMatch(/completed/i);
  });

  it("has an aria-label of 'Checkout progress' on the container", () => {
    render(<CheckoutProgress currentStep={1} steps={steps} />);
    expect(screen.getByRole("navigation", { name: /checkout progress/i })).toBeInTheDocument();
  });

  it("renders all step nodes", () => {
    render(<CheckoutProgress currentStep={1} steps={steps} />);
    expect(screen.getByLabelText(/Step 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Step 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Step 3 of 3/i)).toBeInTheDocument();
  });

  it("renders step 1 as current on step 1 with no completed steps", () => {
    render(<CheckoutProgress currentStep={1} steps={steps} />);
    const step1 = screen.getByLabelText(/Step 1 of 3/i);
    expect(step1.getAttribute("aria-label")).not.toMatch(/completed/i);
  });
});
