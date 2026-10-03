"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import "./franchise-popup.css";

export default function FranchisePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Popup sirf ek baar per browser session show hoga
    const alreadyShown = sessionStorage.getItem("teamax-franchise-popup");

    if (alreadyShown) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) return;

      const scrollPercentage = (scrollTop / documentHeight) * 100;

      // 25% scroll ke baad popup
      if (scrollPercentage >= 25) {
        setIsOpen(true);
        sessionStorage.setItem("teamax-franchise-popup", "true");

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Abhi frontend only
    // Yahan baad me API / WhatsApp / email connect kar sakte ho.

    alert("Thank you! Our franchise team will contact you soon.");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="tmx-franchise-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tmx-franchise-title"
    >
      <div className="tmx-franchise-modal">

        {/* LEFT SIDE */}
        <div className="tmx-franchise-left">

          <button
            type="button"
            className="tmx-franchise-mobile-close"
            onClick={closePopup}
            aria-label="Close popup"
          >
            <X size={21} />
          </button>

          <div className="tmx-franchise-brand">
            <span>TM</span>
          </div>

          <p className="tmx-franchise-eyebrow">
            TEAMAX FRANCHISE
          </p>

          <h2>
            Your city.
            <br />
            Your café.
            <br />
            <em>Let&apos;s begin.</em>
          </h2>

          <p className="tmx-franchise-left-description">
            A café, ice cream parlour and juice center.
            One TeaMax opportunity.
          </p>

          <div className="tmx-franchise-image">
            <img
              src="/images/cafe-interior.jpg"
              alt="TeaMax café"
            />
          </div>

          <div className="tmx-franchise-benefits">

            <div>
              <Check size={16} />
              <span>250+ outlet network</span>
            </div>

            <div>
              <Check size={16} />
              <span>Setup & staff training</span>
            </div>

            <div>
              <Check size={16} />
              <span>Ongoing brand support</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="tmx-franchise-right">

          <button
            type="button"
            className="tmx-franchise-close"
            onClick={closePopup}
            aria-label="Close popup"
          >
            <X size={22} />
          </button>

          <p className="tmx-franchise-form-eyebrow">
            TEAMAX / FRANCHISE ENQUIRY
          </p>

         
          

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your full name *"
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number (10-digit) *"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address *"
              required
            />

            <div className="tmx-franchise-two-column">

              <input
                type="text"
                name="city"
                placeholder="Your city *"
                required
              />

              <select name="state" required defaultValue="">
                <option value="" disabled>
                  State
                </option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Rajasthan</option>
                <option>Gujarat</option>
                <option>Delhi</option>
                <option>Uttar Pradesh</option>
                <option>Other</option>
              </select>

            </div>

            <label className="tmx-franchise-label">
              Investment budget
            </label>

            <div className="tmx-franchise-options">

              <label>
                <input
                  type="radio"
                  name="budget"
                  value="under-3.5"
                  required
                />
                <span>Under ₹3.5L</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="budget"
                  value="3.5-7"
                />
                <span>₹3.5L–7L</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="budget"
                  value="7-15"
                />
                <span>₹7L–15L</span>
              </label>

            </div>

            <label className="tmx-franchise-label">
              Do you have your own space?
            </label>

            <div className="tmx-franchise-options">

              <label>
                <input
                  type="radio"
                  name="space"
                  value="yes"
                  required
                />
                <span>Yes</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="space"
                  value="no"
                />
                <span>No</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="space"
                  value="looking"
                />
                <span>Looking</span>
              </label>

            </div>

            <label className="tmx-franchise-consent">
              <input type="checkbox" required />

              <span>
                I agree to the{" "}
                <a href="/terms">Terms</a> &{" "}
                <a href="/privacy">Privacy Policy</a>{" "}
                and consent to being contacted by TeaMax.
              </span>
            </label>

            <button
              type="submit"
              className="tmx-franchise-submit"
            >
              Get Franchise Details
              <ArrowRight size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}