import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SignupPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("SignupPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("AC-1: renders a form with Name, Email, and Password inputs", () => {
    render(<SignupPage />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("AC-2: submitting with valid values stores { name, email, createdAt } in localStorage under rg_user", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));
    const stored = localStorage.getItem("rg_user");
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.name).toBe("Alice");
    expect(parsed.email).toBe("alice@example.com");
    expect(parsed.createdAt).toBeDefined();
  });

  it("AC-3: invalid email (no @) shows an inline error and does not submit", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(localStorage.getItem("rg_user")).toBeNull();
  });

  it("AC-4: password fewer than 8 characters shows an inline error and does not submit", async () => {
    render(<SignupPage />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "short");
    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(localStorage.getItem("rg_user")).toBeNull();
  });
});
