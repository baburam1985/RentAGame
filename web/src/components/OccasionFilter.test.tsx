import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OccasionFilter from "./OccasionFilter";

const OCCASIONS = ["Wedding", "Corporate", "Kids Party"] as const;

describe("OccasionFilter", () => {
  it("AC-1: renders three occasion buttons: Wedding, Corporate, Kids Party", () => {
    render(
      <OccasionFilter
        activeOccasion={null}
        onOccasionChange={vi.fn()}
      />
    );
    for (const occasion of OCCASIONS) {
      expect(screen.getByRole("button", { name: occasion })).toBeInTheDocument();
    }
  });

  it("AC-2: active occasion button has aria-pressed=true", () => {
    render(
      <OccasionFilter
        activeOccasion="Wedding"
        onOccasionChange={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: "Wedding" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("AC-3: inactive occasion buttons have aria-pressed=false", () => {
    render(
      <OccasionFilter
        activeOccasion="Wedding"
        onOccasionChange={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: "Corporate" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Kids Party" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("AC-4: clicking an occasion button calls onOccasionChange with that occasion", async () => {
    const onChange = vi.fn();
    render(
      <OccasionFilter
        activeOccasion={null}
        onOccasionChange={onChange}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Wedding" }));
    expect(onChange).toHaveBeenCalledWith("Wedding");
  });

  it("AC-5: clicking the active occasion button calls onOccasionChange with null (deselect)", async () => {
    const onChange = vi.fn();
    render(
      <OccasionFilter
        activeOccasion="Corporate"
        onOccasionChange={onChange}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Corporate" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("AC-6: games.ts Game type has an optional occasions field of type string[]", async () => {
    const { games } = await import("@/data/games");
    // occasions is optional — some games may not have it, but if present it must be string[]
    games.forEach((g) => {
      if (g.occasions !== undefined) {
        expect(Array.isArray(g.occasions)).toBe(true);
        g.occasions.forEach((tag: string) => {
          expect(typeof tag).toBe("string");
        });
      }
    });
  });

  it("AC-7: at least 8 games have occasions tags assigned", async () => {
    const { games } = await import("@/data/games");
    const gamesWithOccasions = games.filter(
      (g) => Array.isArray(g.occasions) && g.occasions.length > 0
    );
    expect(gamesWithOccasions.length).toBeGreaterThanOrEqual(8);
  });
});
