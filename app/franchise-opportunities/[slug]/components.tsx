"use client";

import Link from "next/link";
import {
    Users,
    MapPin,
    Percent,
    ChefHat,
    Coins,
    Laptop,
    Megaphone,
    Headphones,
    ArrowRight,
} from "lucide-react";

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

export default function FranchiseOpportunityDetails({
    opportunity,
}: Props) {
    const handleWhatsApp = () => {
        const message = `Hi TeaMax Team, I would like to get more details about the ${opportunity.franchiseName} franchise opportunity in ${opportunity.city}.`;
        const whatsappUrl = `https://go.teamaxcafe.in/whatsapp?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="tm-fc-page mt-20">
            {/* HERO SECTION */}
            <section className="tm-fc-hero">
                <div className="tm-fc-container">
                    <div className="tm-fc-hero-grid">
                        <div className="tm-fc-hero-content">
                            <span className="tm-fc-tag-script">#aajkichai</span>

                            <h1 className="tm-fc-hero-title">
                                Start Your Own
                                <br />
                                TeaMax Café Franchise
                                <span className="highlight-yellow">
                                    {opportunity.city ? ` in ${opportunity.city}` : ""}
                                </span>
                            </h1>

                            <p className="tm-fc-hero-sub">
                                {opportunity.shortDescription}
                            </p>

                            <div className="tm-fc-hero-stats">
                                <div className="tm-fc-hero-stat-item">
                                    <div className="tm-fc-stat-icon-wrap">
                                        <Users size={18} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-hero-stat-info">
                                        <strong>1,200+</strong>
                                        <span>Partner Signups</span>
                                    </div>
                                </div>

                                <div className="tm-fc-hero-stat-item">
                                    <div className="tm-fc-stat-icon-wrap">
                                        <MapPin size={18} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-hero-stat-info">
                                        <strong>27+</strong>
                                        <span>States</span>
                                    </div>
                                </div>

                                <div className="tm-fc-hero-stat-item">
                                    <div className="tm-fc-stat-icon-wrap">
                                        <Percent size={18} strokeWidth={2.5} />
                                    </div>
                                    <div className="tm-fc-hero-stat-info">
                                        <strong>0%</strong>
                                        <span>Royalty</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tm-fc-hero-actions">
                                <button
                                    type="button"
                                    onClick={handleWhatsApp}
                                    className="tm-fc-btn-primary"
                                >
                                    <span>Get Details on WhatsApp</span>
                                    <ArrowRight size={19} />
                                </button>

                                <Link
                                    href="/franchise-opportunities"
                                    className="tm-fc-btn-secondary"
                                >
                                    <span>Explore Other Locations</span>
                                    <ArrowRight size={17} strokeWidth={2.2} />
                                </Link>
                            </div>

                            <p className="tm-fc-hero-disclaimer">
                                {opportunity.city}, {opportunity.state}, {opportunity.country}
                            </p>
                        </div>

                        <div className="tm-fc-hero-visual">
                            <div className="tm-fc-hero-img-wrap">
                                <img
                                    src={opportunity.primaryImage}
                                    alt={opportunity.franchiseName}
                                    className="tm-fc-hero-img"
                                    width="500"
                                    height="500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="detailscentres-about-section" id="faq">
                <div className="container-xl">

                    {/* About Us Heading + Short Description */}
                    <div className="detailscentres-about-header">
                        <span className="detailscentres-eyebrow">
                            About Us
                        </span>

                        <h2 className="detailscentres-about-short">
                            {opportunity.shortDescription}
                        </h2>
                    </div>

                    {/* Long Description */}
                    <div className="detailscentres-about-content">
                        {opportunity.description && (
                            <div
                                className="detailscentres-about-long"
                                dangerouslySetInnerHTML={{
                                    __html: opportunity.description,
                                }}
                            />
                        )}
                    </div>

                </div>
            </section>
            {/* ABOUT US SECTION */}
            <section
                className="tm-fc-simple-section"
                id="franchise-description"
            >
                <div className="tm-fc-container">
                    <div className="tm-fc-simple-grid">
                        <div className="tm-fc-simple-media">
                            <img
                                src="/images/franchise-storefront.jpg"
                                alt="TeaMax Cafe Storefront and Counter"
                                width="600"
                                height="450"
                                loading="lazy"
                            />
                        </div>

                        <div className="tm-fc-simple-content">
                            <h2>
                                Your Café Business,
                                <br />
                                Made Simple.
                            </h2>



                            <div className="tm-fc-features-grid">
                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <Percent size={20} strokeWidth={2.4} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>No Royalty</strong>
                                        <span>on your sales</span>
                                    </div>
                                </div>

                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <ChefHat size={21} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>Chef-less</strong>
                                        <span>operations</span>
                                    </div>
                                </div>

                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <Coins size={20} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>Low Investment</strong>
                                        <span>Affordable setup</span>
                                    </div>
                                </div>

                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <Laptop size={20} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>Training &</strong>
                                        <span>POS support</span>
                                    </div>
                                </div>

                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <Megaphone size={20} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>Marketing</strong>
                                        <span>guidance</span>
                                    </div>
                                </div>

                                <div className="tm-fc-feature-card">
                                    <div className="tm-fc-feature-icon">
                                        <Headphones size={20} strokeWidth={2.2} />
                                    </div>
                                    <div className="tm-fc-feature-text">
                                        <strong>Ongoing</strong>
                                        <span>franchise support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
