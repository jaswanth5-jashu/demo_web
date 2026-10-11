export default function BrandMark({
  light = false,
  onNavigate,
}: {
  light?: boolean;
  onNavigate?: (to: string) => void;
}) {
  return (
    <a
      className={`brand-mark ${light ? "brand-mark--light" : ""}`}
      href="/#home"
      aria-label="HYDH₂O home"
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate("/#home");
        }
      }}
    >
      <img src="/assets/hydh2o-logo.png" alt="HYDH₂O Hydrating Water" />
    </a>
  );
}

