"use client";

import "./reviews-cards.css";

import { useMemo, useState } from "react";
import {
    Search,
    Grid2X2,
    Coffee,
    UsersRound,
    BriefcaseBusiness,
    Star,
    ChevronDown,
    ChevronRight,
    Quote,
    ExternalLink,
} from "lucide-react";

export type ReviewCategory = {
    id: string;
    name: string;
    icon: string;
};

export type ReviewItem = {
    id: string;
    type: "franchise" | "staff" | "customer";
    name: string;
    location: string;
    image: string;
    review: string;
    link?: string;
    stars: number;
};

interface ReviewClientProps {
    categories: ReviewCategory[];
    items: ReviewItem[];
}

const categoryIcons: Record<string, React.ElementType> = {
    all: Grid2X2,
    franchise: BriefcaseBusiness,
    staff: UsersRound,
    customer: Coffee,
};

const categoryDescriptions: Record<string, string> = {
    all: "Stories and experiences shared by our TeaMax family.",
    franchise: "Hear from the people growing their business with TeaMax.",
    staff: "Experiences from the team behind every TeaMax cup.",
    customer: "What our customers say about their TeaMax experience.",
};

export function ReviewClient({ categories, items }: ReviewClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");

    const displayCategories = useMemo(
        () => categories?.length ? categories : [
            { id: "all", name: "All Reviews", icon: "all" },
            { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
            { id: "staff", name: "Staff Reviews", icon: "staff" },
            { id: "customer", name: "Customer Reviews", icon: "customer" },
        ],
        [categories]
    );

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        let result = (items || []).filter((item) => {
            const categoryMatch =
                selectedCategory === "all" || item.type === selectedCategory;
            const searchMatch =
                !query ||
                item.name.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query) ||
                item.review.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query);
            return categoryMatch && searchMatch;
        });

        if (sortBy === "popular") {
            result = [...result].sort((a, b) => b.stars - a.stars);
        } else if (sortBy === "name") {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "rating-low") {
            result = [...result].sort((a, b) => a.stars - b.stars);
        }

        return result;
    }, [items, selectedCategory, searchQuery, sortBy]);

    const activeCategory = displayCategories.find(
        (category) => category.id === selectedCategory
    );

    return (
        <section className="tx-menu-shell tx-reviews-shell">
            {/* Search bar keeps the existing menu-page layout and styling. */}
            <div className="tx-menu-search-wrap">
                <form
                    className="tx-menu-search"
                    role="search"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Search
                        size={21}
                        strokeWidth={2.5}
                        className="tx-menu-search-icon"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        className="tx-menu-search-input"
                        aria-label="Search reviews"
                        placeholder="Search reviews, names, cafés..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button type="submit" className="tx-menu-search-button">
                        Search
                    </button>
                </form>
            </div>

            <div className="tx-menu-area">
                <aside className="tx-menu-category-panel" aria-label="Review categories">
                    <div className="tx-menu-category-list">
                        {displayCategories.map((category) => {
                            const Icon = categoryIcons[category.icon] || Coffee;
                            const isSelected = selectedCategory === category.id;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    className={`tx-menu-category-button ${isSelected ? "is-selected" : ""}`}
                                    aria-pressed={isSelected}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <Icon
                                        className="tx-menu-category-icon"
                                        size={26}
                                        aria-hidden="true"
                                    />
                                    <span>{category.name}</span>
                                    {isSelected && (
                                        <ChevronRight
                                            size={17}
                                            className="tx-menu-selected-arrow"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <div className="tx-menu-content">
                    <div className="tx-menu-heading-row">
                        <div>
                            <h2 className="tx-menu-heading">
                                {activeCategory?.name || "All Reviews"}
                            </h2>
                            <span className="tx-menu-yellow-rule" />
                            <p className="tx-menu-description">
                                {categoryDescriptions[selectedCategory] || categoryDescriptions.all}
                            </p>
                        </div>

                        <div className="tx-menu-sort">
                            <label htmlFor="tx-reviews-sort">Sort By:</label>
                            <select
                                id="tx-reviews-sort"
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="tx-menu-sort-select"
                            >
                                <option value="popular">Top Rated</option>
                                <option value="name">Name</option>
                                <option value="rating-low">Rating: Low to High</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="tx-menu-sort-icon"
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="tx-menu-empty">
                            <Search size={35} />
                            <h3>No reviews found</h3>
                            <p>Try another search or select a different review category.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                            >
                                View All Reviews
                            </button>
                        </div>
                    ) : (
                        <div className="tm-review-grid">
                            {filteredItems.map((item) => (
                                <article className="tm-review-card" key={item.id}>
                                    <div
                                        className="tm-review-rating"
                                        aria-label={`${item.stars} out of 5 stars`}
                                    >
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Star
                                                key={index}
                                                size={19}
                                                fill={index < item.stars ? "currentColor" : "none"}
                                                strokeWidth={1.8}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>

                                    <blockquote className="tm-review-quote">
                                        “{item.review}”
                                    </blockquote>
                                    {item.link && (
                                        <a
                                            className="tm-review-read-more"
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Watch their story <ExternalLink size={15} aria-hidden="true" />
                                        </a>
                                    )}
                                    <div className="tm-review-divider" />

                                    <div className="tm-review-author">
                                        <img
                                            className="tm-review-avatar"
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                        <div className="tm-review-author-copy">
                                            <h3 className="tm-review-author-name">{item.name}</h3>
                                            <p className="tm-review-location">
                                                {item.type === "franchise"
                                                    ? `Franchise Partner, ${item.location.split(",").slice(-1)[0].trim()}`
                                                    : item.type === "staff"
                                                        ? `TeaMax Team, ${item.location.split(",").slice(-1)[0].trim()}`
                                                        : `Customer, ${item.location.split(",").slice(-1)[0].trim()}`}
                                            </p>
                                        </div>
                                    </div>


                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
