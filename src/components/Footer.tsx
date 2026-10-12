import { MessageCircle } from "lucide-react";
import BrandMark from "./BrandMark";
import InstagramIcon from "./InstagramIcon";
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
          <a href="mailto:hydh2o.info@gmail.com">hydh2o.info@gmail.com</a>
          <div>
            <a
              href="https://www.instagram.com/hydh2o?dlrf=MTY4aWtkOGVxZm5lMQ=="
              target="_blank"
              rel="noreferrer"
              aria-label="HYDH₂O Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a href="https://wa.me/10000000000" aria-label="WhatsApp">
              <MessageCircle />
            </a>
          </div>
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

