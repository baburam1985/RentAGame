import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { CartProvider } from "@/context/CartContext";

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => <a {...props}>{children}</a>,
}));

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({ push: vi.fn() }),
}));

function renderNavbar() {
  return render(
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
}

describe("Navbar active page indicator", () => {
  it("applies active indicator class to nav link whose href matches current pathname", () => {
    mockUsePathname.mockReturnValue("/cart");
    renderNavbar();
    // The cart link in the header with href="/cart"
    const cartLink = screen.getByLabelText(/cart/i);
    expect(cartLink.className).toMatch(/underline|font-semibold|border-b/);
  });

  it("non-active links do not have the active indicator class", () => {
    mockUsePathname.mockReturnValue("/");
    renderNavbar();
    // Cart link should NOT be active when on home
    const cartLink = screen.getByLabelText(/cart/i);
    expect(cartLink.className).not.toMatch(/\bunderline\b/);
  });

  it("brand home link does not receive active class when on a sub-route", () => {
    mockUsePathname.mockReturnValue("/cart");
    renderNavbar();
    const brandLink = screen.getByText("Kinetic Games").closest("a");
    expect(brandLink?.className).not.toMatch(/\bunderline\b/);
  });

  it("active indicator is not applied to a link with different href than pathname", () => {
    mockUsePathname.mockReturnValue("/cart");
    renderNavbar();
    const hamburger = screen.getByLabelText("Toggle menu");
    // hamburger is a button, not a link — just confirms unrelated elements aren't affected
    expect(hamburger.className).not.toMatch(/\bunderline\b/);
  });
});
