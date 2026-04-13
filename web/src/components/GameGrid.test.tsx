import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameGrid from "./GameGrid";
import type { Game } from "@/data/games";

// Games and their prices (from games.ts):
// Giant Jenga: $45 (Lawn Games)
// Cornhole Set: $35 (Lawn Games)
// Lawn Bowling Set: $40 (Lawn Games)
// Giant 4-in-a-Row: $40 (Party Games)
// English Garden Croquet: $50 (Lawn Games)
// Ladder Toss: $25 (Party Games)
// Bocce Ball Set: $30 (Team Games)
// Spikeball Set: $35 (Team Games)

describe("GameGrid — search filtering", () => {
  it("typing filters games by name in real time", () => {
    render(
      <GameGrid activeCategory="All" searchQuery="jenga" onSelect={() => {}} />
    );
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.queryByText("Cornhole Set")).not.toBeInTheDocument();
  });

  it("typing filters games by description in real time", () => {
    render(
      <GameGrid
        activeCategory="All"
        searchQuery="bean bags"
        onSelect={() => {}}
      />
    );
    // "bean bags" is in Cornhole Set's description
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", () => {
    render(
      <GameGrid activeCategory="All" searchQuery="JENGA" onSelect={() => {}} />
    );
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
  });

  it("search filter works simultaneously with the category filter", () => {
    // "Lawn Bowling Set" is in "Lawn Games"; "Ladder Toss" is in "Party Games"
    // Searching "la" with category "Lawn Games" should show only lawn games matching "la"
    render(
      <GameGrid
        activeCategory="Lawn Games"
        searchQuery="bowling"
        onSelect={() => {}}
      />
    );
    expect(screen.getByText("Lawn Bowling Set")).toBeInTheDocument();
    // Giant Jenga is in Lawn Games but doesn't match "bowling"
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
    // Ladder Toss matches "la" but is not in Lawn Games — should not appear
    expect(screen.queryByText("Ladder Toss")).not.toBeInTheDocument();
  });

  it("zero-results state shows a friendly 'No games found' message", () => {
    render(
      <GameGrid
        activeCategory="All"
        searchQuery="zzzznoexist"
        onSelect={() => {}}
      />
    );
    expect(screen.getByText(/no games found/i)).toBeInTheDocument();
  });

  it("empty search query shows all games for the active category", () => {
    render(
      <GameGrid activeCategory="All" searchQuery="" onSelect={() => {}} />
    );
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
  });
});

// Minimal mock games for deterministic sort order tests
const sortTestGames: Game[] = [
  {
    id: "game-c",
    name: "Cornhole Set",
    category: "Lawn Games",
    description: "A classic cornhole game.",
    pricePerDay: 35,
    image: "https://example.com/cornhole.jpg",
    players: "2–4 players",
    dimensions: "4 ft × 2 ft",
  },
  {
    id: "game-a",
    name: "Bocce Ball Set",
    category: "Team Games",
    description: "A classic bocce game.",
    pricePerDay: 30,
    image: "https://example.com/bocce.jpg",
    players: "2–8 players",
    dimensions: "Standard court",
  },
  {
    id: "game-b",
    name: "Giant Jenga",
    category: "Lawn Games",
    description: "A giant stacking game.",
    pricePerDay: 45,
    image: "https://example.com/jenga.jpg",
    players: "2–10 players",
    dimensions: "4 ft tall",
  },
];

function getSortedCardNames(): string[] {
  return screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent ?? "");
}

