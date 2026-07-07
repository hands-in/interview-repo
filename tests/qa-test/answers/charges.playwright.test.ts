// INTERVIEWER ANSWER KEY (Playwright) — do not share with candidates.
//
// This is the Playwright-flavoured equivalent of answers/charges.test.ts —
// same scenarios, same helpers, same three planted bugs, written against
// tests/playwright/charges.spec.ts's test.fixme() placeholders instead of
// tests/api/charges.test.ts's it.todo() ones.
//
// This file is named *.test.ts (not *.spec.ts) and lives outside
// playwright.config.ts's testDir ("./tests/playwright"), so it is not picked
// up by `npm run test:playwright`. To run it explicitly:
//
//   npx playwright test answers/charges.playwright.test.ts --config playwright.answers.config.ts
//
// Expected results:
//   PASS  — 14 tests (correct API behaviour)
//   FAIL  — 3 tests  (the planted bugs; they assert correct behaviour)
//
// The three failing tests are the signal. A strong candidate writes exactly
// these assertions and documents the failures in BUGS.md.

import { test, expect } from "@playwright/test";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

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
// POST /charges — happy path                                        ALL PASS
// ---------------------------------------------------------------------------

test.describe("POST /charges — happy path", () => {
  test("creates a successful charge with pm_ok", async () => {
    const res = await createCharge();

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.amountRefunded).toBe(0);
    expect(res.body.id).toMatch(/^ch_/);
  });

  test("declined charge has status 'failed'", async () => {
    const res = await createCharge({ paymentMethodId: "pm_decline" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("failed");
  });

  test("requires-action charge has status 'requires_action'", async () => {
    const res = await createCharge({ paymentMethodId: "pm_action" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("requires_action");
  });
});

// ---------------------------------------------------------------------------
// POST /charges — input validation                        1 FAILS (currency)
// ---------------------------------------------------------------------------

test.describe("POST /charges — validation", () => {
  test("rejects a missing amount", async () => {
    const res = await request(app)
      .post("/charges")
      .send({ currency: "USD", paymentMethodId: "pm_ok" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  test("rejects a non-integer amount", async () => {
    const res = await createCharge({ amount: 19.99 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  test("rejects a zero amount", async () => {
    const res = await createCharge({ amount: 0 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  test("rejects a negative amount", async () => {
    const res = await createCharge({ amount: -500 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  // ✗ FAILS — BUG: currency is only checked for truthiness, not validated
  // against the supported set (USD, GBP, EUR, JPY). "MOON" is accepted and
  // returns 201. Correct behaviour is 400 invalid_request.
  test("rejects an unsupported currency", async () => {
    const res = await createCharge({ currency: "MOON" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  test("rejects a missing paymentMethodId", async () => {
    const res = await request(app)
      .post("/charges")
      .send({ amount: 1000, currency: "USD" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });
});

// ---------------------------------------------------------------------------
// GET /ledger — consistency                         1 FAILS (failed charges)
// ---------------------------------------------------------------------------

test.describe("GET /ledger — consistency", () => {
  test("balance equals the sum of all charge entries minus refund entries", async () => {
    const { body: charge } = await createCharge({ amount: 2000 });
    await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 500 });

    const { body: ledger } = await request(app).get("/ledger");

    const computed = ledger.entries.reduce(
      (sum: number, e: { amount: number }) => sum + e.amount,
      0,
    );
    expect(ledger.balance).toBe(computed); // internal consistency
    expect(ledger.balance).toBe(1500);     // 2000 charge − 500 refund
  });

  // ✗ FAILS — BUG: every charge goes on the ledger regardless of status.
  // A declined or action-required payment never collected money, so it must
  // not appear as income. After a pm_decline charge the balance should be 0;
  // it is actually 1000 because the entry was written unconditionally.
  test("only succeeded charges appear in the ledger", async () => {
    await createCharge({ paymentMethodId: "pm_decline", amount: 1000 });
    await createCharge({ paymentMethodId: "pm_action", amount: 2000 });

    const { body: ledger } = await request(app).get("/ledger");

    expect(ledger.balance).toBe(0);
    expect(ledger.entries).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// POST /charges/:id/refunds — sequential                            ALL PASS
// ---------------------------------------------------------------------------

test.describe("POST /charges/:id/refunds — sequential", () => {
  test("partial refund reduces the remaining refundable amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });
    const { body: updated } = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 400 });

    expect(updated.amountRefunded).toBe(400);

    // A second refund of 600 (exactly what remains) should succeed.
    const second = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 600 });
    expect(second.status).toBe(200);
    expect(second.body.amountRefunded).toBe(1000);
  });

  test("full refund brings amountRefunded to the charge amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });
    const { body: updated } = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 1000 });

    expect(updated.amountRefunded).toBe(1000);
  });

  test("cannot refund more than the original charge amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 1001 });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("refund_exceeds_remaining");
  });

  test("cannot refund a failed charge", async () => {
    const { body: charge } = await createCharge({ paymentMethodId: "pm_decline" });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 100 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("charge_not_refundable");
  });

  test("cannot refund a requires-action charge", async () => {
    const { body: charge } = await createCharge({ paymentMethodId: "pm_action" });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 100 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("charge_not_refundable");
  });

  test("refunding with amount 0 is rejected", async () => {
    const { body: charge } = await createCharge();
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 0 });

    expect(res.status).toBe(400);
  });

  test("returns 404 for an unknown charge id", async () => {
    const res = await request(app)
      .post("/charges/ch_doesnotexist/refunds")
      .send({ amount: 100 });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("charge_not_found");
  });
});

// ---------------------------------------------------------------------------
// POST /charges/:id/refunds — concurrency              1 FAILS (refund race)
// ---------------------------------------------------------------------------

test.describe("POST /charges/:id/refunds — concurrency", () => {
  // ✗ FAILS — BUG: refund() reads amountRefunded, yields the event loop
  // (await tick()), then writes using the stale captured value. Two concurrent
  // partial refunds each read amountRefunded=0, both pass the cap check
  // (600 ≤ 1000), both write amountRefunded=600, and both push a −600 ledger
  // entry. Result: charge.amountRefunded=600 (looks plausible), but the ledger
  // has −1200 in refunds → balance drops to −200.
  //
  // The response bodies alone don't reveal the bug. You must check the ledger.
  test("two simultaneous partial refunds cannot together exceed the charge amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });

    await Promise.all([
      request(app).post(`/charges/${charge.id}/refunds`).send({ amount: 600 }),
      request(app).post(`/charges/${charge.id}/refunds`).send({ amount: 600 }),
    ]);

    const { body: ledger } = await request(app).get("/ledger");
    const { body: updated } = await request(app).get(`/charges/${charge.id}`);

    // Total refunded across both the charge record and the ledger must be ≤ 1000.
    expect(updated.amountRefunded).toBeLessThanOrEqual(1000);

    const totalRefundedOnLedger = ledger.entries
      .filter((e: { type: string }) => e.type === "refund")
      .reduce((sum: number, e: { amount: number }) => sum + Math.abs(e.amount), 0);
    expect(totalRefundedOnLedger).toBeLessThanOrEqual(1000); // fails: 1200

    expect(ledger.balance).toBeGreaterThanOrEqual(0); // fails: −200
  });
});
