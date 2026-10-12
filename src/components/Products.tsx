import { ChevronRight } from "lucide-react";
import { useState } from "react";
import "./Products.css";

const COLLECTION_POINTS = [
  "Elegant 750ml & 500ml glass bottles — not plastic",
  "Custom label printing: your logo, brand identity, or event artwork",
  "Consistent, premium unboxing for every single guest",
  "pH 7.5 ± balanced, UV treated, Reverse Osmosis, Ozonated",
];

export default function Products() {
  const [active, setActive] = useState(0);
  const products = [
    {
      label: "The Column",
      image: "/assets/hydh2o-bottle-tall.png",
      description: "Pure geometry and vertical wordmark energy, made for the table and the feed.",
      pricing: "500 ml: ₹35 / 750 ml: ₹42 (+ tax)",
    },
    {
      label: "The Curve",
      image: "/assets/hydh2o-bottle-curve.png",
      description: "A sculptural silhouette with a soft grip and timeless aluminum closure.",
      pricing: "500 ml: ₹35 / 750 ml: ₹42 (+ tax)",
    },
  ];
  const product = products[active];

  return (
    <section id="products" className="section products">
      <div className="section-heading reveal">
        <p className="eyebrow">02 / The collection</p>
        <h2>Crafted In Glass.<br />Built For Your Brand.</h2>
      </div>
      <div className="product-stage reveal">
        <div className="product-info">
          <div className="product-tabs" role="tablist" aria-label="Choose a bottle">
            {products.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
              >
                <span>0{index + 1}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="product-detail">
            <p className="product-desc">{product.description}</p>
            <ul className="product-highlights">
              {COLLECTION_POINTS.map((pt, i) => (
                <li key={i}>
                  <span className="product-bullet" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <dl className="product-specs">
              <div><dt>Price</dt><dd>{product.pricing}</dd></div>
              <div><dt>Min. Order</dt><dd>10 bottles</dd></div>
            </dl>
            <a className="text-link" href="#calculator">Build your order <ChevronRight size={18} /></a>
          </div>
        </div>
        <div className="product-visual">
          <div className="liquid-disc" />
          <img key={product.image} src={product.image} alt={`${product.label} HYDH₂O bottle`} />
          <p>Drag to imagine / tap to switch</p>
        </div>
        <div className="product-number">0{active + 1}</div>
      </div>
    </section>
  );
}

