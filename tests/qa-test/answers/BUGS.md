# BUGS.md

## 1. Concurrent partial refunds over-refund the charge and push the ledger negative

**Expected:** Two simultaneous partial refunds that together exceed the charge amount should not both succeed. At most one should be applied; the other should be rejected with `refund_exceeds_remaining`. The ledger balance must never go below zero.

**Actual:** Both refunds complete with HTTP 200. The charge's `amountRefunded` field is written with a stale value (each request captured it as 0 before either write landed), so the field reads as 600 — which looks correct. But the ledger receives two separate −600 entries, making the running balance −200.

**Severity:** Critical. A payments ledger that goes negative means the service is reporting money it doesn't have. Customers are being refunded more than was collected. This is a silent data-integrity failure: the response bodies look reasonable, but the ledger is wrong.

**Reproduced by:** `POST /charges/:id/refunds — concurrency > two simultaneous partial refunds cannot together exceed the charge amount`

---

## 2. Failed and action-required charges incorrectly appear in the ledger

**Expected:** Only `succeeded` charges should generate a ledger entry. A `pm_decline` charge means no money was collected; a `pm_action` charge means the customer hasn't completed the payment flow. Neither should affect the running balance.

**Actual:** Every charge — regardless of status — produces a positive ledger entry. After creating a single `pm_decline` charge of 1000, the ledger balance is 1000 instead of 0.

**Severity:** High. The ledger balance overstates income for every non-successful charge. Reporting, reconciliation, and any downstream balance check will be wrong. Unlike the refund race, this is reproducible with a simple sequential test.

**Reproduced by:** `GET /ledger — consistency > only succeeded charges appear in the ledger`

---

## 3. Unsupported currency values are accepted without error

**Expected:** `POST /charges` with `currency: "MOON"` (or any value outside `USD`, `GBP`, `EUR`, `JPY`) should return `400 invalid_request`.

**Actual:** The request succeeds with `201`. The currency field is validated only for truthiness (`!body.currency`), not against the supported set.

**Severity:** Medium. Charges with nonsense currencies are accepted and stored, making the ledger uninterpretable and breaking any downstream currency-conversion or settlement logic. Not immediately exploitable for financial loss, but a clear contract violation.

**Reproduced by:** `POST /charges — validation > rejects an unsupported currency`
