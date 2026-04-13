import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameCard from "./GameCard";
import { CartProvider } from "@/context/CartContext";
import type { Game } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockGame: Game = {
  id: "test-game",
  name: "Test Game",
  category: "Lawn Games",
  description: "A fun test game.",
  pricePerDay: 42,
  image: "https://images.unsplash.com/photo-test",
  players: "2–6 players",
  dimensions: "5 ft wide",
  howToPlay: ["Step one.", "Step two."],
  images: [
    "https://images.unsplash.com/photo-test",
    "https://images.unsplash.com/photo-test2",
  ],
  included: ["Complete game set", "Carrying bag", "Delivery and setup included"],
};

function renderCard() {
  return render(
    <CartProvider>
      <GameCard game={mockGame} />
    </CartProvider>
  );
}

describe("GameCard", () => {
  it("renders game name", () => {
    renderCard();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  it("renders price per day", () => {
    renderCard();
    expect(screen.getByText("$42 · day")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    renderCard();
    const img = screen.getByAltText("Test Game");
    expect(img).toBeInTheDocument();
  });

  it("shows Add to Cart button when not in cart", () => {
    renderCard();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("clicking Add to Cart shows Added! feedback", async () => {
    renderCard();
    const btn = screen.getByText("Add to Cart");
    await userEvent.click(btn);
    expect(screen.getByText("Added!")).toBeInTheDocument();
  });
});
