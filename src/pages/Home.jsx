import { useState } from "react";
import Icon from "../components/Icon.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import PricingLanes from "../components/PricingLanes.jsx";
import { SERVICES, COUNTIES, TESTIMONIALS } from "../data.js";
import { navigate } from "../hooks/useRoute.js";

const POPULAR = ["handyman", "assembly", "mounting", "plumbing-repair", "kitchen", "bathroom"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("Dublin");

  const matches = query.trim()
    ? SERVICES.filter((s) => (s.name + " " + s.blurb).toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  function submit(e) {
    e.preventDefault();
    const first = matches[0];
    navigate(first ? `/book?service=${first.id}&county=${county}` : `/services`);
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Icon name="pin" size={16} /> Across all 26 counties</span>
            <h1>Got a job that needs doing? <span className="hl">Get a Nixer.</span></h1>
            <p className="lead">
              Vetted local handymen and tradespeople, from a wobbly shelf to a new kitchen.
              Small jobs by the hour. Big projects at a fixed price.
            </p>
            <form className="hero-search" onSubmit={submit} role="search">
              <label className="field-search">
                <Icon name="search" size={20} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What do you need done?"
                  aria-label="What do you need done?"
                />
              </label>
              <label className="field-county">
                <Icon name="pin" size={18} />
                <select value={county} onChange={(e) => setCounty(e.target.value)} aria-label="County">
                  {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <button className="btn btn-primary btn-lg" type="submit">Find help</button>
              {matches.length > 0 && (
                <ul className="search-suggest">
                  {matches.map((s) => (
                    <li key={s.id}>
                      <a href={`#/book?service=${s.id}&county=${county}`}>
                        <Icon name={s.icon} size={18} /> {s.name}
                        <span className={`badge ${s.mode === "hourly" ? "badge-hourly" : "badge-quote"}`}>
                          {s.mode === "hourly" ? "Hourly" : "Fixed quote"}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <ul className="hero-trust">
              <li><Icon name="shield" size={18} /> ID-checked Nixers</li>
              <li><Icon name="lock" size={18} /> Payments protected</li>
              <li><Icon name="star" size={18} /> 4.8 average rating</li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-mark-wrap">
              <img src="./mark.png" alt="" className="hero-mark" />
            </div>
            <div className="float-card fc-1">
              <Icon name="clock" size={18} />
              <div><strong>Shelves up, 1h 15m</strong><span>Seán M. · Rathfarnham</span></div>
            </div>
            <div className="float-card fc-2">
              <Icon name="doc" size={18} />
              <div><strong>3 quotes received</strong><span>Bathroom refit · Galway</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Popular right now</span>
            <h2>What can we help with?</h2>
          </div>
          <div className="service-grid">
            {POPULAR.map((id) => <ServiceCard key={id} service={SERVICES.find((s) => s.id === id)} />)}
          </div>
          <div className="center"><a href="#/services" className="btn btn-outline">See all services <Icon name="arrow" size={18} /></a></div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fair pricing, two ways</span>
            <h2>The right price for the size of the job</h2>
            <p>Small jobs don't need a quote, and big projects shouldn't be a guess. Nixer picks the right lane for you.</p>
          </div>
          <PricingLanes />
          <div className="center"><a href="#/pricing" className="btn btn-ghost">How pricing works <Icon name="arrow" size={18} /></a></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Sorted in three steps</h2>
          </div>
          <ol className="steps">
            <li>
              <span className="step-num">1</span>
              <h3>Tell us the job</h3>
              <p>Pick a service, add a few details and your Eircode. We'll estimate it and show you the right pricing lane.</p>
            </li>
            <li>
              <span className="step-num">2</span>
              <h3>Choose your Nixer</h3>
              <p>Book a local Nixer by the hour, or compare fixed-price quotes. Every profile shows reviews and rates.</p>
            </li>
            <li>
              <span className="step-num">3</span>
              <h3>Get it done</h3>
              <p>Chat in the app, then pay securely once you're happy. No cash in hand, no chasing.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <div className="section-head on-dark">
            <span className="eyebrow">From customers</span>
            <h2>People across Ireland are getting it done</h2>
          </div>
          <div className="testimonials">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="testimonial">
                <div className="stars" aria-label="5 stars">{[...Array(5)].map((_, i) => <Icon key={i} name="star" size={16} />)}</div>
                <blockquote>"{t.quote}"</blockquote>
                <figcaption><strong>{t.name}</strong><span>{t.service}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>Good with your hands? Do nixers on your terms.</h2>
            <p>Set your own rate, pick the jobs you want and get paid within two working days.</p>
          </div>
          <a href="#/become" className="btn btn-primary btn-lg">Become a Nixer <Icon name="arrow" size={18} /></a>
        </div>
      </section>
    </>
  );
}
