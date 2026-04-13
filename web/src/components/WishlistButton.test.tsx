import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WishlistButton from "./WishlistButton";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("WishlistButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a heart button", () => {
    render(<WishlistButton gameId="1" gameName="Giant Jenga" />);
    expect(screen.getByRole("button", { name: /wishlist/i })).toBeInTheDocument();
  });

  it("shows unfilled heart when game is not wishlisted", () => {
    render(<WishlistButton gameId="1" gameName="Giant Jenga" />);
    expect(screen.getByRole("button", { name: /add giant jenga to wishlist/i })).toBeInTheDocument();
  });

  it("adds game to localStorage wishlist when logged-in user clicks", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify({ name: "Jane Doe", email: "j@e.com", createdAt: "" }));
    render(<WishlistButton gameId="1" gameName="Giant Jenga" />);
    await user.click(screen.getByRole("button", { name: /wishlist/i }));
    const wishlist = JSON.parse(localStorage.getItem("rg_wishlist")!);
    expect(wishlist).toContain("1");
  });

  it("removes game from wishlist on second click", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rg_user", JSON.stringify({ name: "Jane", email: "j@e.com", createdAt: "" }));
    localStorage.setItem("rg_wishlist", JSON.stringify(["1"]));
    render(<WishlistButton gameId="1" gameName="Giant Jenga" />);
    await user.click(screen.getByRole("button", { name: /remove giant jenga from wishlist/i }));
    const wishlist = JSON.parse(localStorage.getItem("rg_wishlist")!);
    expect(wishlist).not.toContain("1");
  });

  it("shows log-in prompt when logged-out user clicks", async () => {
    const user = userEvent.setup();
    render(<WishlistButton gameId="1" gameName="Giant Jenga" />);
    await user.click(screen.getByRole("button", { name: /wishlist/i }));
    expect(screen.getByText(/log in to save games/i)).toBeInTheDocument();
  });
});
