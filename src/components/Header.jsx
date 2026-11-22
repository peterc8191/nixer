import { useState } from "react";
import Icon from "./Icon.jsx";

const LINKS = [
  ["/services", "Services"],
  ["/pricing", "How pricing works"],
  ["/nixers", "Find a Nixer"],
  ["/become", "Become a Nixer"],
];

export default function Header({ path }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/" className="brand" aria-label="Nixer home" onClick={() => setOpen(false)}>
          <img src="./mark.png" alt="" className="brand-mark" />
          <img src="./wordmark.png" alt="nixer" className="brand-word" />
        </a>
        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Main">
          {LINKS.map(([to, label]) => (
            <a key={to} href={`#${to}`} className={path === to ? "active" : ""} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#/book" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Post a job
          </a>
        </nav>
        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
