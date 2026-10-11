import { Camera } from "lucide-react";
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

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="gallery-heading reveal">
        <div>
          <p className="eyebrow eyebrow--light">06 / @hydh2o</p>
          <h2>Stay in<br />the flow.</h2>
        </div>
        <a className="button button--ghost" href="https://instagram.com" target="_blank" rel="noreferrer">
          Follow the feed <Camera size={18} />
        </a>
      </div>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <figure className={`gallery-item gallery-item--${item.kind} reveal`} key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} />
            <figcaption><Camera size={18} /> @hydh2o</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

