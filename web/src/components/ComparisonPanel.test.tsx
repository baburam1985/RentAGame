import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComparisonPanel from "./ComparisonPanel";
import type { Game } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const game1: Game = {
  id: "g1",
  name: "Lawn Bowling",
  category: "Lawn Games",
  description: "Classic lawn bowling.",
  pricePerDay: 30,
  image: "https://example.com/img1.jpg",
  players: "2–8 players",
  dimensions: "20 ft lane",
  howToPlay: ["Roll the ball"],
  images: [],
};

const game2: Game = {
  id: "g2",
  name: "Giant Jenga",
  category: "Party Games",
  description: "Giant block stacking game.",
  pricePerDay: 45,
  image: "https://example.com/img2.jpg",
  players: "2–20 players",
  dimensions: "4 ft tall",
  howToPlay: ["Pull a block"],
  images: [],
};

const game3: Game = {
  id: "g3",
  name: "Cornhole",
  category: "Lawn Games",
  description: "Classic cornhole.",
  pricePerDay: 25,
  image: "https://example.com/img3.jpg",
  players: "2–4 players",
  dimensions: "4 ft board",
  howToPlay: ["Throw the bag"],
  images: [],
};

describe("ComparisonPanel", () => {
  it("does not render when fewer than 2 games are selected", () => {
    render(<ComparisonPanel games={[game1]} onClear={() => undefined} />);
    expect(screen.queryByRole("region", { name: /compare/i })).not.toBeInTheDocument();
  });

  it("renders when 2 games are selected", () => {
    render(<ComparisonPanel games={[game1, game2]} onClear={() => undefined} />);
    expect(screen.getByRole("region", { name: /compare/i })).toBeInTheDocument();
  });

  it("shows the name of each selected game", () => {
    render(<ComparisonPanel games={[game1, game2]} onClear={() => undefined} />);
    expect(screen.getByText("Lawn Bowling")).toBeInTheDocument();
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
  });

  it("shows pricePerDay for each selected game", () => {
    render(<ComparisonPanel games={[game1, game2]} onClear={() => undefined} />);
    expect(screen.getByText("$30/day")).toBeInTheDocument();
    expect(screen.getByText("$45/day")).toBeInTheDocument();
  });

  it("shows players for each selected game", () => {
    render(<ComparisonPanel games={[game1, game2]} onClear={() => undefined} />);
    expect(screen.getByText("2–8 players")).toBeInTheDocument();
    expect(screen.getByText("2–20 players")).toBeInTheDocument();
  });

  it("shows dimensions for each selected game", () => {
    render(<ComparisonPanel games={[game1, game2]} onClear={() => undefined} />);
    expect(screen.getByText("20 ft lane")).toBeInTheDocument();
    expect(screen.getByText("4 ft tall")).toBeInTheDocument();
  });

  it("renders a Clear button that calls onClear", async () => {
    const onClear = vi.fn();
    render(<ComparisonPanel games={[game1, game2]} onClear={onClear} />);
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await userEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("renders up to 3 games", () => {
    render(<ComparisonPanel games={[game1, game2, game3]} onClear={() => undefined} />);
    expect(screen.getByText("Lawn Bowling")).toBeInTheDocument();
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    expect(screen.getByText("Cornhole")).toBeInTheDocument();
  });
});

describe("ComparisonPanel - GameCard Compare toggle", () => {
  it("GameCard renders a 'Compare' button when onCompare prop is provided", async () => {
    const { default: GameCard } = await import("./GameCard");
    const { CartProvider } = await import("@/context/CartContext");
    render(
      <CartProvider>
        <GameCard game={game1} onCompare={() => undefined} />
      </CartProvider>
    );
    expect(screen.getByRole("button", { name: /compare/i })).toBeInTheDocument();
  });

  it("clicking Compare on a GameCard calls onCompare with the game", async () => {
    const { default: GameCard } = await import("./GameCard");
    const { CartProvider } = await import("@/context/CartContext");
    const onCompare = vi.fn();
    render(
      <CartProvider>
        <GameCard game={game1} onCompare={onCompare} />
      </CartProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /compare/i }));
    expect(onCompare).toHaveBeenCalledWith(game1);
  });
});
