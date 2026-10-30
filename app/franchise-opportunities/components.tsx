"use client";

import { useMemo, useState } from "react";
import {
    ArrowRight,
    Building2,
    Globe,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import "./coponents.css"
const HERO_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/tea-hero-DMrQZeuN.jpg";

const CAFE_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg";

// Static demo data only. No API calls or backend integration.
const franchiseOpportunities = [
    {
        id: 1,
        franchiseName: "TeaMax Cafe – Kompally",
        slug: "teamax-kompally",
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
        shortDescription: "Bring the TeaMax café experience to Kompally, Hyderabad.",
        description:
            "<p>Become a part of the <strong>TeaMax</strong> franchise network and build a memorable café experience.</p>",
        primaryImage: CAFE_IMAGE,
    },
    {
        id: 2,
        franchiseName: "TeaMax Cafe – Gachibowli",
        slug: "teamax-gachibowli",
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
        shortDescription: "Explore a TeaMax franchise opportunity in Gachibowli.",
        description:
            "<p>Partner with TeaMax and create a welcoming destination for tea lovers.</p>",
        primaryImage:
            "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg",
    },
    {
        id: 3,
        franchiseName: "TeaMax Cafe – Indore",
        slug: "teamax-indore",
        country: "India",
        state: "Madhya Pradesh",
        city: "Indore",
        shortDescription: "Build your TeaMax franchise in the vibrant city of Indore.",
        description:
            "<p>Join the TeaMax franchise family and bring quality tea, coffee and food to your city.</p>",
        primaryImage:
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80",
    },
    {
        id: 4,
        franchiseName: "TeaMax Cafe – Bhopal",
        slug: "teamax-bhopal",
        country: "India",
        state: "Madhya Pradesh",
        city: "Bhopal",
        shortDescription: "Discover the TeaMax franchise opportunity in Bhopal.",
        description:
            "<p>Create a warm café destination for tea and coffee lovers with TeaMax.</p>",
        primaryImage:
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1000&auto=format&fit=crop&q=80",
    },
];

export default function OurFranchiseOpportunitiesContent() {
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("Telangana");
    const [city, setCity] = useState("Hyderabad");
    const [appliedFilters, setAppliedFilters] = useState({
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
    });

    const availableCountries = useMemo(
        () => [...new Set(franchiseOpportunities.map((item) => item.country))],
        []
    );

    const availableStates = useMemo(() => {
        const states = franchiseOpportunities
            .filter((item) => !country || item.country === country)
            .map((item) => item.state);
        return [...new Set(states)];
    }, [country]);

    const availableCities = useMemo(() => {
        const cities = franchiseOpportunities
            .filter(
                (item) =>
                    (!country || item.country === country) &&
                    (!state || item.state === state)
            )
            .map((item) => item.city);
        return [...new Set(cities)];
    }, [country, state]);

    const visibleOpportunities = useMemo(
        () =>
            franchiseOpportunities.filter(
                (item) =>
                    (!appliedFilters.country ||
                        item.country === appliedFilters.country) &&
                    (!appliedFilters.state ||
                        item.state === appliedFilters.state) &&
                    (!appliedFilters.city ||
                        item.city === appliedFilters.city)
            ),
        [appliedFilters]
    );

    function handleSearch(event) {
        event.preventDefault();
        setAppliedFilters({ country, state, city });
    }

    function resetFilters() {
        const first = franchiseOpportunities[0];
        setCountry(first.country);
        setState(first.state);
        setCity(first.city);
        setAppliedFilters({
            country: first.country,
            state: first.state,
            city: first.city,
        });
    }

    return (
        <main className="tm-centres">
            {/* Hero */}
            <section className="tm-hero">
                <img
                    className="tm-hero-image"
                    src={HERO_IMAGE}
                    alt="TeaMax café"
                />
                <div className="tm-hero-overlay" />
                <div className="tm-container tm-hero-content">
                    <div className="tm-eyebrow">
                        <span />
                        FRANCHISE OPPORTUNITIES
                    </div>
                    <h1>
                        Find Your TeaMax
                        <br />
                        <span>Opportunity</span>
                    </h1>
                    <p className="text-dark2">
                        Be a part of our growing café network and bring the TeaMax
                        experience to your city.
                    </p>
                    <div className="tm-hero-slogan">
                        Good Tea,
                        <br />
                        <span>Brighter Business.</span>
                    </div>
                </div>
            </section>

            <div className="tm-container tm-main-content">
                {/* Country, State and City filters */}
                <form className="tm-filter-panel" onSubmit={handleSearch}>
                    <div className="tm-filter-field">
                        <label htmlFor="tm-country">Country</label>
                        <div className="tm-select-wrap">
                            <Globe size={19} />
                            <select
                                id="tm-country"
                                value={country}
                                onChange={(event) => {
                                    const nextCountry = event.target.value;
                                    const nextStates = [
                                        ...new Set(
                                            franchiseOpportunities
                                                .filter((item) => item.country === nextCountry)
                                                .map((item) => item.state)
                                        ),
                                    ];
                                    const nextState = nextStates[0] || "";
                                    const nextCity =
                                        franchiseOpportunities.find(
                                            (item) =>
                                                item.country === nextCountry &&
                                                item.state === nextState
                                        )?.city || "";
                                    setCountry(nextCountry);
                                    setState(nextState);
                                    setCity(nextCity);
                                }}
                            >
                                {availableCountries.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="tm-filter-field">
                        <label htmlFor="tm-state">State</label>
                        <div className="tm-select-wrap">
                            <MapPin size={19} />
                            <select
                                id="tm-state"
                                value={state}
                                onChange={(event) => {
                                    const nextState = event.target.value;
                                    const nextCity =
                                        franchiseOpportunities.find(
                                            (item) =>
                                                item.country === country &&
                                                item.state === nextState
                                        )?.city || "";
                                    setState(nextState);
                                    setCity(nextCity);
                                }}
                            >
                                {availableStates.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="tm-filter-field">
                        <label htmlFor="tm-city">City</label>
                        <div className="tm-select-wrap">
                            <Building2 size={19} />
                            <select
                                id="tm-city"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            >
                                {availableCities.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="tm-button tm-search-button">
                        Find Opportunities <ArrowRight size={18} />
                    </button>
                </form>

                {/* Franchise opportunity cards */}
                <section className="tm-results" id="tm-franchise-opportunities">
                    <div className="tm-results-heading">
                        <div>
                            <span className="tm-section-label">
                                EXPLORE FRANCHISE OPPORTUNITIES
                            </span>
                            <h2>
                                {visibleOpportunities.length} TeaMax{" "}
                                {visibleOpportunities.length === 1
                                    ? "Opportunity"
                                    : "Opportunities"}{" "}
                                in {appliedFilters.city}
                            </h2>
                            <p>
                                Find the right location to start your TeaMax franchise.
                            </p>
                        </div>
                    </div>

                    {visibleOpportunities.length > 0 ? (
                        <div className="tm-cafe-grid">
                            {visibleOpportunities.map((item) => (
                                <article className="tm-cafe-card" key={item.id}>
                                    <div className="tm-cafe-image-wrap">
                                        <img
                                            className="tm-cafe-image"
                                            src={item.primaryImage || CAFE_IMAGE}
                                            alt={item.franchiseName}
                                            loading="lazy"
                                        />
                                        <span className="tm-open-badge">
                                            <span />
                                            FRANCHISE AVAILABLE
                                        </span>
                                    </div>

                                    <div className="tm-cafe-body">
                                        <div className="tm-cafe-title-row">
                                            <h3>{item.franchiseName}</h3>
                                        </div>

                                        <p className="tm-cafe-address">
                                            <MapPin size={18} />
                                            <span>
                                                {item.city}, {item.state}, {item.country}
                                            </span>
                                        </p>

                                        <p className="tm-franchise-description">
                                            {item.shortDescription}
                                        </p>

                                        <div className="tm-cafe-actions">
                                            <Link
                                                className="tm-button tm-view-button"
                                                href={`/franchise-opportunities/${item.slug}`}
                                            >
                                                View Opportunity <ArrowRight size={17} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="tm-empty-state">
                            <MapPin size={36} />
                            <h3>No franchise opportunities found</h3>
                            <p>Try selecting another country, state or city.</p>
                            <button
                                className="tm-button tm-view-button"
                                type="button"
                                onClick={resetFilters}
                            >
                                Show opportunities <ArrowRight size={17} />
                            </button>
                        </div>
                    )}
                </section>

                {/* Bottom call to action */}
                <section className="tm-bottom-cta">
                    <div>
                        <span className="tm-section-label">
                            BUILD YOUR BUSINESS WITH TEAMAX
                        </span>
                        <h2>Bring the TeaMax experience to your city.</h2>
                        <p>Explore an opportunity and take the next step.</p>
                    </div>
                    <a
                        href="#tm-franchise-opportunities"
                        className="tm-button tm-cta-button"
                    >
                        Explore Opportunities <ArrowRight size={18} />
                    </a>
                </section>
            </div>
        </main>
    );
}
