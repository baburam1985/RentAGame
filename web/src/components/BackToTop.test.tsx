import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackToTop from "./BackToTop";

describe("BackToTop", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 0 });
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("button is rendered in the DOM at scroll position 0", () => {
    render(<BackToTop />);
    // Button should be in the DOM but visually hidden
    const button = screen.getByLabelText(/back to top/i);
    expect(button).toBeInTheDocument();
  });

  it("button has data-visible=false when scroll position is 0", () => {
    render(<BackToTop />);
    const button = screen.getByLabelText(/back to top/i);
    expect(button).toHaveAttribute("data-visible", "false");
  });

  it("button has data-visible=true when scrolled more than 300px", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 301 });
      window.dispatchEvent(new Event("scroll"));
    });
    const button = screen.getByRole("button", { name: /back to top/i });
    expect(button).toHaveAttribute("data-visible", "true");
  });

  it("has ARIA label 'Back to top'", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("clicking the button calls window.scrollTo with smooth behavior", async () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 400 });
      window.dispatchEvent(new Event("scroll"));
    });
    const button = screen.getByRole("button", { name: /back to top/i });
    await userEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("button has data-visible=false when scrolled exactly 300px", () => {
    render(<BackToTop />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("scroll"));
    });
    const button = screen.getByLabelText(/back to top/i);
    expect(button).toHaveAttribute("data-visible", "false");
  });
});
