"use client";

import { useMemo, useState } from "react";
import {
    ArrowRight,
    Building2,
    Clock3,
    Globe,
    MapPin,
    Navigation,
    Star,
    Utensils,
} from "lucide-react";
import "./components.css";
import Link from "next/link";

const HERO_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/tea-hero-DMrQZeuN.jpg";

const CAFE_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg";

const FOOD_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/food-1-DU2DeWu7.jpg";

type Cafe = {
    id: number;
    name: string;
    locality: string;
    address: string;
    city: string;
    state: string;
    country: string;
    rating: number;
    reviews: number;
    distance: number;
    hours: string;
};

const cafes: Cafe[] = [
    {
        id: 1,
        name: "TeaMax Cafe – Kompally",
        locality: "Kompally",
        address:
            "Plot No. 12, Kompally Main Road, Kompally, Hyderabad, Telangana 500014",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.6,
        reviews: 230,
        distance: 0.8,
        hours: "7:00 AM – 11:00 PM",
    },
    {
        id: 2,
        name: "TeaMax Cafe – Gachibowli",
        locality: "Gachibowli",
        address:
            "Sy No. 45, Near DLF, Gachibowli, Hyderabad, Telangana 500032",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.5,
        reviews: 184,
        distance: 2.4,
        hours: "8:00 AM – 11:00 PM",
    },
    {
        id: 3,
        name: "TeaMax Cafe – Hitech City",
        locality: "Hitech City",
        address:
            "2nd Floor, Cyber Towers Lane, Hitech City, Hyderabad, Telangana 500081",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.7,
        reviews: 312,
        distance: 5.1,
        hours: "7:00 AM – 11:30 PM",
    },
    {
        id: 4,
        name: "TeaMax Cafe – Jubilee Hills",
        locality: "Jubilee Hills",
        address:
            "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.4,
        reviews: 96,
        distance: 6.3,
        hours: "8:00 AM – 11:00 PM",
    },
    {
        id: 5,
        name: "TeaMax Cafe – Banjara Hills",
        locality: "Banjara Hills",
        address:
            "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.6,
        reviews: 208,
        distance: 7.1,
        hours: "7:30 AM – 11:00 PM",
    },
    {
        id: 6,
        name: "TeaMax Cafe – Kondapur",
        locality: "Kondapur",
        address:
            "Near Botanical Garden, Kondapur, Hyderabad, Telangana 500084",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        rating: 4.3,
        reviews: 121,
        distance: 7.8,
        hours: "8:00 AM – 10:30 PM",
    },
];

const localities = [
    "All locations",
    "Kompally",
    "Gachibowli",
    "Hitech City",
    "Jubilee Hills",
    "Banjara Hills",
    "Kondapur",
];

