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

function renderGridWithPrice(props: {
  activeCategory?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return render(
    <CartProvider>
      <GameGrid
        activeCategory={props.activeCategory ?? "All"}
        searchQuery={props.searchQuery}
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
      />
    </CartProvider>
  );
}

describe("GameGrid — price range filtering", () => {
  it("hides games below minPrice", () => {
    // $30 min: Agility Cone ($20), Horseshoes ($25), KanJam ($25), Ladder Toss ($25) should be hidden
    renderGridWithPrice({ minPrice: 30, maxPrice: 55 });
    expect(screen.queryByText("Agility Cone Set")).not.toBeInTheDocument();
    expect(screen.queryByText("Horseshoes Set")).not.toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
  });

  it("hides games above maxPrice", () => {
    // $40 max: Giant Jenga ($45) and Giant Chess Set ($55) should be hidden
    renderGridWithPrice({ minPrice: 20, maxPrice: 40 });
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
    expect(screen.queryByText("Giant Chess Set")).not.toBeInTheDocument();
    expect(screen.getByText("Giant Connect Four")).toBeInTheDocument();
  });

  it("shows all games when minPrice=20 and maxPrice=55 (full range)", () => {
    renderGridWithPrice({ minPrice: 20, maxPrice: 55 });
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Agility Cone Set")).toBeInTheDocument();
    expect(screen.getByText("Giant Chess Set")).toBeInTheDocument();
  });

  it("shows no games and 'No games found' when range matches nothing", () => {
    // No game costs exactly $99
    renderGridWithPrice({ minPrice: 99, maxPrice: 100 });
    expect(screen.getByText(/no games found/i)).toBeInTheDocument();
  });

  it("price filter works simultaneously with the category filter", () => {
    // Lawn Games: Horseshoes ($25), Cornhole ($35), Giant Jenga ($45), Giant Chess ($55)
    // With min=$35: Cornhole ($35), Giant Jenga ($45), Giant Chess ($55)
    renderGridWithPrice({ activeCategory: "Lawn Games", minPrice: 35, maxPrice: 55 });
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.queryByText("Horseshoes Set")).not.toBeInTheDocument();
    expect(screen.queryByText("Agility Cone Set")).not.toBeInTheDocument();
  });

  it("price filter works simultaneously with the search filter", () => {
    // "set" matches many games; with max=$35, Giant Chess ($55) should be hidden
    renderGridWithPrice({ searchQuery: "set", minPrice: 20, maxPrice: 35 });
    expect(screen.queryByText("Giant Chess Set")).not.toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
  });
});
