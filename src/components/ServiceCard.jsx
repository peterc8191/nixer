import Icon from "./Icon.jsx";
import { money } from "../lib/pricing.js";

export default function ServiceCard({ service }) {
  const hourly = service.mode === "hourly";
  return (
    <a href={`#/book?service=${service.id}`} className="service-card">
      <span className={`service-icon ${hourly ? "" : "is-quote"}`}>
        <Icon name={service.icon} size={26} />
      </span>
      <span className="service-body">
        <span className="service-name">{service.name}</span>
        <span className="service-blurb">{service.blurb}</span>
        <span className="service-meta">
          <span className={`badge ${hourly ? "badge-hourly" : "badge-quote"}`}>
            <Icon name={hourly ? "clock" : "doc"} size={14} />
            {hourly ? "Hourly" : "Fixed quote"}
          </span>
          <span className="service-price">
            {hourly ? <>from <strong>{money(service.fromRate)}/hr</strong></> : <>projects from <strong>{money(service.fromPrice)}</strong></>}
          </span>
        </span>
      </span>
    </a>
  );
}
