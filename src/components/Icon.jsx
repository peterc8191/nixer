// Small stroke icon set (24px grid). Colour follows currentColor.
const PATHS = {
  wrench: <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 6.7-6.7M14.7 6.3 12 9 3 18l3 3 9-9M14.7 6.3 17 4l3 3-2.3 2.3" />,
  sofa: <><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" /><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z" /><path d="M5 18v2M19 18v2" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  brush: <><path d="M18 3l3 3-9 9-3-3z" /><path d="M9 12c-3 0-5 2-5 5 0 1.5-1 3-2 4 3 0 7-1 8-4" /></>,
  leaf: <><path d="M5 19c0-9 6-15 15-15 0 9-6 15-15 15z" /><path d="M5 19 13 11" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></>,
  van: <><path d="M2 7h11v9H2zM13 10h4l4 3v3h-8z" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  house: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></>,
  kitchen: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 10h18M8 7h.01M12 7h.01M9 14h6" /></>,
  bath: <><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" /><path d="M6 12V6a2 2 0 0 1 4 0" /><path d="M7 20l-1 2M17 20l1 2" /></>,
  roof: <><path d="M2 13 12 5l10 8" /><path d="M5 11v9h14v-9" /><path d="M16 7V4h2v5" /></>,
  wall: <><rect x="3" y="4" width="18" height="16" /><path d="M3 9h18M3 15h18M9 4v5M15 9v6M9 15v5" /></>,
  road: <><path d="M8 3 4 21M16 3l4 18" /><path d="M12 4v3M12 11v3M12 18v3" /></>,
  leafHouse: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M9 18c0-4 2.5-6 6-6 0 4-2.5 6-6 6zM9 18l3-3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
  pin: <><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  check: <path d="m5 12 5 5 9-10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  euro: <><path d="M17 6.5A6 6 0 0 0 8 12a6 6 0 0 0 9 5.5" /><path d="M5 10h8M5 14h8" /></>,
};

export default function Icon({ name, size = 22, className = "", strokeWidth = 1.8, label }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {PATHS[name] || PATHS.wrench}
    </svg>
  );
}
