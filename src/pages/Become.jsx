import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { SERVICES, COUNTIES } from "../data.js";
import { THRESHOLD, money, QUOTE_PLATFORM_FEE } from "../lib/pricing.js";

const PERKS = [
  ["euro", "Set your own rate", "Charge what you're worth. Most handymen on Nixer earn €30–€60 an hour."],
  ["clock", "Work when you want", "Evenings, weekends or full-time. Accept only the jobs that suit you."],
  ["lock", "Guaranteed payment", "Customers pay up front into a secure account. Money lands within 2 working days."],
  ["shield", "Cover included", "Public liability cover on every hourly job booked through Nixer."],
];

export default function Become() {
  const [type, setType] = useState("individual");
  const [picked, setPicked] = useState([]);
  const [sent, setSent] = useState(false);

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const shown = SERVICES.filter((s) => type === "business" || s.mode === "hourly");

  return (
    <>
      <section className="page-head page-head-green">
        <div className="container">
          <span className="eyebrow">Become a Nixer</span>
          <h1>Turn your skills into steady nixers</h1>
          <p className="lead">Join handymen and trades across Ireland finding local work on their own terms. Free to join.</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container perk-grid">
          {PERKS.map(([icon, title, text]) => (
            <div key={title} className="perk">
              <span className="lane-icon small"><Icon name={icon} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="container become-grid">
          <div>
            <h2>Two ways to earn</h2>
            <div className="earn">
              <h3><Icon name="clock" size={20} /> Hourly jobs</h3>
              <p>Handyman and maintenance work under {money(THRESHOLD)}. Customers book you directly at your hourly rate. You keep 100% of your rate; the customer pays the service fee.</p>
            </div>
            <div className="earn is-quote">
              <h3><Icon name="doc" size={20} /> Quoted projects</h3>
              <p>For registered trades and building firms. Receive project leads over {money(THRESHOLD)}, send itemised fixed-price quotes, and get paid in protected milestones. {Math.round(QUOTE_PLATFORM_FEE * 100)}% platform fee only when you win the job.</p>
            </div>
            <h3 className="req-head">What you'll need</h3>
            <ul className="ticks">
              <li><Icon name="check" size={18} /> Photo ID and a PPSN</li>
              <li><Icon name="check" size={18} /> For trades: insurance and relevant registration (Safe Electric, RGII, etc.)</li>
              <li><Icon name="check" size={18} /> An Irish bank account (IBAN)</li>
            </ul>
          </div>

          <div className="panel">
            {sent ? (
              <div className="confirm">
                <span className="confirm-icon"><Icon name="check" size={36} strokeWidth={2.5} /></span>
                <h2>Thanks, you're on the list</h2>
                <p>We'll email you next steps for ID checks.</p>
                <p className="muted small">This is a demo. Nothing has actually been submitted.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h2>Apply in 2 minutes</h2>
                <div className="segmented full" role="tablist">
                  <button type="button" role="tab" aria-selected={type === "individual"} className={type === "individual" ? "active" : ""} onClick={() => setType("individual")}>Individual</button>
                  <button type="button" role="tab" aria-selected={type === "business"} className={type === "business" ? "active" : ""} onClick={() => setType("business")}>Trade business</button>
                </div>
                <div className="form-row">
                  <label className="field"><span>{type === "business" ? "Business name" : "Full name"}</span><input required /></label>
                  <label className="field"><span>Email</span><input type="email" required /></label>
                </div>
                <div className="form-row">
                  <label className="field"><span>Mobile</span><input type="tel" placeholder="08X XXX XXXX" required /></label>
                  <label className="field">
                    <span>Based in</span>
                    <select defaultValue="Dublin">{COUNTIES.map((c) => <option key={c}>{c}</option>)}</select>
                  </label>
                </div>
                <div className="field">
                  <span>Services you offer</span>
                  <div className="chip-grid tight">
                    {shown.map((s) => (
                      <button type="button" key={s.id} className={`chip ${s.mode === "quote" ? "is-quote" : ""} ${picked.includes(s.id) ? "active" : ""}`} onClick={() => toggle(s.id)}>
                        <Icon name={s.icon} size={18} /> {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                {type === "individual" && (
                  <label className="field">
                    <span>Your hourly rate</span>
                    <span className="money-input">€<input type="number" min="20" max="150" defaultValue="35" /></span>
                  </label>
                )}
                <button className="btn btn-primary btn-lg block" disabled={!picked.length}>Apply to join</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
