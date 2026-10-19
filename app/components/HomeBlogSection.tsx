"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "../blog/blog-data";
import { getBlogs } from "../lib/api";
import "./HomeBlogSection.css";

interface HomeBlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  coverImage?: string;
}

export default function HomeBlogSection() {
  const [posts, setPosts] = useState<HomeBlogPostItem[]>(() => {
    return getAllBlogPosts().slice(0, 3).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      readTime: p.readTime,
      excerpt: p.excerpt.replace(/<[^>]+>/g, "").trim(),
      date: p.date,
      coverImage: p.coverImage,
    }));
  });

  useEffect(() => {
    let mounted = true;

    async function loadLatestBlogs() {
      try {
        const apiBlogs = await getBlogs();

        if (!mounted || !Array.isArray(apiBlogs) || apiBlogs.length === 0) {
          return;
        }

        // Filter published blogs
        const published = apiBlogs.filter(
          (b: any) => !b.status || b.status === "published" || b.status === "active"
        );

        if (published.length > 0) {
          const mappedApiBlogs: HomeBlogPostItem[] = published.map((b: any) => {
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
              category: b.category || "Chai Culture",
              readTime: b.readingTime || "5 min read",
              excerpt: (b.excerpt || "").replace(/<[^>]+>/g, "").trim(),
              date: dateStr,
              coverImage: b.coverImage || "/images/cafe-interior.jpg",
            };
          });

          // Fallback to static posts if fewer than 3 published in DB
          const existingSlugs = new Set(mappedApiBlogs.map((b) => b.slug));
          const fallbackStatic = getAllBlogPosts()
            .filter((p) => !existingSlugs.has(p.slug))
            .map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              category: p.category,
              readTime: p.readTime,
              excerpt: p.excerpt.replace(/<[^>]+>/g, "").trim(),
              date: p.date,
              coverImage: p.coverImage,
            }));

          const combined = [...mappedApiBlogs, ...fallbackStatic].slice(0, 3);
          setPosts(combined);
        }
      } catch (err) {
        console.warn("[HomeBlogSection] Failed to load latest blogs:", err);
      }
    }

    loadLatestBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="tm-home-blog-section">
      <div className="tm-container">

        {/* ================================
            SECTION HEADER
        ================================= */}
        <div className="tm-home-blog-header">
          <div className="tm-home-blog-heading-wrap">
            <span className="tm-home-blog-eyebrow">
              Insights &amp; Stories
            </span>
            <h2 className="tm-home-blog-heading">
              News Blog &amp; Updates
            </h2>
            <p className="tm-home-blog-description">
              Discover franchise insights, café business strategies,
              brewing stories, and beverage trends from TeaMax.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/blog"
            className="tm-home-blog-view-all"
          >
            View all stories
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ================================
            BLOG CARDS
        ================================= */}
        <div className="tm-home-blog-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="tm-home-blog-card"
            >
              <div className="tm-home-blog-content">
                {/* Top meta */}
                <div className="tm-home-blog-meta">
                  <span className="tm-home-blog-category">
                    {post.category}
                  </span>
                  <span className="tm-home-blog-read-time">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="tm-home-blog-title">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="tm-home-blog-excerpt">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="tm-home-blog-card-footer">
                  <span className="tm-home-blog-date">
                    {post.date}
                  </span>
                  <span className="tm-home-blog-read">
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
              </div>
            </Link>
          ))}
        </div>

        {/* ================================
            MOBILE VIEW ALL
        ================================= */}
        <div className="tm-home-blog-mobile-action">
          <Link
            href="/blog"
            className="tm-home-blog-view-all"
          >
            View all stories
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}