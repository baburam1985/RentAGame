import { describe, it, expect } from "vitest";
import { games, CATEGORIES } from "./games";
import type { Game } from "./games";

const VALID_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

describe("games data", () => {
  it("has at least 8 games", () => {
    expect(games.length).toBeGreaterThanOrEqual(8);
  });

  it("every game has all required fields", () => {
    const requiredFields: (keyof Game)[] = [
      "id",
      "name",
      "category",
      "description",
      "pricePerDay",
      "image",
      "players",
      "dimensions",
    ];
    games.forEach((game) => {
      requiredFields.forEach((field) => {
        expect(game[field], `${game.id} missing ${field}`).toBeDefined();
        expect(game[field], `${game.id}.${field} is empty`).not.toBe("");
      });
    });
  });

  it("all categories are valid enum values", () => {
    games.forEach((game) => {
      expect(
        VALID_CATEGORIES,
        `${game.id} has invalid category: ${game.category}`
      ).toContain(game.category);
    });
  });

  it("all pricePerDay values are positive numbers", () => {
    games.forEach((game) => {
      expect(typeof game.pricePerDay).toBe("number");
      expect(game.pricePerDay).toBeGreaterThan(0);
    });
  });

  it("all game ids are unique", () => {
    const ids = games.map((g) => g.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
