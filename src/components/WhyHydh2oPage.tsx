import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Box,
  Droplets,
  Recycle,
  Tag,
  TrendingUp,
  Truck,
} from "lucide-react";
import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useEffect, useRef, useState } from "react";
import "./WhyHydh2oPage.css";

function LogoWaterDropInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoPlateRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState({ x: 220, y: 105 });
  const [lensDims, setLensDims] = useState({ width: 440, height: 205 });
  const targetPosRef = useRef({ x: 220, y: 105 });
  const curPosRef = useRef({ x: 220, y: 105, vx: 0, vy: 0 });
  const isHoveredRef = useRef(false);
  const dropRadius = 36;

  useEffect(() => {
    const updateDimensions = () => {
      if (logoPlateRef.current) {
        const rect = logoPlateRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setLensDims({ width: rect.width, height: rect.height });
          if (!isHoveredRef.current) {
            const cx = rect.width * 0.5;
            const cy = rect.height * 0.48;
            targetPosRef.current = { x: cx, y: cy };
            curPosRef.current.x = cx;
            curPosRef.current.y = cy;
            setDropPos({ x: cx, y: cy });
          }
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.025;
      const cur = curPosRef.current;
      const tgt = targetPosRef.current;

      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;

      if (!isHoveredRef.current && logoPlateRef.current) {
        const rect = logoPlateRef.current.getBoundingClientRect();
        const cx = rect.width * 0.5;
        const cy = rect.height * 0.48;
        tgt.x = cx + Math.sin(time * 1.2) * 28;
        tgt.y = cy + Math.cos(time * 0.9) * 12;
      }

      setDropPos({ x: cur.x, y: cur.y });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const updateCoordinates = (clientX: number, clientY: number) => {
    isHoveredRef.current = true;
    if (!logoPlateRef.current) return;
    const rect = logoPlateRef.current.getBoundingClientRect();

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    const minX = dropRadius * 0.85;
    const maxX = rect.width - dropRadius * 0.85;
    const minY = dropRadius * 0.85;
    const maxY = rect.height - dropRadius * 0.85;

    targetPosRef.current = {
      x: Math.max(minX, Math.min(maxX, relX)),
      y: Math.max(minY, Math.min(maxY, relY)),
    };
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (logoPlateRef.current) {
      const rect = logoPlateRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: rect.width * 0.5,
        y: rect.height * 0.48,
      };
    }
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const pctX = lensDims.width > 0 ? (dropPos.x / lensDims.width) * 100 : 50;
  const pctY = lensDims.height > 0 ? (dropPos.y / lensDims.height) * 100 : 50;

  return (
    <div
      className="why-logo-stage-card"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <svg className="why-logo-spline-bg" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 160 C 140 120, 290 210, 440 150 C 510 120, 560 180, 600 165"
          stroke="rgba(6, 71, 245, 0.12)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M0 200 C 130 250, 270 140, 410 210 C 500 260, 550 190, 600 205"
          stroke="rgba(6, 71, 245, 0.08)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 135 C 160 180, 310 100, 450 170 C 520 210, 570 150, 600 140"
          stroke="rgba(6, 71, 245, 0.05)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="why-logo-plate" ref={logoPlateRef}>
        <img
          src="/assets/hydh2o-logo.png"
          alt="HYDH₂O Logo"
          className="why-logo-base-img"
          draggable={false}
        />

        <span className="why-micro-drop why-micro-drop--1" />
        <span className="why-micro-drop why-micro-drop--2" />

        <div
          className="why-water-droplet"
          style={{
            transform: `translate3d(${dropPos.x - dropRadius}px, ${dropPos.y - dropRadius}px, 0)`,
            width: `${dropRadius * 2}px`,
            height: `${dropRadius * 2}px`,
          }}
          aria-hidden="true"
        >
          <div className="why-droplet-lens">
            <img
              src="/assets/hydh2o-logo.png"
              alt=""
              className="why-droplet-lens-img"
              style={{
                width: `${lensDims.width}px`,
                height: `${lensDims.height}px`,
                transform: `scale(1.36)`,
                transformOrigin: `${pctX}% ${pctY}%`,
              }}
              draggable={false}
            />
          </div>

          <div className="why-droplet-glare" />
          <div className="why-droplet-rim" />
        </div>
      </div>

      <div className="why-logo-prompt">
        <Droplets size={14} className="prompt-icon" />
        <span>Move cursor to glide water droplet on logo</span>
      </div>
    </div>
  );
}

const PROBLEM_POINTS = [
  {
    icon: Droplets,
    title: "Inconsistent Quality",
    description: "Supplier quality varies batch to batch, with zero visibility into sourcing.",
  },
  {
    icon: Box,
    title: "Generic Packaging",
    description: "Plain plastic bottles undercut the premium experience you’ve built.",
  },
  {
    icon: Truck,
    title: "Unreliable Delivery",
    description: "Stock outs and missed drops disrupt service when it matters most.",
  },
  {
    icon: Tag,
    title: "No Brand Presence",
    description: "Zero ability to put your name in front of every guest, every sip.",
  },
  {
    icon: Recycle,
    title: "Sustainability Pressure",
    description: "Guests and regulators expect a responsible alternative to plastic.",
  },
  {
    icon: TrendingUp,
    title: "Unpredictable Costs",
    description: "Pricing shifts supplier to supplier with little transparency.",
  },
];

const WITHOUT_HYDH2O = [
  "Inconsistent quality, no traceability",
  "Generic plastic bottles",
  "Unreliable delivery",
  "Zero brand presence",
  "Mounting plastic waste",
  "Opaque, shifting pricing",
];

const WITH_HYDH2O = [
  "Certified pH-balanced · RO + UV + Ozonated",
  "Premium glass, on every table",
  "Dependable, on-schedule supply",
  "Custom label printing with your logo",
  "Return-the-bottle sustainability program",
  "Transparent wholesale pricing (₹35 & ₹42 + tax)",
];

function SlideFooter({ number, light = false }: { number: string; light?: boolean }) {
  return (
    <div className={`why-slide-footer ${light ? "why-slide-footer--light" : ""}`}>
      <div className="why-slide-brand">
        <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden="true">
          <path
            d="M1 4C4 1 7 1 10 4C13 7 16 7 19 4C22 1 25 3 25 4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>HYDH2O</span>
      </div>
      <div className="why-slide-number">{number}</div>
    </div>
  );
}

export default function WhyHydh2oPage({ onNavigate }: { onNavigate?: (to: string) => void }) {
  return (
    <div className="why-page">
      {/* 1. SLIDE 01: THE PROBLEM (Matching Reference Slide 02) */}
      <section className="why-slide why-slide--intro why-slide--cream" id="the-problem">
        {/* Top slide navigation */}
        <div className="why-slide-top-nav">
          <a
            className="why-back"
            href="/#about"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("/#about");
              }
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </a>
          <span className="why-pill-badge">04 / WHY HYDH₂O</span>
        </div>

        <div className="why-slide-header">
          <span className="why-tag-gold">THE PROBLEM</span>
          <h2 className="why-editorial-heading">
            Your Water Program Is<br />
            Working Against You
          </h2>
        </div>

        <div className="why-slide-body">
          <div className="problem-grid">
            {PROBLEM_POINTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="problem-card" key={idx}>
                  <div className="problem-icon-badge">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <SlideFooter number="01" />
      </section>

      {/* 2. SLIDE 02: THE INTRODUCTION (With Logo Water Droplet Showcase) */}
      <section className="why-slide why-slide--cream" id="the-intro">
        <div className="why-slide-body why-slide-body--split">
          <div className="why-intro-copy">
            <span className="why-tag-gold">THE INTRODUCTION</span>
            <h2 className="why-hero-title">
              WATER WAS<br />
              NEVER THE<br />
              BORING PART.
            </h2>
            <p className="why-intro-lead">
              We engineered HYDH₂O to transform hospitality and workspace hydration
              from an overlooked expense into a branded luxury ritual.
            </p>
            <div className="why-intro-actions">
              <a
                className="button button--blue"
                href="#the-fix"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("the-fix")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                The Fix & Solution <ArrowDown size={17} />
              </a>
              <a
                className="button button--ghost"
                style={{ color: "var(--ink)", borderColor: "rgba(10,17,40,.2)" }}
                href="/#calculator"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("/#calculator");
                  }
                }}
              >
                Order HYDH₂O <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* Interactive Logo Water Droplet Stage */}
          <div className="why-logo-showcase-stage">
            <LogoWaterDropInteractive />
          </div>
        </div>

        <SlideFooter number="02" />
      </section>

      {/* 3. SLIDE 03: THE FIX (Matching Reference Slide 04) */}
      <section className="why-slide why-slide--cream" id="the-fix">
        <div className="why-slide-header">
          <span className="why-tag-gold">THE FIX</span>
          <h2 className="why-editorial-heading">
            We Built HYDH2O To Fix This
          </h2>
        </div>

        <div className="why-slide-body">
          <div className="comparison-grid">
            {/* WITHOUT HYDH2O */}
            <div className="comparison-card comparison-card--without">
              <h3>WITHOUT HYDH2O</h3>
              <ul className="comparison-list">
                {WITHOUT_HYDH2O.map((item, idx) => (
                  <li className="comparison-item" key={idx}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WITH HYDH2O */}
            <div className="comparison-card comparison-card--with">
              <h3>WITH HYDH2O</h3>
              <ul className="comparison-list">
                {WITH_HYDH2O.map((item, idx) => (
                  <li className="comparison-item comparison-item--with" key={idx}>
                    <span className="comparison-bullet-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="why-fix-actions">
            <a
              className="button button--blue"
              href="/#process"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/#process");
                }
              }}
            >
              See Our Process <ArrowDown size={17} />
            </a>
            <a
              className="button button--ghost"
              style={{ color: "var(--ink)", borderColor: "rgba(10,17,40,.2)" }}
              href="/#calculator"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/#calculator");
                }
              }}
            >
              Order HYDH₂O <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <SlideFooter number="03" />
      </section>
    </div>
  );
}

