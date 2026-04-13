import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Testimonials from "./Testimonials";

describe("Testimonials", () => {
  it("AC-1/2: renders all 3 testimonials with name visible", () => {
    render(<Testimonials />);
    expect(screen.getByText("Sarah & Mike T.")).toBeInTheDocument();
    expect(screen.getByText("James R.")).toBeInTheDocument();
    expect(screen.getByText("Lisa M.")).toBeInTheDocument();
  });

  it("AC-3/4: renders star icons for ratings (at least 3 sets of stars visible)", () => {
    const { container } = render(<Testimonials />);
    // Each testimonial should have star SVGs — count filled stars
    const stars = container.querySelectorAll("svg[aria-label='star']");
    expect(stars.length).toBeGreaterThanOrEqual(3);
  });

  it("AC-5: location strings are displayed for each testimonial", () => {
    render(<Testimonials />);
    // Testimonials should show location text like "City, ST"
    const locationElements = screen.getAllByTestId("testimonial-location");
    expect(locationElements.length).toBe(3);
    locationElements.forEach((el) => {
      expect(el.textContent).not.toBe("");
    });
  });

  it("AC-6: star ratings use aria-label for accessibility", () => {
    const { container } = render(<Testimonials />);
    const ratingContainers = container.querySelectorAll("[aria-label*='out of 5']");
    expect(ratingContainers.length).toBe(3);
  });
});
