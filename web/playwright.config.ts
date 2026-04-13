import { defineConfig, devices } from "@playwright/test";

// When BASE_URL is set to an external host (e.g. Docker service name),
// skip the local webServer — the app is already running externally.
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const useExternalServer = !!process.env.BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Use system-installed Chromium when CHROMIUM_PATH is set (Docker CI)
        ...(process.env.CHROMIUM_PATH
          ? { executablePath: process.env.CHROMIUM_PATH }
          : {}),
      },
    },
  ],
  ...(useExternalServer
    ? {}
    : {
        webServer: {
          command: "npm run dev",
          url: "http://localhost:3000",
          reuseExistingServer: true,
          timeout: 120000,
        },
      }),
});
