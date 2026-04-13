import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import GameGridSkeleton from "./GameGridSkeleton";
import GameGrid from "./GameGrid";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function renderGrid() {
  return render(
    <CartProvider>
      <GameGrid activeCategory="All" />
    </CartProvider>
  );
}

describe("GameGridSkeleton", () => {
  it("AC-1: renders exactly 8 skeleton card placeholders", () => {
    render(<GameGridSkeleton />);
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons).toHaveLength(8);
  });

  it("AC-2: skeleton cards use a pulsing animation class (CSS animate-pulse)", () => {
    render(<GameGridSkeleton />);
    const skeletons = screen.getAllByTestId("skeleton-card");
    skeletons.forEach((s) => {
      expect(s).toHaveClass("animate-pulse");
    });
  });

  it("AC-3: skeleton cards have a grey background to indicate loading state", () => {
    render(<GameGridSkeleton />);
    const skeletons = screen.getAllByTestId("skeleton-card");
    skeletons.forEach((s) => {
      expect(s.className).toMatch(/bg-gray/);
    });
  });

  it("AC-4: GameGrid renders skeleton cards initially before showing real game cards", () => {
    renderGrid();
    // On initial synchronous render, skeleton cards should be visible
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons).toHaveLength(8);
  });

  it("AC-5: grid container has aria-busy='true' while loading skeletons", () => {
    render(<GameGridSkeleton />);
    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-busy", "true");
  });

  it("AC-6: GameGrid uses aria-busy='false' once games are loaded", async () => {
    renderGrid();
    await waitFor(() => {
      const container = screen.getByRole("region");
      expect(container).toHaveAttribute("aria-busy", "false");
    });
  });
});
