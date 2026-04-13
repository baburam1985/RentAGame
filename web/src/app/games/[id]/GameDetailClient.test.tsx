import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameDetailClient from "./GameDetailClient";
import type { Game } from "@/data/games";

// Mock CartContext
const mockAddItem = vi.fn();
vi.mock("@/context/CartContext", () => ({
  useCart: () => ({ addItem: mockAddItem, items: [], totalItems: 0 }),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockGame: Game = {
  id: "test-game",
  name: "Test Game",
  category: "Lawn Games",
  description: "A fun test game for testing.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-test-main",
  images: [
    "https://images.unsplash.com/photo-test-1",
    "https://images.unsplash.com/photo-test-2",
    "https://images.unsplash.com/photo-test-3",
  ],
  players: "2–6 players",
  dimensions: "5 ft wide",
  howToPlay: ["Step one.", "Step two.", "Step three."],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GameDetailClient", () => {
  describe("Gallery thumbnail swap", () => {
    it("renders the main image with the first image by default", () => {
      render(<GameDetailClient game={mockGame} />);
      const mainImages = screen.getAllByAltText(/Test Game — photo/i);
      expect(mainImages[0]).toHaveAttribute("src", mockGame.images[0]);
    });

    it("clicking thumbnail 2 switches the main image", async () => {
      render(<GameDetailClient game={mockGame} />);
      const thumb2 = screen.getByLabelText("View photo 2");
      await userEvent.click(thumb2);

      const mainImages = screen.getAllByAltText(/Test Game — photo/i);
      expect(mainImages[0]).toHaveAttribute("src", mockGame.images[1]);
    });

    it("clicking thumbnail 3 switches the main image", async () => {
      render(<GameDetailClient game={mockGame} />);
      const thumb3 = screen.getByLabelText("View photo 3");
      await userEvent.click(thumb3);

      const mainImages = screen.getAllByAltText(/Test Game — photo/i);
      expect(mainImages[0]).toHaveAttribute("src", mockGame.images[2]);
    });

    it("marks the active thumbnail as pressed", async () => {
      render(<GameDetailClient game={mockGame} />);
      const thumb1 = screen.getByLabelText("View photo 1");
      const thumb2 = screen.getByLabelText("View photo 2");

      expect(thumb1).toHaveAttribute("aria-pressed", "true");
      expect(thumb2).toHaveAttribute("aria-pressed", "false");

      await userEvent.click(thumb2);

      expect(thumb1).toHaveAttribute("aria-pressed", "false");
      expect(thumb2).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Day selector range", () => {
    it("starts with 1 day selected", () => {
      render(<GameDetailClient game={mockGame} />);
      const inputs = screen.getAllByLabelText("Number of rental days");
      // Desktop and mobile selectors both render
      expect(inputs[0]).toHaveValue(1);
    });

    it("increments days when + button is clicked", async () => {
      render(<GameDetailClient game={mockGame} />);
      const increments = screen.getAllByLabelText("Increase days");
      await userEvent.click(increments[0]);

      const inputs = screen.getAllByLabelText("Number of rental days");
      expect(inputs[0]).toHaveValue(2);
    });

    it("decrements days when - button is clicked", async () => {
      render(<GameDetailClient game={mockGame} />);
      const increments = screen.getAllByLabelText("Increase days");
      await userEvent.click(increments[0]);
      await userEvent.click(increments[0]);

      const decrements = screen.getAllByLabelText("Decrease days");
      await userEvent.click(decrements[0]);

      const inputs = screen.getAllByLabelText("Number of rental days");
      expect(inputs[0]).toHaveValue(2);
    });

    it("does not go below 1 day", async () => {
      render(<GameDetailClient game={mockGame} />);
      const decrements = screen.getAllByLabelText("Decrease days");
      // Already at 1, button should be disabled
      expect(decrements[0]).toBeDisabled();
    });

    it("does not go above 14 days", async () => {
      render(<GameDetailClient game={mockGame} />);
      const increments = screen.getAllByLabelText("Increase days");
      // Click 13 times to reach 14
      for (let i = 0; i < 13; i++) {
        await userEvent.click(increments[0]);
      }
      expect(increments[0]).toBeDisabled();

      const inputs = screen.getAllByLabelText("Number of rental days");
      expect(inputs[0]).toHaveValue(14);
    });
  });

  describe("Add to Cart button", () => {
    it("calls addItem with correct data when clicked", async () => {
      render(<GameDetailClient game={mockGame} />);
      const addButtons = screen.getAllByLabelText(/Add Test Game to cart/i);
      await userEvent.click(addButtons[0]);

      expect(mockAddItem).toHaveBeenCalledWith({
        gameId: "test-game",
        gameName: "Test Game",
        pricePerDay: 30,
        days: 1,
      });
    });

    it("calls addItem with updated days when days have been changed", async () => {
      render(<GameDetailClient game={mockGame} />);
      const increments = screen.getAllByLabelText("Increase days");
      await userEvent.click(increments[0]);
      await userEvent.click(increments[0]);

      const addButtons = screen.getAllByLabelText(/Add Test Game to cart/i);
      await userEvent.click(addButtons[0]);

      expect(mockAddItem).toHaveBeenCalledWith({
        gameId: "test-game",
        gameName: "Test Game",
        pricePerDay: 30,
        days: 3,
      });
    });

    it("shows correct total price in the add to cart button", async () => {
      render(<GameDetailClient game={mockGame} />);
      const increments = screen.getAllByLabelText("Increase days");
      await userEvent.click(increments[0]);

      // $30 × 2 days = $60, visible in compact mobile bar
      expect(screen.getByText(/Add to Cart — \$60/i)).toBeInTheDocument();
    });
  });

  describe("Game information", () => {
    it("renders game name as heading", () => {
      render(<GameDetailClient game={mockGame} />);
      expect(screen.getAllByText("Test Game").length).toBeGreaterThan(0);
    });

    it("renders category badge", () => {
      render(<GameDetailClient game={mockGame} />);
      expect(screen.getAllByText("Lawn Games").length).toBeGreaterThan(0);
    });

    it("renders how to play steps", () => {
      render(<GameDetailClient game={mockGame} />);
      expect(screen.getAllByText("Step one.").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Step two.").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Step three.").length).toBeGreaterThan(0);
    });

    it("renders players and dimensions", () => {
      render(<GameDetailClient game={mockGame} />);
      expect(screen.getAllByText("2–6 players").length).toBeGreaterThan(0);
      expect(screen.getAllByText("5 ft wide").length).toBeGreaterThan(0);
    });
  });
});
