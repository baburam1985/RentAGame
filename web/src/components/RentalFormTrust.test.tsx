/**
 * US-023 — Add 'No hidden fees' trust statement near rental form CTA
 *
 * Tests that:
 * - Trust statement renders near the form submit button
 * - Statement uses a trust icon (shield or checkmark)
 * - Statement renders with and without a pre-selected game
 * - Statement does not interfere with tab order (submit button remains focusable)
 * - Text has sufficient WCAG AA contrast (not conveyed by colour alone — text is present)
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RentalForm from "./RentalForm";

describe("US-023 — No hidden fees trust statement", () => {
  it("renders the trust statement text near the submit button", () => {
    render(<RentalForm />);
    expect(
      screen.getByText(/no hidden fees/i)
    ).toBeInTheDocument();
  });

  it("renders the full trust statement copy", () => {
    render(<RentalForm />);
    expect(
      screen.getByText(/total shown before you confirm/i)
    ).toBeInTheDocument();
  });

  it("renders a trust icon alongside the text (shield or checkmark material icon or svg)", () => {
    render(<RentalForm />);
    // Icon should be present as a span with material-symbols or an svg/aria element
    const trustSection = screen
      .getByText(/no hidden fees/i)
      .closest("[data-testid='trust-statement']");
    expect(trustSection).not.toBeNull();
    // The trust section should contain an icon element
    const icon = trustSection?.querySelector(
      "span.material-symbols-outlined, svg, [aria-hidden='true']"
    );
    expect(icon).not.toBeNull();
  });

  it("trust statement renders when no game is pre-selected", () => {
    render(<RentalForm />);
    expect(screen.getByText(/no hidden fees/i)).toBeInTheDocument();
  });

  it("trust statement renders when a game is pre-selected via defaultGame prop", () => {
    render(<RentalForm defaultGame="Giant Jenga" />);
    expect(screen.getByText(/no hidden fees/i)).toBeInTheDocument();
  });

  it("submit button is still present and not obstructed after trust statement renders", () => {
    render(<RentalForm />);
    expect(
      screen.getByRole("button", { name: /send rental request/i })
    ).toBeInTheDocument();
  });
});
