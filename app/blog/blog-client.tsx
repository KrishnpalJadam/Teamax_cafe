
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPost } from "./blog-data";
import { getBlogs } from "../lib/api";

export function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    let mounted = true;

    getBlogs().then((dbBlogs) => {
      if (mounted && Array.isArray(dbBlogs) && dbBlogs.length > 0) {
        const mapped: BlogPost[] = dbBlogs
          .filter((b: any) => b.status === "published" || !b.status)
          .map((b: any) => {
            const rawDate = b.publishDate || b.createdAt;

            const dateStr = rawDate
              ? new Date(rawDate).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })
              : "Recent";

            return {
              id: b.id,
              slug: b.slug,
              title: b.title,
              subtitle: b.excerpt || "",
              excerpt: b.excerpt || "",
              category: (b.category as any) || "Chai Culture",
              readTime: b.readingTime || "5 min read",
              date: dateStr,
              isoDate:
                b.publishDate || b.createdAt || new Date().toISOString(),
              isFeatured: Boolean(b.isFeatured),
              author: {
                name: b.author || "TeaMax Editorial Team",
                role: b.authorDesignation || "TeaMax Culinary Research",
                avatar: b.authorAvatar || "/images/cafe-interior.jpg",
              },
              tags: b.seoKeywords
                ? b.seoKeywords.split(",").map((s: string) => s.trim())
                : [b.category || "Chai"],
              coverImage: b.coverImage || "/images/cafe-interior.jpg",
              metaDescription: b.metaDescription || b.excerpt || "",
              keywords: b.seoKeywords
                ? b.seoKeywords.split(",").map((s: string) => s.trim())
                : [],
              content: {
                intro: b.excerpt || "",
                keyTakeaway: "",
                sections: [],
                conclusion: "",
              },
            };
          });

        const existingSlugs = new Set(mapped.map((p) => p.slug));

        const combined = [
          ...mapped,
          ...initialPosts.filter((p) => !existingSlugs.has(p.slug)),
        ];

        const sorted = combined.sort((a, b) => {
          const featA = a.isFeatured ? 1 : 0;
          const featB = b.isFeatured ? 1 : 0;

          if (featA !== featB) return featB - featA;

          return (
            new Date(b.isoDate || 0).getTime() -
            new Date(a.isoDate || 0).getTime()
          );
        });

        setPosts(sorted);
      }
    });

    return () => {
      mounted = false;
    };
  }, [initialPosts]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesCategory =
          selectedCategory === "All" ||
          post.category === selectedCategory;

        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
          query === "" ||
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const featA = a.isFeatured ? 1 : 0;
        const featB = b.isFeatured ? 1 : 0;

        if (featA !== featB) return featB - featA;

        return (
          new Date(b.isoDate || 0).getTime() -
          new Date(a.isoDate || 0).getTime()
        );
      });
  }, [posts, selectedCategory, searchQuery]);

  // Reset pagination when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / itemsPerPage)
  );

  // Keep current page valid when data changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Get only 12 posts for current page
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredPosts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredPosts, currentPage]);

  // Page number logic (same as Menu page)
  const getPageNumbers = (
    current: number,
    total: number
  ): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
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

  // Handle page change and smooth scroll
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    const el = document.getElementById("tm-blog-content-top");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className="tm-container"
      id="tm-blog-content-top"
      style={{ paddingBottom: "100px", scrollMarginTop: "100px" }}
    >
      {/* Search & Tag Filter Toolbar */}
      <div className="tm-blog-toolbar">
        <div
          className="tm-blog-tags"
          role="tablist"
          aria-label="Blog categories"
        >
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? posts.length
                : posts.filter(
                  (p) =>
                    String(p.category || "").trim().toLowerCase() ===
                    String(cat).trim().toLowerCase()
                ).length;

            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`tm-blog-tag-btn ${isActive ? "is-active" : ""
                  }`}
              >
                {cat}
                <span
                  style={{
                    opacity: 0.65,
                    fontSize: "11px",
                    marginLeft: "4px",
                  }}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="tm-blog-search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            type="search"
            placeholder="Search articles, guides, recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <>
          <div className="tm-blog-grid tm-animate-slide">
            {paginatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`tm-blog-card group ${post.isFeatured ? "is-featured" : ""
                  }`}
                aria-label={`Read story: ${post.title}`}
              >
                <div>
                  <div className="tm-blog-card-top">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="tm-blog-card-cat">
                        {post.category}
                      </span>

                      {post.isFeatured && (
                        <span className="tm-blog-featured-badge">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          Featured
                        </span>
                      )}
                    </div>

                    <span className="tm-blog-card-time">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="tm-blog-card-title">
                    {post.title}
                  </h2>

                  <p className="tm-blog-card-excerpt">
                    {post.excerpt}
                  </p>
                </div>

                <div className="tm-blog-card-footer">
                  <span>{post.date}</span>

                  <span className="tm-blog-card-readmore">
                    Read story

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination - Same as Menu Page */}
          {totalPages > 1 && (
            <div className="tx-menu-pagination-wrapper">
              <p className="tx-menu-pagination-summary">
                Showing {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredPosts.length
                )}{" "}
                of {filteredPosts.length} articles
              </p>

              <nav
                className="tx-menu-pagination"
                aria-label="Blog pagination"
              >
                {/* Previous */}
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
                {getPageNumbers(currentPage, totalPages).map(
                  (p, idx) =>
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
                        className={`tx-menu-page-btn ${currentPage === p ? "is-active" : ""
                          }`}
                        aria-current={
                          currentPage === p ? "page" : undefined
                        }
                        onClick={() =>
                          handlePageChange(Number(p))
                        }
                      >
                        {p}
                      </button>
                    )
                )}

                {/* Next */}
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
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "var(--tm-cream-card)",
            borderRadius: "20px",
            border: "1px solid var(--tm-teal-border)",
            marginTop: "40px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--tm-font-serif)",
              fontSize: "22px",
              color: "var(--tm-teal)",
              marginBottom: "8px",
            }}
          >
            No articles found
          </h3>

          <p
            style={{
              color: "var(--tm-teal-muted)",
              fontSize: "14px",
              margin: "0 0 20px 0",
            }}
          >
            We could not find any stories matching "{searchQuery}".
            Try a different keyword or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className="tm-btn tm-btn-teal tm-btn-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
