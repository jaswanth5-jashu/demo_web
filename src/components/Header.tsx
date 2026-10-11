import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "./BrandMark";
import { NAV_ITEMS } from "../constants/navigation";
import "./Header.css";

export default function Header({
  onNavigate,
}: {
  onNavigate?: (to: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <BrandMark onNavigate={onNavigate} />
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {NAV_ITEMS.map(([label, id]) => {
          const isPage = id === "feedback" || id === "why-hydh2o";
          return (
            <a
              key={id}
              href={isPage ? `/${id}` : `/#${id}`}
              onClick={(e) => {
                setOpen(false);
                if (onNavigate && isPage) {
                  e.preventDefault();
                  onNavigate(`/${id}`);
                } else if (onNavigate && !isPage) {
                  e.preventDefault();
                  onNavigate(`/#${id}`);
                }
              }}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <a
        className="header-cta"
        href="/#calculator"
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate("/#calculator");
          }
        }}
      >
        Order water <ArrowUpRight size={16} />
      </a>
    </header>
  );
}

