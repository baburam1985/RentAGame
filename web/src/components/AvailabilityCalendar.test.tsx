import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AvailabilityCalendar from "./AvailabilityCalendar";

describe("AvailabilityCalendar", () => {
  const june2026 = new Date(2026, 5, 1); // June 2026
  const unavailableDates = ["2026-06-10", "2026-06-15"];

  it("AC-1: renders the name of the month and year from the month prop", () => {
    render(
      <AvailabilityCalendar
        month={june2026}
        unavailableDates={unavailableDates}
      />
    );
    expect(screen.getByText("June 2026")).toBeInTheDocument();
  });

  it("AC-2: a date cell matching an entry in unavailableDates has CSS class unavailable", () => {
    const { container } = render(
      <AvailabilityCalendar
        month={june2026}
        unavailableDates={unavailableDates}
      />
    );
    expect(container.querySelector(".unavailable")).not.toBeNull();
  });

  it("AC-3: a date cell not in unavailableDates does NOT have CSS class unavailable", () => {
    const { container } = render(
      <AvailabilityCalendar
        month={june2026}
        unavailableDates={unavailableDates}
      />
    );
    // June 1 is not in unavailableDates — find it and check it has no 'unavailable' class
    const allDays = container.querySelectorAll(".day");
    // First day cell should be June 1
    const firstDay = allDays[0];
    expect(firstDay).not.toBeNull();
    expect(firstDay.classList.contains("unavailable")).toBe(false);
  });

  it("AC-4: renders exactly the correct number of day cells for the given month (30 for June)", () => {
    const { container } = render(
      <AvailabilityCalendar
        month={june2026}
        unavailableDates={unavailableDates}
      />
    );
    expect(container.querySelectorAll(".day").length).toBe(30);
  });
});
