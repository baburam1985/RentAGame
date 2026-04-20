import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "./CategoryFilter";

const categories = ["All", "Lawn Games", "Party Games", "Kids Games", "Team Games"];

describe("CategoryFilter", () => {
  it("renders all category pill labels", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it("active category pill has aria-pressed=true", () => {
    render(<CategoryFilter activeCategory="Lawn Games" onCategoryChange={() => {}} />);
    const active = screen.getByText("Lawn Games").closest("button");
    expect(active).toHaveAttribute("aria-pressed", "true");
  });

  it("inactive pills have aria-pressed=false", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    const inactive = screen.getByText("Lawn Games").closest("button");
    expect(inactive).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking a different pill calls onCategoryChange with correct value", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="All" onCategoryChange={onChange} />);
    await userEvent.click(screen.getByText("Party Games"));
    expect(onChange).toHaveBeenCalledWith("Party Games");
  });

  it("clicking the active pill still calls onCategoryChange", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="All" onCategoryChange={onChange} />);
    await userEvent.click(screen.getByText("All"));
    expect(onChange).toHaveBeenCalledWith("All");
  });
});

describe("CategoryFilter — mobile scroll (US-020)", () => {
  it("pill container has overflow-x-auto for horizontal scroll", () => {
    const { container } = render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />
    );
    // The scrollable wrapper element should have overflow-x-auto
    const scrollable = container.querySelector(".overflow-x-auto");
    expect(scrollable).toBeInTheDocument();
  });

  it("pills are in a single non-wrapping flex row (no wrap class)", () => {
    const { container } = render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />
    );
    // The flex container should NOT have flex-wrap
    const flexRow = container.querySelector(".flex");
    expect(flexRow).toBeInTheDocument();
    expect(flexRow?.className).not.toMatch(/flex-wrap/);
  });

  it("each pill has whitespace-nowrap to prevent text wrapping", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    const allButton = screen.getByText("All").closest("button");
    expect(allButton?.className).toMatch(/whitespace-nowrap/);
  });

  it("outer wrapper has 'relative' class to support the fade gradient overlay", () => {
    const { container } = render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />
    );
    // The outermost wrapper should be relative-positioned for the fade pseudo-element
    const outer = container.firstElementChild;
    expect(outer?.className).toMatch(/relative/);
  });

  it("a fade gradient element is rendered after the pill row", () => {
    const { container } = render(
      <CategoryFilter activeCategory="All" onCategoryChange={() => {}} />
    );
    // A gradient overlay element should exist inside the outer wrapper
    const gradientEl = container.querySelector("[data-fade-gradient]");
    expect(gradientEl).toBeInTheDocument();
  });
});
