import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceRangeSlider from "./PriceRangeSlider";

describe("PriceRangeSlider", () => {
  // AC1: Dual-handle price slider renders in the filter bar
  it("renders dual-handle price slider with two range inputs", () => {
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    const inputs = screen.getAllByRole("slider");
    expect(inputs).toHaveLength(2);
  });

  // AC2: Min and max handles are independently draggable
  it("min handle calls onMinChange when changed", async () => {
    const onMinChange = vi.fn();
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={onMinChange}
        onMaxChange={() => {}}
      />
    );
    const sliders = screen.getAllByRole("slider");
    const minSlider = sliders[0];
    await userEvent.type(minSlider, "{arrowright}");
    expect(onMinChange).toHaveBeenCalled();
  });

  it("max handle calls onMaxChange when changed", async () => {
    const onMaxChange = vi.fn();
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={() => {}}
        onMaxChange={onMaxChange}
      />
    );
    const sliders = screen.getAllByRole("slider");
    const maxSlider = sliders[1];
    await userEvent.type(maxSlider, "{arrowleft}");
    expect(onMaxChange).toHaveBeenCalled();
  });

  // AC4: Selected range displays as '$X – $Y / day'
  it("displays selected price range as '$X – $Y / day'", () => {
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={30}
        maxValue={45}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(screen.getByText(/\$30\s*[–—-]\s*\$45\s*\/\s*day/i)).toBeInTheDocument();
  });

  // AC5: Default state shows full price range (min to max of all games)
  it("shows full range by default when minValue equals min and maxValue equals max", () => {
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(screen.getByText(/\$25\s*[–—-]\s*\$50\s*\/\s*day/i)).toBeInTheDocument();
  });

  it("min slider has correct aria-label", () => {
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByRole("slider", { name: /minimum price/i })
    ).toBeInTheDocument();
  });

  it("max slider has correct aria-label", () => {
    render(
      <PriceRangeSlider
        min={25}
        max={50}
        minValue={25}
        maxValue={50}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    );
    expect(
      screen.getByRole("slider", { name: /maximum price/i })
    ).toBeInTheDocument();
  });
});
