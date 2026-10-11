import { ArrowUpRight } from "lucide-react";
import "./Sustainability.css";

export default function Sustainability({
  onNavigate,
}: {
  onNavigate?: (to: string) => void;
}) {
  return (
    <section id="sustainability" className="section sustainability-section">
      <div className="sustainability-optical-ring" aria-hidden="true" />
      <div className="sustainability-content reveal">
        <span className="why-tag-gold why-tag-gold--light">SUSTAINABILITY</span>
        <h2 className="sustainability-title">
          Return The Bottle<br />After Use.
        </h2>
        <p className="sustainability-lead">
          Every bottle returned supports responsible recycling, reduces plastic waste, and
          gives your business a sustainability story worth telling.
        </p>
        <span className="sustainability-tagline">
          DRINK RESPONSIBLY. RETURN RESPONSIBLY.
        </span>
        <div className="sustainability-actions">
          <a
            className="button button--ice"
            href="#calculator"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("/#calculator");
              }
            }}
          >
            Order HYDH₂O (₹35 & ₹42 + tax) <ArrowUpRight size={18} />
          </a>
          <a
            className="button button--ghost"
            href="#contact"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("/#contact");
              }
            }}
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}