describe("GameGrid — sorting", () => {
  it("Default selection is Featured (original games order preserved)", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        games={sortTestGames}
        sortOrder="featured"
      />
    );
    expect(getSortedCardNames()).toEqual(["Cornhole Set", "Bocce Ball Set", "Giant Jenga"]);
  });

  it("Price: Low to High sorts games ascending by pricePerDay", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        games={sortTestGames}
        sortOrder="price-asc"
      />
    );
    expect(getSortedCardNames()).toEqual(["Bocce Ball Set", "Cornhole Set", "Giant Jenga"]);
  });

  it("Price: High to Low sorts games descending by pricePerDay", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        games={sortTestGames}
        sortOrder="price-desc"
      />
    );
    expect(getSortedCardNames()).toEqual(["Giant Jenga", "Cornhole Set", "Bocce Ball Set"]);
  });

  it("Name: A–Z sorts games alphabetically by name", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        games={sortTestGames}
        sortOrder="name-asc"
      />
    );
    expect(getSortedCardNames()).toEqual(["Bocce Ball Set", "Cornhole Set", "Giant Jenga"]);
  });

  it("Sort applies on top of active category filter", () => {
    render(
      <GameGrid
        activeCategory="Lawn Games"
        onSelect={() => {}}
        games={sortTestGames}
        sortOrder="price-asc"
      />
    );
    // Only Lawn Games: Cornhole (35) and Giant Jenga (45) — sorted price asc
    expect(getSortedCardNames()).toEqual(["Cornhole Set", "Giant Jenga"]);
  });

  it("sortOrder defaults to featured when not provided (backward compat)", () => {
    render(<GameGrid activeCategory="All" onSelect={() => {}} />);
    // Just verify it renders without error and shows some games
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });
});

// AC3: Games outside selected price range are hidden
describe("GameGrid — price range filtering", () => {
  it("hides games outside selected price range", () => {
    // $35–$40 range: Cornhole($35), Lawn Bowling($40), Giant 4-in-a-Row($40), Spikeball($35)
    // excluded: Ladder Toss($25), Bocce Ball($30), Giant Jenga($45), Croquet($50)
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        minPrice={35}
        maxPrice={40}
      />
    );
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Lawn Bowling Set")).toBeInTheDocument();
    expect(screen.getByText("Giant 4-in-a-Row")).toBeInTheDocument();
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
    expect(screen.queryByText("Ladder Toss")).not.toBeInTheDocument();
    expect(screen.queryByText("Bocce Ball Set")).not.toBeInTheDocument();
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
    expect(screen.queryByText("English Garden Croquet")).not.toBeInTheDocument();
  });

  it("shows all games when price range covers full range", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        minPrice={25}
        maxPrice={50}
      />
    );
    expect(screen.getByText("Ladder Toss")).toBeInTheDocument();
    expect(screen.getByText("English Garden Croquet")).toBeInTheDocument();
  });

  it("shows only the single cheapest game at minimum price boundary", () => {
    // Only Ladder Toss at exactly $25
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        minPrice={25}
        maxPrice={25}
      />
    );
    expect(screen.getByText("Ladder Toss")).toBeInTheDocument();
    expect(screen.queryByText("Bocce Ball Set")).not.toBeInTheDocument();
  });

  // AC6: Price filter works simultaneously with search and category filters
  it("price filter works simultaneously with category filter", () => {
    // Lawn Games + $40 max: Giant Jenga($45) excluded, Cornhole($35) included
    render(
      <GameGrid
        activeCategory="Lawn Games"
        onSelect={() => {}}
        minPrice={25}
        maxPrice={40}
      />
    );
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Lawn Bowling Set")).toBeInTheDocument();
    expect(screen.queryByText("Giant Jenga")).not.toBeInTheDocument();
    expect(screen.queryByText("English Garden Croquet")).not.toBeInTheDocument();
  });

  it("price filter works simultaneously with search filter", () => {
    // Search "set" + $25-$35 max: Cornhole Set($35), Bocce Ball Set($30), Spikeball Set($35)
    // Lawn Bowling Set($40) excluded by price, Giant Jenga not matching "set"
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        searchQuery="set"
        minPrice={25}
        maxPrice={35}
      />
    );
    expect(screen.getByText("Cornhole Set")).toBeInTheDocument();
    expect(screen.getByText("Bocce Ball Set")).toBeInTheDocument();
    expect(screen.getByText("Spikeball Set")).toBeInTheDocument();
    expect(screen.queryByText("Lawn Bowling Set")).not.toBeInTheDocument();
  });

  it("shows no games message when price filter excludes all games", () => {
    render(
      <GameGrid
        activeCategory="All"
        onSelect={() => {}}
        minPrice={100}
        maxPrice={200}
      />
    );
    expect(screen.getByText(/no games found/i)).toBeInTheDocument();
  });
});
