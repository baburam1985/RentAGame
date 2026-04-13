/**
 * US-025 — Cancellation policy statement in game modal
 *
 * Tests that:
 * - Cancellation policy text renders in GameModal
 * - Text matches the required copy
 * - Includes an icon alongside the text
 * - Policy text is available as a shared constant
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameModal from "./GameModal";
import { CANCELLATION_POLICY } from "./GameModal";
import type { Game } from "@/data/games";

const mockGame: Game = {
  id: "test-cancel-game",
  name: "Test Cancel Game",
  category: "Lawn Games",
  description: "A test game for cancellation policy.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-test-cancel",
  imageAlt: "Players setting up a game on a sunny lawn outdoors",
  images: [
    "https://images.unsplash.com/photo-test-cancel",
    "https://images.unsplash.com/photo-test-cancel2",
  ],
  players: "2–4 players",
  dimensions: "4 ft wide",
  howToPlay: ["Step one.", "Step two."],
};

describe("US-025 — Cancellation policy in GameModal", () => {
  it("CANCELLATION_POLICY constant is exported from GameModal", () => {
    expect(CANCELLATION_POLICY).toBeDefined();
    expect(typeof CANCELLATION_POLICY).toBe("string");
  });

  it("CANCELLATION_POLICY text matches required copy", () => {
    expect(CANCELLATION_POLICY).toContain("Free cancellation");
    expect(CANCELLATION_POLICY).toContain("24 hours");
  });

  it("cancellation policy text renders in the modal", () => {
    render(
      <GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />
    );
    expect(screen.getByText(/free cancellation/i)).toBeInTheDocument();
  });

  it("cancellation policy includes '24 hours' in the displayed text", () => {
    render(
      <GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />
    );
    expect(screen.getByText(/24 hours/i)).toBeInTheDocument();
  });

  it("cancellation policy section contains an icon element", () => {
    render(
      <GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />
    );
    const policySection = screen
      .getByText(/free cancellation/i)
      .closest("[data-testid='cancellation-policy']");
    expect(policySection).not.toBeNull();
    const icon = policySection?.querySelector(
      "span.material-symbols-outlined, svg, [aria-hidden='true']"
    );
    expect(icon).not.toBeNull();
  });

  it("modal still closes when game is null (unchanged behaviour)", () => {
    const { container } = render(
      <GameModal game={null} onClose={() => {}} onRentNow={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });
});
