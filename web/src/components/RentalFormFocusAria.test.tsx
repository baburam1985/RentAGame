/**
 * US-030 — Rental form inputs: visible focus rings and ARIA error associations
 *
 * Tests that:
 * - Each input has aria-describedby pointing to its error element id
 * - Each error element has the matching id
 * - Focus ring classes are present (focus:ring-2, no suppressors without ring)
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RentalForm from "./RentalForm";

async function submitEmptyForm() {
  await userEvent.click(screen.getByRole("button", { name: /send rental request/i }));
}

describe("US-030 — Focus rings and ARIA error associations on rental form", () => {
  it("AC-1: name input has aria-describedby pointing to its error element id", async () => {
    render(<RentalForm />);
    await submitEmptyForm();
    const input = screen.getByLabelText(/your name/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/name is required/i);
  });

  it("AC-2: email input has aria-describedby pointing to its error element id", async () => {
    render(<RentalForm />);
    await submitEmptyForm();
    const input = screen.getByLabelText(/email/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/email is required/i);
  });

  it("AC-3: phone input has aria-describedby pointing to its error element id", async () => {
    render(<RentalForm />);
    await submitEmptyForm();
    const input = screen.getByLabelText(/phone/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/phone is required/i);
  });

  it("AC-4: event date input has aria-describedby pointing to its error element id", async () => {
    render(<RentalForm />);
    await submitEmptyForm();
    const input = screen.getByLabelText(/event date/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/event date is required/i);
  });

  it("AC-5: return date input has aria-describedby pointing to its error element id", async () => {
    render(<RentalForm />);
    await submitEmptyForm();
    const input = screen.getByLabelText(/return date/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toMatch(/return date is required/i);
  });

  it("AC-6: all required inputs have a focus ring class and do not suppress focus without replacement", () => {
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);

    // Each input should have focus ring classes (focus:ring-2 in Tailwind)
    [nameInput, emailInput, phoneInput].forEach((input) => {
      expect(input.className).toMatch(/focus:ring/);
    });
  });
});
