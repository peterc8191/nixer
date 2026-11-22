import { useState } from "react";
import Icon from "../components/Icon.jsx";
import PricingLanes from "../components/PricingLanes.jsx";
import { THRESHOLD, money, hourlyEstimate, HOURLY_SERVICE_FEE, QUOTE_PLATFORM_FEE } from "../lib/pricing.js";

const FAQ = [
  ["What if an hourly job turns out bigger than expected?",
    `Your Nixer will flag it before going over. If the job looks like it will pass ${money(THRESHOLD)}, you can switch it to a fixed-price quote with no penalty, and pay only for the hours already worked.`],
  ["Are quotes really fixed?",
    "Yes. The quote you accept is the price you pay. If you change the scope, the trade sends a variation for you to approve first. Nothing is added without your say-so."],
  ["How do milestone payments work?",
    "Fixed-price projects are split into stages, such as deposit, first fix and completion. You fund each stage up front, we hold it securely, and the trade is paid when you sign the stage off."],
  ["Is VAT included?",
    "Hourly rates and quotes are shown VAT inclusive, so there are no surprises at the end. VAT-registered trades provide a proper VAT invoice."],
  ["Do I pay anything to get quotes?",
    "No. Posting a project and receiving quotes is free, and there's no obligation to accept any of them."],
];

export default function Pricing() {
  const [rate, setRate] = useState(40);
  const [hours, setHours] = useState(3);
  const est = hourlyEstimate({ rate, hours });
  const over = est.total > THRESHOLD;
  const scale = THRESHOLD * 1.6;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Hourly for small jobs. Fixed quotes for big ones.</h1>
          <p className="lead">
            Nixer uses a hybrid model. Handyman and maintenance jobs under {money(THRESHOLD)} are paid by the hour.
            Building and trade projects over {money(THRESHOLD)} get fixed-price quotes.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <PricingLanes detailed />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container calc-grid">
          <div>
            <span className="eyebrow">Try it</span>
            <h2>What would my job cost?</h2>
            <p>Move the sliders to see an hourly estimate, and the point where a job tips over into quote territory.</p>
            <div className="threshold-bar" aria-hidden="true">
              <div className="tb-fill" style={{ width: `${Math.min(100, (est.total / scale) * 100)}%` }} data-over={over} />
              <div className="tb-mark" style={{ left: `${(THRESHOLD / scale) * 100}%` }}><span>{money(THRESHOLD)}</span></div>
            </div>
          </div>
          <div className="calc-card">
            <label className="slider">
              <span>Hourly rate <strong>{money(rate)}/hr</strong></span>
              <input type="range" min="25" max="70" step="1" value={rate} onChange={(e) => setRate(+e.target.value)} />
            </label>
            <label className="slider">
              <span>Estimated time <strong>{hours} {hours === 1 ? "hour" : "hours"}</strong></span>
              <input type="range" min="1" max="16" step="0.5" value={hours} onChange={(e) => setHours(+e.target.value)} />
            </label>
            <dl className="breakdown">
              <div><dt>Labour</dt><dd>{money(est.labour)}</dd></div>
              <div><dt>Service fee ({Math.round(HOURLY_SERVICE_FEE * 100)}%)</dt><dd>{money(est.fee)}</dd></div>
              <div className="total"><dt>Estimated total</dt><dd>{money(est.total)}</dd></div>
            </dl>
            <div className={`verdict ${over ? "is-quote" : ""}`}>
              <Icon name={over ? "doc" : "clock"} size={20} />
              {over
                ? <span>Over {money(THRESHOLD)}. We'd recommend <strong>fixed-price quotes</strong> for this one.</span>
                : <span>Under {money(THRESHOLD)}. <strong>Book by the hour</strong> and pay for time used.</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fees</span>
            <h2>Simple, upfront fees</h2>
          </div>
          <div className="fee-grid">
            <div className="fee"><span className="fee-num">{Math.round(HOURLY_SERVICE_FEE * 100)}%</span><h3>Hourly service fee</h3><p>Added to hourly bookings. Covers insurance, vetting and support.</p></div>
            <div className="fee"><span className="fee-num">{money(0)}</span><h3>To request quotes</h3><p>Post a project and compare quotes for free.</p></div>
            <div className="fee"><span className="fee-num">{Math.round(QUOTE_PLATFORM_FEE * 100)}%</span><h3>Trade platform fee</h3><p>Paid by the trade on accepted fixed-price jobs, never added to your quote.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container narrow">
          <div className="section-head"><h2>Pricing questions</h2></div>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
