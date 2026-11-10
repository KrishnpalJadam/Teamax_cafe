"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "./blog-data";
import { getBlogs } from "../lib/api";

export function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
              isoDate: b.publishDate || b.createdAt || new Date().toISOString(),
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
          return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
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
          selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const featA = a.isFeatured ? 1 : 0;
        const featB = b.isFeatured ? 1 : 0;
        if (featA !== featB) return featB - featA;
        return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
      });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="tm-container" style={{ paddingBottom: "100px" }}>
      {/* Search & Tag Filter Toolbar */}
      <div className="tm-blog-toolbar">
        <div className="tm-blog-tags" role="tablist" aria-label="Blog categories">
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
              className={`tm-blog-card group ${post.isFeatured ? "is-featured" : ""}`}
              aria-label={`Read story: ${post.title}`}
            >
              <div>
                <div className="tm-blog-card-top">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span className="tm-blog-card-cat">{post.category}</span>
                    {post.isFeatured && (
                      <span className="tm-blog-featured-badge">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Featured
                      </span>
                    )}
                  </div>
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
