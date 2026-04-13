/**
 * UI Screenshot Capture Script
 *
 * Captures screenshots of all key pages and saves them to web/screenshots/.
 * Run after every QA merge to maintain a visual history of the UI.
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs
 *   node scripts/capture-screenshots.mjs --base-url=http://localhost:3000
 *
 * Requirements:
 *   - Dev server running on localhost:3000 (or specify --base-url)
 *   - Playwright installed (npx playwright install chromium)
 */

import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = join(__dirname, "..", "screenshots");

const args = process.argv.slice(2);
const baseUrlArg = args.find((a) => a.startsWith("--base-url="));
const BASE_URL = baseUrlArg ? baseUrlArg.split("=")[1] : "http://localhost:3000";

/** Pages to capture — add new pages here as the app grows */
const PAGES = [
  { name: "01-homepage", path: "/", fullPage: false, description: "Homepage above the fold" },
  { name: "02-homepage-full", path: "/", fullPage: true, description: "Homepage full page" },
  { name: "03-cart-empty", path: "/cart", fullPage: false, description: "Cart page (empty state)" },
  { name: "04-game-detail", path: "/games/giant-jenga", fullPage: false, description: "Game detail page" },
  { name: "05-game-detail-full", path: "/games/giant-jenga", fullPage: true, description: "Game detail full page" },
];

async function captureScreenshots() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const results = [];

  for (const { name, path, fullPage, description } of PAGES) {
    const url = `${BASE_URL}${path}`;
    console.log(`Capturing: ${description} (${url})`);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // wait for images to load

    const filename = `${name}.png`;
    const filepath = join(SCREENSHOT_DIR, filename);

    await page.screenshot({ path: filepath, fullPage });
    results.push({ name, filename, description });
    console.log(`  → Saved: screenshots/${filename}`);
  }

  // Write a manifest so anyone can see what was captured
  const manifest = {
    capturedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    viewport: "1280x800",
    pages: results,
  };
  writeFileSync(
    join(SCREENSHOT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n"
  );

  await browser.close();

  console.log(`\nDone! ${results.length} screenshots saved to web/screenshots/`);
  console.log(`Manifest: web/screenshots/manifest.json`);
}

captureScreenshots().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
