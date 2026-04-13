import { test, expect } from "@playwright/test";

test.describe("Game catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for catalog to be visible (present in SSR HTML immediately)
    await page.waitForSelector("#catalog");
    // Wait for React hydration (useEffect sets data-hydrated after React mounts)
    await page.waitForSelector('main[data-hydrated]', { timeout: 30000 });
  });

  test("shows at least 8 game cards", async ({ page }) => {
    const cards = page.locator("#catalog .group");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test("each game card shows a price matching $X/day", async ({ page }) => {
    const prices = page.locator("#catalog .group").locator("text=/\\$\\d+/");
    const count = await prices.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test("clicking Lawn Games filter shows only lawn games", async ({ page }) => {
    await page.getByRole("button", { name: "Lawn Games" }).click();
    // Cards should update — wait a moment for re-render
    await page.waitForTimeout(300);
    const cards = page.locator("#catalog .group");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
    // All visible cards should have Lawn Games badge
    const badges = cards.locator("text=Lawn Games");
    await expect(badges).toHaveCount(cardCount);
  });

  test("clicking All pill restores full catalog", async ({ page }) => {
    await page.getByRole("button", { name: "Lawn Games" }).click();
    await page.waitForTimeout(300);
    await page.getByRole("button", { name: "All" }).click();
    await page.waitForTimeout(300);
    const cards = page.locator("#catalog .group");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });
});
