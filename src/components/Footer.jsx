import { THRESHOLD, money } from "../lib/pricing.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src="./logo.png" alt="nixer: Get it done. Locally." className="footer-logo" />
        </div>
        <div>
          <h4>Customers</h4>
          <a href="#/book">Post a job</a>
          <a href="#/services">All services</a>
          <a href="#/nixers">Find a Nixer</a>
          <a href="#/pricing">Pricing</a>
        </div>
        <div>
          <h4>Nixers</h4>
          <a href="#/become">Join as a Nixer</a>
          <a href="#/become">Join as a trade business</a>
          <a href="#/pricing">Fees</a>
        </div>
        <div>
          <h4>Pricing at a glance</h4>
          <p>Handyman &amp; maintenance under {money(THRESHOLD)}: <strong>hourly</strong>.</p>
          <p>Building &amp; trade projects over {money(THRESHOLD)}: <strong>fixed-price quotes</strong>.</p>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Nixer. Get it done. Locally.</span>
        <span>Serving all 26 counties</span>
      </div>
    </footer>
  );
}
