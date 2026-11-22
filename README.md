# Nixer

Get it done. Locally. A marketplace for local handymen and trades across Ireland.

## Pricing model (hybrid)

- **Hourly**: handyman and maintenance jobs under €500. The customer books a Nixer at their hourly rate and pays for time used.
- **Fixed-price quotes**: building and trade projects over €500. The customer gets up to 3 itemised quotes and pays in milestones held in escrow.

Trade categories always go to quotes. Handyman jobs switch to quotes automatically if the estimate goes over the threshold.
Currency, threshold and fees all live in `src/lib/pricing.js`.

## Run

```bash
npm install
npm run dev
npm run build
```

## Structure

- `src/pages/`: Home, Services, Pricing (with a cost calculator), Book (the posting flow), Nixers (directory), Become (sign-up)
- `src/data.js`: demo services, counties and Nixer profiles (replace with an API)
- `src/lib/pricing.js`: pricing rules
- `public/`: logo assets (full logo, mark, wordmark, favicon)

This is front-end only for now. Forms show a confirmation but don't send anything yet.
