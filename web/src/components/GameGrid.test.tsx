import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameGrid from "./GameGrid";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function renderGrid(props: { activeCategory?: string; searchQuery?: string; onClearFilters?: () => void }) {
  return render(
    <CartProvider>
      <GameGrid
        activeCategory={props.activeCategory ?? "All"}
        searchQuery={props.searchQuery}
        onClearFilters={props.onClearFilters}
      />
    </CartProvider>
  );
}

describe("GameGrid — search filtering", () => {
  it("typing filters games by name in real time", () => {
    renderGrid({ searchQuery: "jenga" });
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.queryByText("Cornhole Set")).not.toBeInTheDocument();
  });

  it("typing filters games by description in real time", () => {
    renderGrid({ searchQuery: "bean bags" });
    // "bean bags" is in Cornhole Set's description
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", () => {
    renderGrid({ searchQuery: "JENGA" });
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
  });

  it("search filter works simultaneously with the category filter", () => {
    renderGrid({ activeCategory: "Lawn Games", searchQuery: "cornhole" });
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    // Giant Jenga is in Lawn Games but doesn't match "cornhole"
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
    // Bocce Ball is Team Games — should not appear
    expect(screen.queryByText("Bocce Ball Set")).not.toBeInTheDocument();
  });

  it("zero-results state shows a friendly 'No games found' message", () => {
    renderGrid({ searchQuery: "zzzznoexist" });
    expect(screen.getByText(/no games found/i)).toBeInTheDocument();
  });

  it("empty search query shows all games for the active category", () => {
    renderGrid({ searchQuery: "" });
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
  });
});

describe("GameGrid — zero-results empty state CTA", () => {
  it("shows 'Browse all games' button in zero-results state", () => {
    renderGrid({ searchQuery: "zzzznoexist" });
    expect(screen.getByRole("button", { name: /browse all games/i })).toBeInTheDocument();
  });

  it("shows a friendly tip 'Try clearing some filters' in zero-results state", () => {
    renderGrid({ searchQuery: "zzzznoexist" });
    expect(screen.getByText(/try clearing some filters/i)).toBeInTheDocument();
  });

  it("'Browse all games' button calls onClearFilters when clicked", async () => {
    const onClearFilters = vi.fn();
    renderGrid({ searchQuery: "zzzznoexist", onClearFilters });
    const button = screen.getByRole("button", { name: /browse all games/i });
    await userEvent.click(button);
    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });

  it("'Browse all games' button is keyboard accessible (aria-label present)", () => {
    renderGrid({ searchQuery: "zzzznoexist" });
    const button = screen.getByRole("button", { name: /browse all games/i });
    expect(button).toBeInTheDocument();
    // Keyboard accessible means it's a button element (native keyboard support)
    expect(button.tagName.toLowerCase()).toBe("button");
  });

  it("empty state does NOT render when there are results (catalog not empty)", () => {
    renderGrid({ searchQuery: "" });
    expect(screen.queryByRole("button", { name: /browse all games/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/try clearing some filters/i)).not.toBeInTheDocument();
  });
});
