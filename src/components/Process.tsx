import { Droplets, Filter, FlaskConical, ShieldCheck, Sparkles, Wind } from "lucide-react";
import "./Process.css";

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Carbon Filtration",
    icon: Filter,
    desc: "Removes sediment, chlorine, and organic compounds while preserving base clarity.",
  },
  {
    step: "2",
    title: "Reverse Osmosis",
    icon: Droplets,
    desc: "Molecular-level purification strips micro-impurities and dissolved solids.",
  },
  {
    step: "3",
    title: "Mineral Balancing",
    icon: FlaskConical,
    desc: "Refines electrolytic equilibrium to achieve crisp, silky mouthfeel.",
  },
  {
    step: "4",
    title: "Mineral Dosing",
    icon: Sparkles,
    desc: "Precise infusion of essential alkaline minerals for consistent pH 7.5 ± profile.",
  },
  {
    step: "5",
    title: "Ozonation",
    icon: Wind,
    desc: "Active oxygen disinfection guarantees 100% microbiological stability.",
  },
  {
    step: "6",
    title: "Hygienic Bottling",
    icon: ShieldCheck,
    desc: "Direct-to-glass sterile enclosure with hermetic tamper-evident seal.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="section-heading reveal">
        <p className="eyebrow">OUR PROCESS</p>
        <h2>Every Bottle,<br />Carefully Controlled</h2>
        <p className="process-subhead">
          From filtration to final seal — every step is monitored for purity, consistency, and safety.
        </p>
      </div>

      <div className="process-spline-stage reveal">
        {/* Animated Fluid Spline Track */}
        <svg className="process-spline-svg" viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 60 110 C 180 30, 240 190, 360 110 C 480 30, 540 190, 660 110 C 780 30, 840 190, 960 110 C 1050 50, 1120 160, 1140 110"
            stroke="url(#processGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
            className="process-spline-dash"
          />
          <path
            d="M 60 110 C 180 30, 240 190, 360 110 C 480 30, 540 190, 660 110 C 780 30, 840 190, 960 110 C 1050 50, 1120 160, 1140 110"
            stroke="rgba(6, 71, 245, 0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0647f5" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>

        <div className="process-grid">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                className={`process-step-card process-step-card--${idx % 2 === 0 ? "elevated" : "lowered"}`}
                key={item.step}
              >
                <div className="process-step-node">
                  <span className="process-step-badge">{item.step}</span>
                  <div className="process-icon-bubble">
                    <Icon size={26} strokeWidth={2.2} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

