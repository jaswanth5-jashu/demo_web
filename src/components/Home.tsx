import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MouseEvent as ReactMouseEvent, useRef } from "react";
import "./Home.css";

export default function Home() {
  const bottles = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (!bottles.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(bottles.current, {
      rotateY: x * 10,
      rotateX: -y * 6,
      x: x * 15,
      y: y * 6,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <section id="home" className="hero" onMouseMove={handleMove}>
      <div className="waterfall" aria-hidden="true">
        <div className="waterfall-glow" />
        <div className="water-sheet water-sheet--back" />
        <div className="water-sheet water-sheet--front" />
        <div className="water-streams">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="water-mist" />
        <div className="splash-pool"><i /><i /><i /></div>
      </div>
      <div className="hero-grain" />
      <div className="hero-copy">
        <p className="eyebrow eyebrow--light">Born clear. Built different.</p>
        <h1>
          HYDRATE
          <span>DIFFERENT</span>
        </h1>
        <p className="hero-intro">
          Water, reimagined as an object of culture. Pure taste in glass that refuses to blend in.
        </p>
        <div className="hero-actions">
          <a className="button button--ice" href="#products">
            Explore the drop <ArrowDown size={18} />
          </a>
          <a className="button button--ghost" href="#calculator">
            Order HYDH₂O <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="hero-product" ref={bottles}>
        <div className="bottle-3d bottle-3d--tall">
          <img
            src="/assets/hydh2o-bottle-tall.png"
            alt="HYDH₂O 750 millilitre tall column glass bottle"
            fetchPriority="high"
          />
        </div>
        <span className="bottle-shadow" aria-hidden="true" />
        <span className="product-chip chip-top">Glass / 750 ml / 500 ml</span>
        <span className="product-chip chip-bottom">The Column / Pure Flow</span>
      </div>
      <div className="hero-index">
        <span>01</span>
        <span className="index-line" />
        <span>09</span>
      </div>
      <p className="hero-scroll">Scroll to flow</p>
    </section>
  );
}

