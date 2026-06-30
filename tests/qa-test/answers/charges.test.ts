// INTERVIEWER ANSWER KEY — do not share with candidates.
//
// This file is outside the vitest `include` glob (tests/**) so it does not
// run with `npm test`. To run it explicitly:
//
//   npx vitest run answers/charges.test.ts
//
// Expected results:
//   PASS  — 14 tests (correct API behaviour)
//   FAIL  — 3 tests  (the planted bugs; they assert correct behaviour)
//
// The three failing tests are the signal. A strong candidate writes exactly
// these assertions and documents the failures in BUGS.md.

import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

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
// POST /charges — happy path                                        ALL PASS
// ---------------------------------------------------------------------------

describe("POST /charges — happy path", () => {
  it("creates a successful charge with pm_ok", async () => {
    const res = await createCharge();

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.amountRefunded).toBe(0);
    expect(res.body.id).toMatch(/^ch_/);
  });

  it("declined charge has status 'failed'", async () => {
    const res = await createCharge({ paymentMethodId: "pm_decline" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("failed");
  });

  it("requires-action charge has status 'requires_action'", async () => {
    const res = await createCharge({ paymentMethodId: "pm_action" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("requires_action");
  });
});

// ---------------------------------------------------------------------------
// POST /charges — input validation                        1 FAILS (currency)
// ---------------------------------------------------------------------------

describe("POST /charges — validation", () => {
  it("rejects a missing amount", async () => {
    const res = await request(app)
      .post("/charges")
      .send({ currency: "USD", paymentMethodId: "pm_ok" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  it("rejects a non-integer amount", async () => {
    const res = await createCharge({ amount: 19.99 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  it("rejects a zero amount", async () => {
    const res = await createCharge({ amount: 0 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  it("rejects a negative amount", async () => {
    const res = await createCharge({ amount: -500 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  // ✗ FAILS — BUG: currency is only checked for truthiness, not validated
  // against the supported set (USD, GBP, EUR, JPY). "MOON" is accepted and
  // returns 201. Correct behaviour is 400 invalid_request.
  it("rejects an unsupported currency", async () => {
    const res = await createCharge({ currency: "MOON" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  it("rejects a missing paymentMethodId", async () => {
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

describe("GET /ledger — consistency", () => {
  it("balance equals the sum of all charge entries minus refund entries", async () => {
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
  it("only succeeded charges appear in the ledger", async () => {
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

describe("POST /charges/:id/refunds — sequential", () => {
  it("partial refund reduces the remaining refundable amount", async () => {
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

  it("full refund brings amountRefunded to the charge amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });
    const { body: updated } = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 1000 });

    expect(updated.amountRefunded).toBe(1000);
  });

  it("cannot refund more than the original charge amount", async () => {
    const { body: charge } = await createCharge({ amount: 1000 });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 1001 });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("refund_exceeds_remaining");
  });

  it("cannot refund a failed charge", async () => {
    const { body: charge } = await createCharge({ paymentMethodId: "pm_decline" });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 100 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("charge_not_refundable");
  });

  it("cannot refund a requires-action charge", async () => {
    const { body: charge } = await createCharge({ paymentMethodId: "pm_action" });
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 100 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("charge_not_refundable");
  });

  it("refunding with amount 0 is rejected", async () => {
    const { body: charge } = await createCharge();
    const res = await request(app)
      .post(`/charges/${charge.id}/refunds`)
      .send({ amount: 0 });

    expect(res.status).toBe(400);
  });

  it("returns 404 for an unknown charge id", async () => {
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

describe("POST /charges/:id/refunds — concurrency", () => {
  // ✗ FAILS — BUG: refund() reads amountRefunded, yields the event loop
  // (await tick()), then writes using the stale captured value. Two concurrent
  // partial refunds each read amountRefunded=0, both pass the cap check
  // (600 ≤ 1000), both write amountRefunded=600, and both push a −600 ledger
  // entry. Result: charge.amountRefunded=600 (looks plausible), but the ledger
  // has −1200 in refunds → balance drops to −200.
  //
  // The response bodies alone don't reveal the bug. You must check the ledger.
  it("two simultaneous partial refunds cannot together exceed the charge amount", async () => {
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
