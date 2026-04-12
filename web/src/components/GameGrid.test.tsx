import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameGrid from "./GameGrid";

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
