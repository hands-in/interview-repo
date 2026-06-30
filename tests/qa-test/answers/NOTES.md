# NOTES.md

## What I'd test next with more time

**Idempotency under load.** The `Idempotency-Key` header is documented but I only verified sequential retries. With more time I'd test concurrent retries with the same key to confirm the API doesn't double-charge under a retry storm — the most common real-world failure mode for payment APIs.

**Ledger internal consistency.** I checked that the balance matches the sum of entries, but didn't verify that every ledger entry references a charge that actually exists (no orphaned entries). Worth adding.

**Partial refund sequencing.** I tested one partial refund followed by a second that exhausts the remainder. I didn't test three or more sequential partial refunds, or the boundary where `amountRefunded` equals `amount` exactly and a further refund of 1 is rejected.

**Currency-specific behaviour.** JPY is zero-decimal — 100 yen, not 1.00 yen. I'd add tests confirming that a 100 JPY charge is stored and returned as `100`, not `1`, and that the ledger arithmetic stays in whole numbers.

**`GET /charges/:id` for missing IDs.** I covered this via the refund path but didn't test the fetch endpoint directly with a nonexistent ID.

## Assumptions

- `/_reset` is test-only infrastructure and is not available in production; I treat it as a test helper, not an auth gap.
- `amountRefunded` on the charge object and the sum of ledger refund entries for that charge should always agree. In the concurrent refund bug they diverge (600 vs 1200) — I flagged that in BUGS.md.
- "smallest currency unit" means the API never divides or rounds amounts; all arithmetic is integer-safe.

## How I'd run this in CI

```yaml
# .github/workflows/qa.yml
- run: npm ci
- run: npm test -- --reporter=verbose
```

The suite is fast (< 1 s) and fully in-process — no external services, no ports to bind. One job, no parallelism needed.

For the concurrency tests specifically: because the race is deterministic (Node's event loop, `setImmediate`), these tests are not flaky — they reproduce 100% of the time. No retries or `--retry` flags needed.

If the suite grew, I'd split the concurrency tests into their own file and tag them (`@slow` or `@concurrent`) so they can be run separately from fast unit-style validation tests.
