"use client";

import React, { useState, useEffect } from "react";
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
import { getFranchiseOpportunityBySlug } from "../../lib/api";

export type FranchiseOpportunity = {
    id: number | string;
    franchiseName: string;
    slug: string;
    country: string;
    state: string;
    city: string;
    shortDescription: string;
    description: string;
    primaryImage: string;
    status?: string;
    isFeatured?: boolean;
    minBudget?: string;
    spaceRequired?: string;
    timelineDays?: string;
    royalty?: string;
    margins?: string;
    editorialLead?: string;
    editorialBody?: string;
    primeLocations?: Array<{ name: string; desc: string }>;
    faqs?: Array<{ q: string; a: string }>;
    seoTitle?: string;
    metaDescription?: string;
};

type Props = {
    opportunity: FranchiseOpportunity;
    slug?: string;
};

// Target prime locations grouped by city
const cityLocationsData: Record<string, Array<{ name: string; desc: string }>> = {
    Hyderabad: [
        { name: "Kompally", desc: "Rapidly expanding residential, highway connectivity & college corridor" },
        { name: "Gachibowli", desc: "Financial district, high-income techies & premium retail high street" },
        { name: "Hitech City & Madhapur", desc: "Corporate campuses, Cyber Towers & high evening youth footfall" },
        { name: "Kukatpally & KPHB", desc: "Dense residential zone, student hub & buzzing metro station" },
        { name: "Banjara Hills & Jubilee Hills", desc: "Upscale lifestyle retail, youth hangout spots & cafe culture" },
        { name: "Kondapur & Miyapur", desc: "Dense residential communities, IT corridors & transit points" },
        { name: "Secunderabad & AS Rao Nagar", desc: "Established commercial markets, transit hubs & shopping belts" },
    ],
    Indore: [
        { name: "Vijay Nagar", desc: "Premier commercial hub, corporate offices & vibrant youth crowd" },
        { name: "Palasia & New Palasia", desc: "Central business district, premium cafes & shopping hubs" },
        { name: "Bhawar Kuan", desc: "Massive student and coaching hub with non-stop daily footfall" },
        { name: "Chappan Dukan & MG Road", desc: "Iconic high-street food culture & heavy shopping footfalls" },
        { name: "Super Corridor & Rau", desc: "Fast-developing IT corridor, university zone & tech parks" },
        { name: "Annapurna & Rajendra Nagar", desc: "Dense family residential belt with strong retail markets" },
        { name: "Geeta Bhawan & AB Road", desc: "High-density retail, medical corridor & transit junction" },
    ],
    Bhopal: [
        { name: "MP Nagar (Zones 1 & 2)", desc: "City's foremost commercial & business center with office crowd" },
        { name: "Arera Colony", desc: "Upscale residential neighborhood with trendy youth & family crowd" },
        { name: "Kolar Road", desc: "Fastest growing residential and retail corridor with high demand" },
        { name: "TT Nagar & New Market", desc: "Bustling central retail market & vibrant street commerce" },
        { name: "Hoshangabad Road", desc: "Prime shopping malls, luxury automobile hubs & food courts" },
        { name: "Indrapuri & BHEL", desc: "Dense township, college clusters and regular commuter traffic" },
        { name: "Bittan Market", desc: "Popular evening social hotspot, exhibitions & family shopping" },
    ],
};

const defaultCityLocations = (cityName: string) => [
    { name: "Central Commercial District", desc: `High street retail, business centers & peak daytime footfalls in ${cityName}` },
    { name: "University & College Belt", desc: `Student hubs, coaching institutes & youthful evening hangout zones in ${cityName}` },
    { name: "IT & Corporate Parks", desc: `Office complexes, tech companies & regular daily beverage consumers in ${cityName}` },
    { name: "Prime Residential Corridors", desc: `Dense family neighborhoods, residential townships & evening walk-ins in ${cityName}` },
    { name: "Transit & Metro Hubs", desc: `Commuter junctions, bus terminals & continuous grab-and-go customer flow in ${cityName}` },
    { name: "Shopping Malls & Entertainment Strips", desc: `Weekend crowd magnets, retail centers & vibrant food courts in ${cityName}` },
];

