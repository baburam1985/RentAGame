import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a {...props}>{children}</a>
  ),
}));

function renderNavbar() {
  return render(
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
}

describe("Navbar", () => {
  it("renders brand name Kinetic Games", () => {
    renderNavbar();
    expect(screen.getByText("Kinetic Games")).toBeInTheDocument();
  });

  it("renders all nav link labels", () => {
    renderNavbar();
    expect(screen.getByText("All Games")).toBeInTheDocument();
    expect(screen.getByText("Family Sets")).toBeInTheDocument();
    expect(screen.getByText("Party Packs")).toBeInTheDocument();
  });

  it("renders cart icon with aria label", () => {
    renderNavbar();
    expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
  });

  it("hamburger button is present in the DOM", () => {
    renderNavbar();
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("clicking hamburger button toggles mobile menu visibility", async () => {
    renderNavbar();
    const hamburger = screen.getByLabelText("Toggle menu");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });
});
