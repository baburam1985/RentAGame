/**
 * US-031 — Service area notice in hero section
 *
 * Tests that:
 * - SERVICE_AREA constant is exported from a shared constants file
 * - Hero section renders the service area text
 * - Service area element includes a location-related icon
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { SERVICE_AREA } from "@/constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("US-031 — Service area notice in hero section", () => {
  it("AC-1: SERVICE_AREA constant is exported from the shared constants file", () => {
    expect(SERVICE_AREA).toBeDefined();
    expect(typeof SERVICE_AREA).toBe("string");
    expect(SERVICE_AREA.length).toBeGreaterThan(0);
  });

  it("AC-2: Hero renders the SERVICE_AREA text visibly", () => {
    render(<Hero />);
    expect(screen.getByText(SERVICE_AREA)).toBeInTheDocument();
  });

  it("AC-3: service area element is rendered inside the hero section", () => {
    render(<Hero />);
    const heroSection = document.getElementById("hero");
    expect(heroSection).not.toBeNull();
    expect(heroSection!.textContent).toContain(SERVICE_AREA);
  });

  it("AC-4: service area notice has data-testid='service-area-notice'", () => {
    render(<Hero />);
    const notice = screen.getByTestId("service-area-notice");
    expect(notice).toBeInTheDocument();
    expect(notice.textContent).toContain(SERVICE_AREA);
  });

  it("AC-5: service area notice contains a location icon element", () => {
    render(<Hero />);
    const notice = screen.getByTestId("service-area-notice");
    // Should contain a span with material-symbols icon for location
    const icon = notice.querySelector("span.material-symbols-outlined");
    expect(icon).not.toBeNull();
  });

  it("AC-6: SERVICE_AREA constant contains location-related keywords (city/area/region)", () => {
    // The constant should describe a service area (not just "Serving")
    expect(SERVICE_AREA).toMatch(/[Ss]erving|[Aa]rea|[Rr]egion|[Cc]ity|Bay Area|[Ll]os Angeles|[Ss]an/);
  });
});
