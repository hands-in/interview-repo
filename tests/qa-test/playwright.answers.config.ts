import { defineConfig } from "@playwright/test";

// Runs the interviewer answer key (answers/charges.playwright.test.ts) in
// isolation. Separate from playwright.config.ts so the answer key never gets
// picked up by `npm run test:playwright` (which only looks at
// tests/playwright/**/*.spec.ts).
export default defineConfig({
  testDir: "./answers",
  testMatch: "charges.playwright.test.ts",
  fullyParallel: true,
  reporter: "list",
});
