"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  budget: string;
  space: string;
  consent: boolean;
}

const initialData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  budget: "",
  space: "",
  consent: false,
};

export function FranchiseForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    if (!formData.state) {
      setErrorMessage("Please select your state.");
      return;
    }

    if (!formData.budget) {
      setErrorMessage("Please select your investment budget.");
      return;
    }

    if (!formData.space) {
      setErrorMessage(
        "Please select whether you have your own space."
      );
      return;
    }

    if (!formData.consent) {
      setErrorMessage(
        "Please agree to the Terms & Privacy Policy."
      );
      return;
    }

    setIsSubmitting(true);

    // SAME API CAN BE USED HERE
    console.log("Franchise Payload:", formData);

    // Temporary simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div
        className="tm-form-card tm-animate-fade"
        style={{
          textAlign: "center",
          padding: "48px 32px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "rgba(38, 60, 61, 0.08)",
            color: "var(--tm-teal)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3
          style={{
            fontFamily: "var(--tm-font-serif)",
            fontSize: "26px",
            color: "var(--tm-teal)",
            marginBottom: "10px",
          }}
        >
          Application Received
        </h3>

        <p
          style={{
            color: "var(--tm-teal-muted)",
            fontSize: "14.5px",
            lineHeight: 1.6,
            maxWidth: "460px",
            margin: "0 auto 24px",
          }}
        >
          Thank you, <strong>{formData.fullName}</strong>. Our
          franchise expansion team has received your inquiry for{" "}
          <strong>{formData.city}</strong>. We will review your
          profile and reach out within 24 business hours.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <a
            href={`https://api.whatsapp.com/send?phone=919505047047&text=${encodeURIComponent(
              `Hi TeaMax, I just submitted a franchise application for ${formData.city}. My investment budget is ${formData.budget} and space status is ${formData.space}. Please share the brochure.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tm-btn tm-btn-teal tm-btn-sm"
          >
            Chat on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => {
              setFormData(initialData);
              setIsSubmitted(false);
              setErrorMessage("");
            }}
            className="tm-btn tm-btn-outline tm-btn-sm"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="apply" className="tm-form-card">

      <div style={{ marginBottom: "24px" }}>
        <p className="tmx-franchise-form-eyebrow">
          TEAMAX / FRANCHISE ENQUIRY
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            background: "rgba(220, 38, 38, 0.08)",
            border: "1px solid rgba(220, 38, 38, 0.25)",
            color: "#991b1b",
            fontSize: "13px",
            padding: "10px 14px",
            borderRadius: "10px",
            marginBottom: "18px",
          }}
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        <div className="tm-form-grid">

          {/* NAME + PHONE */}

          <div className="tm-form-grid tm-form-grid-2">

            <div className="tm-field-group">
              <label htmlFor="fullName">
                Full Name *
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="tm-field-input"
              />
            </div>

            <div className="tm-field-group">
              <label htmlFor="phone">
                Mobile Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="tm-field-input"
              />
            </div>

          </div>


          {/* EMAIL + CITY */}

          <div className="tm-form-grid tm-form-grid-2">

            <div className="tm-field-group">
              <label htmlFor="email">
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className="tm-field-input"
              />
            </div>

            <div className="tm-field-group">
              <label htmlFor="city">
                Your City *
              </label>

              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="Your city"
                value={formData.city}
                onChange={handleChange}
                className="tm-field-input"
              />
            </div>

          </div>


          {/* STATE + BUDGET */}

          <div className="tm-form-grid tm-form-grid-2">

            <div className="tm-field-group">
              <label htmlFor="state">
                State *
              </label>

              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="tm-field-select"
                required
              >
                <option value="">
                  State
                </option>

                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Rajasthan</option>
                <option>Gujarat</option>
                <option>Delhi</option>
                <option>Uttar Pradesh</option>
                <option>Telangana</option>
                <option>Andhra Pradesh</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>West Bengal</option>
                <option>Odisha</option>
                <option>Other</option>
              </select>
            </div>

            <div className="tm-field-group">
              <label htmlFor="budget">
                Investment Budget *
              </label>

              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="tm-field-select"
                required
              >
                <option value="">
                  Select Investment Budget
                </option>

                <option value="Under ₹3.5L">
                  Under ₹3.5L
                </option>

                <option value="₹3.5L–7L">
                  ₹3.5L–7L
                </option>

                <option value="₹7L–15L">
                  ₹7L–15L
                </option>
              </select>
            </div>

          </div>


          {/* OWN SPACE */}

          <div className="tm-field-group">

            <label>
              Do you have your own space? *
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "10px",
              }}
            >

              {["Yes", "No", "Looking"].map((option) => (
                <label
                  key={option}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="space"
                    value={option}
                    checked={formData.space === option}
                    onChange={handleChange}
                    required
                    style={{
                      position: "absolute",
                      opacity: 0,
                    }}
                  />

                  <span
                    style={{
                      minHeight: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #dedbc9",
                      borderRadius: "8px",
                      background:
                        formData.space === option
                          ? "#ead6a6"
                          : "#f5f2e8",
                      color: "#425548",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {option}
                  </span>
                </label>
              ))}

            </div>
          </div>


          {/* CONSENT */}

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "var(--tm-teal-muted)",
            }}
          >
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              style={{
                width: "18px",
                height: "18px",
                flex: "0 0 auto",
                marginTop: "1px",
              }}
            />

            <span>
              I agree to the{" "}
              <a
                href="/terms"
                style={{
                  color: "var(--tm-teal)",
                  textDecoration: "underline",
                }}
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                href="/privacy"
                style={{
                  color: "var(--tm-teal)",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </a>{" "}
              and consent to being contacted by TeaMax.
            </span>
          </label>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="tm-btn tm-btn-teal"
            style={{
              width: "100%",
              marginTop: "8px",
            }}
          >
            {isSubmitting
              ? "Submitting Inquiry..."
              : "Get Franchise Details →"}
          </button>

        </div>

        <p className="tm-form-disclaimer">
          🔒 Your privacy is protected. We will only contact you
          regarding TeaMax franchise opportunities. No spam.
        </p>

      </form>
    </div>
  );
}