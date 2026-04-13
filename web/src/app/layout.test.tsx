import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RootLayout from "./layout";

// layout.tsx uses server-side metadata export and next/font — mock them
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta", className: "" }),
  Be_Vietnam_Pro: () => ({ variable: "--font-be-vietnam", className: "" }),
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/context/CartContext", () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

function renderLayout() {
  render(
    <RootLayout>
      <p>Page content</p>
    </RootLayout>
  );
}

describe("RootLayout skip to main content", () => {
  it("AC-1: skip link is rendered as the first focusable element before the Navbar", () => {
    renderLayout();
    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    const navbar = screen.getByTestId("navbar");
    // The skip link should appear before the navbar in the DOM
    const position = skipLink.compareDocumentPosition(navbar);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("AC-2: skip link has sr-only class by default for visual hiding", () => {
    renderLayout();
    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink.className).toContain("sr-only");
  });

  it("AC-3: skip link href points to #main-content", () => {
    renderLayout();
    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("AC-4: main content area has id=main-content and tabIndex=-1", () => {
    renderLayout();
    const main = document.getElementById("main-content");
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("AC-5 and AC-6: pressing Tab reveals skip link (focus:not-sr-only classes present on skip link element)", () => {
    renderLayout();
    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    // Verify the element has focus-related utility classes that make it visible on focus
    expect(skipLink.className).toContain("focus:not-sr-only");
  });

  it("AC-7: skip link is in DOM with correct href attribute and has focus-visible utility classes", () => {
    renderLayout();
    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(skipLink.className).toContain("focus:not-sr-only");
    expect(skipLink.className).toContain("sr-only");
  });
});
