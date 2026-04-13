import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminLayout from "./layout";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/admin",
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a {...props}>{children}</a>
  ),
}));

describe("AdminLayout", () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it("redirects to /login when no user in localStorage", async () => {
    render(<AdminLayout><div>content</div></AdminLayout>);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("redirects to /login when user is not admin", async () => {
    localStorage.setItem("rg_user", JSON.stringify({ name: "Jane", email: "jane@example.com", createdAt: "" }));
    render(<AdminLayout><div>content</div></AdminLayout>);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("renders sidebar for admin user", async () => {
    localStorage.setItem("rg_user", JSON.stringify({ name: "Admin", email: "admin@rentagame.com", createdAt: "", admin: true }));
    render(<AdminLayout><div>content</div></AdminLayout>);
    await waitFor(() => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  it("sidebar shows Overview, Inventory, Orders, Settings links", async () => {
    localStorage.setItem("rg_user", JSON.stringify({ name: "Admin", email: "admin@rentagame.com", createdAt: "", admin: true }));
    render(<AdminLayout><div>content</div></AdminLayout>);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /inventory/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /orders/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
    });
  });
});
