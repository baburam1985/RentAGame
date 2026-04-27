import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// We import the InventoryPage client component directly
import InventoryPage from "./InventoryPage";

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("InventoryPage", () => {
  it("renders all games in a table", () => {
    render(<InventoryPage />);
    // Should show a table/list with game names
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
  });

  it("shows the correct table column headers", () => {
    render(<InventoryPage />);
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /players/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /status/i })).toBeInTheDocument();
  });

  it("shows each game's category in the table", () => {
    render(<InventoryPage />);
    // Giant Jenga is Lawn Games
    const rows = screen.getAllByRole("row");
    // At least one row should contain Lawn Games
    const hasLawnGames = rows.some((row) => row.textContent?.includes("Lawn Games"));
    expect(hasLawnGames).toBe(true);
  });

  it("shows each game's price per day", () => {
    render(<InventoryPage />);
    // Giant Jenga costs $45
    expect(screen.getByDisplayValue("45")).toBeInTheDocument();
  });

  it("inline price editing: clicking price cell shows an input", async () => {
    const user = userEvent.setup();
    render(<InventoryPage />);
    // Find the price input for Giant Jenga (default $45)
    const priceInput = screen.getByDisplayValue("45");
    await user.clear(priceInput);
    await user.type(priceInput, "50");
    fireEvent.blur(priceInput);
    await waitFor(() => {
      expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    });
  });

  it("persists updated price to localStorage on blur", async () => {
    const user = userEvent.setup();
    render(<InventoryPage />);
    const priceInput = screen.getByDisplayValue("45");
    await user.clear(priceInput);
    await user.type(priceInput, "50");
    fireEvent.blur(priceInput);
    await waitFor(() => {
      const stored = localStorage.getItem("rg_inventory");
      expect(stored).not.toBeNull();
      const overrides = JSON.parse(stored!) as Array<{ id: string; pricePerDay: number }>;
      const jenga = overrides.find((o) => o.id === "giant-jenga");
      expect(jenga?.pricePerDay).toBe(50);
    });
  });

  it("shows a status toggle for each game (available by default)", () => {
    render(<InventoryPage />);
    const toggles = screen.getAllByRole("switch");
    expect(toggles.length).toBeGreaterThan(0);
    // All should be checked (available) by default
    toggles.forEach((toggle) => {
      expect(toggle).toBeChecked();
    });
  });

  it("toggling status persists to localStorage", async () => {
    const user = userEvent.setup();
    render(<InventoryPage />);
    const toggles = screen.getAllByRole("switch");
    // Toggle first game's status (Giant Jenga)
    await user.click(toggles[0]);
    await waitFor(() => {
      const stored = localStorage.getItem("rg_inventory");
      expect(stored).not.toBeNull();
      const overrides = JSON.parse(stored!) as Array<{ id: string; hidden: boolean }>;
      const jenga = overrides.find((o) => o.id === "giant-jenga");
      expect(jenga?.hidden).toBe(true);
    });
  });

  it("shows an Edit button for each game", () => {
    render(<InventoryPage />);
    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it("clicking Edit opens a side panel", async () => {
    const user = userEvent.setup();
    render(<InventoryPage />);
    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    await user.click(editButtons[0]);
    // Side panel should appear with game name
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
