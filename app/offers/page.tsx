"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Coffee,
    Store,
} from "lucide-react";
import "./offers.css";
import { Footer, Header } from "../components";
import { getAllOffers } from "../lib/api";

type Offer = {
    category: string;
    title: string;
    description: string;
    image: string;
    validTill: string;
    badge: string;
};

const defaultOffers: Offer[] = [
    {
        category: "Chai",
        title: "Buy 2 Chai Get 1 Free",
        description:
            "Enjoy our special masala chai. Buy any 2 chai and get 1 chai free on all hot beverages.",
        image: "/images/teamax-chai.jpg",
        validTill: "30 Nov 2026",
        badge: "BUY 2\nGET 1\nFREE",
    },
    {
        category: "Burgers",
        title: "Flat 20% Off on Burgers",
        description:
            "Get 20% off on all burgers. Valid on weekdays (11 AM – 5 PM).",
        image: "/images/teamax-burger.jpg",
        validTill: "30 Nov 2026",
        badge: "FLAT\n20%\nOFF",
    },
    {
        category: "Combos",
        title: "Burger + Fries + Cold Coffee",
        description:
            "Enjoy a special combo at just ₹149. Limited time offer at all TeaMax cafés.",
        image: "/images/teamax-combo.jpg",
        validTill: "30 Nov 2026",
        badge: "COMBO\n₹149\nONLY",
    },
];

const franchiseHref = "/franchise";