export default function OurCentresContent() {
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("Telangana");
    const [city, setCity] = useState("Hyderabad");
    const [locality, setLocality] = useState("All locations");
    const [sortBy, setSortBy] = useState("nearest");
    const [appliedFilters, setAppliedFilters] = useState({
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
        locality: "All locations",
    });

    const visibleCafes = useMemo(() => {
        const filtered = cafes.filter((cafe) => {
            return (
                cafe.country === appliedFilters.country &&
                cafe.state === appliedFilters.state &&
                cafe.city === appliedFilters.city &&
                (appliedFilters.locality === "All locations" ||
                    cafe.locality === appliedFilters.locality)
            );
        });

        if (sortBy === "rating") {
            return filtered.sort((a, b) => b.rating - a.rating);
        }

        if (sortBy === "name") {
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered.sort((a, b) => a.distance - b.distance);
    }, [appliedFilters, sortBy]);

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setAppliedFilters({
            country,
            state,
            city,
            locality,
        });
    }

    return (
        <main className="tm-centres">
            {/* Hero */}
            <section className="tm-hero">
                <img
                    className="tm-hero-image"
                    src={HERO_IMAGE}
                    alt="TeaMax coffee and fresh bakery"
                />

                <div className="tm-hero-overlay" />

                <div className="tm-container tm-hero-content">
                    <div className="tm-eyebrow">
                        <span />
                        OUR CENTRES
                    </div>

                    <h1>
                        Find Your TeaMax
                        <br />
                        <span>Cafe</span>
                    </h1>

                    <p>
                        Your neighbourhood spot for good tea, fresh coffee
                        and tasty bites.
                    </p>

                    <div className="tm-hero-slogan">
                        Good Tea,
                        <br />
                        <span>Brighter Days.</span>
                    </div>
                </div>
            </section>

            <div className="tm-container tm-main-content">
                {/* Location filters */}
                <form className="tm-filter-panel" onSubmit={handleSearch}>
                    <div className="tm-filter-field">
                        <label htmlFor="tm-country">Country</label>
                        <div className="tm-select-wrap">
                            <Globe size={19} />
                            <select
                                id="tm-country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                            >
                                <option value="India">India</option>
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
                                onChange={(event) => setState(event.target.value)}
                            >
                                <option value="Telangana">Telangana</option>
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
                                <option value="Hyderabad">Hyderabad</option>
                            </select>
                        </div>
                    </div>

                    <div className="tm-filter-field">
                        <label htmlFor="tm-locality">Locality / Branch</label>
                        <div className="tm-select-wrap">
                            <MapPin size={19} />
                            <select
                                id="tm-locality"
                                value={locality}
                                onChange={(event) => setLocality(event.target.value)}
                            >
                                {localities.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="tm-button tm-search-button">
                        Find Cafes <ArrowRight size={18} />
                    </button>
                </form>

                {/* Cafe results */}
                <section className="tm-results" id="tm-centres">
                    <div className="tm-results-heading">
                        <div>
                            <span className="tm-section-label">EXPLORE NEAR YOU</span>
                            <h2>
                                {visibleCafes.length} TeaMax{" "}
                                {visibleCafes.length === 1 ? "Cafe" : "Cafes"} in {appliedFilters.city}
                            </h2>
                            <p>Find your favourite spot for tea, coffee and good food.</p>
                        </div>

                        <label className="tm-sort-field">
                            <span>Sort by</span>
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                aria-label="Sort cafes"
                            >
                                <option value="nearest">Nearest first</option>
                                <option value="rating">Highest rated</option>
                                <option value="name">Name A–Z</option>
                            </select>
                        </label>
                    </div>

                    {visibleCafes.length > 0 ? (
                        <div className="tm-cafe-grid">
                            {visibleCafes.map((cafe) => (
                                <article className="tm-cafe-card" key={cafe.id}>
                                    <div className="tm-cafe-image-wrap">
                                        <img
                                            className="tm-cafe-image"
                                            src={CAFE_IMAGE}
                                            alt={`${cafe.name} interior`}
                                            loading="lazy"
                                        />
                                        <span className="tm-open-badge">
                                            <span />
                                            VIEW OUR CAFE
                                        </span>
                                    </div>

                                    <div className="tm-cafe-body">
                                        <div className="tm-cafe-title-row">
                                            <h3>{cafe.name}</h3>
                                            <span className="tm-distance">
                                                <MapPin size={15} />
                                                {cafe.distance} km
                                            </span>
                                        </div>

                                        <p className="tm-cafe-address">
                                            <MapPin size={18} />
                                            <span>{cafe.address}</span>
                                        </p>

                                        <div className="tm-rating">
                                            <span className="tm-stars" aria-label={`${cafe.rating} out of 5 stars`}>
                                                ★★★★★
                                            </span>
                                            <strong>{cafe.rating.toFixed(1)}</strong>
                                            <span>({cafe.reviews} reviews)</span>
                                        </div>

                                        <div className="tm-cafe-hours">
                                            <Clock3 size={17} />
                                            <span>{cafe.hours}</span>
                                        </div>

                                        <div className="tm-amenities">
                                            <span><Utensils size={16} /> Dine-in</span>
                                            <span><Building2 size={16} /> Takeaway</span>
                                            <span><Navigation size={16} /> Delivery</span>
                                        </div>

                                        <div className="tm-cafe-actions">
                                            <a
                                                className="tm-button tm-directions-button"
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                    `${cafe.name}, ${cafe.address}`
                                                )}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <MapPin size={17} />
                                                Directions
                                            </a>

                                            <Link
                                                className="tm-button tm-view-button"
                                                href="/ourcentres/stores"
                                            >
                                                View Centre <ArrowRight size={17} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="tm-empty-state">
                            <MapPin size={36} />
                            <h3>No cafes found</h3>
                            <p>Try selecting another location.</p>
                            <button
                                className="tm-button tm-view-button"
                                type="button"
                                onClick={() => {
                                    setCountry("India");
                                    setState("Telangana");
                                    setCity("Hyderabad");
                                    setLocality("All locations");
                                    setAppliedFilters({
                                        country: "India",
                                        state: "Telangana",
                                        city: "Hyderabad",
                                        locality: "All locations",
                                    });
                                }}
                            >
                                Show all cafes
                            </button>
                        </div>
                    )}
                </section>



                {/* Bottom call to action */}
                <section className="tm-bottom-cta">
                    <div>
                        <span className="tm-section-label">YOUR NEXT CUP IS CLOSER</span>
                        <h2>There’s a TeaMax Cafe waiting for you.</h2>
                        <p>Find a nearby centre and come say hello.</p>
                    </div>

                    <a href="#tm-centres" className="tm-button tm-cta-button">
                        Explore Centres <ArrowRight size={18} />
                    </a>
                </section>
            </div>
        </main>
    );
}