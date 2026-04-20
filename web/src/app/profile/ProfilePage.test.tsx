import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfilePage from "./page";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/profile",
}));

const mockUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  createdAt: "2026-01-15T00:00:00.000Z",
};

describe("ProfilePage", () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it("AC-1: renders profile UI with name and email when rg_user exists", async () => {
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("AC-2: calls router.push('/login') when rg_user is absent", async () => {
    render(<ProfilePage />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("AC-3: avatar displays first letter of user name as uppercase in a circle", async () => {
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByText("J")).toBeInTheDocument());
    const avatar = screen.getByText("J");
    expect(avatar).toBeInTheDocument();
  });

  it("AC-4: displays full name, email, and member-since date in YYYY-MM-DD format", async () => {
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("2026-01-15")).toBeInTheDocument();
  });

  it("AC-5: clicking the displayed name shows a text input pre-filled with current name", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
    await user.click(screen.getByText("Jane Doe"));
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Jane Doe");
  });

  it("AC-6: pressing Enter saves the new name to rg_user in localStorage and returns to display mode", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
    await user.click(screen.getByText("Jane Doe"));
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "Jane Smith{Enter}");
    await waitFor(() => expect(screen.getByText("Jane Smith")).toBeInTheDocument());
    const stored = JSON.parse(localStorage.getItem("rg_user")!);
    expect(stored.name).toBe("Jane Smith");
  });

  it("AC-7: clicking 'Log out' button removes rg_user from localStorage", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /log out/i }));
    expect(localStorage.getItem("rg_user")).toBeNull();
  });

  it("AC-8: after clicking 'Log out', calls router.push('/')", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify(mockUser));
    render(<ProfilePage />);
    await waitFor(() => expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /log out/i }));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