export default function OffersPage() {
    const [offerList, setOfferList] = useState<Offer[]>(defaultOffers);
    const [activeCategory, setActiveCategory] = useState("All Offers");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    useEffect(() => {
        let mounted = true;
        async function loadOffers() {
            try {
                const data = await getAllOffers();
                if (mounted && Array.isArray(data) && data.length > 0) {
                    const mapped: Offer[] = data.map((item: any) => {
                        let badge = "SPECIAL\nOFFER";
                        if (item.promoCode) {
                            badge = item.promoCode;
                        } else if (item.discountType === "percentage" && item.discountValue) {
                            badge = `FLAT\n${item.discountValue}%\nOFF`;
                        } else if (item.discountType === "fixed" && item.discountValue) {
                            badge = `FLAT\n₹${item.discountValue}\nOFF`;
                        }

                        let formattedDate = "30 Nov 2026";
                        if (item.endDate) {
                            try {
                                formattedDate = new Date(item.endDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                });
                            } catch (_) {}
                        }

                        return {
                            category: item.applicableCategory || "Special",
                            title: item.title,
                            description: item.shortDescription || item.detailedDescription || "",
                            image: item.bannerImage || "/images/teamax-chai.jpg",
                            validTill: formattedDate,
                            badge: badge,
                        };
                    });
                    setOfferList(mapped);
                }
            } catch (err) {
                console.warn("[OffersPage] Failed to fetch live offers:", err);
            }
        }
        loadOffers();
        return () => {
            mounted = false;
        };
    }, []);

    const categories = useMemo(() => {
        const dynamicCats = Array.from(new Set(offerList.map((o) => o.category).filter(Boolean)));
        return ["All Offers", ...dynamicCats];
    }, [offerList]);

    const filteredOffers = useMemo(
        () =>
            activeCategory === "All Offers"
                ? offerList
                : offerList.filter((offer) => offer.category === activeCategory),
        [activeCategory, offerList],
    );

    const pageCount = Math.max(1, Math.ceil(filteredOffers.length / perPage));
    const visibleOffers = filteredOffers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage,
    );

    function changeCategory(category: string) {
        setActiveCategory(category);
        setCurrentPage(1);
    }

    return (
        <>
            <Header />

            <main className="teamax-offers-page ">
                <section className="offers-hero " aria-labelledby="offers-title">
                    <div className="offers-hero-photo" aria-hidden="true" />
                    <div className="offers-container offers-hero-inner">
                        <div className="offers-hero-copy">
                            <p className="offers-eyebrow"><span /> SPECIAL OFFERS</p>
                            <h1 id="offers-title">
                                Great Offers
                                <br />
                                at <span>TeaMax</span>
                            </h1>
                            <p className="offers-hero-description">
                                Enjoy delicious tea, coffee and snacks with exciting offers at
                                your favourite TeaMax cafés.
                            </p>
                            <p className="offers-hero-highlight">
                                Good Food. Great Offers. Now Closer to You.
                            </p>
                        </div>
                    </div>

                </section>

                <section className="offers-container offers-list-section mt-5" id="offers" aria-label="TeaMax offers">
                    <div className="offers-category-filters" role="group" aria-label="Filter offers by category">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`offers-filter-button ${activeCategory === category ? "is-active" : ""}`}
                                aria-pressed={activeCategory === category}
                                onClick={() => changeCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {visibleOffers.length ? (
                        <div className="offers-card-grid">
                            {visibleOffers.map((offer) => (
                                <article className="offers-card" key={offer.title}>
                                    <div className="offers-card-image-wrap">
                                        <img className="offers-card-image" src={offer.image} alt={offer.title} />
                                        <span className="offers-card-category">{offer.category}</span>
                                        <span className="offers-card-badge">{offer.badge}</span>
                                    </div>
                                    <div className="offers-card-content">
                                        <h2>{offer.title}</h2>
                                        <p>{offer.description}</p>
                                        <div className="offers-validity">
                                            <CalendarDays size={19} aria-hidden="true" />
                                            <span>Valid till <u>{offer.validTill}</u></span>
                                        </div>

                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="offers-empty">No offers found in this category.</p>
                    )}

                    {pageCount > 1 && (
                        <nav className="offers-pagination" aria-label="Offers pagination">
                            <button
                                type="button"
                                className="offers-page-button"
                                aria-label="Previous page"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            >
                                <ArrowLeft size={17} />
                            </button>
                            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                                <button
                                    type="button"
                                    key={page}
                                    className={`offers-page-button ${currentPage === page ? "is-active" : ""}`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="offers-page-button"
                                aria-label="Next page"
                                disabled={currentPage === pageCount}
                                onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                            >
                                <ArrowRight size={17} />
                            </button>
                        </nav>
                    )}
                </section>

                <section className="offers-container offers-franchise-banner" aria-labelledby="franchise-banner-title">
                    <div className="offers-franchise-copy">
                        <p className="offers-franchise-kicker">OWN A TEAMAX CAFÉ</p>
                        <h2 id="franchise-banner-title">Turn a Growing Brand<br />into Your Business</h2>
                        <p>
                            Be a part of TeaMax and bring great tea, food and experiences to
                            your city. Attractive business model, full support and a trusted brand.
                        </p>
                    </div>
                    <div className="offers-franchise-visual">
                        <img src="https://responsive-pixel-prime.lovable.app/__l5e/assets-v1/a777208a-72bd-4415-bd3d-5a7474c5ded8/teamax-cafe.jpg" alt="TeaMax café storefront" />
                        <Link href={franchiseHref} className="offers-franchise-cta">
                            Apply for Franchise <ArrowRight size={17} />
                        </Link>
                    </div>
                    <div className="offers-franchise-features">
                        <div><span className="offers-feature-icon"><ArrowRight size={22} /></span><div><strong>Proven Business Model</strong><small>Strong brand & growing demand</small></div></div>
                        <div><span className="offers-feature-icon"><Coffee size={22} /></span><div><strong>End-to-End Support</strong><small>Setup to operations guidance</small></div></div>
                        <div><span className="offers-feature-icon"><Store size={22} /></span><div><strong>Multiple City Opportunities</strong><small>Be the first in your city</small></div></div>
                        <div><span className="offers-feature-icon"><Coffee size={22} /></span><div><strong>High Demand Category</strong><small>Tea, Coffee, Food & More</small></div></div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
