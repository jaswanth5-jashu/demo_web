import { Link } from "lucide-react";
import "./Founders.css";

const founders = [
  {
    name: "Founder name",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Founder name",
    role: "Chief Brand Officer",
    image:
      "https://images.unsplash.com/photo-1629740936456-4b990c27e503?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Founder name",
    role: "Chief Product Officer",
    image:
      "https://images.unsplash.com/photo-1589006227094-fc2fcf082f87?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Founders() {
  return (
    <section id="founders" className="section founders">
      <div className="section-heading reveal">
        <p className="eyebrow">05 / The people</p>
        <h2>Meet the minds<br />behind the wave.</h2>
        <p className="placeholder-note">Founder names, roles and portraits are placeholders.</p>
      </div>
      <div className="founder-grid">
        {founders.map((founder, index) => (
          <article className="founder-card reveal" key={index}>
            <img src={founder.image} alt="" />
            <div className="founder-overlay">
              <span>0{index + 1}</span>
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
              <a href="#contact" aria-label={`Contact ${founder.name}`}><Link size={19} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

