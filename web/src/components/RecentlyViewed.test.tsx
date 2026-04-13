import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import RecentlyViewed, { addRecentView } from "./RecentlyViewed";
import { CartProvider } from "@/context/CartContext";
import { games } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
});

function renderStrip() {
  return render(
    <CartProvider>
      <RecentlyViewed />
    </CartProvider>
  );
}

describe("RecentlyViewed", () => {
  it("renders nothing when rg_recent_views is empty", () => {
    const { container } = renderStrip();
    expect(container.firstChild).toBeNull();
  });

  it("renders a heading and game cards when there are recent views", () => {
    const firstGame = games[0];
    localStorage.setItem("rg_recent_views", JSON.stringify([firstGame.id]));
    renderStrip();
    expect(screen.getByText(/recently viewed/i)).toBeInTheDocument();
    expect(screen.getByText(firstGame.name)).toBeInTheDocument();
  });

  it("shows up to 4 recently viewed games", () => {
    const ids = games.slice(0, 4).map((g) => g.id);
    localStorage.setItem("rg_recent_views", JSON.stringify(ids));
    renderStrip();
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBeLessThanOrEqual(4);
  });

  it("shows games in most-recently-viewed order (first in list = most recent)", () => {
    const [first, second] = games;
    localStorage.setItem("rg_recent_views", JSON.stringify([second.id, first.id]));
    renderStrip();
    const headings = screen.getAllByRole("heading", { level: 3 });
    const names = headings.map((h) => h.textContent);
    expect(names[0]).toBe(second.name);
  });

  it("renders nothing when rg_recent_views key is absent", () => {
    const { container } = renderStrip();
    expect(container.firstChild).toBeNull();
  });

  it("adds game ID to rg_recent_views via addRecentView utility", () => {
    // Test the exported addRecentView function
    addRecentView("bocce-ball-set");
    const stored = JSON.parse(localStorage.getItem("rg_recent_views") ?? "[]");
    expect(stored).toContain("bocce-ball-set");
  });
});
