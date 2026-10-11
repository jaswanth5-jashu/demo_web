import "./CertifiedCompliant.css";

const CERTIFIED_POINTS = [
  {
    metric: "7.5 ±",
    label: "Typical pH",
    description: "Balanced alkaline water, contains silica",
  },
  {
    logo: "/assets/fssai-logo.png",
    metric: "FSSAI",
    label: "Licensed",
    description: "Lic. No. 13626034000354",
  },
  {
    logo: "/assets/msme-logo.png",
    metric: "MSME",
    label: "Registered",
    description: "Verified small business enterprise",
  },
  {
    metric: "100%",
    label: "Made in India",
    description: "Proudly produced in Hyderabad",
  },
];

export default function CertifiedCompliant() {
  return (
    <section id="certified" className="section certified-section">
      <div className="section-heading reveal">
        <p className="eyebrow">CERTIFIED & COMPLIANT</p>
        <h2>Quality You Can<br />Put Your Name On</h2>
      </div>

      <div className="certified-grid reveal">
        {CERTIFIED_POINTS.map((item, idx) => (
          <div className="certified-card" key={idx}>
            {item.logo ? (
              <div className="certified-logo-wrap">
                <img
                  src={item.logo}
                  alt={item.label}
                  className="certified-logo-img"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="certified-metric">{item.metric}</div>
            )}
            <h3 className="certified-label">{item.label}</h3>
            <p className="certified-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

