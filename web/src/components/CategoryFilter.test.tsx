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

  it("active category pill has aria-checked=true", () => {
    render(<CategoryFilter activeCategory="Lawn Games" onCategoryChange={() => {}} />);
    const active = screen.getByRole("radio", { name: "Lawn Games" });
    expect(active).toHaveAttribute("aria-checked", "true");
  });

  it("inactive pills have aria-checked=false", () => {
    render(<CategoryFilter activeCategory="All" onCategoryChange={() => {}} />);
    const inactive = screen.getByRole("radio", { name: "Lawn Games" });
    expect(inactive).toHaveAttribute("aria-checked", "false");
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
