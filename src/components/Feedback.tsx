import { Check, Quote, Send, Star, ThumbsUp } from "lucide-react";
import { FormEvent, useState } from "react";
import "./Feedback.css";

const feedbackCategories = [
  "Product Quality",
  "Bottle Design",
  "Taste",
  "Packaging",
  "Delivery",
  "Overall Experience",
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !category) {
      setError("Choose a star rating and one feedback category.");
      return;
    }
    setError("");
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  };

  return (
    <section id="feedback" className="section feedback">
      <div className="feedback-ripple" aria-hidden="true" />
      <div className="feedback-heading reveal">
        <p className="eyebrow eyebrow--light">09 / Feedback</p>
        <h2>YOUR SIP.<br />YOUR SAY.</h2>
        <p>Help us make HYDH₂O even better.</p>
      </div>
      <div className="feedback-layout">
        <form className="feedback-form reveal" onSubmit={submit}>
          {status === "success" ? (
            <div className="feedback-success" role="status" aria-live="polite">
              <div className="success-rings"><Check /></div>
              <p className="eyebrow eyebrow--light">Feedback captured</p>
              <h3>That made waves.</h3>
              <p>Thanks for helping shape the next HYDH₂O drop.</p>
              <p className="integration-note integration-note--light">Demo confirmation · backend integration pending</p>
              <button className="button button--ice" type="button" onClick={() => {
                setStatus("idle"); setRating(0); setCategory("");
              }}>Share another thought</button>
            </div>
          ) : (
            <>
              <fieldset>
                <legend>How was your sip?</legend>
                <div className="stars" onMouseLeave={() => setHoveredRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoveredRating(star)}
                      onFocus={() => setHoveredRating(star)}
                      onBlur={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      aria-pressed={rating === star}
                    >
                      <Star className={(hoveredRating || rating) >= star ? "is-filled" : ""} />
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>What are we talking about?</legend>
                <div className="category-list">
                  {feedbackCategories.map((item) => (
                    <button key={item} className={category === item ? "is-active" : ""} type="button" onClick={() => setCategory(item)}>
                      {item} {category === item && <Check size={15} />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label>Tell us more
                <textarea name="feedback" required rows={5} placeholder="Tell us what you think…" />
              </label>
              <div className="feedback-identity">
                <label>Name <span>(optional)</span><input name="name" autoComplete="name" placeholder="Your name" /></label>
                <label>Email <span>(optional)</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
              </div>
              <button
                className={`recommend ${recommend ? "is-active" : ""}`}
                type="button"
                role="switch"
                aria-checked={recommend}
                onClick={() => setRecommend(!recommend)}
              >
                <span><ThumbsUp size={19} /> I’d recommend HYDH₂O</span>
                <i><b /></i>
              </button>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button--ice submit-feedback" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Making waves…" : "Submit feedback"} <Send size={18} />
              </button>
              <p className="integration-note integration-note--light">Demo only · feedback backend integration pending</p>
            </>
          )}
        </form>
        <aside className="reviews reveal">
          <p className="eyebrow eyebrow--light">Community notes</p>
          <article>
            <Quote />
            <p>“The kind of bottle you keep on the table long after dinner ends.”</p>
            <footer><span>AM</span><div><strong>Alex M.</strong><small>Sample review</small></div></footer>
          </article>
          <article>
            <Quote />
            <p>“Hydration finally understood the assignment.”</p>
            <footer><span>JR</span><div><strong>Jamie R.</strong><small>Sample review</small></div></footer>
          </article>
          <p className="review-disclaimer">Testimonials shown are placeholders, not verified customer reviews.</p>
        </aside>
      </div>
    </section>
  );
}

