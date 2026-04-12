import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders brand name RentAGame", () => {
    render(<Navbar />);
    expect(screen.getByText("RentAGame")).toBeInTheDocument();
  });

  it("renders all nav link labels", () => {
    render(<Navbar />);
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Rent Now CTA button", () => {
    render(<Navbar />);
    // There may be multiple (desktop + mobile) — just check at least one exists
    const rentNowLinks = screen.getAllByText("Rent Now");
    expect(rentNowLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("hamburger button is present in the DOM", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("clicking hamburger button toggles mobile menu visibility", async () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle menu");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });
});
