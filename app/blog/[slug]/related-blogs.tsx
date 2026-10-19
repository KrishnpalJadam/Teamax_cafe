"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs } from "../../lib/api";

export interface RelatedPostCard {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
}

interface RelatedBlogsProps {
  currentSlug: string;
  currentCategory: string;
  initialRelated: RelatedPostCard[];
}

export function RelatedBlogs({
  currentSlug,
  currentCategory,
  initialRelated,
}: RelatedBlogsProps) {
  const [related, setRelated] = useState<RelatedPostCard[]>(initialRelated);

  useEffect(() => {
    let mounted = true;

    async function loadDynamicRelated() {
      try {
        const apiBlogs = await getBlogs();

        if (!mounted || !Array.isArray(apiBlogs) || apiBlogs.length === 0) {
          return;
        }

        const published = apiBlogs.filter(
          (b: any) =>
            b.slug !== currentSlug &&
            (!b.status || b.status === "published" || b.status === "active")
        );

        if (published.length > 0) {
          const mapped: RelatedPostCard[] = published.map((b: any) => {
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
            };
          });

          // Also merge with initialRelated to maintain fallbacks
          const existingSlugs = new Set(mapped.map((b) => b.slug));
          existingSlugs.add(currentSlug);

          const fallback = initialRelated.filter((p) => !existingSlugs.has(p.slug));
          const allCandidates = [...mapped, ...fallback];

          const targetCat = (currentCategory || "").toLowerCase().trim();
          const sameCategory = allCandidates.filter(
            (p) => (p.category || "").toLowerCase().trim() === targetCat
          );
          const differentCategory = allCandidates.filter(
            (p) => (p.category || "").toLowerCase().trim() !== targetCat
          );

          const finalRelated = [...sameCategory, ...differentCategory].slice(0, 3);
          setRelated(finalRelated);
        }
      } catch (err) {
        console.warn("[RelatedBlogs] Failed to load dynamic related blogs:", err);
      }
    }

    loadDynamicRelated();

    return () => {
      mounted = false;
    };
  }, [currentSlug, currentCategory]);

  if (!related || related.length === 0) return null;

  return (
    <section
      style={{
        padding: "60px 0 80px 0",
        borderTop: "1px solid var(--tm-teal-border)",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <span className="tm-eyebrow">Continue Reading</span>
        <h2 className="tm-heading-lg" style={{ margin: 0 }}>
          Related stories &amp; <em>guides</em>
        </h2>
      </div>

      <div className="tm-blog-grid">
        {related.map((rel) => (
          <Link
            key={rel.id}
            href={`/blog/${rel.slug}`}
            className="tm-blog-card group"
          >
            <div>
              <div className="tm-blog-card-top">
                <span className="tm-blog-card-cat">{rel.category}</span>
                <span className="tm-blog-card-time">{rel.readTime}</span>
              </div>
              <h3 className="tm-blog-card-title">{rel.title}</h3>
              <p className="tm-blog-card-excerpt">{rel.excerpt}</p>
            </div>
            <div className="tm-blog-card-footer">
              <span>{rel.date}</span>
              <span className="tm-blog-card-readmore">Read story →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
