import { Check, MessageCircle, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [type, setType] = useState("Curve");
  const [size, setSize] = useState("500");
  const [quantity, setQuantity] = useState(10);
  const prices: Record<string, Record<string, number>> = {
    Curve: { "500": 35, "750": 42 },
    Column: { "500": 35, "750": 42 },
  };
  const availableSizes = Object.keys(prices[type]);
  const safeSize = availableSizes.includes(size) ? size : availableSizes[0];
  const unitPrice = prices[type][safeSize];
  const total = unitPrice * quantity;
  const message = encodeURIComponent(
    `Hi HYDH₂O, I'd like a quote for ${quantity} × ${type} ${safeSize}ml bottles (₹${unitPrice} each + tax). Total: ₹${total} + tax.`
  );

  useEffect(() => {
    if (!availableSizes.includes(size)) setSize(availableSizes[0]);
  }, [type, size, availableSizes]);

  return (
    <section id="calculator" className="section calculator">
      <div className="calculator-intro reveal">
        <p className="eyebrow eyebrow--light">03 / Quantity calculator</p>
        <h2>Plan your<br />next pour.</h2>
        <p>From launch nights to full venue takeovers, build a starting estimate in seconds.</p>
        <span className="price-note">Minimum order: 10 bottles. Prices exclude applicable GST/tax.</span>
      </div>
      <div className="calculator-panel reveal">
        <div className="field-group">
          <span className="field-label">01 / Bottle</span>
          <div className="choice-grid">
            {Object.keys(prices).map((item) => (
              <button className={type === item ? "is-active" : ""} type="button" key={item} onClick={() => setType(item)}>
                {item}
                {type === item && <Check size={17} />}
              </button>
            ))}
          </div>
        </div>
        <div className="field-group">
          <span className="field-label">02 / Size & Price</span>
          <div className="choice-grid">
            {availableSizes.map((item) => (
              <button className={safeSize === item ? "is-active" : ""} type="button" key={item} onClick={() => setSize(item)}>
                <span>{item} ml</span>
                <span className="choice-price">₹{prices[type][item]} + tax</span>
              </button>
            ))}
          </div>
        </div>
        <div className="field-group">
          <div className="field-label">
            <span>03 / Quantity</span>
            <span className="min-order-pill">Min. order: 10</span>
          </div>
          <div className="quantity-control">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 10}
              onClick={() => setQuantity(Math.max(10, quantity - 5))}
            >
              <Minus />
            </button>
            <strong>{quantity}</strong>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity(quantity + 5)}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="estimate">
          <div>
            <span>Estimated total ({quantity} × ₹{unitPrice})</span>
            <strong>₹{total.toLocaleString("en-IN")}<small className="tax-suffix"> + tax</small></strong>
            <small className="min-order-subtext">Min. order: 10 bottles • Taxes extra</small>
          </div>
          <a
            className="button button--blue"
            href={`https://wa.me/919100356490?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            Get bulk quote <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

