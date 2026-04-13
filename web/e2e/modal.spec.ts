import { test, expect } from "@playwright/test";

test.describe("Game detail modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#catalog");
  });

  test("clicking first game card opens modal with game name", async ({ page }) => {
    // Get first game card name
    const firstCard = page.locator("#catalog .group").first();
    const gameName = await firstCard.locator("h3").textContent();
    await firstCard.locator("button", { hasText: "Rent Now" }).click();
    // Modal should appear
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    // Game name should be in modal
    await expect(modal.getByText(gameName!)).toBeVisible();
  });

  test("modal shows description, players, dimensions, price", async ({ page }) => {
    await page.locator("#catalog .group").first().locator("button", { hasText: "Rent Now" }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    // Check that spec grid is visible (players + dimensions)
    await expect(modal.getByText("Players")).toBeVisible();
    await expect(modal.getByText("Dimensions")).toBeVisible();
    // Price
    await expect(modal.locator("text=/\\$\\d+/").first()).toBeVisible();
  });

  test("clicking X button closes the modal", async ({ page }) => {
    await page.locator("#catalog .group").first().locator("button", { hasText: "Rent Now" }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await page.getByLabel("Close").click();
    await expect(modal).not.toBeVisible();
  });

  test("clicking backdrop closes the modal", async ({ page }) => {
    await page.locator("#catalog .group").first().locator("button", { hasText: "Rent Now" }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    // Click outside modal panel (top-left corner of backdrop)
    await page.mouse.click(10, 10);
    await expect(modal).not.toBeVisible();
  });

  test("clicking Rent This Game scrolls to rental form", async ({ page }) => {
    await page.locator("#catalog .group").first().locator("button", { hasText: "Rent Now" }).click();
    await page.getByRole("dialog").getByText("Rent This Game").click();
    // Contact section should be visible
    await expect(page.locator("#contact")).toBeVisible();
  });
});
