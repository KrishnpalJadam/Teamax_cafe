import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/blog-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";
  const now = new Date();
  const pages = [
    ["/", 1.0, "weekly"],
    ["/franchise", 0.95, "weekly"],
    ["/menu", 0.9, "weekly"],
    ["/our-story", 0.85, "monthly"],
    ["/stores", 0.8, "weekly"],
    ["/blog", 0.85, "weekly"],
  ] as const;
  const staticPages = pages.map(([path, priority, changeFrequency]) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  return [...staticPages, ...blogPages];
}
