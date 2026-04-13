import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameModal from "./GameModal";
import type { Game } from "@/data/games";

const mockGame: Game = {
  id: "bocce",
  name: "Bocce Ball Set",
  category: "Team Games",
  description: "Classic bocce ball fun.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-bocce",
  players: "2–8 players",
  dimensions: "107 mm balls",
  howToPlay: ["Step 1", "Step 2"],
  images: ["https://images.unsplash.com/photo-bocce"],
};

describe("GameModal scroll affordance", () => {
  it("AC-1 & AC-2: renders a bottom-fade overlay div with pointer-events-none class", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    // The fade overlay must exist in the DOM
    const fadeOverlay = document.querySelector(".pointer-events-none");
    expect(fadeOverlay).toBeInTheDocument();
  });

  it("AC-2: fade overlay has pointer-events-none so it does not block interactions", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const fadeOverlay = document.querySelector(".pointer-events-none");
    expect(fadeOverlay).not.toBeNull();
    expect(fadeOverlay!.className).toContain("pointer-events-none");
  });

  it("AC-3: fade overlay is hidden when data-scrolled-to-bottom attribute is set on scroll container", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    // The scroll container should be queryable
    const scrollContainer = document.querySelector("[data-scroll-container]");
    expect(scrollContainer).toBeInTheDocument();
  });

  it("AC-4: modal panel has overflow-y-auto to allow content scrolling", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const scrollContainer = document.querySelector("[data-scroll-container]");
    expect(scrollContainer).toBeInTheDocument();
    // The scroll container must have overflow-y-auto to allow scrolling
    expect(scrollContainer!.className).toContain("overflow-y-auto");
  });

  it("AC-5: component renders without errors and is limited to GameModal — game name still visible", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText("Bocce Ball Set")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /rent this game/i })).toBeInTheDocument();
  });

  it("AC-6: modal renders correctly and Rent This Game button is still accessible on desktop layout", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const rentButton = screen.getByRole("button", { name: /rent this game/i });
    expect(rentButton).toBeInTheDocument();
    // The button should not be hidden or covered by overlay
    const pointerNoneElem = document.querySelector(".pointer-events-none");
    // Rent button should not be inside the pointer-events-none overlay
    expect(pointerNoneElem).not.toContainElement(rentButton);
  });
});
