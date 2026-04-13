import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RentalForm from "./RentalForm";

describe("RentalForm — inline on-blur validation", () => {
  it("AC-1: name field shows 'Name is required' error on blur when left empty", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.click(nameInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("AC-2: email field shows 'Enter a valid email address' error on blur if format is invalid", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, "notvalid");
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    });
  });

  it("AC-3: phone field shows 'Enter a valid phone number' on blur when non-empty value has invalid format", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const phoneInput = screen.getByLabelText(/Phone/i);
    await user.type(phoneInput, "abc");
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Enter a valid phone number")).toBeInTheDocument();
    });
  });

  it("AC-4: valid fields show a green indicator on blur", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.type(nameInput, "Jane Doe");
    await user.tab();
    await waitFor(() => {
      expect(nameInput).toHaveClass("border-green-400");
    });
  });

  it("AC-5: error messages disappear in real time as user corrects the field value", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.click(nameInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    await user.type(nameInput, "Jane");
    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    });
  });

  it("AC-6: each error message is linked to its input via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.click(nameInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    const errorEl = screen.getByText("Name is required");
    const errorId = errorEl.getAttribute("id");
    expect(errorId).toBeTruthy();
    expect(nameInput).toHaveAttribute("aria-describedby", errorId);
  });

  it("AC-7: form submission is blocked while any required field has an active validation error", async () => {
    const user = userEvent.setup();
    render(<RentalForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.click(nameInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: /Send Rental Request/i }));
    expect(screen.queryByText(/Request Received/i)).not.toBeInTheDocument();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });
});
