import Icon from "./Icon.jsx";
import { serviceById } from "../data.js";
import { money } from "../lib/pricing.js";

export default function NixerCard({ nixer, onSelect, selected, actionLabel = "Book" }) {
  return (
    <article className={`nixer-card ${selected ? "is-selected" : ""}`}>
      <div className="nixer-top">
        <span className={`avatar ${nixer.company ? "is-company" : ""}`} aria-hidden="true">{nixer.initials}</span>
        <div>
          <h3>{nixer.name}</h3>
          <p className="nixer-loc"><Icon name="pin" size={14} /> {nixer.town}, Co. {nixer.county}</p>
        </div>
        <div className="nixer-rate">
          {nixer.rate ? <><strong>{money(nixer.rate)}</strong><span>/hr</span></> : <span className="quote-only">Quotes only</span>}
        </div>
      </div>
      <p className="nixer-bio">{nixer.bio}</p>
      <div className="nixer-tags">
        {nixer.services.map((id) => <span key={id} className="tag">{serviceById(id)?.name}</span>)}
      </div>
      <div className="nixer-foot">
        <span className="rating"><Icon name="star" size={15} /> {nixer.rating.toFixed(1)} <span>· {nixer.jobs} jobs</span></span>
        {nixer.insured && <span className="trust"><Icon name="shield" size={15} /> Insured</span>}
        {onSelect && (
          <button className={`btn btn-sm ${selected ? "btn-primary" : "btn-outline"}`} onClick={() => onSelect(nixer)}>
            {selected ? <><Icon name="check" size={15} /> Selected</> : actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}
