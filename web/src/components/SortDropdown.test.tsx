import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortDropdown from "./SortDropdown";

describe("SortDropdown", () => {
  it("renders a sort dropdown with 4 options: Featured, Price: Low to High, Price: High to Low, Name: A–Z", () => {
    render(<SortDropdown value="featured" onChange={() => {}} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    expect(select).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    const optionTexts = options.map((o) => o.textContent);
    expect(optionTexts).toContain("Featured");
    expect(optionTexts).toContain("Price: Low to High");
    expect(optionTexts).toContain("Price: High to Low");
    expect(optionTexts).toContain("Name: A–Z");
    expect(options).toHaveLength(4);
  });

  it("default selection is Featured when value is 'featured'", () => {
    render(<SortDropdown value="featured" onChange={() => {}} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    expect((select as HTMLSelectElement).value).toBe("featured");
  });

  it("calls onChange with 'price-asc' when Price: Low to High is selected", async () => {
    const onChange = vi.fn();
    render(<SortDropdown value="featured" onChange={onChange} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    await userEvent.selectOptions(select, "price-asc");
    expect(onChange).toHaveBeenCalledWith("price-asc");
  });

  it("calls onChange with 'price-desc' when Price: High to Low is selected", async () => {
    const onChange = vi.fn();
    render(<SortDropdown value="featured" onChange={onChange} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    await userEvent.selectOptions(select, "price-desc");
    expect(onChange).toHaveBeenCalledWith("price-desc");
  });

  it("calls onChange with 'name-asc' when Name: A–Z is selected", async () => {
    const onChange = vi.fn();
    render(<SortDropdown value="featured" onChange={onChange} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    await userEvent.selectOptions(select, "name-asc");
    expect(onChange).toHaveBeenCalledWith("name-asc");
  });

  it("reflects controlled value when set to 'price-asc'", () => {
    render(<SortDropdown value="price-asc" onChange={() => {}} />);
    const select = screen.getByRole("combobox", { name: /sort/i });
    expect((select as HTMLSelectElement).value).toBe("price-asc");
  });
});
