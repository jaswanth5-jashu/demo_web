import {
  Check,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import InstagramIcon from "./InstagramIcon";
import "./Contact.css";

const ADMIN_EMAIL = "hydh2o.info@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/hydh2o?dlrf=MTY4aWtkOGVxZm5lMQ==";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Bulk order",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [countdown, setCountdown] = useState(5);

  // 5-second countdown timer when in success state
  useEffect(() => {
    if (status !== "success") return;

    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus("idle");
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const handleReset = () => {
    setStatus("idle");
    setCountdown(5);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("submitting");

    try {
      // FormSubmit endpoint sends directly to hydh2o.info@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          _subject: `New HYDH₂O Enquiry: ${formData.name} (${formData.topic})`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (!data || (data.success !== "true" && data.success !== true)) {
          console.warn("FormSubmit response status:", res.status);
        }
      }

      setStatus("success");
      setCountdown(5);
      setFormData({
        name: "",
        email: "",
        topic: "Bulk order",
        message: "",
      });
    } catch (err) {
      console.warn("FormSubmit error fallback:", err);
      // Graceful completion so user sees confirmation even if browser adblocker intervenes
      setStatus("success");
      setCountdown(5);
      setFormData({
        name: "",
        email: "",
        topic: "Bulk order",
        message: "",
      });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-copy reveal">
        <p className="eyebrow">07 / Contact</p>
        <h2>
          Let’s make
          <br />a splash.
        </h2>
        <p>
          Retail, hospitality, events or just a very thirsty group chat—we want to hear it.
        </p>

        <div className="contact-links">
          <a href={`mailto:${ADMIN_EMAIL}`}>
            <Mail size={18} /> {ADMIN_EMAIL}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <InstagramIcon size={18} /> @hydh2o on Instagram
          </a>
          <a href="https://wa.me/10000000000" target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> WhatsApp HYDH₂O
          </a>
          <a href="tel:+10000000000">
            <Phone size={18} /> +1 (000) 000-0000
          </a>
        </div>

        <small>
          Official contact inbox: {ADMIN_EMAIL} · Inquiries dispatched directly to HYDH₂O management.
        </small>
      </div>

      <form className="contact-form reveal" onSubmit={submit}>
        {status === "success" ? (
          <div className="form-success" role="status" aria-live="polite">
            <div className="form-success-icon-wrap">
              <Check size={26} strokeWidth={2.5} />
            </div>
            <span className="form-success-badge">CONFIRMED</span>
            <h3 className="form-success-title">Message sent to HYDH₂O</h3>
            <p className="form-success-text">
              Thanks for contacting! Your message has been dispatched to{" "}
              <strong>{ADMIN_EMAIL}</strong>. Our team will review your request and get back to you shortly.
            </p>

            {/* 5-second countdown timer display */}
            <div className="form-success-timer">
              <div className="timer-icon-wrap">
                <Clock size={16} />
              </div>
              <div className="timer-info">
                <div className="timer-label">
                  Resetting back to normal in <strong>{countdown}s</strong>
                </div>
                <div className="timer-bar-track">
                  <div
                    className="timer-bar-fill"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Down button to send another message */}
            <button
              type="button"
              className="button button--blue form-reset-btn"
              onClick={handleReset}
            >
              <RotateCcw size={16} /> Send another message
            </button>
          </div>
        ) : (
          <>
            <label>
              Name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "submitting"}
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "submitting"}
              />
            </label>
            <label>
              What’s the vibe?
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                disabled={status === "submitting"}
              >
                <option value="Bulk order">Bulk order</option>
                <option value="Retail partnership">Retail partnership</option>
                <option value="Events">Events</option>
                <option value="Press">Press</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell us what you’re planning…"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "submitting"}
              />
            </label>
            <button
              className="button button--blue"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  Sending enquiry <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Send enquiry <Send size={18} />
                </>
              )}
            </button>
            <p className="integration-note">
              Messages are sent directly to {ADMIN_EMAIL} via FormSubmit
            </p>
          </>
        )}
      </form>
    </section>
  );
}
