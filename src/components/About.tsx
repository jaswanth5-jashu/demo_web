import { ArrowUpRight } from "lucide-react";
import "./About.css";

export default function About({
  onNavigate,
}: {
  onNavigate?: (to: string) => void;
}) {
  return (
    <section id="about" className="section about">
      <div className="about-text reveal">
        <p className="eyebrow">04 / Why HYDH₂O</p>
        <h2>Water was never the boring part.</h2>
        <p className="lede">
          We’re building a hydration brand for people who see every everyday object as a chance to express taste.
        </p>
        <div className="about-action">
          <p className="about-action-note">If you want more info, click below to explore why HYDH₂O:</p>
          <a
            className="button button--blue"
            href="/why-hydh2o"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("/why-hydh2o");
              }
            }}
          >
            Why HYDH₂O <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="about-art reveal" aria-hidden="true">
        <img src="/assets/hydh2o-abstract-blue.png" alt="" />
        <span>H₂O</span>
      </div>
      <div className="manifesto reveal">
        <div><span>01</span><h3>Our mission</h3><p>Make exceptional hydration feel like culture, not a chore.</p></div>
        <div><span>02</span><h3>Our vision</h3><p>A cleaner, better-looking future for water on every table.</p></div>
        <div><span>03</span><h3>Our promise</h3><p>Clarity in the bottle, character everywhere else.</p></div>
      </div>
    </section>
  );
}

