import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import { getAllBlogPosts, BlogPost } from "./blog-data";
import { BlogClient } from "./blog-client";
import { getBlogs } from "../lib/api";
import Link from "next/link";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Cafe Business Tips, Franchise Guides & Chai | TeaMax Blog",
  description:
    "Explore TeaMax Cafe's blog for franchise guides, cafe business tips, chai stories and brand updates. Find practical ideas for your cafe journey.",
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
  alternates: { canonical: `${siteUrl}/post/` },
  openGraph: {
    title: "Cafe Business Tips, Franchise Guides & Chai | TeaMax Blog",
    description:
      "Explore TeaMax Cafe's blog for franchise guides, cafe business tips, chai stories and brand updates. Find practical ideas for your cafe journey.",
    url: `${siteUrl}/post`,
    type: "website",
    images: [{ url: "/images/cafe-interior.jpg", width: 1080, height: 864, alt: "TeaMax Stories from the Brew" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe Business Tips, Franchise Guides & Chai | TeaMax Blog",
    description: "Explore TeaMax Cafe's blog for franchise guides, cafe business tips, chai stories and brand updates. Find practical ideas for your cafe journey.",
    images: ["/images/cafe-interior.jpg"],
  },
};

export default async function BlogIndexPage() {
  let posts: BlogPost[] = getAllBlogPosts();

  try {
    const apiBlogs = await getBlogs();
    if (Array.isArray(apiBlogs) && apiBlogs.length > 0) {
      const mappedApiBlogs: BlogPost[] = apiBlogs.map((b: any) => {
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
          subtitle: (b.excerpt || "").replace(/<[^>]+>/g, ""),
          excerpt: (b.excerpt || "").replace(/<[^>]+>/g, ""),
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
          metaDescription: (b.metaDescription || b.excerpt || "").replace(/<[^>]+>/g, ""),
          keywords: b.seoKeywords
            ? b.seoKeywords.split(",").map((s: string) => s.trim())
            : [],
          content: {
            intro: (b.excerpt || "").replace(/<[^>]+>/g, ""),
            keyTakeaway: "",
            rawHtml: b.content || "",
            sections: [],
            conclusion: "",
          },
        };
      });

      const existingSlugs = new Set(mappedApiBlogs.map((b) => b.slug));
      const combined = [...mappedApiBlogs, ...posts.filter((p) => !existingSlugs.has(p.slug))];
      posts = combined.sort((a, b) => {
        const featA = a.isFeatured ? 1 : 0;
        const featB = b.isFeatured ? 1 : 0;
        if (featA !== featB) return featB - featA;
        return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
      });
    }
  } catch (_) { }

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/post#blog`,
        name: "TeaMax Stories from the Brew",
        url: `${siteUrl}/post`,
        description: "Official publication of TeaMax Café covering franchise guides, beverage craft, and F&B business in India.",
        publisher: {
          "@type": "Organization",
          name: "TeaMax Café",
          url: siteUrl,
          logo: `${siteUrl}/images/logo.webp`,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}/post/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl}/post/${post.slug}`,
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
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/post` },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/post" />


      <section className="tm-franchise-hero martop" aria-labelledby="franchise-heading">
        <div className="tm-container">
          <div className="tm-hero-grid">
            <div>
              <span className="tm-eyebrow">Insights &amp; Stories</span>
              <h1 id="story-hero-heading" className="tm-heading-xl ">
                Stories from the brew.
              </h1>
              <p className="tm-franchise-hero-lead">
                A curated collection of business guides, brewing craft, beverage trends, and
                entrepreneurial insights from India’s leading 3-in-1 tea café franchise.
              </p>

              <div className="tm-hero-actions-wrap">
                <Link href="/cafe-franchise-india" className="tm-btn tm-btn-yellow">
                  Enquire for Franchise
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>

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
