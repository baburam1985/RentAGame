import { describe, it, expect } from "vitest";
import { games } from "@/data/games";

describe("smoke", () => {
  it("games catalog has at least 8 entries", () => {
    expect(games.length).toBeGreaterThanOrEqual(8);
  });

  it("every game has required fields", () => {
    for (const game of games) {
      expect(game.id).toBeTruthy();
      expect(game.name).toBeTruthy();
      expect(game.pricePerDay).toBeGreaterThan(0);
    }
  });
});
