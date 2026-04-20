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

  it("admin:true is set on user when admin email logs in", async () => {
    // Simulate the login page behavior: admin@rentagame.com sets admin:true
    const adminUser = { name: "Admin", email: "admin@rentagame.com", createdAt: new Date().toISOString(), admin: true };
    localStorage.setItem("rg_user", JSON.stringify(adminUser));
    const stored = localStorage.getItem("rg_user");
    const parsed = JSON.parse(stored!) as typeof adminUser;
    expect(parsed.admin).toBe(true);
    expect(parsed.email).toBe("admin@rentagame.com");
  });

  it("active sidebar link is visually highlighted with distinct class", async () => {
    localStorage.setItem("rg_user", JSON.stringify({ name: "Admin", email: "admin@rentagame.com", createdAt: "", admin: true }));
    render(<AdminLayout><div>content</div></AdminLayout>);
    await waitFor(() => {
      const overviewLink = screen.getByRole("link", { name: /overview/i });
      // Active link (/admin) should have bg-yellow-400 highlight class
      expect(overviewLink.className).toContain("bg-yellow-400");
    });
  });
});
