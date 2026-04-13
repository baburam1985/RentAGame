import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders at least 5 FAQ questions", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it("answer is not visible before clicking a question", () => {
    render(<FAQ />);
    const firstButton = screen.getAllByRole("button")[0];
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking a question toggles its answer visible", async () => {
    render(<FAQ />);
    const firstButton = screen.getAllByRole("button")[0];
    await userEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking a second question closes the first", async () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("each button has aria-controls pointing to an answer panel id", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const controls = btn.getAttribute("aria-controls");
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls!)).toBeInTheDocument();
    });
  });

  it("renders a section heading for the FAQ area", () => {
    render(<FAQ />);
    expect(
      screen.getByRole("heading", { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });
});
