import { useMemo, useState } from "react";
import Icon from "../components/Icon.jsx";
import NixerCard from "../components/NixerCard.jsx";
import { SERVICES, NIXERS, COUNTIES, serviceById } from "../data.js";
import { THRESHOLD, money, hourlyEstimate, pricingMode } from "../lib/pricing.js";

const BUDGETS = ["€500 – €2,000", "€2,000 – €5,000", "€5,000 – €15,000", "€15,000 – €50,000", "€50,000+", "Not sure yet"];
const TIMEFRAMES = ["As soon as possible", "Within a month", "In 1–3 months", "Just planning"];
const MILESTONES = [
  ["Deposit", 0.2, "Held when you accept the quote, so the trade can order materials"],
  ["Mid-point", 0.5, "Released when you sign off the agreed stage, e.g. first fix"],
  ["Completion", 0.3, "Released when the job is finished and snagged"],
];
// Eircode shape: routing key (e.g. A65, D6W) + 4-char unique identifier.
const eircodeValid = (v) => /^([AC-FHKNPRTV-Y]\d{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i.test(v.trim());

export default function Book({ params }) {
  const preNixer = NIXERS.find((n) => String(n.id) === params.nixer);
  const [step, setStep] = useState(params.service ? 2 : 1);
  const [serviceId, setServiceId] = useState(params.service || "");
  const [county, setCounty] = useState(params.county || preNixer?.county || "Dublin");
  const [eircode, setEircode] = useState("");
  const [details, setDetails] = useState("");
  const [hours, setHours] = useState(serviceById(params.service)?.typicalHours ?? 2);
  const [materials, setMaterials] = useState(0);
  const [nixerId, setNixerId] = useState(preNixer?.rate ? preNixer.id : null);
  const [budget, setBudget] = useState("");
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[0]);
  const [quotes, setQuotes] = useState(3);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);

  const service = serviceById(serviceId);
  const nixer = NIXERS.find((n) => n.id === nixerId);
  const rate = nixer?.rate ?? service?.fromRate ?? 0;
  const est = service?.mode === "hourly" ? hourlyEstimate({ rate, hours, materials }) : null;
  const mode = pricingMode(service, est?.total ?? 0);
  const switched = service?.mode === "hourly" && mode === "quote";

  const candidates = useMemo(() => {
    if (!service) return [];
    const all = NIXERS.filter((n) => n.services.includes(service.id) && (mode === "quote" || n.rate));
    return [...all.filter((n) => n.county === county), ...all.filter((n) => n.county !== county)];
  }, [service, county, mode]);

  function chooseService(id) {
    setServiceId(id);
    setHours(serviceById(id).typicalHours ?? 2);
    setNixerId(null);
    setStep(2);
  }

  const canStep2 = details.trim().length >= 10 && eircodeValid(eircode);
  const canSubmit =
    contact.name.trim() && /\S+@\S+\.\S+/.test(contact.email) &&
    (mode === "hourly" ? !!nixer : !!budget);

  if (done) return <Confirmation mode={mode} service={service} nixer={nixer} est={est} quotes={quotes} county={county} />;

  return (
    <section className="section book">
      <div className="container book-grid">
        <div className="book-main">
          <ol className="stepper" aria-label="Progress">
            {["Service", "Details", mode === "quote" ? "Quotes" : "Your Nixer"].map((label, i) => (
              <li key={label} className={step === i + 1 ? "current" : step > i + 1 ? "done" : ""}>
                <span>{step > i + 1 ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}</span>{label}
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className="panel">
              <h1>What do you need done?</h1>
              <h2 className="sub">Handyman &amp; maintenance <span className="badge badge-hourly"><Icon name="clock" size={14} /> Hourly</span></h2>
              <div className="chip-grid">
                {SERVICES.filter((s) => s.mode === "hourly").map((s) => (
                  <button key={s.id} className={`chip ${serviceId === s.id ? "active" : ""}`} onClick={() => chooseService(s.id)}>
                    <Icon name={s.icon} size={20} /> {s.name}
                  </button>
                ))}
              </div>
              <h2 className="sub">Building &amp; trade projects <span className="badge badge-quote"><Icon name="doc" size={14} /> Fixed quote</span></h2>
              <div className="chip-grid">
                {SERVICES.filter((s) => s.mode === "quote").map((s) => (
                  <button key={s.id} className={`chip is-quote ${serviceId === s.id ? "active" : ""}`} onClick={() => chooseService(s.id)}>
                    <Icon name={s.icon} size={20} /> {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && service && (
            <div className="panel">
              <button className="back" onClick={() => setStep(1)}>← Change service</button>
              <h1>{service.name}</h1>
              <div className="form-row">
                <label className="field">
                  <span>County</span>
                  <select value={county} onChange={(e) => setCounty(e.target.value)}>
                    {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Eircode</span>
                  <input value={eircode} onChange={(e) => setEircode(e.target.value.toUpperCase())} placeholder="e.g. D02 X285" maxLength={8} />
                  {eircode && !eircodeValid(eircode) && <small className="err">Enter a valid Eircode, e.g. T12 AB34</small>}
                </label>
              </div>
              <label className="field">
                <span>Describe the job</span>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={service.mode === "hourly" ? "e.g. Assemble a 3-door wardrobe and fix it to the wall" : "e.g. Full bathroom refit: remove old suite, tile floor and walls, new shower, toilet and vanity"}
                />
              </label>

              {service.mode === "hourly" && (
                <div className="estimate-box">
                  <label className="slider">
                    <span>How long do you think it'll take? <strong>{hours} {hours === 1 ? "hour" : "hours"}</strong></span>
                    <input type="range" min="1" max="16" step="0.5" value={hours} onChange={(e) => setHours(+e.target.value)} />
                    <small>Typical for this job: about {service.typicalHours} hours. You only pay for time actually worked.</small>
                  </label>
                  <label className="field inline">
                    <span>Materials you'd like the Nixer to supply (approx.)</span>
                    <span className="money-input">€<input type="number" min="0" step="10" value={materials} onChange={(e) => setMaterials(Math.max(0, +e.target.value))} /></span>
                  </label>
                </div>
              )}

              {switched && (
                <div className="notice">
                  <Icon name="doc" size={20} />
                  <p>
                    At around <strong>{money(est.total)}</strong> this is over our {money(THRESHOLD)} hourly limit, so we'll get you
                    <strong> fixed-price quotes</strong> instead. You'll know the full cost before anyone starts.
                  </p>
                </div>
              )}

              <div className="actions">
                <button className="btn btn-primary btn-lg" disabled={!canStep2} onClick={() => setStep(3)}>
                  {mode === "quote" ? "Continue to quotes" : "Choose your Nixer"} <Icon name="arrow" size={18} />
                </button>
                {!canStep2 && <small className="hint">Add a short description and your Eircode to continue.</small>}
              </div>
            </div>
          )}

          {step === 3 && service && (
            <div className="panel">
              <button className="back" onClick={() => setStep(2)}>← Back to details</button>
              {mode === "hourly" ? (
                <>
                  <h1>Choose your Nixer</h1>
                  <p className="muted">Nixers in Co. {county} are shown first. Your estimate updates with their rate.</p>
                  <div className="nixer-list">
                    {candidates.map((n) => (
                      <NixerCard key={n.id} nixer={n} selected={n.id === nixerId} onSelect={(x) => setNixerId(x.id)} actionLabel="Select" />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1>Get fixed-price quotes</h1>
                  <p className="muted">We'll send your project to vetted trades near {county}. Quotes usually arrive within 3 working days.</p>
                  <div className="field">
                    <span>Rough budget</span>
                    <div className="chip-grid tight">
                      {BUDGETS.map((b) => (
                        <button key={b} className={`chip ${budget === b ? "active" : ""}`} onClick={() => setBudget(b)}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="field">
                      <span>When do you want to start?</span>
                      <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                        {TIMEFRAMES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="field">
                      <span>Number of quotes</span>
                      <select value={quotes} onChange={(e) => setQuotes(+e.target.value)}>
                        {[1, 2, 3].map((q) => <option key={q} value={q}>Up to {q}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="field">
                    <span>Photos or plans (optional)</span>
                    <input type="file" accept="image/*,.pdf" multiple />
                  </label>
                  <div className="milestones">
                    <h3><Icon name="lock" size={18} /> How you'll pay: protected milestones</h3>
                    <ol>
                      {MILESTONES.map(([name, pct, desc]) => (
                        <li key={name}><strong>{Math.round(pct * 100)}%</strong><div><b>{name}</b><span>{desc}</span></div></li>
                      ))}
                    </ol>
                  </div>
                </>
              )}

              <fieldset className="contact">
                <legend>Your details</legend>
                <div className="form-row three">
                  <label className="field"><span>Name</span><input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} autoComplete="name" /></label>
                  <label className="field"><span>Email</span><input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} autoComplete="email" /></label>
                  <label className="field"><span>Mobile (optional)</span><input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="08X XXX XXXX" autoComplete="tel" /></label>
                </div>
              </fieldset>

              <div className="actions">
                <button className="btn btn-primary btn-lg" disabled={!canSubmit} onClick={() => setDone(true)}>
                  {mode === "hourly" ? `Request booking with ${nixer ? nixer.name : "your Nixer"}` : `Get ${quotes === 1 ? "a quote" : `up to ${quotes} quotes`}`}
                </button>
                <small className="hint">{mode === "hourly" ? "Nothing is charged until you confirm the job is done." : "Free, and no obligation to accept."}</small>
              </div>
            </div>
          )}
        </div>

        <aside className="book-side">
          <div className="summary">
            <h3>Your job</h3>
            {service ? (
              <>
                <p className="sum-service"><Icon name={service.icon} /> {service.name}</p>
                <p className="sum-loc"><Icon name="pin" size={16} /> Co. {county}{eircode && eircodeValid(eircode) ? ` · ${eircode}` : ""}</p>
                <div className={`sum-mode ${mode === "quote" ? "is-quote" : ""}`}>
                  <Icon name={mode === "quote" ? "doc" : "clock"} size={18} />
                  {mode === "quote" ? "Fixed-price quotes" : "Hourly booking"}
                </div>
                {mode === "hourly" && est && (
                  <dl className="breakdown">
                    <div><dt>{nixer ? nixer.name : "From"} · {money(rate)}/hr × {est.hours}h</dt><dd>{money(est.labour)}</dd></div>
                    {est.materials > 0 && <div><dt>Materials</dt><dd>{money(est.materials)}</dd></div>}
                    <div><dt>Service fee</dt><dd>{money(est.fee)}</dd></div>
                    <div className="total"><dt>Estimate</dt><dd>{money(est.total)}</dd></div>
                  </dl>
                )}
                {mode === "quote" && (
                  <p className="muted small">
                    {service.mode === "quote" ? <>Typical projects from <strong>{money(service.fromPrice)}</strong>. </> : null}
                    You'll get itemised, VAT-inclusive prices to compare.
                  </p>
                )}
              </>
            ) : (
              <p className="muted">Pick a service to see your estimate.</p>
            )}
          </div>
          <ul className="side-trust">
            <li><Icon name="shield" size={18} /> Every Nixer is ID-checked</li>
            <li><Icon name="lock" size={18} /> Payments held until you're happy</li>
            <li><Icon name="chat" size={18} /> Irish-based support, 7 days</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Confirmation({ mode, service, nixer, est, quotes, county }) {
  return (
    <section className="section">
      <div className="container narrow confirm">
        <span className="confirm-icon"><Icon name="check" size={40} strokeWidth={2.5} /></span>
        {mode === "hourly" ? (
          <>
            <h1>Request sent to {nixer.name}</h1>
            <p className="lead">They usually reply within an hour. Your estimate is <strong>{money(est.total)}</strong>, but you'll only pay for the time actually worked.</p>
          </>
        ) : (
          <>
            <h1>Your project is live</h1>
            <p className="lead">We're sending your {service.name.toLowerCase()} project to vetted trades near Co. {county}. Expect up to {quotes} fixed-price {quotes === 1 ? "quote" : "quotes"} within 3 working days.</p>
          </>
        )}
        <p className="muted small">This is a demo. No request has actually been sent.</p>
        <div className="actions center">
          <a href="#/" className="btn btn-outline">Back to home</a>
          <a href="#/services" className="btn btn-primary">Post another job</a>
        </div>
      </div>
    </section>
  );
}
