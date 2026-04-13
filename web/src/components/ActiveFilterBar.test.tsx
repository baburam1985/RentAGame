import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ActiveFilterBar from "./ActiveFilterBar";

const defaultProps = {
  activeCategory: "All",
  onCategoryChange: vi.fn(),
  searchQuery: "",
  onSearchChange: vi.fn(),
  sortOrder: "featured",
  onSortChange: vi.fn(),
  onClearAll: vi.fn(),
};

describe("ActiveFilterBar", () => {
  it("renders nothing when all filters are at default values", () => {
    const { container } = render(<ActiveFilterBar {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the bar when search query is active", () => {
    render(<ActiveFilterBar {...defaultProps} searchQuery="jenga" />);
    expect(
      screen.getByRole("region", { name: /active filters/i })
    ).toBeInTheDocument();
  });

  it("shows a chip with the active search query value", () => {
    render(<ActiveFilterBar {...defaultProps} searchQuery="jenga" />);
    expect(screen.getByText(/jenga/i)).toBeInTheDocument();
  });

  it("shows a chip when category filter is not 'All'", () => {
    render(
      <ActiveFilterBar {...defaultProps} activeCategory="Lawn Games" />
    );
    expect(screen.getByText(/lawn games/i)).toBeInTheDocument();
  });

  it("shows a chip with the sort label when sort is not 'featured'", () => {
    render(<ActiveFilterBar {...defaultProps} sortOrder="price-asc" />);
    expect(screen.getByText(/price: low to high/i)).toBeInTheDocument();
  });

  it("clicking a search chip × calls onSearchChange with empty string", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <ActiveFilterBar
        {...defaultProps}
        searchQuery="jenga"
        onSearchChange={onSearchChange}
      />
    );
    await user.click(
      screen.getByRole("button", { name: /remove search filter/i })
    );
    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("clicking a category chip × calls onCategoryChange with 'All'", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    render(
      <ActiveFilterBar
        {...defaultProps}
        activeCategory="Lawn Games"
        onCategoryChange={onCategoryChange}
      />
    );
    await user.click(
      screen.getByRole("button", { name: /remove category filter/i })
    );
    expect(onCategoryChange).toHaveBeenCalledWith("All");
  });

  it("clicking Clear all calls onClearAll", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(
      <ActiveFilterBar
        {...defaultProps}
        searchQuery="jenga"
        activeCategory="Lawn Games"
        onClearAll={onClearAll}
      />
    );
    await user.click(screen.getByRole("button", { name: /clear all/i }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
