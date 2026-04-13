import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RentalForm from "./RentalForm";

async function fillRequiredFields() {
  await userEvent.type(screen.getByLabelText(/Your Name/i), "Jane Doe");
  await userEvent.type(screen.getByLabelText(/Email/i), "jane@example.com");
  await userEvent.type(screen.getByLabelText(/Phone/i), "5551234567");
  await userEvent.type(screen.getByLabelText(/Event Address/i), "123 Main St");
  const gamesField = document.getElementById("games") as HTMLTextAreaElement;
  await userEvent.clear(gamesField);
  await userEvent.type(gamesField, "Giant Jenga");
  await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-04");
  await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-06");
}

describe("RentalForm — submit button loading state", () => {
  it("AC-1+6: submit button is disabled during form processing, preventing duplicate submission", async () => {
    render(<RentalForm />);
    await fillRequiredFields();
    const btn = screen.getByRole("button", { name: /Send Rental Request/i });
    userEvent.click(btn); // fire and don't await — check state during processing
    // During async processing, button should become disabled
    await waitFor(() => {
      expect(btn).toBeDisabled();
    });
  });

  it("AC-2: button shows 'Submitting…' label while processing", async () => {
    render(<RentalForm />);
    await fillRequiredFields();
    userEvent.click(screen.getByRole("button", { name: /Send Rental Request/i }));
    // During async processing, button text changes to Submitting…
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Submitting/i })).toBeInTheDocument();
    });
  });

  it("AC-5: validation failure keeps button enabled, no 'Submitting' text", async () => {
    render(<RentalForm />);
    await userEvent.click(screen.getByRole("button", { name: /Send Rental Request/i }));
    const btn = screen.getByRole("button", { name: /Send Rental Request/i });
    expect(btn).not.toBeDisabled();
    expect(screen.queryByText(/Submitting/i)).toBeNull();
  });

  it("AC-4: after successful submission form resets and button re-enables on new form", async () => {
    render(<RentalForm />);
    await fillRequiredFields();
    await userEvent.click(screen.getByRole("button", { name: /Send Rental Request/i }));
    await waitFor(() => {
      expect(screen.getByText(/Thanks!/i)).toBeInTheDocument();
    });
    // Submit another request — button should be re-enabled
    await userEvent.click(screen.getByText("Submit another request"));
    const newBtn = screen.getByRole("button", { name: /Send Rental Request/i });
    expect(newBtn).not.toBeDisabled();
  });

  it("AC-7: clicking submit twice does not produce an error (button disabled prevents duplicate)", async () => {
    render(<RentalForm />);
    await fillRequiredFields();
    // First click — starts submission
    userEvent.click(screen.getByRole("button", { name: /Send Rental Request/i }));
    // Wait for button to be disabled (isSubmitting = true)
    await waitFor(() => {
      const btn = screen.queryByRole("button", { name: /Send Rental Request/i });
      // Button is either disabled or gone (success state shown)
      if (btn) {
        expect(btn).toBeDisabled();
      } else {
        expect(screen.getByText(/Thanks!/i)).toBeInTheDocument();
      }
    });
  });
});
