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

describe("RentalForm — inline date validation (US-019)", () => {
  it("shows 'Start date must be today or later' when event date is in the past (on submit)", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2020-01-01");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(
      screen.getByText("Start date must be today or later")
    ).toBeInTheDocument();
  });

  it("shows 'Start date must be today or later' when event date is in the past (on blur)", async () => {
    render(<RentalForm />);
    const eventDateInput = screen.getByLabelText(/Event Date/i);
    await userEvent.type(eventDateInput, "2020-01-01");
    await userEvent.tab(); // blur event date
    expect(
      screen.getByText("Start date must be today or later")
    ).toBeInTheDocument();
  });

  it("shows 'End date must be after start date' when end date equals start date (on submit)", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-10");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-10");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(
      screen.getByText("End date must be after start date")
    ).toBeInTheDocument();
  });

  it("shows 'End date must be after start date' when end date is before start date (on submit)", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-10");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-05");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(
      screen.getByText("End date must be after start date")
    ).toBeInTheDocument();
  });

  it("shows end date error on blur when end date is before start date", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-10");
    const returnDateInput = screen.getByLabelText(/Return Date/i);
    await userEvent.type(returnDateInput, "2026-07-05");
    await userEvent.tab(); // blur return date
    expect(
      screen.getByText("End date must be after start date")
    ).toBeInTheDocument();
  });

  it("prevents form submission when event date is in the past", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Your Name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/Email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/Phone/i), "5551234567");
    await userEvent.type(screen.getByLabelText(/Event Address/i), "123 Main St");
    const gamesField = document.getElementById("games") as HTMLTextAreaElement;
    await userEvent.type(gamesField, "Giant Jenga");
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2020-01-01");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2020-01-05");
    await userEvent.click(screen.getByText("Send Rental Request"));
    expect(screen.queryByText(/Thanks!/i)).not.toBeInTheDocument();
    expect(
      screen.getByText("Start date must be today or later")
    ).toBeInTheDocument();
  });

  it("event date input has aria-describedby linking to error message", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2020-01-01");
    await userEvent.click(screen.getByText("Send Rental Request"));
    const input = screen.getByLabelText(/Event Date/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).toBeInTheDocument();
    expect(errorEl?.textContent).toMatch(/Start date must be today or later/i);
  });

  it("return date input has aria-describedby linking to error message", async () => {
    render(<RentalForm />);
    await userEvent.type(screen.getByLabelText(/Event Date/i), "2026-07-10");
    await userEvent.type(screen.getByLabelText(/Return Date/i), "2026-07-05");
    await userEvent.click(screen.getByText("Send Rental Request"));
    const input = screen.getByLabelText(/Return Date/i);
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById!);
    expect(errorEl).toBeInTheDocument();
    expect(errorEl?.textContent).toMatch(/End date must be after start date/i);
  });
});
