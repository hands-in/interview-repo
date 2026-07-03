import { defineConfig } from "@playwright/test";

// Playwright-as-test-runner suite. No browser involved — tests hit the
// Express app in-process via supertest, same as the Vitest suite. This is
// the Playwright-flavoured equivalent of tests/api/, for candidates who are
// more comfortable with Playwright Test than Jest/Vitest.
export default defineConfig({
  testDir: "./tests/playwright",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  reporter: "list",
});
