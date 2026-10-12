import { ArrowDown, ArrowUp, Calendar, Camera, Clock, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import "./Gallery.css";

const gallery = [
  {
    src: "/assets/hydh2o-bottle-curve.png",
    alt: "HYDH₂O curved glass bottle",
    kind: "product",
  },
  {
    src: "https://images.unsplash.com/photo-1760533534882-16da10d98c4f?auto=format&fit=crop&w=900&q=85",
    alt: "Summer pool lifestyle",
    kind: "photo",
  },
  {
    src: "/assets/hydh2o-abstract-blue.png",
    alt: "Abstract cobalt water texture",
    kind: "texture",
  },
];

type TimelineMoment = {
  date: string;
  badge: string;
  title: string;
  desc: string;
  location: string;
  image: string;
  kind?: string;
};

const TIMELINE_MOMENTS: TimelineMoment[] = [
  /*{
    date: "OCTOBER 2026",
    badge: "Hospitality",
    title: "Luxury Suite & Villa Rollouts",
    desc: "Curated 750ml Column bottles in bespoke metal trays across premier boutique hotel suites in Goa & Hyderabad.",
    location: "Taj & Private Luxury Villas",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=85",
    kind: "photo",
  },
  {
    date: "AUGUST 2026",
    badge: "Events",
    title: "Summer Gala & Tasting Bar",
    desc: "Custom label branded glass bottles poured chilled with fresh botanicals for 400+ attendees.",
    location: "The Glasshouse Pavilion",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    kind: "photo",
  },
  {
    date: "JUNE 2026",
    badge: "Dining",
    title: "Fine Dining Table Rituals",
    desc: "Replacing generic plastic with the sculptural Curve on white linen tablecloths in farm-to-table bistros.",
    location: "Artisan Cafes & Fine Dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    kind: "photo",
  },
  {
    date: "APRIL 2026",
    badge: "Sustainability",
    title: "10,000 Bottles Re-circulated",
    desc: "Celebrating our zero-waste milestone: closed-loop collection, medical-grade wash, and refill cycle.",
    location: "Hyderabad Bottling Facility",
    image: "/assets/hydh2o-bottle-tall.png",
    kind: "product",
  },
  {
    date: "FEBRUARY 2026",
    badge: "Lifestyle",
    title: "Poolside & Beachside Flow",
    desc: "Chilled pure water in condensation-beaded glass bottles beside azure swimming retreats.",
    location: "The Palm Retreat & Lounges",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
    kind: "photo",
  },
  {
    date: "LATE 2025",
    badge: "Genesis",
    title: "Genesis of HYDH₂O",
    desc: "The idea took shape: water was never the boring part. Pure taste in glass that refuses to blend in.",
    location: "Design Studio, Hyderabad",
    image: "/assets/hydh2o-abstract-blue.png",
    kind: "texture",
  },*/
];

const CATEGORIES = ["All", "Hospitality", "Events", "Dining", "Sustainability", "Lifestyle"];

export default function Gallery() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleToggleTimeline = () => {
    if (!showTimeline) {
      setShowTimeline(true);
      setTimeout(() => {
        document.getElementById("gallery-timeline")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      document.getElementById("gallery-timeline")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredMoments = activeCategory === "All"
    ? TIMELINE_MOMENTS
    : TIMELINE_MOMENTS.filter((item) => item.badge === activeCategory);

  return (
    <section id="gallery" className="section gallery">
      {/* 06 Photos Section Heading */}
      <div className="gallery-heading reveal">
        <div>
          <p className="eyebrow eyebrow--light">06 / @hydh2o</p>
          <h2>Stay in<br />the flow.</h2>
        </div>
        <a className="button button--ghost" href="https://instagram.com" target="_blank" rel="noreferrer">
          Follow the feed <Camera size={18} />
        </a>
      </div>

      {/* 6 Photos Grid */}
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <figure className={`gallery-item gallery-item--${item.kind} reveal`} key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} />
            <figcaption><Camera size={18} /> @hydh2o</figcaption>
          </figure>
        ))}
      </div>

      {/* View More Option Directly After 06 Photos */}
      <div className="gallery-more-bar reveal">
        <div className="gallery-more-inner">
          <p className="gallery-more-sub">Want to explore our visual journey & past moments?</p>
          <button
            type="button"
            className="button button--ice gallery-more-btn"
            onClick={handleToggleTimeline}
            aria-expanded={showTimeline}
          >
            {showTimeline ? "Go to Gallery Time Section" : "View More Moments in Time"} <ArrowDown size={18} />
          </button>
        </div>
      </div>

      {/* Gallery Time Section (Interactive Timeline) */}
      {showTimeline && (
        <div id="gallery-timeline" className="gallery-timeline-section">
          <div className="timeline-header">
            <div className="timeline-badge-wrap">
              <span className="timeline-tag">
                <Clock size={13} /> GALLERY TIMELINE
              </span>
              <span className="timeline-tag timeline-tag--alt">
                <Sparkles size={13} /> ARCHIVE
              </span>
            </div>
            <h3 className="timeline-title">Moments In Time</h3>
            <p className="timeline-lead">
              A curated timeline of HYDH₂O installations, boutique hospitality rollouts, luxury events, and table rituals.
            </p>

            {/* Filter Pills (only shown if moments exist) */}
            {TIMELINE_MOMENTS.length > 0 && (
              <div className="timeline-filters">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`timeline-filter-chip ${activeCategory === cat ? "is-active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Cards Grid or Empty State */}
          {filteredMoments.length > 0 ? (
            <div className="timeline-grid">
              {filteredMoments.map((item, idx) => (
                <article className="timeline-card" key={idx}>
                  <div className={`timeline-img-box timeline-img-box--${item.kind}`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="timeline-badge">{item.badge}</span>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-meta">
                      <span className="timeline-date">
                        <Calendar size={13} /> {item.date}
                      </span>
                      <span className="timeline-location">
                        <MapPin size={13} /> {item.location}
                      </span>
                    </div>
                    <h4 className="timeline-card-title">{item.title}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="timeline-empty-state">
              <div className="timeline-empty-icon">
                <Camera size={34} />
              </div>
              <h4 className="timeline-empty-title">No photos are added</h4>
              <p className="timeline-empty-desc">
                Moments are currently being curated. Check back soon or follow our official feed for live updates.
              </p>
              <a
                className="button button--ice"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Follow on Instagram <Camera size={16} />
              </a>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="timeline-bottom-actions">
            <a
              className="button button--ice"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Follow on Instagram <Camera size={17} />
            </a>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => {
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Back to Gallery Top <ArrowUp size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

