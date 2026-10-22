"use client";

import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FranchiseFormSection() {
  const initialFormData = {
    fullName: "",
    phone: "",
    city: "",
    whenToStart: "",
    haveShop: "",
    investmentReadiness: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    if (!formData.whenToStart) {
      setErrorMessage("Please select when you want to start.");
      return;
    }

    if (!formData.haveShop) {
      setErrorMessage("Please select your shop availability.");
      return;
    }

    if (!formData.investmentReadiness) {
      setErrorMessage("Please select your investment readiness.");
      return;
    }

    setIsSubmitting(true);

    try {
      const message = [
        "Hi TeaMax, I am interested in a franchise.",
        "",
        `Full Name: ${formData.fullName.trim()}`,
        `WhatsApp Number: +91${formData.phone}`,
        `City: ${formData.city.trim()}`,
        `When to Start: ${formData.whenToStart}`,
        `Shop Availability: ${formData.haveShop}`,
        `Investment Readiness: ${formData.investmentReadiness}`,
      ].join("\n");

      const whatsappUrl = `https://api.whatsapp.com/send?phone=919505047047&text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Franchise enquiry error:", error);
      setErrorMessage("Unable to open WhatsApp. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="franchise-form" className="tm-fc-form-section">
      <div className="tm-fc-container">
        <div className="tm-fc-form-card">
          {/* Left Photo */}
          <div className="tm-fc-form-media">
            <img
              src="/images/franchise-storefront.jpg"
              alt="TeaMax Store Interior and Counter"
              width="600"
              height="450"
            />
          </div>

          {/* Right Form */}
          <div className="tm-fc-form-body">
            <h2>Ready to Start Your Own TeaMax?</h2>

            <p className="sub">
              Get the complete franchise proposal, investment breakup and
              setup process.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: "rgba(255, 208, 40, 0.15)",
                  border: "1px solid #ffd028",
                  padding: "24px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "8px",
                    color: "#ffd028",
                  }}
                >
                  <BadgeCheck size={36} />
                </div>

                <h3
                  style={{
                    color: "#ffd028",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  Thank You!
                </h3>

                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  Your franchise enquiry is ready. Continue the conversation
                  with our team on WhatsApp.
                </p>

                <button
                  type="button"
                  className="tm-fc-btn-submit"
                  onClick={() => {
                    const message = [
                      "Hi TeaMax, I am interested in a franchise.",
                      `Full Name: ${formData.fullName.trim()}`,
                      `WhatsApp Number: +91${formData.phone}`,
                      `City: ${formData.city.trim()}`,
                      `When to Start: ${formData.whenToStart}`,
                      `Shop Availability: ${formData.haveShop}`,
                      `Investment Readiness: ${formData.investmentReadiness}`,
                    ].join("\n");

                    window.open(
                      `https://api.whatsapp.com/send?phone=919505047047&text=${encodeURIComponent(
                        message
                      )}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <FaWhatsapp size={20} />
                  <span>Continue on WhatsApp</span>
                </button>

                <button
                  type="button"
                  className="tm-fc-btn-submit"
                  style={{
                    marginTop: "12px",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onClick={() => {
                    setFormData(initialFormData);
                    setFormSubmitted(false);
                    setErrorMessage("");
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {errorMessage && (
                  <div
                    role="alert"
                    style={{
                      color: "#991b1b",
                      background: "#fff1f2",
                      border: "1px solid #fecaca",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="tm-fc-form-fields-grid">
                  {/* Row 1: Full Name */}
                  <div className="tm-fc-input-group">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="tm-fc-input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Row 1: WhatsApp Number */}
                  <div className="tm-fc-input-group">
                    <div className="tm-fc-phone-wrap">
                      <div className="tm-fc-phone-flag">
                        <svg
                          width="20"
                          height="14"
                          viewBox="0 0 30 20"
                          style={{
                            borderRadius: "2px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                          aria-label="Indian flag"
                        >
                          <rect width="30" height="6.66" fill="#FF9933" />
                          <rect
                            y="6.66"
                            width="30"
                            height="6.66"
                            fill="#FFFFFF"
                          />
                          <rect
                            y="13.33"
                            width="30"
                            height="6.67"
                            fill="#138808"
                          />
                          <circle cx="15" cy="10" r="2.5" fill="#000080" />
                        </svg>
                        <span>+91</span>
                      </div>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="WhatsApp Number"
                        className="tm-fc-phone-input"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: City */}
                  <div className="tm-fc-input-group">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="tm-fc-input"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  {/* Row 2: When to Start */}
                  <div className="tm-fc-input-group">
                    <select
                      name="whenToStart"
                      value={formData.whenToStart}
                      onChange={handleInputChange}
                      className="tm-fc-select"
                      required
                    >
                      <option value="">When to Start?</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="1-3 Months">1 to 3 Months</option>
                      <option value="Exploring">Just Exploring</option>
                    </select>
                  </div>

                  {/* Row 3: Shop Availability */}
                  <div className="tm-fc-input-group">
                    <select
                      name="haveShop"
                      value={formData.haveShop}
                      onChange={handleInputChange}
                      className="tm-fc-select"
                      required
                    >
                      <option value="">Do you have a shop?</option>
                      <option value="Yes, Owned Commercial Space">
                        Yes, Owned Commercial Space
                      </option>
                      <option value="Yes, Rented Commercial Space">
                        Yes, Rented Commercial Space
                      </option>
                      <option value="Looking for Location">
                        Looking for Location
                      </option>
                      <option value="No Space Yet">No Space Yet</option>
                    </select>
                  </div>

                  {/* Row 3: Investment Readiness */}
                  <div className="tm-fc-input-group">
                    <select
                      name="investmentReadiness"
                      value={formData.investmentReadiness}
                      onChange={handleInputChange}
                      className="tm-fc-select"
                      required
                    >
                      <option value="">Investment Readiness</option>
                      <option value="Ready with ₹4–5 Lakhs">
                        Ready with ₹4–5 Lakhs
                      </option>
                      <option value="Ready with ₹5–10 Lakhs">
                        Ready with ₹5–10 Lakhs
                      </option>
                      <option value="Arranging Funds / Loan">
                        Arranging Funds / Loan
                      </option>
                      <option value="Need Proposal First">
                        Need Proposal First
                      </option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="tm-fc-btn-submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  <span>
                    {isSubmitting
                      ? "Preparing Enquiry..."
                      : "Get Franchise Details on WhatsApp"}
                  </span>
                  <FaWhatsapp size={20} />
                </button>

                <p className="tm-fc-form-disclaimer">
                  Submitting an enquiry does not guarantee franchise or
                  location approval.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
