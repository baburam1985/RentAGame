import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminSettingsPage from "./AdminSettings";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/admin/settings",
}));

describe("AdminSettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a heading 'Settings'", () => {
    render(<AdminSettingsPage />);
    expect(screen.getByRole("heading", { name: /settings/i })).toBeInTheDocument();
  });

  it("renders a 'Service Area' text input", () => {
    render(<AdminSettingsPage />);
    expect(screen.getByRole("textbox", { name: /service area/i })).toBeInTheDocument();
  });

  it("renders a 'Cancellation Policy' textarea", () => {
    render(<AdminSettingsPage />);
    expect(screen.getByRole("textbox", { name: /cancellation policy/i })).toBeInTheDocument();
  });

  it("pre-populates Service Area from rg_settings.serviceArea when set", () => {
    localStorage.setItem(
      "rg_settings",
      JSON.stringify({ serviceArea: "Custom Service Area", cancellationPolicy: "Custom Policy" })
    );
    render(<AdminSettingsPage />);
    expect(screen.getByRole("textbox", { name: /service area/i })).toHaveValue("Custom Service Area");
  });

  it("pre-populates Cancellation Policy from rg_settings.cancellationPolicy when set", () => {
    localStorage.setItem(
      "rg_settings",
      JSON.stringify({ serviceArea: "Custom Service Area", cancellationPolicy: "Custom Policy" })
    );
    render(<AdminSettingsPage />);
    expect(screen.getByRole("textbox", { name: /cancellation policy/i })).toHaveValue("Custom Policy");
  });

  it("uses default values when rg_settings is not set", () => {
    render(<AdminSettingsPage />);
    const serviceAreaInput = screen.getByRole("textbox", { name: /service area/i });
    const cancellationPolicyTextarea = screen.getByRole("textbox", { name: /cancellation policy/i });
    expect(serviceAreaInput).not.toHaveValue("");
    expect(cancellationPolicyTextarea).not.toHaveValue("");
  });

  it("clicking 'Save Settings' writes both values to rg_settings in localStorage", async () => {
    render(<AdminSettingsPage />);
    const serviceAreaInput = screen.getByRole("textbox", { name: /service area/i });
    await userEvent.clear(serviceAreaInput);
    await userEvent.type(serviceAreaInput, "New Service Area");
    const policyTextarea = screen.getByRole("textbox", { name: /cancellation policy/i });
    await userEvent.clear(policyTextarea);
    await userEvent.type(policyTextarea, "New Cancellation Policy");
    await userEvent.click(screen.getByRole("button", { name: /save settings/i }));
    const stored = JSON.parse(localStorage.getItem("rg_settings") ?? "{}") as {
      serviceArea: string;
      cancellationPolicy: string;
    };
    expect(stored.serviceArea).toBe("New Service Area");
    expect(stored.cancellationPolicy).toBe("New Cancellation Policy");
  });

  it("shows a success confirmation after clicking 'Save Settings'", async () => {
    render(<AdminSettingsPage />);
    await userEvent.click(screen.getByRole("button", { name: /save settings/i }));
    await waitFor(() => {
      expect(screen.getByText(/settings saved/i)).toBeInTheDocument();
    });
  });

  it("loads saved values back into inputs on next render", () => {
    localStorage.setItem(
      "rg_settings",
      JSON.stringify({ serviceArea: "Persisted Area", cancellationPolicy: "Persisted Policy" })
    );
    render(<AdminSettingsPage />);
    expect(screen.getByRole("textbox", { name: /service area/i })).toHaveValue("Persisted Area");
    expect(screen.getByRole("textbox", { name: /cancellation policy/i })).toHaveValue("Persisted Policy");
  });
});
