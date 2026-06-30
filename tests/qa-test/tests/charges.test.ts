// PayFlow API test suite.
//
// Run with:  npm test          (single run)
//            npm run test:watch (watch mode)
//
// The one test below passes out of the box. Fill in the todos — and add new
// describe blocks freely. Where the API behaves incorrectly, assert the
// CORRECT behaviour, let the test fail, and document it in BUGS.md.

import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

// Wipe state before every test so tests don't bleed into each other.
beforeEach(async () => {
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

describe("POST /charges — happy path", () => {
  it("creates a successful charge with pm_ok", async () => {
    const res = await createCharge();

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.amountRefunded).toBe(0);
  });

  it.todo("declined charge has status 'failed'");
  it.todo("requires-action charge has status 'requires_action'");
});

describe("POST /charges — validation", () => {
  it.todo("rejects a missing amount");
  it.todo("rejects a non-integer amount (e.g. 19.99)");
  it.todo("rejects a zero or negative amount");
  it.todo("rejects an unsupported currency");
  it.todo("rejects a missing paymentMethodId");
});

describe("GET /ledger — consistency", () => {
  it.todo("balance equals the sum of all charge entries minus refund entries");
  it.todo("only succeeded charges appear in the ledger");
});

describe("POST /charges/:id/refunds — sequential", () => {
  it.todo("partial refund reduces the remaining refundable amount");
  it.todo("full refund brings amountRefunded to the charge amount");
  it.todo("cannot refund more than the original charge amount");
  it.todo("cannot refund a failed charge");
  it.todo("cannot refund a requires-action charge");
  it.todo("refunding with amount 0 is rejected");
});

describe("POST /charges/:id/refunds — concurrency", () => {
  // Fire both requests at the same time with Promise.all. Check the charge
  // AND the ledger after — the response body alone is not enough.
  it.todo("two simultaneous partial refunds cannot together exceed the charge amount");
});
