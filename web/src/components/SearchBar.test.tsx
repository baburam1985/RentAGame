import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders a search input above the game grid", () => {
    render(<SearchBar searchQuery="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search games/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("typing in the input calls onSearchChange in real time", async () => {
    const onSearchChange = vi.fn();
    render(<SearchBar searchQuery="" onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText(/search games/i);
    await userEvent.type(input, "jenga");
    expect(onSearchChange).toHaveBeenCalledWith("j");
    expect(onSearchChange).toHaveBeenCalledWith("e");
    expect(onSearchChange).toHaveBeenCalledWith("n");
    expect(onSearchChange).toHaveBeenCalledWith("g");
    expect(onSearchChange).toHaveBeenCalledWith("a");
    expect(onSearchChange).toHaveBeenCalledTimes(5);
  });

  it("clear button resets search input to empty", async () => {
    const onSearchChange = vi.fn();
    render(<SearchBar searchQuery="jenga" onSearchChange={onSearchChange} />);
    const clearButton = screen.getByRole("button", { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
    await userEvent.click(clearButton);
    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("clear button is not visible when search input is empty", () => {
    render(<SearchBar searchQuery="" onSearchChange={() => {}} />);
    const clearButton = screen.queryByRole("button", { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it("input has accessible label", () => {
    render(<SearchBar searchQuery="" onSearchChange={() => {}} />);
    const input = screen.getByRole("textbox", { name: /search games/i });
    expect(input).toBeInTheDocument();
  });
});
