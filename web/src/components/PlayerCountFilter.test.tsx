import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayerCountFilter from "./PlayerCountFilter";

const CHIPS = ["2", "4", "6", "8+"];

describe("PlayerCountFilter", () => {
  it("renders four player count chips: 2, 4, 6, 8+", () => {
    render(
      <PlayerCountFilter selectedCounts={[]} onCountsChange={() => {}} />
    );
    CHIPS.forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("clicking a chip toggles it active", async () => {
    const onChange = vi.fn();
    render(
      <PlayerCountFilter selectedCounts={[]} onCountsChange={onChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onChange).toHaveBeenCalledWith(["4"]);
  });

  it("clicking an active chip deactivates it", async () => {
    const onChange = vi.fn();
    render(
      <PlayerCountFilter selectedCounts={["4"]} onCountsChange={onChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("multiple chips can be active simultaneously", async () => {
    const onChange = vi.fn();
    render(
      <PlayerCountFilter selectedCounts={["2"]} onCountsChange={onChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onChange).toHaveBeenCalledWith(["2", "4"]);
  });

  it("active chips have aria-pressed=true", () => {
    render(
      <PlayerCountFilter selectedCounts={["4", "6"]} onCountsChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: "4" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "6" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("inactive chips have aria-pressed=false", () => {
    render(
      <PlayerCountFilter selectedCounts={["4"]} onCountsChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "8+" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });
});
