
"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { ArrowRight, Check, X } from "lucide-react";
import "./franchise-popup.css";

const indianStateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
].map((state) => ({
  value: state,
  label: state,
}));

export default function FranchisePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    whenToStart: "",
    haveShop: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("teamax-franchise-popup");

    if (alreadyShown) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) return;

      const scrollPercentage = (scrollTop / documentHeight) * 100;

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

  const closePopup = () => setIsOpen(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));
      setErrorMessage("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      setErrorMessage("Please enter a valid email address.");
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

    if (!indianStateOptions.some((option) => option.value === formData.state)) {
      setErrorMessage("Please select a valid Indian state or union territory.");
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

    setIsSubmitting(true);

    try {
      const [year, month] = formData.whenToStart.split("-").map(Number);

      const selectedStartMonth = new Date(
        year,
        month - 1,
        1
      ).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });

      const message = [
        "Hi TeaMax, I am interested in a franchise.",
        "",
        `Full Name: ${formData.fullName.trim()}`,
        `Email: ${formData.email.trim()}`,
        `WhatsApp Number: +91${formData.phone}`,
        `City: ${formData.city.trim()}`,
        `State: ${formData.state}`,
        `When to Start: ${selectedStartMonth}`,
        `Shop Availability: ${formData.haveShop}`,
      ].join("\n");

      const whatsappUrl =
        `https://api.whatsapp.com/send?phone=919505047047&text=${encodeURIComponent(message)}`;

      const whatsappWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!whatsappWindow) {
        setErrorMessage(
          "WhatsApp could not be opened. Please allow popups and try again."
        );
        return;
      }

      setIsOpen(false);
      setFormData(initialFormData);
    } catch {
      setErrorMessage("Unable to open WhatsApp. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

          <p className="tmx-franchise-eyebrow">TEAMAX FRANCHISE</p>

          <h2 id="tmx-franchise-title">
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
            <img src="/images/cafe-interior.jpg" alt="TeaMax café" />
          </div>

          <div className="tmx-franchise-benefits">
            <div>
              <Check size={16} />
              <span>250+ outlet network</span>
            </div>
            <div>
              <Check size={16} />
              <span>Setup &amp; staff training</span>
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
            FRANCHISE ENQUIRY
          </p>

          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="tmx-franchise-error" role="alert">
                {errorMessage}
              </div>
            )}

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name *"
              className="tmx-franchise-input"
              autoComplete="name"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              className="tmx-franchise-input"
              autoComplete="email"
              required
            />

            {/* WhatsApp Number */}
            <div className="tmx-franchise-phone-wrap">
              <div className="tmx-franchise-phone-flag">
                <span>+91</span>
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="WhatsApp Number *"
                className="tmx-franchise-input"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                required
              />
            </div>

            {/* City */}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City *"
              className="tmx-franchise-input"
              autoComplete="address-level2"
              required
            />

            {/* Searchable State Dropdown */}
            <Select
              inputId="tmx-franchise-state"
              name="state"
              options={indianStateOptions}
              value={
                indianStateOptions.find(
                  (option) => option.value === formData.state
                ) || null
              }
              onChange={(selectedOption) => {
                setFormData((prev) => ({
                  ...prev,
                  state: selectedOption?.value || "",
                }));
                setErrorMessage("");
              }}
              placeholder="Select State *"
              isSearchable
              isClearable
              required
              className="tmx-franchise-state-select"
              classNamePrefix="tmx-state"
              noOptionsMessage={() => "No state found"}
              menuPlacement="auto"
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
              maxMenuHeight={220}
              openMenuOnFocus={false}
              blurInputOnSelect
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  minWidth: 0,
                }),

                control: (base, state) => ({
                  ...base,
                  minHeight: "58px",
                  height: "58px",
                  boxShadow: "none",
                  borderColor: state.isFocused ? "#263c3d" : "#d9d3c5",
                  borderRadius: "13px",
                  backgroundColor: "#fff9f0",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#263c3d",
                  },
                }),

                valueContainer: (base) => ({
                  ...base,
                  height: "56px",
                  padding: "0 16px",
                  overflow: "hidden",
                  flexWrap: "nowrap",
                }),

                input: (base) => ({
                  ...base,
                  margin: 0,
                  padding: 0,
                  color: "#263c3d",
                  minWidth: 0,
                  flex: "1 1 0%",
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "#52666a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: 0,
                }),

                singleValue: (base) => ({
                  ...base,
                  color: "#263c3d",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),

                indicatorsContainer: (base) => ({
                  ...base,
                  height: "56px",
                  flexShrink: 0,
                }),

                clearIndicator: (base) => ({
                  ...base,
                  padding: "8px",
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  padding: "0 14px",
                  color: "#52666a",
                }),

                menu: (base) => ({
                  ...base,
                  zIndex: 99999,
                  marginTop: "6px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#fff9f0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                }),

                menuList: (base) => ({
                  ...base,
                  maxHeight: "220px",
                  padding: "6px",
                }),

                option: (base, state) => ({
                  ...base,
                  padding: "12px 14px",
                  borderRadius: "8px",
                  backgroundColor: state.isFocused
                    ? "#ffed82"
                    : state.isSelected
                      ? "#f6e7a0"
                      : "transparent",
                  color: "#263c3d",
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "#ffed82",
                  },
                }),

                noOptionsMessage: (base) => ({
                  ...base,
                  color: "#52666a",
                  padding: "12px",
                }),
              }}
            />

            {/* Month and Year */}
            <div className="tmx-franchise-month-field">
              <label
                htmlFor="whenToStart"
                className="tmx-franchise-month-label"
              >
                When to Start? *
              </label>

              <input
                type="month"
                id="whenToStart"
                name="whenToStart"
                value={formData.whenToStart}
                onChange={handleInputChange}
                className="tmx-franchise-select tmx-franchise-month-input"
                min="2026-10"
                required
              />
            </div>

            {/* Shop Availability */}
            <select
              name="haveShop"
              value={formData.haveShop}
              onChange={handleInputChange}
              className="tmx-franchise-select"
              required
            >
              <option value="">Do you have a space? *</option>
              <option value="Yes, Owned Commercial Space">
                Yes, Owned Commercial Space
              </option>
              <option value="Yes, Rented Commercial Space">
                Yes, Rented Commercial Space
              </option>
              <option value="Looking for Location">
                Looking for space
              </option>
              <option value="No Space Yet">No Space Yet</option>
            </select>

            <button
              type="submit"
              className="tmx-franchise-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Preparing Enquiry..."
                : "Get Franchise Details on WhatsApp"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
