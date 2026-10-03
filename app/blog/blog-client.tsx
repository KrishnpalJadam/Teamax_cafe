"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "./blog-data";

export function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialPosts.map((p) => p.category)));
    return ["All", ...cats];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="tm-container" style={{ paddingBottom: "100px" }}>
      {/* Search & Tag Filter Toolbar */}
      <div className="tm-blog-toolbar">
        <div className="tm-blog-tags" role="tablist" aria-label="Blog categories">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? initialPosts.length
                : initialPosts.filter((p) => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`tm-blog-tag-btn ${isActive ? "is-active" : ""}`}
              >
                {cat} <span style={{ opacity: 0.65, fontSize: "11px", marginLeft: "4px" }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
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
        <div className="tm-blog-grid tm-animate-slide">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="tm-blog-card group"
              aria-label={`Read story: ${post.title}`}
            >
              <div>
                <div className="tm-blog-card-top">
                  <span className="tm-blog-card-cat">{post.category}</span>
                  <span className="tm-blog-card-time">{post.readTime}</span>
                </div>

                <h2 className="tm-blog-card-title">{post.title}</h2>
                <p className="tm-blog-card-excerpt">{post.excerpt}</p>
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
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
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
          <p style={{ color: "var(--tm-teal-muted)", fontSize: "14px", margin: "0 0 20px 0" }}>
            We could not find any stories matching "{searchQuery}". Try a different keyword or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
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
