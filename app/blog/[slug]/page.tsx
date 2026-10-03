import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Footer, JsonLd } from "../../components";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "../blog-data";
import { ShareButtons } from "./share-buttons";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Story Not Found | TeaMax Café",
      description: "The requested article could not be found.",
    };
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | TeaMax Café`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3);
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "Blog",
          "@id": `${siteUrl}/blog#blog`,
          name: "TeaMax Stories from the Brew",
        },
        headline: post.title,
        description: post.excerpt,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        mainEntityOfPage: postUrl,
        author: {
          "@type": "Organization",
          name: post.author.name,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "TeaMax Café",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/logo.webp`,
          },
        },
        image: `${siteUrl}${post.coverImage}`,
        keywords: post.keywords.join(", "),
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/blog" />

      {/* Post Header */}
      <header className="tm-post-header">
        <div className="tm-container">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="tm-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span style={{ color: "var(--tm-teal)" }}>{post.category}</span>
          </nav>

          <span className="tm-eyebrow">{post.category}</span>
          <h1 className="tm-post-title">{post.title}</h1>
          <p className="tm-lead" style={{ maxWidth: "800px", marginBottom: "20px" }}>
            {post.subtitle}
          </p>

          <div className="tm-post-meta-row">
            <div className="tm-post-author">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              </svg>
              <span>{post.author.name}</span>
            </div>
            <div className="tm-post-author-dot"></div>
            <span>{post.date}</span>
            <div className="tm-post-author-dot"></div>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Main Post Layout */}
      <main id="top" className="tm-container">
        <div className="tm-post-layout">
          {/* Left Column: Article Body */}
          <article className="tm-post-main">
            <div className="tm-article-body">
              {/* Introduction */}
              <p className="tm-lead">{post.content.intro}</p>

              {/* Key Takeaway Callout (AEO Optimized) */}
              <div className="tm-callout-box" role="region" aria-label="Key Takeaway">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Key Takeaway for Entrepreneurs &amp; Readers
                </h4>
                <p>{post.content.keyTakeaway}</p>
              </div>

              {/* Article Sections */}
              {post.content.sections.map((sec) => (
                <section key={sec.id} id={sec.id}>
                  <h2>{sec.heading}</h2>

                  {sec.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul>
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}

                  {sec.quote && (
                    <blockquote>
                      <p>"{sec.quote}"</p>
                    </blockquote>
                  )}

                  {sec.tableData && (
                    <div className="tm-inv-table-wrap" style={{ margin: "28px 0" }}>
                      <table className="tm-inv-table">
                        <thead>
                          <tr>
                            {sec.tableData.headers.map((th, thIdx) => (
                              <th key={thIdx}>{th}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>
                                  {cIdx === 0 ? <strong>{cell}</strong> : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Conclusion */}
              <section id="conclusion">
                <h2>Conclusion &amp; Next Steps</h2>
                <p>{post.content.conclusion}</p>
              </section>

              {/* Tags */}
              <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--tm-teal-border)" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "var(--tm-teal-muted)", marginRight: "12px" }}>
                  Topics:
                </span>
                <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "8px" }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "12px",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        background: "var(--tm-cream-soft)",
                        border: "1px solid var(--tm-teal-border)",
                        color: "var(--tm-teal)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Social Share */}
              <div style={{ marginTop: "32px", padding: "20px 24px", background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tm-teal)", display: "block", marginBottom: "8px" }}>
                  Share this story with fellow entrepreneurs &amp; tea lovers:
                </span>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* Franchise Bottom CTA */}
              <aside className="tm-post-cta-banner">
                <div>
                  <span className="tm-eyebrow tm-eyebrow-light">TeaMax Franchise Opportunity</span>
                  <h3>Start Your Own TeaMax Café Franchise</h3>
                  <p>
                    Join our rapidly growing family of 250+ outlets across 6 states. Turnkey setup, 3-in-1 hybrid revenue model, and investment starting from ₹3.5 Lakhs.
                  </p>
                </div>
                <Link
                  href="/franchise#apply"
                  className="tm-btn tm-btn-yellow"
                  style={{ flexShrink: 0 }}
                >
                  Explore Franchise
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </aside>
            </div>
          </article>

          {/* Right Column: Sticky Sidebar */}
          <aside className="tm-post-sidebar">
            {/* Table of Contents */}
            <div className="tm-sidebar-widget">
              <h3 className="tm-sidebar-title">Table of Contents</h3>
              <nav aria-label="Table of contents">
                <ul className="tm-toc-list">
                  {post.content.sections.map((sec) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`} className="tm-toc-link">
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#conclusion" className="tm-toc-link">
                      Conclusion &amp; Next Steps
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Author / Editorial Desk Card */}
            <div className="tm-sidebar-widget">
              <h3 className="tm-sidebar-title">About the Author</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "var(--tm-teal)",
                    color: "var(--tm-yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--tm-font-serif)",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  TM
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "14px", color: "var(--tm-teal)" }}>
                    {post.author.name}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--tm-teal-muted)" }}>
                    {post.author.role}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: "12.5px", color: "var(--tm-teal-muted)", lineHeight: 1.5, margin: 0 }}>
                TeaMax Editorial brings decades of collective experience in Indian F&amp;B retail, supply chains, and franchise development.
              </p>
            </div>

            {/* Fast Franchise Quick Link */}
            <div
              className="tm-sidebar-widget"
              style={{
                background: "var(--tm-teal)",
                color: "var(--tm-cream)",
                borderColor: "rgba(255, 237, 130, 0.3)",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--tm-yellow)",
                }}
              >
                Franchise 2026
              </span>
              <h4
                style={{
                  fontFamily: "var(--tm-font-serif)",
                  fontSize: "18px",
                  color: "var(--tm-cream)",
                  margin: "8px 0 10px 0",
                  lineHeight: 1.25,
                }}
              >
                Own a High-ROI TeaMax Café
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 248, 238, 0.8)",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                Low capex starting ₹3.5L. Transparent pricing, zero hidden fees, and end-to-end launch support.
              </p>
              <Link
                href="/franchise#apply"
                className="tm-btn tm-btn-yellow tm-btn-sm"
                style={{ width: "100%" }}
              >
                View Franchise Models
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {related.length > 0 && (
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
                    <span className="tm-blog-card-readmore">
                      Read story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <JsonLd data={schema} />
    </div>
  );
}
