import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceRangeSlider from "./PriceRangeSlider";

describe("PriceRangeSlider", () => {
  // AC1: Dual-handle price slider renders with two range inputs
  it("renders two range inputs (min and max handles)", () => {
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
  });

  it("min handle has an accessible aria-label", () => {
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByRole("slider", { name: /minimum price/i })
    ).toBeInTheDocument();
  });

  it("max handle has an accessible aria-label", () => {
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByRole("slider", { name: /maximum price/i })
    ).toBeInTheDocument();
  });

  // AC2: Min handle is independently controllable
  it("min handle calls onMinChange when moved with arrow key", async () => {
    const onMinChange = vi.fn();
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={onMinChange}
        onMaxChange={() => {}}
      />
    );
    const sliders = screen.getAllByRole("slider");
    await userEvent.type(sliders[0], "{arrowright}");
    expect(onMinChange).toHaveBeenCalled();
  });

  // AC2: Max handle is independently controllable
  it("max handle calls onMaxChange when moved with arrow key", async () => {
    const onMaxChange = vi.fn();
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={() => {}}
        onMaxChange={onMaxChange}
      />
    );
    const sliders = screen.getAllByRole("slider");
    await userEvent.type(sliders[1], "{arrowleft}");
    expect(onMaxChange).toHaveBeenCalled();
  });

  // AC4: Label updates in real time
  it("displays selected range as '$X – $Y / day'", () => {
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={30}
        maxValue={45}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByText(/\$30\s*[–—-]\s*\$45\s*\/\s*day/i)
    ).toBeInTheDocument();
  });

  // AC5: Default full range label
  it("shows full range label when minValue=min and maxValue=max", () => {
    render(
      <PriceRangeSlider
        min={20}
        max={55}
        minValue={20}
        maxValue={55}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByText(/\$20\s*[–—-]\s*\$55\s*\/\s*day/i)
    ).toBeInTheDocument();
  });
});
