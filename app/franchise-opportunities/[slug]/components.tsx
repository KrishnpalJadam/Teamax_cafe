"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./components.css";
import {
    ArrowRight,
    Coffee,
    ChefHat,
    Percent,
    CheckCircle2,
    ChevronDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import FranchiseFormSection from "./franchise-form";

export type FranchiseOpportunity = {
    id: number;
    franchiseName: string;
    slug: string;
    country: string;
    state: string;
    city: string;
    shortDescription: string;
    description: string;
    primaryImage: string;
};

type Props = {
    opportunity: FranchiseOpportunity;
};

// Target prime locations grouped by state
const stateLocationsData: Record<string, Array<{ name: string; desc: string }>> = {
    Telangana: [
        { name: "Hyderabad", desc: "Central & IT Hub (Gachibowli, Hitech City, Kompally)" },
        { name: "Warangal", desc: "Commercial & University Corridor" },
        { name: "Karimnagar", desc: "Prime High Street Market" },
        { name: "Nizamabad", desc: "Transit Hub & College Zone" },
        { name: "Khammam", desc: "High Density Retail Corridor" },
        { name: "Nalgonda", desc: "Prime High Street & Town Center" },
        { name: "Mahbubnagar", desc: "Developing Transit & Market Area" },
    ],
    "Madhya Pradesh": [
        { name: "Indore", desc: "Vijay Nagar, Palasia & Bhawar Kuan Youth Belts" },
        { name: "Bhopal", desc: "MP Nagar Business Zone & Arera Colony" },
        { name: "Ujjain", desc: "Freeganj Commercial Area & Mahakal Corridor" },
        { name: "Gwalior", desc: "Lashkar & City Centre High Street" },
        { name: "Jabalpur", desc: "Wright Town & Civil Lines Retail Hub" },
        { name: "Sagar", desc: "Civil Lines & Katra Commercial Market" },
        { name: "Ratlam", desc: "Station Road & Do Batti Prime Market" },
    ],
};

const otherCitiesList = [
    "Franchise Telangana",
    "Franchise Hyderabad",
    "Franchise Indore",
    "Franchise Bhopal",
    "Franchise Bengaluru",
    "Franchise Pune",
    "Franchise Mumbai",
    "Franchise Delhi NCR",
    "Franchise Ahmedabad",
    "Franchise Chennai",
    "Franchise Kolkata",
    "Franchise Lucknow",
    "Franchise Nagpur",
    "Franchise Surat",
    "Franchise Chandigarh",
    "Franchise Coimbatore",
    "Franchise Vijayawada",
    "Franchise Visakhapatnam",
    "Franchise Gwalior",
    "Franchise Jabalpur",
    "Franchise Jaipur",
    "Franchise Patna",
    "Franchise Raipur",
    "Franchise Dehradun",
];

export function FranchiseOpportunityDetails({ opportunity }: Props) {
    const stateName = opportunity.state || "Telangana";
    const cityName = opportunity.city || "Hyderabad";

    // Pick locations for this state or default
    const locations =
        stateLocationsData[stateName] ||
        stateLocationsData["Telangana"];

    // FAQ state
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        city: cityName,
        state: stateName,
        preferredLocation: "",
        model: "Regular Franchise",
        message: "",
        agree: true,
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const faqs = [
        {
            q: `What is the TeaMax franchise investment in ${stateName}?`,
            a: `The core TeaMax franchise package starts at ₹3,69,999 (+ applicable taxes). Modular shop interior setup (approx ₹60,000–₹70,000 for 100 sq.ft) and initial inventory give an illustrative setup budget of approximately ₹4.39 Lakhs.`,
        },
        {
            q: "Is there any ongoing royalty or monthly commission?",
            a: "No! TeaMax operates on a 100% Zero Royalty model. All revenues and daily profits from beverage and snack sales belong entirely to you.",
        },
        {
            q: "Do I need prior food or restaurant experience?",
            a: "No prior experience is necessary. Our chef-less operating model, standardized recipes, automated machinery, and comprehensive on-site training ensure seamless daily operations.",
        },
        {
            q: `How do I check location availability in ${stateName}?`,
            a: `Fill out the consultation form below. Our expansion team analyzes your proposed location, verifies territorial exclusivity, and connects with you within 24 hours.`,
        },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === "phone") {
            setFormData((prev) => ({
                ...prev,
                phone: value.replace(/\D/g, "").slice(0, 10),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        setErrorMessage("");
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName.trim()) {
            setErrorMessage("Please enter your full name.");
            return;
        }
        if (!formData.phone.trim() || formData.phone.length < 10) {
            setErrorMessage("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (!formData.email.trim() || !formData.email.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        const waMessage = [
            `*New Franchise Enquiry - ${stateName}*`,
            `• Name: ${formData.fullName}`,
            `• Phone: +91 ${formData.phone}`,
            `• Email: ${formData.email}`,
            `• City: ${formData.city}`,
            `• State: ${formData.state}`,
            `• Preferred Location: ${formData.preferredLocation || "Not specified"}`,
            `• Model: ${formData.model}`,
            `• Note: ${formData.message || "Looking for franchise details"}`,
        ].join("\n");

        setTimeout(() => {
            setIsSubmitting(false);
            setFormSubmitted(true);
            window.open(
                `https://go.teamaxcafe.in/whatsapp?text=${encodeURIComponent(waMessage)}`,
                "_blank"
            );
        }, 600);
    };

    const scrollToApply = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById("apply-form");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="tmf-detail-page">
            {/* ====================================================================
          1. HERO SECTION (Dark Forest Green with Arch Visual)
          ==================================================================== */}
            <section className="tmf-hero">
                <div className="tmf-container">
                    <div className="tmf-hero-grid">
                        {/* Left Column Content */}
                        <div className="tmf-hero-left">
                            <div className="tmf-eyebrow-tag">
                                <span className="tmf-eyebrow-dot" />
                                <span>TEAMAX • {stateName.toUpperCase()}</span>
                            </div>

                            <span className="tmf-hero-subtitle-tag">
                                TEA FRANCHISE OPPORTUNITY
                            </span>

                            <h1 className="tmf-hero-title">
                                Tea Franchise
                                <br />
                                Opportunity in
                                <br />
                                {stateName}
                            </h1>

                            <p className="tmf-hero-desc">
                                Start a modern, high-return tea café franchise in {cityName},{" "}
                                {stateName}. Low investment, zero royalty, chef-less operations
                                and pan-India brand trust.
                            </p>

                            <p className="tmf-hero-note">
                                Join growing network of tea cafés across {stateName} with 1,200+
                                partner signups. Proven business model, complete training, and
                                end-to-end launch support.
                            </p>

                            <div>
                                <a
                                    href="#apply-form"
                                    onClick={scrollToApply}
                                    className="tmf-btn-gold"
                                >
                                    <span>Apply for Franchise</span>
                                    <ArrowRight size={17} strokeWidth={2.4} />
                                </a>
                            </div>
                        </div>

                        {/* Right Column Arch Visual */}
                        <div className="tmf-hero-visual-wrap">
                            <div className="tmf-arch-frame">
                                <img
                                    src={opportunity.primaryImage || "/images/cafe-interior.jpg"}
                                    alt={`TeaMax Café in ${cityName}, ${stateName}`}
                                    className="tmf-arch-img"
                                />


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          2. FEATURE PILLS BAR (Cream Strip)
          ==================================================================== */}
            <section className="tmf-feature-bar">
                <div className="tmf-container">
                    <div className="tmf-feature-pills-wrap">
                        <div className="tmf-feature-pill">
                            <span className="tmf-pill-icon">
                                <Coffee size={18} strokeWidth={2.2} />
                            </span>
                            <span>All-day coffee, snacks & more</span>
                        </div>

                        <div className="tmf-feature-pill">
                            <span className="tmf-pill-icon">
                                <ChefHat size={19} strokeWidth={2.2} />
                            </span>
                            <span>Chef-Less Kitchen</span>
                        </div>

                        <div className="tmf-feature-pill">
                            <span className="tmf-pill-icon">
                                <Percent size={18} strokeWidth={2.4} />
                            </span>
                            <span>Zero Royalty & Low Investment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          3. STATS STRIP (Dark Forest Green)
          ==================================================================== */}
            <section className="tmf-stats-strip">
                <div className="tmf-container">
                    <div className="tmf-stats-grid">
                        <div className="tmf-stat-col">
                            <div className="tmf-stat-num">₹3.69 Lakhs*</div>
                            <div className="tmf-stat-lbl">Minimum Setup Budget</div>
                        </div>

                        <div className="tmf-stat-col">
                            <div className="tmf-stat-num">100 – 200 sq.ft</div>
                            <div className="tmf-stat-lbl">Space Required</div>
                        </div>

                        <div className="tmf-stat-col">
                            <div className="tmf-stat-num">25 – 30 Days</div>
                            <div className="tmf-stat-lbl">To Open Your Own Cafe</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          4. THE MARKET OPPORTUNITY (Editorial 2-Column)
          ==================================================================== */}
            <section className="tmf-market-section">
                <div className="tmf-container">
                    <div className="tmf-market-grid">
                        <div>
                            <span className="tmf-section-tag">
                                TEAMAX • {stateName.toUpperCase()}
                            </span>
                            <h2 className="tmf-serif-heading">The market opportunity.</h2>
                        </div>

                        <div>
                            <p className="tmf-editorial-lead">
                                The tea and café culture is booming, backed by a youthful
                                population looking for cozy spaces and great beverages. With
                                rising disposable incomes and strong consumer affinity for
                                hygienic café settings, {stateName} offers tremendous potential
                                for modern quick-service tea cafés with high repeat footfalls and
                                attractive unit economics.
                            </p>
                            <p className="tmf-editorial-body">
                                From morning commuters grabbing freshly brewed masala chai to
                                evening gatherings over burgers, shakes, and kulhad tea, TeaMax
                                creates an energetic community hub with robust margins
                                (55%–65%) and predictable day-to-day cash flows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          5. WHERE TO OPEN IN {STATE} (Numbered Grid)
          ==================================================================== */}
            <section className="tmf-locations-section">
                <div className="tmf-container">
                    <div className="tmf-locations-grid">
                        <div>
                            <span className="tmf-section-tag">PRIME LOCATIONS</span>
                            <h2 className="tmf-serif-heading">
                                Where to open in {stateName}.
                            </h2>
                        </div>

                        <div>
                            <div className="tmf-location-cards-stack">
                                {locations.map((loc, idx) => (
                                    <div key={loc.name} className="tmf-loc-card">
                                        <span className="tmf-loc-num">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="tmf-loc-info">
                                            <strong>{loc.name}</strong>
                                            <span>{loc.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="tmf-loc-note">
                                Have another location in mind? We provide location feasibility
                                checks and territory analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          6. PLAN YOUR OUTLET (Clean Info Card)
          ==================================================================== */}
            <section className="tmf-plan-section">
                <div className="tmf-container">
                    <div className="tmf-plan-card">
                        <h2>Plan your TeaMax outlet in {stateName}</h2>
                        <p>
                            Planning a tea franchise requires evaluating local demographics,
                            footfalls, rent structures, and competitor landscape. Our team
                            guides you every step of the way—from site selection and space
                            planning to turnkey interior execution and store opening.
                        </p>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          7. FAQ SECTION (Accordion)
          ==================================================================== */}
            <section className="tmf-faq-section">
                <div className="tmf-container tmf-faq-container">
                    <div className="tmf-faq-header">
                        <h2>Planning your franchise in {stateName}</h2>
                    </div>

                    <div className="tmf-faq-list">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={faq.q}
                                    className={`tmf-faq-item ${isOpen ? "open" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="tmf-faq-question"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            size={18}
                                            style={{
                                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.22s ease",
                                            }}
                                        />
                                    </button>
                                    {isOpen && <div className="tmf-faq-answer">{faq.a}</div>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="tmf-faq-footer">
                        <Link href="/franchise" className="tmf-link-arrow">
                            <span>Compare franchise models & requirements</span>
                            <ArrowRight size={15} strokeWidth={2.4} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          8. LEAD CAPTURE FORM SECTION (Dark Forest Green)
          ==================================================================== */}
            <section className="" id="apply-form">
                <FranchiseFormSection />
            </section>

            {/* ====================================================================
          9. OTHER CITIES PILLS CLOUD
          ==================================================================== */}
            <section className="tmf-other-cities-section">
                <div className="tmf-container">
                    <div className="tmf-cities-header">
                        <span className="tmf-section-tag">EXPLORE OTHER TERRITORIES</span>
                        <h3>Franchise opportunities in other cities</h3>
                    </div>

                    <div className="tmf-cities-cloud">
                        {otherCitiesList.map((item) => (
                            <Link
                                key={item}
                                href="/franchise-opportunities"
                                className="tmf-city-pill"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
