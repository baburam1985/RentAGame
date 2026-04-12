import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RentalForm from "./RentalForm";

async function fillRequiredFields(overrides: Record<string, string> = {}) {
  await userEvent.type(screen.getByLabelText(/Your Name/i), overrides.name ?? "Jane Doe");
  await userEvent.type(screen.getByLabelText(/Email/i), overrides.email ?? "jane@example.com");
  await userEvent.type(screen.getByLabelText(/Phone/i), overrides.phone ?? "5551234567");
  await userEvent.type(screen.getByLabelText(/Event Address/i), overrides.address ?? "123 Main St");
  // Games textarea — label contains literal "(s)" so use id selector
  const gamesField = document.getElementById("games") as HTMLTextAreaElement;
  await userEvent.clear(gamesField);
  await userEvent.type(gamesField, overrides.games ?? "Giant Jenga");
  // Dates
  await userEvent.type(screen.getByLabelText(/Event Date/i), overrides.eventDate ?? "2026-07-04");
  await userEvent.type(screen.getByLabelText(/Return Date/i), overrides.returnDate ?? "2026-07-06");
}

describe("RentalForm", () => {
  it("submitting empty form shows validation errors", async () => {
    render(<RentalForm />);
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Phone is required.")).toBeInTheDocument();
  });

  it("shows email format error for invalid email", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Email/i), "not-an-email");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  it("shows date error when return date is before event date", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-10");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-05");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(
      screen.getByText("Return date must be on or after the event date.")
    ).toBeInTheDocument();
  });

  it("shows success message on valid submission", async () => {
    render(<RentalForm />);
    await fillRequiredFields();
    await userEvent.click(screen.getByText("Send Rental Request"));
    await waitFor(() => {
      expect(screen.getByText(/Thanks!/i)).toBeInTheDocument();
    });
  });

  it("defaultGame prop pre-fills Games Wanted field", () => {
    render(<RentalForm defaultGame="Giant Jenga" />);
    const textarea = screen.getByLabelText(/Game\(s\) Wanted/i);
    expect(textarea).toHaveValue("Giant Jenga");
  });
});
