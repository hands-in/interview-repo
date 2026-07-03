// PayFlow API test suite — Playwright Test + Supertest.
//
// This is the Playwright-flavoured equivalent of tests/api/charges.test.ts.
// Playwright Test is used purely as the runner/assertion library here — no
// browser, no pages. Requests go straight to the in-process Express app via
// supertest, exactly like the Vitest suite does.
//
// Run with:  npm run test:playwright
//
// Prefer Jest/Vitest? Use tests/api/charges.test.ts instead — same
// scenarios, same helpers. Pick ONE suite, not both.
//
// The one test below passes out of the box. Fill in the test.fixme()
// placeholders — and add new describe blocks freely. Where the API behaves
// incorrectly, assert the CORRECT behaviour, let the test fail, and document
// it in BUGS.md.

import { test, expect } from "@playwright/test";
import request from "supertest";
import { createApp } from "../../src/app.js";

const app = createApp();

// Wipe state before every test so tests don't bleed into each other.
test.beforeEach(async () => {
  await request(app).post("/_reset");
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function createCharge(
  overrides: Record<string, unknown> = {},
  headers: Record<string, string> = {},
) {
  return request(app)
    .post("/charges")
    .set(headers)
    .send({ amount: 1000, currency: "USD", paymentMethodId: "pm_ok", ...overrides });
}

// ---------------------------------------------------------------------------

test.describe("POST /charges — happy path", () => {
  test("creates a successful charge with pm_ok", async () => {
    const res = await createCharge();

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.amountRefunded).toBe(0);
  });

  test.fixme("declined charge has status 'failed'", async () => {});
  test.fixme("requires-action charge has status 'requires_action'", async () => {});
});

test.describe("POST /charges — validation", () => {
  test.fixme("rejects a missing amount", async () => {});
  test.fixme("rejects a non-integer amount (e.g. 19.99)", async () => {});
  test.fixme("rejects a zero or negative amount", async () => {});
  test.fixme("rejects an unsupported currency", async () => {});
  test.fixme("rejects a missing paymentMethodId", async () => {});
});

test.describe("GET /ledger — consistency", () => {
  test.fixme("balance equals the sum of all charge entries minus refund entries", async () => {});
  test.fixme("only succeeded charges appear in the ledger", async () => {});
});

test.describe("POST /charges/:id/refunds — sequential", () => {
  test.fixme("partial refund reduces the remaining refundable amount", async () => {});
  test.fixme("full refund brings amountRefunded to the charge amount", async () => {});
  test.fixme("cannot refund more than the original charge amount", async () => {});
  test.fixme("cannot refund a failed charge", async () => {});
  test.fixme("cannot refund a requires-action charge", async () => {});
  test.fixme("refunding with amount 0 is rejected", async () => {});
});

test.describe("POST /charges/:id/refunds — concurrency", () => {
  // Fire both requests at the same time with Promise.all. Check the charge
  // AND the ledger after — the response body alone is not enough.
  test.fixme("two simultaneous partial refunds cannot together exceed the charge amount", async () => {});
});