const otherCitiesList = [
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

export function FranchiseOpportunityDetails({ opportunity: initialOpportunity, slug }: Props) {
    const [opportunity, setOpportunity] = useState<FranchiseOpportunity>(initialOpportunity);

    useEffect(() => {
        const targetSlug = slug || initialOpportunity?.slug;
        if (targetSlug) {
            getFranchiseOpportunityBySlug(targetSlug).then((data) => {
                if (data && data.slug) {
                    setOpportunity(data);
                }
            });
        }
    }, [slug, initialOpportunity?.slug]);

    const cityName = opportunity.city || "Hyderabad";
    const stateName = opportunity.state || "Telangana";

    // Pick locations for this city or intelligent default
    const locations =
        (opportunity.primeLocations && opportunity.primeLocations.length > 0)
            ? opportunity.primeLocations
            : (cityLocationsData[cityName] || defaultCityLocations(cityName));

    // FAQ state
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const defaultFaqs = [
        {
            q: `What is the TeaMax franchise investment in ${cityName}?`,
            a: `The core TeaMax franchise package in ${cityName} starts at ₹3,69,999 (+ applicable taxes). Modular shop interior setup (approx ₹60,000–₹70,000 for 100 sq.ft) and initial inventory give an illustrative setup budget of approximately ₹4.39 Lakhs.`,
        },
        {
            q: "Is there any ongoing royalty or monthly commission?",
            a: `No! TeaMax operates on a 100% Zero Royalty model. All revenues and daily profits from beverage and snack sales in ${cityName} belong entirely to you.`,
        },
        {
            q: "Do I need prior food or restaurant experience?",
            a: "No prior experience is necessary. Our chef-less operating model, standardized recipes, automated machinery, and comprehensive on-site training ensure seamless daily operations.",
        },
        {
            q: `How do I check location availability in ${cityName}?`,
            a: `Fill out the consultation form below. Our expansion team analyzes your proposed location in ${cityName}, verifies territorial exclusivity, and connects with you within 24 hours.`,
        },
    ];

    const faqs = (opportunity.faqs && opportunity.faqs.length > 0) ? opportunity.faqs : defaultFaqs;
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
                                <span>TEAMAX • {cityName.toUpperCase()}</span>
                            </div>

                            <span className="tmf-hero-subtitle-tag">
                                TEA FRANCHISE OPPORTUNITY
                            </span>

                            <h1 className="tmf-hero-title">
                                Tea Franchise
                                <br />
                                Opportunity in
                                <br />
                                {cityName}
                            </h1>

                            <p className="tmf-hero-desc">
                                Start a modern, high-return tea café franchise in {cityName},{" "}
                                {stateName}. Low investment, zero royalty, chef-less operations
                                and pan-India brand trust.
                            </p>

                            <p className="tmf-hero-note">
                                Join our growing network of tea cafés in {cityName} with 1,200+
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
                            <span>{opportunity.royalty || "Zero Royalty & Low Investment"}</span>
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
                            <div className="tmf-stat-num">{opportunity.minBudget || "₹3.69 Lakhs*"}</div>
                            <div className="tmf-stat-lbl">Minimum Setup Budget</div>
                        </div>

                        <div className="tmf-stat-col">
                            <div className="tmf-stat-num">{opportunity.spaceRequired || "100 – 200 sq.ft"}</div>
                            <div className="tmf-stat-lbl">Space Required</div>
                        </div>

                        <div className="tmf-stat-col">
                            <div className="tmf-stat-num">{opportunity.timelineDays || "25 – 30 Days"}</div>
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
                                TEAMAX • {cityName.toUpperCase()}
                            </span>
                            <h2 className="tmf-serif-heading">The market opportunity in {cityName}.</h2>
                        </div>

                        <div>
                            <p className="tmf-editorial-lead">
                                {opportunity.editorialLead || `The tea and café culture in ${cityName} is booming, backed by a youthful population looking for cozy spaces and great beverages. With rising disposable incomes and strong consumer affinity for hygienic café settings, ${cityName} offers tremendous potential for modern quick-service tea cafés with high repeat footfalls and attractive unit economics.`}
                            </p>
                            <p className="tmf-editorial-body">
                                {opportunity.editorialBody || `From morning commuters grabbing freshly brewed masala chai to evening gatherings over burgers, shakes, and kulhad tea, TeaMax creates an energetic community hub in ${cityName} with robust margins (55%–65%) and predictable day-to-day cash flows.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====================================================================
          5. WHERE TO OPEN IN {CITY} (Numbered Grid)
          ==================================================================== */}
            <section className="tmf-locations-section">
                <div className="tmf-container">
                    <div className="tmf-locations-grid">
                        <div>
                            <span className="tmf-section-tag">PRIME {cityName.toUpperCase()} LOCATIONS</span>
                            <h2 className="tmf-serif-heading">
                                Where to open in {cityName}.
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
                                Have another prime location in mind in {cityName}? We provide location feasibility
                                checks and territory exclusivity analysis.
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
                        <h2>Plan your TeaMax outlet in {cityName}</h2>
                        <p>
                            Planning a tea franchise in {cityName} requires evaluating local demographics,
                            footfalls, rent structures, and competitor landscape. Our expansion team
                            guides you every step of the way—from site selection and space
                            planning to turnkey interior execution and store opening in {cityName}.
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
                        <h2>Planning your franchise in {cityName}</h2>
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
                <FranchiseFormSection initialCity={cityName} initialState={stateName} slug={opportunity.slug} />
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
