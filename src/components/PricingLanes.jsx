import Icon from "./Icon.jsx";
import { THRESHOLD, money, HOURLY_SERVICE_FEE, QUOTE_PLATFORM_FEE } from "../lib/pricing.js";

export default function PricingLanes({ detailed = false }) {
  return (
    <div className="lanes">
      <div className="lane lane-hourly">
        <div className="lane-head">
          <span className="lane-icon"><Icon name="clock" size={28} /></span>
          <div>
            <span className="lane-kicker">Jobs under {money(THRESHOLD)}</span>
            <h3>Pay by the hour</h3>
          </div>
        </div>
        <p>For handyman and maintenance jobs. Pick a Nixer, see their hourly rate up front, and pay only for the time the job takes.</p>
        <ul className="ticks">
          <li><Icon name="check" size={18} /> Rates shown before you book, from {money(25)}/hr</li>
          <li><Icon name="check" size={18} /> 1-hour minimum, then billed in 15-minute blocks</li>
          <li><Icon name="check" size={18} /> Payment taken only when you confirm the job is done</li>
          {detailed && <li><Icon name="check" size={18} /> {Math.round(HOURLY_SERVICE_FEE * 100)}% service fee covers insurance and support</li>}
        </ul>
        <p className="lane-eg">e.g. flat-pack wardrobe, TV mounting, a leaking tap, a hedge trim</p>
      </div>
      <div className="lane lane-quote">
        <div className="lane-head">
          <span className="lane-icon"><Icon name="doc" size={28} /></span>
          <div>
            <span className="lane-kicker">Projects over {money(THRESHOLD)}</span>
            <h3>Fixed-price quotes</h3>
          </div>
        </div>
        <p>For building and trade projects. Describe the job once and get up to three itemised, fixed-price quotes from vetted local trades.</p>
        <ul className="ticks">
          <li><Icon name="check" size={18} /> Free to post, no obligation to accept</li>
          <li><Icon name="check" size={18} /> The price you accept is the price you pay, VAT included</li>
          <li><Icon name="check" size={18} /> Milestone payments held securely until each stage is signed off</li>
          {detailed && <li><Icon name="check" size={18} /> Trades pay a {Math.round(QUOTE_PLATFORM_FEE * 100)}% platform fee; nothing extra for you</li>}
        </ul>
        <p className="lane-eg">e.g. kitchen fitting, bathroom refit, re-roof, extension</p>
      </div>
    </div>
  );
}
