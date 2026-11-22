// Nixer hybrid pricing model.
//
//  - HOURLY: handyman & maintenance jobs expected to cost under the threshold.
//    The customer books a Nixer at their hourly rate and pays for time used.
//  - QUOTE:  building & trade projects over the threshold. The customer posts
//    the job, receives fixed-price quotes, and pays in milestones held in escrow.
//
// Change CURRENCY / THRESHOLD here and the whole site follows.

export const CURRENCY = "€";
export const LOCALE = "en-IE";
export const THRESHOLD = 500;

// Platform fees (placeholder business terms; adjust before launch).
export const HOURLY_SERVICE_FEE = 0.1; // 10% added to hourly bookings
export const QUOTE_PLATFORM_FEE = 0.05; // 5% on accepted fixed-price quotes
export const MIN_BOOKING_HOURS = 1;

export function money(amount, { decimals = 0 } = {}) {
  return (
    CURRENCY +
    Number(amount).toLocaleString(LOCALE, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

/** Estimate for an hourly job: labour + materials + service fee. */
export function hourlyEstimate({ rate, hours, materials = 0 }) {
  const h = Math.max(MIN_BOOKING_HOURS, Number(hours) || 0);
  const labour = rate * h;
  const subtotal = labour + Number(materials || 0);
  const fee = subtotal * HOURLY_SERVICE_FEE;
  return { hours: h, labour, materials: Number(materials || 0), fee, total: subtotal + fee };
}

/**
 * Decide which pricing lane a job belongs in.
 * Trade/building categories always go to quotes; handyman categories go to
 * hourly unless the estimate crosses the threshold.
 */
export function pricingMode(service, estimateTotal) {
  if (!service) return null;
  if (service.mode === "quote") return "quote";
  return estimateTotal > THRESHOLD ? "quote" : "hourly";
}
