import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameGrid from "./GameGrid";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function renderGrid(props: {
  activeCategory?: string;
  searchQuery?: string;
  selectedPlayerCounts?: string[];
}) {
  return render(
    <CartProvider>
      <GameGrid
        activeCategory={props.activeCategory ?? "All"}
        searchQuery={props.searchQuery}
        selectedPlayerCounts={props.selectedPlayerCounts}
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

describe("GameGrid — player count filtering", () => {
  it("no player chips selected shows all games", () => {
    renderGrid({ selectedPlayerCounts: [] });
    // Giant Jenga (2–10), Cornhole Set (2–4), Bocce Ball (2–8) should all be visible
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Bocce Ball Set")).toBeInTheDocument();
  });

  it("selecting chip '2' shows only games that support 2 players", () => {
    renderGrid({ selectedPlayerCounts: ["2"] });
    // Giant Connect Four: "2 players" — should appear
    expect(screen.getByText("Giant Connect Four")).toBeInTheDocument();
    // Giant Jenga: "2–10 players" — should appear
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    // Agility Cone Set: "4–20+ players" — does NOT include 2 — should not appear
    expect(screen.queryByText("Agility Cone Set")).not.toBeInTheDocument();
  });

  it("selecting chip '4' shows only games that support 4 players", () => {
    renderGrid({ selectedPlayerCounts: ["4"] });
    // Spikeball Set: "4 players (2v2)" — should appear
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
    // Cornhole Set: "2–4 players" — should appear
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    // Giant Connect Four: "2 players" — does NOT include 4 — should not appear
    expect(screen.queryByText("Giant Connect Four")).not.toBeInTheDocument();
  });

  it("selecting chip '8+' shows only games that support 8 or more players", () => {
    renderGrid({ selectedPlayerCounts: ["8+"] });
    // Giant Jenga: "2–10 players" — supports 8+ — should appear
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    // Agility Cone Set: "4–20+ players" — supports 8+ — should appear
    expect(screen.getByText("Agility Cone Set")).toBeInTheDocument();
    // Cornhole Set: "2–4 players" — does NOT reach 8 — should not appear
    expect(screen.queryByText("Cornhole Set")).not.toBeInTheDocument();
    // Bocce Ball: "2–8 players" — includes 8 — should appear
    expect(screen.getByText("Bocce Ball Set")).toBeInTheDocument();
  });

  it("multiple chips use OR logic — shows games matching any selected count", () => {
    renderGrid({ selectedPlayerCounts: ["2", "4"] });
    // Giant Connect Four: "2 players" — matches chip 2
    expect(screen.getByText("Giant Connect Four")).toBeInTheDocument();
    // Spikeball Set: "4 players (2v2)" — matches chip 4
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
    // Both Giant Jenga (2–10) matches chip 2, and Cornhole (2–4) matches both
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
  });

  it("player filter works simultaneously with other active filters", () => {
    // Category filter: Lawn Games + player chip 2
    renderGrid({
      activeCategory: "Lawn Games",
      selectedPlayerCounts: ["2"],
    });
    // Giant Jenga is Lawn Games and supports 2 players — should appear
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    // Bocce Ball is Team Games — excluded by category
    expect(screen.queryByText("Bocce Ball Set")).not.toBeInTheDocument();
  });
});
