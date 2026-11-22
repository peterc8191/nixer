import { useState } from "react";
import NixerCard from "../components/NixerCard.jsx";
import { NIXERS, SERVICES, COUNTIES } from "../data.js";
import { navigate } from "../hooks/useRoute.js";

export default function Nixers({ params }) {
  const [county, setCounty] = useState(params.county || "");
  const [service, setService] = useState(params.service || "");
  const [sort, setSort] = useState("rating");

  const list = NIXERS
    .filter((n) => !county || n.county === county)
    .filter((n) => !service || n.services.includes(service))
    .sort((a, b) =>
      sort === "rate" ? (a.rate ?? 999) - (b.rate ?? 999) : sort === "jobs" ? b.jobs - a.jobs : b.rating - a.rating
    );

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Find a Nixer</span>
          <h1>Local, vetted and reviewed</h1>
          <p className="lead">Every Nixer is ID-checked. Trade businesses also show insurance and registrations.</p>
          <div className="filters">
            <select value={service} onChange={(e) => setService(e.target.value)} aria-label="Service">
              <option value="">All services</option>
              {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={county} onChange={(e) => setCounty(e.target.value)} aria-label="County">
              <option value="">All counties</option>
              {COUNTIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              <option value="rating">Top rated</option>
              <option value="jobs">Most jobs</option>
              <option value="rate">Lowest rate</option>
            </select>
          </div>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          {list.length ? (
            <div className="nixer-grid">
              {list.map((n) => (
                <NixerCard
                  key={n.id}
                  nixer={n}
                  actionLabel={n.rate ? "Book" : "Request quote"}
                  onSelect={() => navigate(`/book?service=${service && n.services.includes(service) ? service : n.services[0]}&nixer=${n.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No Nixers match those filters yet</h3>
              <p>We're growing fast. Post your job anyway and we'll notify Nixers who cover nearby counties.</p>
              <a className="btn btn-primary" href={`#/book${service ? `?service=${service}` : ""}`}>Post your job</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
