import { useState } from "react";
import ServiceCard from "../components/ServiceCard.jsx";
import Icon from "../components/Icon.jsx";
import { SERVICES } from "../data.js";
import { THRESHOLD, money } from "../lib/pricing.js";

const FILTERS = [
  ["all", "All services"],
  ["hourly", "Hourly jobs"],
  ["quote", "Quoted projects"],
];

export default function Services() {
  const [filter, setFilter] = useState("all");
  const hourly = SERVICES.filter((s) => s.mode === "hourly");
  const quote = SERVICES.filter((s) => s.mode === "quote");

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Every job, from a loose hinge to a new extension</h1>
          <p className="lead">Handyman and maintenance jobs are booked by the hour. Building and trade projects get fixed-price quotes.</p>
          <div className="segmented" role="tablist">
            {FILTERS.map(([id, label]) => (
              <button key={id} role="tab" aria-selected={filter === id} className={filter === id ? "active" : ""} onClick={() => setFilter(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filter !== "quote" && (
        <section className="section section-tight">
          <div className="container">
            <div className="group-head">
              <span className="lane-icon small"><Icon name="clock" /></span>
              <div>
                <h2>Handyman &amp; maintenance</h2>
                <p>Typically under {money(THRESHOLD)}. Book by the hour and pay for time used.</p>
              </div>
            </div>
            <div className="service-grid">{hourly.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          </div>
        </section>
      )}

      {filter !== "hourly" && (
        <section className="section section-tight">
          <div className="container">
            <div className="group-head">
              <span className="lane-icon small is-quote"><Icon name="doc" /></span>
              <div>
                <h2>Building &amp; trade projects</h2>
                <p>Over {money(THRESHOLD)}. Compare up to three fixed-price quotes, then pay in protected milestones.</p>
              </div>
            </div>
            <div className="service-grid">{quote.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
