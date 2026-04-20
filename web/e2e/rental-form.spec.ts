import { test, expect } from "@playwright/test";

test.describe("Rental request form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
    await page.waitForSelector("#contact");
    // Wait for React hydration (useEffect sets data-hydrated after React mounts)
  });

  test("submitting empty form shows validation errors", async ({ page }) => {
    await page.getByRole("button", { name: "Send Rental Request" }).click();
    await expect(page.getByText("Name is required.")).toBeVisible();
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Phone is required.")).toBeVisible();
  });

  test("invalid email shows format error", async ({ page }) => {
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByRole("button", { name: "Send Rental Request" }).click();
    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
  });

  test("return date before event date shows date error", async ({ page }) => {
    await page.getByLabel("Event Date").fill("2026-07-10");
    await page.getByLabel("Return Date").fill("2026-07-05");
    await page.getByRole("button", { name: "Send Rental Request" }).click();
    await expect(
      page.getByText("Return date must be on or after the event date.")
    ).toBeVisible();
  });

  test("valid submission shows success message", async ({ page }) => {
    await page.getByLabel("Your Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Phone").fill("5551234567");
    await page.getByLabel("Event Date").fill("2026-08-15");
    await page.getByLabel("Return Date").fill("2026-08-17");
    await page.locator("#address").fill("123 Main St");
    await page.locator("#games").fill("Giant Jenga");
    await page.getByRole("button", { name: "Send Rental Request" }).click();
    await expect(page.getByText(/Thanks!/i)).toBeVisible();
  });

  test("form fields are cleared after successful submit", async ({ page }) => {
    await page.getByLabel("Your Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Phone").fill("5551234567");
    await page.getByLabel("Event Date").fill("2026-08-15");
    await page.getByLabel("Return Date").fill("2026-08-17");
    await page.locator("#address").fill("123 Main St");
    await page.locator("#games").fill("Giant Jenga");
    await page.getByRole("button", { name: "Send Rental Request" }).click();
    await expect(page.getByText(/Thanks!/i)).toBeVisible();
    // Click submit another request
    await page.getByText("Submit another request").click();
    // Form should be visible again with empty fields
    await expect(page.getByLabel("Your Name")).toHaveValue("");
  });
});
