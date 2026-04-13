/**
 * US-024 — Keyboard navigation for category filter and player chip groups
 *
 * Tests the ARIA radio group pattern:
 * - role='radiogroup' on the container
 * - role='radio' on each chip
 * - aria-checked='true' on the active chip
 * - Arrow key navigation within the group
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "./CategoryFilter";
import PlayerCountFilter from "./PlayerCountFilter";

const categories = ["All", "Lawn Games", "Party Games", "Kids Games", "Team Games"];

describe("US-024 — CategoryFilter keyboard navigation (radiogroup)", () => {
  it("category filter container has role='radiogroup'", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("each category chip has role='radio'", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(categories.length);
  });

  it("active chip has aria-checked='true'", () => {
    render(<CategoryFilter activeCategory="Lawn Games" onCategoryChange={() => {}} />);
    const active = screen.getByRole("radio", { name: "Lawn Games" });
    expect(active).toHaveAttribute("aria-checked", "true");
  });

  it("inactive chips have aria-checked='false'", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    const inactive = screen.getByRole("radio", { name: "Lawn Games" });
    expect(inactive).toHaveAttribute("aria-checked", "false");
  });

  it("ArrowRight key moves selection to next chip", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="All" onCategoryChange={onChange} />);
    const allChip = screen.getByRole("radio", { name: "All" });
    allChip.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("Lawn Games");
  });

  it("ArrowLeft key moves selection to previous chip", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="Lawn Games" onCategoryChange={onChange} />);
    const lawnChip = screen.getByRole("radio", { name: "Lawn Games" });
    lawnChip.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenCalledWith("All");
  });

  it("ArrowRight wraps from last chip to first", async () => {
    const onChange = vi.fn();
    const lastCat = categories[categories.length - 1];
    render(<CategoryFilter activeCategory={lastCat} onCategoryChange={onChange} />);
    const lastChip = screen.getByRole("radio", { name: lastCat });
    lastChip.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(categories[0]);
  });
});

describe("US-024 — PlayerCountFilter keyboard navigation (radiogroup)", () => {
  it("player count filter container has role='radiogroup'", () => {
    render(<PlayerCountFilter activeCount="" onCountChange={() => {}} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("each player count chip has role='radio'", () => {
    render(<PlayerCountFilter activeCount="" onCountChange={() => {}} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBeGreaterThan(0);
  });

  it("active chip has aria-checked='true'", () => {
    render(<PlayerCountFilter activeCount="4" onCountChange={() => {}} />);
    const active = screen.getByRole("radio", { name: "4" });
    expect(active).toHaveAttribute("aria-checked", "true");
  });

  it("inactive chips have aria-checked='false'", () => {
    render(<PlayerCountFilter activeCount="" onCountChange={() => {}} />);
    const first = screen.getAllByRole("radio")[0];
    expect(first).toHaveAttribute("aria-checked", "false");
  });

  it("ArrowRight key moves selection to next player count chip", async () => {
    const onChange = vi.fn();
    render(<PlayerCountFilter activeCount="2" onCountChange={onChange} />);
    const chip = screen.getByRole("radio", { name: "2" });
    chip.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalled();
  });
});
