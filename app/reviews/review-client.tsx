
"use client";

import "./reviews-cards.css";

import { useEffect, useMemo, useState } from "react";
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
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import { getReviews, getReviewCategories } from "../lib/api";

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
    linkName?: string;
    stars: number;
    isFeatured?: boolean;
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

export function ReviewClient({
    categories: initialCategories,
    items: initialItems,
}: ReviewClientProps) {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");

    const [items, setItems] = useState<ReviewItem[]>(initialItems);
    const [categories, setCategories] = useState<ReviewCategory[]>(initialCategories);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Fetch live reviews and categories
    useEffect(() => {
        Promise.all([
            getReviews({ status: "published" }),
            getReviewCategories(),
        ])
            .then(([dbReviews, dbCategories]) => {

                if (Array.isArray(dbReviews) && dbReviews.length > 0) {
                    setItems(
                        dbReviews.map((rev) => ({
                            id: rev.id,
                            type: (rev.categoryId || rev.reviewType || "customer") as
                                "franchise" | "staff" | "customer",

                            name: rev.reviewerName,

                            location:
                                rev.reviewerRole ||
                                (rev.relatedCentreName
                                    ? `TeaMax Cafe, ${rev.relatedCentreName}`
                                    : "TeaMax Café"),

                            image: rev.reviewerAvatar || "/images/cafe-interior.jpg",
                            review: rev.reviewText,
                            link: rev.viewMoreLink || undefined,
                            linkName: rev.viewMoreLinkName || "Read More",
                            stars: Number(rev.starRating || 5),
                            isFeatured: Boolean(rev.isFeatured),
                        }))
                    );
                }

                if (Array.isArray(dbCategories) && dbCategories.length > 0) {
                    setCategories(
                        dbCategories[0]?.id === "all"
                            ? dbCategories
                            : [
                                {
                                    id: "all",
                                    name: "All Reviews",
                                    icon: "all",
                                },
                                ...dbCategories,
                            ]
                    );
                }

            })
            .catch(() => { });
    }, []);

    // Display categories
    const displayCategories = useMemo(
        () =>
            categories?.length
                ? categories
                : [
                    { id: "all", name: "All Reviews", icon: "all" },
                    { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
                    { id: "staff", name: "Staff Reviews", icon: "staff" },
                    { id: "customer", name: "Customer Reviews", icon: "customer" },
                ],
        [categories]
    );

    // Filter and sort reviews
    const filteredItems = useMemo(() => {

        const query = searchQuery.trim().toLowerCase();

        let result = (items || []).filter((item) => {

            const categoryMatch =
                selectedCategory === "all" ||
                item.type === selectedCategory;

            const searchMatch =
                !query ||
                item.name.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query) ||
                item.review.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query);

            return categoryMatch && searchMatch;
        });

        result = [...result].sort((a, b) => {

            const featA = a.isFeatured ? 1 : 0;
            const featB = b.isFeatured ? 1 : 0;

            if (featA !== featB) {
                return featB - featA;
            }

            if (sortBy === "popular") {
                return b.stars - a.stars;
            } else if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "rating-low") {
                return a.stars - b.stars;
            }

            return 0;
        });

        return result;

    }, [items, selectedCategory, searchQuery, sortBy]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, sortBy]);

    // Total pages
    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / itemsPerPage)
    );

    // Validate current page
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    // Paginated reviews (12 per page)
    const paginatedItems = useMemo(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;

        return filteredItems.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [filteredItems, currentPage]);

    // Page numbers (same as Menu page)
    const getPageNumbers = (
        current: number,
        total: number
    ): (number | string)[] => {

        if (total <= 7) {
            return Array.from(
                { length: total },
                (_, i) => i + 1
            );
        }

        if (current <= 4) {
            return [1, 2, 3, 4, 5, "...", total];
        }

        if (current >= total - 3) {
            return [
                1,
                "...",
                total - 4,
                total - 3,
                total - 2,
                total - 1,
                total,
            ];
        }

        return [
            1,
            "...",
            current - 1,
            current,
            current + 1,
            "...",
            total,
        ];
    };

    // Handle page change
    const handlePageChange = (page: number) => {

        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);

        const el = document.getElementById(
            "tx-reviews-content-top"
        );

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Active category
    const activeCategory = displayCategories.find(
        (category) => category.id === selectedCategory
    );

    return (
        <section className="tx-menu-shell tx-reviews-shell">

            {/* Search Bar */}
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
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="tx-menu-search-button"
                    >
                        Search
                    </button>

                </form>

            </div>

            <div className="tx-menu-area">

                {/* Sidebar Categories */}
                <aside
                    className="tx-menu-category-panel"
                    aria-label="Review categories"
                >

                    <div className="tx-menu-category-list">

                        {displayCategories.map((category) => {

                            const Icon =
                                categoryIcons[category.icon] || Coffee;

                            const isSelected =
                                selectedCategory === category.id;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    className={`tx-menu-category-button ${isSelected ? "is-selected" : ""
                                        }`}
                                    aria-pressed={isSelected}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
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

                {/* Reviews Content */}
                <div
                    className="tx-menu-content"
                    id="tx-reviews-content-top"
                    style={{ scrollMarginTop: "100px" }}
                >

                    {/* Heading and Sorting */}
                    <div className="tx-menu-heading-row">

                        <div>

                            <h2 className="tx-menu-heading">
                                {activeCategory?.name || "All Reviews"}
                            </h2>

                            <span className="tx-menu-yellow-rule" />

                            <p className="tx-menu-description">
                                {categoryDescriptions[selectedCategory] ||
                                    categoryDescriptions.all}
                            </p>

                        </div>

                        <div className="tx-menu-sort">

                            <label htmlFor="tx-reviews-sort">
                                Sort By:
                            </label>

                            <select
                                id="tx-reviews-sort"
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value)
                                }
                                className="tx-menu-sort-select"
                            >

                                <option value="popular">
                                    Top Rated
                                </option>

                                <option value="name">
                                    Name
                                </option>

                                <option value="rating-low">
                                    Rating: Low to High
                                </option>

                            </select>

                            <ChevronDown
                                size={16}
                                className="tx-menu-sort-icon"
                                aria-hidden="true"
                            />

                        </div>

                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 ? (

                        <div className="tx-menu-empty">

                            <Search size={35} />

                            <h3>No reviews found</h3>

                            <p>
                                Try another search or select a different
                                review category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                    setCurrentPage(1);
                                }}
                            >
                                View All Reviews
                            </button>

                        </div>

                    ) : (

                        <>

                            {/* Review Cards Grid */}
                            <div className="tm-review-grid">

                                {paginatedItems.map((item) => (

                                    <article
                                        className="tm-review-card"
                                        key={item.id}
                                    >

                                        {/* Rating */}
                                        <div
                                            className="tm-review-rating"
                                            aria-label={`${item.stars} out of 5 stars`}
                                        >

                                            {Array.from(
                                                { length: 5 },
                                                (_, index) => (

                                                    <Star
                                                        key={index}
                                                        size={19}
                                                        fill={
                                                            index < item.stars
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                        strokeWidth={1.8}
                                                        aria-hidden="true"
                                                    />

                                                )
                                            )}

                                        </div>

                                        {/* Review Text */}
                                        <blockquote className="tm-review-quote">
                                            “{item.review}”
                                        </blockquote>

                                        {/* Read More Link */}
                                        {item.link && (

                                            <a
                                                className="tm-review-read-more"
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >

                                                {item.linkName || "Read More"}

                                                <ExternalLink
                                                    size={15}
                                                    aria-hidden="true"
                                                />

                                            </a>

                                        )}

                                        <div className="tm-review-divider" />

                                        {/* Author */}
                                        <div className="tm-review-author">

                                            <img
                                                className="tm-review-avatar"
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                            />

                                            <div className="tm-review-author-copy">

                                                <h3 className="tm-review-author-name">
                                                    {item.name}
                                                </h3>

                                                <p className="tm-review-location">

                                                    {item.type === "franchise"
                                                        ? `Franchise Partner, ${item.location
                                                            .split(",")
                                                            .slice(-1)[0]
                                                            .trim()
                                                        }`
                                                        : item.type === "staff"
                                                            ? `TeaMax Team, ${item.location
                                                                .split(",")
                                                                .slice(-1)[0]
                                                                .trim()
                                                            }`
                                                            : `Customer, ${item.location
                                                                .split(",")
                                                                .slice(-1)[0]
                                                                .trim()
                                                            }`}

                                                </p>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (

                                <div className="tx-menu-pagination-wrapper">

                                    {/* Pagination Summary */}
                                    <p className="tx-menu-pagination-summary">

                                        Showing{" "}
                                        {(currentPage - 1) * itemsPerPage + 1}–

                                        {Math.min(
                                            currentPage * itemsPerPage,
                                            filteredItems.length
                                        )}{" "}

                                        of {filteredItems.length} reviews

                                    </p>

                                    <nav
                                        className="tx-menu-pagination"
                                        aria-label="Reviews pagination"
                                    >

                                        {/* Previous Button */}
                                        <button
                                            type="button"
                                            className="tx-menu-page-btn tx-menu-prev-btn"
                                            aria-label="Previous page"
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                handlePageChange(currentPage - 1)
                                            }
                                        >

                                            <ArrowLeft size={16} />

                                        </button>

                                        {/* Page Numbers */}
                                        {getPageNumbers(
                                            currentPage,
                                            totalPages
                                        ).map((p, idx) =>

                                            p === "..." ? (

                                                <span
                                                    key={`dots-${idx}`}
                                                    className="tx-menu-page-dots"
                                                >
                                                    ...
                                                </span>

                                            ) : (

                                                <button
                                                    key={`page-${p}`}
                                                    type="button"
                                                    className={`tx-menu-page-btn ${currentPage === p
                                                            ? "is-active"
                                                            : ""
                                                        }`}
                                                    aria-current={
                                                        currentPage === p
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(Number(p))
                                                    }
                                                >

                                                    {p}

                                                </button>

                                            )
                                        )}

                                        {/* Next Button */}
                                        <button
                                            type="button"
                                            className="tx-menu-page-btn tx-menu-next-btn"
                                            aria-label="Next page"
                                            disabled={currentPage === totalPages}
                                            onClick={() =>
                                                handlePageChange(currentPage + 1)
                                            }
                                        >

                                            <ArrowRight size={16} />

                                        </button>

                                    </nav>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </section>
    );
}
