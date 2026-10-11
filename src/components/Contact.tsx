import { Check, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-copy reveal">
        <p className="eyebrow">07 / Contact</p>
        <h2>Let’s make<br />a splash.</h2>
        <p>Retail, hospitality, events or just a very thirsty group chat—we want to hear it.</p>
        <div className="contact-links">
          <a href="tel:+10000000000"><Phone size={18} /> +1 (000) 000-0000</a>
          <a href="mailto:hello@hydh2o.example"><Mail size={18} /> hello@hydh2o.example</a>
          <a href="https://wa.me/10000000000" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp HYDH₂O</a>
        </div>
        <small>Contact details are placeholders pending verification.</small>
      </div>
      <form className="contact-form reveal" onSubmit={submit}>
        {sent ? (
          <div className="form-success" role="status">
            <span><Check /></span>
            <h3>Message received.</h3>
            <p>This demo form is ready for a backend connection. We haven’t transmitted your details.</p>
            <button type="button" className="text-link" onClick={() => setSent(false)}>Send another note</button>
          </div>
        ) : (
          <>
            <label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>What’s the vibe?
              <select name="topic" defaultValue="Bulk order">
                <option>Bulk order</option><option>Retail partnership</option><option>Events</option><option>Press</option>
              </select>
            </label>
            <label>Message<textarea required name="message" rows={4} placeholder="Tell us what you’re planning…" /></label>
            <button className="button button--blue" type="submit">Send enquiry <Send size={18} /></button>
            <p className="integration-note">Demo only · backend integration pending</p>
          </>
        )}
      </form>
    </section>
  );
}

