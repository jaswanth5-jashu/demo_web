import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Camera,
  Clock,
  MapPin,
  Maximize2,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  {
    src: "https://images.unsplash.com/photo-1781754053347-af4594f67a83?auto=format&fit=crop&w=900&q=85",
    alt: "Blue pool lifestyle",
    kind: "photo",
  },
  {
    src: "/assets/hydh2o-bottle-tall.png",
    alt: "HYDH₂O tall glass bottle",
    kind: "product",
  },
  {
    src: "https://images.unsplash.com/photo-1679310290110-8aecd427d033?auto=format&fit=crop&w=900&q=85",
    alt: "Bottles beside a pool",
    kind: "photo",
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
  {
    date: "OCTOBER 2026",
    badge: "Hospitality",
    title: "Luxury Suite & Villa Rollouts",
    desc: "Curated 750ml Column bottles in bespoke metal trays across premier boutique hotel suites in Goa & Hyderabad.",
    location: "Taj & Private Luxury Villas",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    kind: "photo",
  },
  {
    date: "AUGUST 2026",
    badge: "Events",
    title: "Summer Gala & Tasting Bar",
    desc: "Custom label branded glass bottles poured chilled with fresh botanicals for 400+ attendees.",
    location: "The Glasshouse Pavilion",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    kind: "photo",
  },
  {
    date: "JUNE 2026",
    badge: "Dining",
    title: "Fine Dining Table Rituals",
    desc: "Replacing generic plastic with the sculptural Curve on white linen tablecloths in farm-to-table bistros.",
    location: "Artisan Cafes & Fine Dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
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
  },
];

const CATEGORIES = ["All", "Hospitality", "Events", "Dining", "Sustainability", "Lifestyle"];

export default function Gallery() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalPhoto, setModalPhoto] = useState<TimelineMoment | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalPhoto(null);
      }
    };
    if (modalPhoto) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalPhoto]);

  const handleOpenTimeline = () => {
    setShowTimeline(true);
    setTimeout(() => {
      document.getElementById("gallery-timeline")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const handleCloseTimeline = () => {
    // Scroll back to gallery top and then close section
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setShowTimeline(false);
    }, 350);
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
          {!showTimeline ? (
            <button
              type="button"
              className="button button--ice gallery-more-btn"
              onClick={handleOpenTimeline}
            >
              Go to Gallery Time Section <ArrowDown size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="button button--ice gallery-more-btn"
              onClick={handleCloseTimeline}
            >
              Close Moments of Time Section <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Gallery Time Section (Interactive Timeline) */}
      {showTimeline && (
        <div id="gallery-timeline" className="gallery-timeline-section">
          {/* Top Bar with Title and Close Button */}
          <div className="timeline-top-nav">
            <div className="timeline-badge-wrap">
              <span className="timeline-tag">
                <Clock size={13} /> GALLERY TIMELINE
              </span>
              <span className="timeline-tag timeline-tag--alt">
                <Sparkles size={13} /> ARCHIVE
              </span>
            </div>
            <button
              type="button"
              className="timeline-close-pill"
              onClick={handleCloseTimeline}
              aria-label="Close timeline section"
            >
              <X size={15} /> Close Section
            </button>
          </div>

          <div className="timeline-header">
            <h3 className="timeline-title">Moments In Time</h3>
            <p className="timeline-lead">
              Hover over any photo to reveal its story. Click any image to view it full screen.
            </p>

            {/* Filter Pills */}
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
            <div className="timeline-grid timeline-grid--interactive">
              {filteredMoments.map((item, idx) => (
                <div
                  className="timeline-photo-card"
                  key={idx}
                  onClick={() => setModalPhoto(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setModalPhoto(item);
                  }}
                  aria-label={`View full photo: ${item.title}`}
                >
                  {/* Photo container */}
                  <div className={`timeline-photo-wrap timeline-photo-wrap--${item.kind}`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="timeline-corner-badge">{item.badge}</span>
                  </div>

                  {/* Hover Overlay with Title and Description */}
                  <div className="timeline-photo-hover-overlay">
                    <div className="timeline-hover-top">
                      <span className="timeline-hover-date">
                        <Calendar size={13} /> {item.date}
                      </span>
                      <span className="timeline-hover-zoom">
                        <Maximize2 size={15} /> Full View
                      </span>
                    </div>

                    <div className="timeline-hover-content">
                      <h4 className="timeline-hover-title">{item.title}</h4>
                      <p className="timeline-hover-desc">{item.desc}</p>
                      <span className="timeline-hover-loc">
                        <MapPin size={12} /> {item.location}
                      </span>
                    </div>
                  </div>
                </div>
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
            <button
              type="button"
              className="button button--ice"
              onClick={handleCloseTimeline}
            >
              <X size={17} /> Close Moments of Time Section
            </button>
            <button
              type="button"
              className="button button--ghost"
              onClick={handleCloseTimeline}
            >
              Gallery Top <ArrowUp size={17} />
            </button>
          </div>
        </div>
      )}

      {/* FULL PICTURE OVERLAP MODAL / LIGHTBOX */}
      {modalPhoto && (
        <div
          className="timeline-modal-overlay"
          onClick={() => setModalPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalPhoto.title}
        >
          {/* Modal Container */}
          <div
            className="timeline-modal-container"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing when clicking inside
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="timeline-modal-close"
              onClick={() => setModalPhoto(null)}
              aria-label="Close full view"
            >
              <X size={24} />
            </button>

            {/* Full Image */}
            <div className="timeline-modal-image-box">
              <img
                src={modalPhoto.image}
                alt={modalPhoto.title}
                className="timeline-modal-img"
              />
            </div>

            {/* Modal Caption Footer */}
            <div className="timeline-modal-caption">
              <div className="timeline-modal-meta">
                <span className="timeline-modal-tag">{modalPhoto.badge}</span>
                <span className="timeline-modal-date">
                  <Calendar size={13} /> {modalPhoto.date}
                </span>
                <span className="timeline-modal-loc">
                  <MapPin size={13} /> {modalPhoto.location}
                </span>
              </div>
              <h3 className="timeline-modal-title">{modalPhoto.title}</h3>
              <p className="timeline-modal-desc">{modalPhoto.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

