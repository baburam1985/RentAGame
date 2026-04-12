import { test, expect } from "@playwright/test";

test("homepage title contains RentAGame", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/RentAGame/i);
});
