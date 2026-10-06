import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import { getAllBlogPosts } from "./blog-data";
import { BlogClient } from "./blog-client";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Stories from the Brew | TeaMax Café Blog & Business Guides",
  description:
    "Explore in-depth guides on opening a tea café franchise in India, authentic Kadak Chai brewing craft, 3-in-1 café economics, FSSAI licensing, and healthy beverage trends from TeaMax.",
  keywords: [
    "TeaMax blog",
    "tea cafe franchise India guide",
    "how to start tea cafe",
    "kadak chai brewing science",
    "3 in 1 cafe model",
    "FSSAI license cafe India",
    "tier 2 city business ideas",
    "healthy juices cafe",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Stories from the Brew | TeaMax Café",
    description:
      "Insights, brewing secrets, and franchise business guides from India's fastest-growing 3-in-1 tea café franchise network.",
    url: `${siteUrl}/blog`,
    type: "website",
    images: [{ url: "/images/cafe-interior.jpg", width: 1080, height: 864, alt: "TeaMax Stories from the Brew" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories from the Brew | TeaMax Café",
    description: "Insights, brewing secrets, and franchise guides from TeaMax Café.",
    images: ["/images/cafe-interior.jpg"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/blog#blog`,
        name: "TeaMax Stories from the Brew",
        url: `${siteUrl}/blog`,
        description: "Official publication of TeaMax Café covering franchise guides, beverage craft, and F&B business in India.",
        publisher: {
          "@type": "Organization",
          name: "TeaMax Café",
          url: siteUrl,
          logo: `${siteUrl}/images/logo.webp`,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}/blog/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl}/blog/${post.slug}`,
          datePublished: post.isoDate,
          author: {
            "@type": "Organization",
            name: post.author.name,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/blog" />


      <section className="tm-franchise-hero martop" aria-labelledby="franchise-heading">
        <div className="tm-container">
          <div className="tm-hero-grid">
            <div>
              <span className="tm-eyebrow">Insights &amp; Stories</span>
              <h1 id="story-hero-heading" className="tm-heading-xl ">
                Stories from the <em>brew.</em>
              </h1>
              <p className="tm-franchise-hero-lead">
                A curated collection of business guides, brewing craft, beverage trends, and
                entrepreneurial insights from India’s leading 3-in-1 tea café franchise.
              </p>

              <div className="tm-hero-actions-wrap">
                <a href="#apply" className="tm-btn tm-btn-yellow">
                  Enquire for Franchise
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <a href="#models" className="tm-btn tm-btn-outline" style={{ color: "var(--tm-cream)", borderColor: "rgba(255, 248, 238, 0.3)" }}>
                  Explore Models
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Hero Image Card with badge */}
            <div className="tm-hero-badge-card">
              <img
                src="/images/cafe-interior.jpg"
                alt="TeaMax Café Interior Experience"
                width={600}
                height={450}
                style={{ width: "100%", height: "auto", display: "block" }}
              />

            </div>
          </div>


        </div>
      </section>

      {/* Main Blog Client Component */}
      <main id="top" >
        <BlogClient initialPosts={posts} />
      </main>

      <Footer />
      <JsonLd data={blogSchema} />
    </div>
  );
}
