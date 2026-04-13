import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameGrid from "./GameGrid";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function renderGrid(props: { activeCategory?: string; searchQuery?: string }) {
  return render(
    <CartProvider>
      <GameGrid activeCategory={props.activeCategory ?? "All"} searchQuery={props.searchQuery} />
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
