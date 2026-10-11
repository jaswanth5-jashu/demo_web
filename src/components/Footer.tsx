import { Camera, MessageCircle } from "lucide-react";
import BrandMark from "./BrandMark";
import { NAV_ITEMS } from "../constants/navigation";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div><BrandMark light /><p>Pure water.<br />Loud presence.</p></div>
        <nav aria-label="Footer navigation">
          {NAV_ITEMS.map(([label, id]) => {
            const isPage = id === "feedback" || id === "why-hydh2o";
            return <a key={id} href={isPage ? `/${id}` : `/#${id}`}>{label}</a>;
          })}
        </nav>
        <div className="footer-contact">
          <p>Say hello</p>
          <a href="mailto:hello@hydh2o.example">hello@hydh2o.example</a>
          <div><a href="https://instagram.com" aria-label="Instagram"><Camera /></a><a href="https://wa.me/10000000000" aria-label="WhatsApp"><MessageCircle /></a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 HYDH₂O</span>
        <div><a href="#home">Privacy</a><a href="#home">Terms</a><a href="#home">Accessibility</a></div>
        <span>Made to make waves.</span>
      </div>
    </footer>
  );
}

