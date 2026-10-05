import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, JsonLd, FaqJsonLd } from "../components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Our Story | The Journey of TeaMax Café India",
  description:
    "Discover the story behind TeaMax Café — an India-born 3-in-1 tea café franchise with 250+ outlets across 6 states. Learn about our philosophy, founder, milestones and passion for authentic chai.",
  keywords: [
    "TeaMax story",
    "TeaMax cafe founder",
    "3 in 1 cafe franchise",
    "tea franchise India",
    "Indian chai story",
    "tea cafe history",
    "TeaMax journey",
    "Ashoka group TeaMax",
    "best tea franchise Hyderabad Bangalore Vijayawada",
  ],
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "Our Story | TeaMax Café — A Taste Worth Sharing",
    description:
      "From a single cup in 2020 to over 250+ outlets across India. Explore how TeaMax redefined the contemporary tea cafe experience.",
    url: `${siteUrl}/about-us`,
    type: "website",
    images: [{ url: "/images/cafe-interior.jpg", width: 1080, height: 864, alt: "TeaMax Café Experience" }],
  },
};

const storyFaqs = [
  {
    q: "When and where was TeaMax Café founded?",
    a: "TeaMax Café was established in 2020 in India with a clear mission to elevate the authentic Indian chai ritual into a warm, hygienic, and contemporary café destination.",
  },
  {
    q: "What makes the TeaMax 3-in-1 café concept unique?",
    a: "Unlike typical tea stalls or single-concept outlets, TeaMax integrates three full revenue models under one roof: a specialty Tea & Coffee Bar, a Fresh Fruit Juice Center (zero water, zero sugar), and an Artisanal Ice Cream & Shake Parlour.",
  },
  {
    q: "How many TeaMax outlets currently operate across India?",
    a: "TeaMax has grown rapidly to over 250+ thriving outlets operating across 6 Indian states, including Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, West Bengal, and Odisha.",
  },
  {
    q: "What certifications and quality standards does TeaMax adhere to?",
    a: "TeaMax operates under rigorous Indian food safety and corporate governance guidelines, holding ISO 9001:2015 certification, GMP manufacturing compliance, MSME registration, and full FSSAI certification.",
  },
  {
    q: "Who is behind the vision of TeaMax Café?",
    a: "TeaMax was founded and guided by visionary leadership committed to supporting everyday entrepreneurs through transparent franchise models while delivering uncompromised taste and purity to customers.",
  },
  {
    q: "Does TeaMax offer franchise opportunities for new entrepreneurs?",
    a: "Yes. TeaMax offers both Regular and Master Franchise models with complete end-to-end setup support, equipment supply, staff barista training, 2D café interior design, and continuous brand marketing.",
  },
];

export default function OurStoryPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about-us#about`,
        url: `${siteUrl}/about-us`,
        name: "Our Story | TeaMax Café",
        description: "The story, philosophy, founder, and nationwide journey of TeaMax Café.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Our Story", item: `${siteUrl}/about-us` },
          ],
        },
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${siteUrl}/#organization`,
        name: "TeaMax Café",
        legalName: "TeaMax Café India",
        foundingDate: "2020",
        url: siteUrl,
        logo: `${siteUrl}/images/logo.webp`,
        image: `${siteUrl}/images/cafe-interior.jpg`,
        priceRange: "₹",
        servesCuisine: ["Indian Tea", "Specialty Coffee", "Fresh Juices", "Ice Creams", "Café Snacks"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressRegion: "Telangana",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "17.4947",
          longitude: "78.3996",
        },
        areaServed: [
          { "@type": "State", name: "Telangana" },
          { "@type": "State", name: "Andhra Pradesh" },
          { "@type": "State", name: "Karnataka" },
          { "@type": "State", name: "Tamil Nadu" },
          { "@type": "State", name: "West Bengal" },
          { "@type": "State", name: "Odisha" },
        ],
        knowsAbout: [
          "Authentic Indian Chai",
          "Kadak Chai",
          "Herbal Teas",
          "3-in-1 Cafe Franchise",
          "Cold-Pressed Juices",
          "Ice Cream Sundaes",
        ],
      },
    ],
  };

  return (
    <>
      <Header active="/about-us" />

      <main id="top" className="tm-page tm-page2">
        {/* =================================================================
            01 / HERO SECTION
            ================================================================= */}
        <section className="tm-hero" aria-labelledby="story-hero-heading">
          <div className="tm-container">
            <div className="tm-hero-grid">
              <div>
                <span className="tm-eyebrow">01 / Our Story · Est. 2020</span>
                <h1 id="story-hero-heading" className="tm-heading-xl">
                  Rooted in tea.<br />
                 Built for business
                </h1>
                <p className="tm-lead">
                  TeaMax Cafe is a venture of Ashoka Group, an Indian business group established in 1969. We bring together café experiences and a structured franchise model for entrepreneurs across India.

                </p>


                <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                  <Link href="/menu" className="tm-btn tm-btn-yellow">
                    Explore the Menu →
                  </Link>
                  <Link href="/franchise#apply" className="tm-btn tm-btn-outline">
                    Franchise Opportunities
                  </Link>
                </div>

                {/* Statistics Ribbon */}
                <div className="tm-stats-ribbon">
                  <div className="tm-stat-item">
                    <strong>1,298+</strong>
                    <span>FRANCHISEE PARTNERS</span>
                  </div>
                  <div className="tm-stat-item">
                    <strong>27+</strong>
                    <span>STATES ACROSS INDIA
</span>
                  </div>
                  <div className="tm-stat-item">
                    <strong>53</strong>
                    <span>MONTHS OF EXPANSION</span>
                  </div>
                  <div className="tm-stat-item">
                    <strong>1969</strong>
                    <span>ASHOKA GROUP ESTABLISHED</span>
                  </div>
                </div>
              </div>

              <div className="tm-hero-media">
                <img
                  src="/images/cafe-interior.jpg"
                  alt="TeaMax Café warm contemporary interior with welcoming seating"
                  width={640}
                  height={520}
                  loading="eager"
                />
                <div className="tm-hero-tag">
                  <strong>TeaMax Café</strong>
                  <span>A Taste Worth Sharing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            02 / THE 3-IN-1 CONCEPT
            ================================================================= */}
        <section className="tm-section" style={{ backgroundColor: "var(--tm-cream-soft)" }} aria-labelledby="concept-heading">
          <div className="tm-container">
            <div style={{ maxWidth: "680px" }}>
              <span className="tm-eyebrow">02 / The Cafe Experience</span>
              <h2 id="concept-heading" className="tm-heading-lg">
              One welcoming space.<br />
               A menu for every craving.
              </h2>
              <p className="tm-lead">
               From classic teas and coffees to shakes, snacks and quick bites, TeaMax brings a varied café menu together under one roof.
              </p>
            </div>

            <div className="tm-feature-grid">
              {/* Feature 1: The Cafe */}
              <article className="tm-feature-card">
                <div>
                  <span className="tm-feature-num">EXPERIENCE · 01</span>
                  <div className="tm-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v2"></path>
                      <path d="M14 2v2"></path>
                      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                      <path d="M6 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="tm-heading-md">Tea & Coffee</h3>
                  <p className="tm-body">
                   Explore 12+ tea varieties and 7+ coffee options, with menu flexibility for different customer preferences.
                  </p>
                </div>
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--tm-teal-border)" }}>
                  <span className="tm-caption"><strong>Signature:</strong> 12+ Teas · 7+ Coffees</span>
                </div>
              </article>

              {/* Feature 2: The Juice Center */}
              <article className="tm-feature-card">
                <div>
                  <span className="tm-feature-num">EXPERIENCE · 02</span>
                  <div className="tm-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"></path>
                      <path d="M19.65 15.66A8 8 0 0 1 8.35 4.34"></path>
                      <path d="m14 10-5.5 5.5"></path>
                      <path d="M14 17.85V10H6.15"></path>
                    </svg>
                  </div>
                  <h3 className="tm-heading-md">Shakes & Lassi</h3>
                  <p className="tm-body">
                    From refreshing shakes to lassis, TeaMax offers beverage options designed for different tastes and café occasions.
                  </p>
                </div>
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--tm-teal-border)" }}>
                  <span className="tm-caption"><strong>Signature:</strong> 12+ Shakes · 8+ Lassis</span>
                </div>
              </article>

              {/* Feature 3: Ice Cream & Shakes */}
              <article className="tm-feature-card">
                <div>
                  <span className="tm-feature-num">EXPERIENCE · 03</span>
                  <div className="tm-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"></path>
                      <path d="M17 7A5 5 0 0 0 7 7"></path>
                      <path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"></path>
                    </svg>
                  </div>
                  <h3 className="tm-heading-md">Snacks & Quick Bites</h3>
                  <p className="tm-body">
                   Complete the café experience with sandwiches, burgers, French fries and a selection of 16+ snacks.
                  </p>
                </div>
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--tm-teal-border)" }}>
                  <span className="tm-caption"><strong>Signature:</strong> 16+ Snacks · Sandwiches · Burgers</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =================================================================
            03 / FOUNDER'S VISION & PURPOSE
            ================================================================= */}
        <section className="tm-section" id="founder" aria-labelledby="founder-heading">
          <div className="tm-container">
            <div className="tm-hero-grid" style={{ alignItems: "center" }}>
              <div className="tm-hero-media" style={{ maxWidth: "460px", margin: "0 auto" }}>
                <img
                  src="/images/founder.webp"
                  alt="Founder & Leadership of TeaMax Café"
                  width={460}
                  height={540}
                  loading="lazy"
                />
                <div className="tm-hero-tag">
                  <strong>Visionary Leadership</strong>
                  <span>Founder & CEO · TeaMax Café</span>
                </div>
              </div>

              <div>
                <span className="tm-eyebrow">03 / The Purpose Behind The Cup</span>
                <h2 id="founder-heading" className="tm-heading-lg">
                 Built on experience.
<br />
                 Driven by a clear vision.
                </h2>
                <p className="tm-lead">
                 TeaMax is a venture of Ashoka Group, an Indian business group established in 1969. Our approach combines café experience with structured franchise support for entrepreneurs across India.

                </p>


                <div style={{ display: "flex", gap: "10px", marginTop: "26px", flexWrap: "wrap" }}>
                  <span className="tm-pill tm-pill-outline">NO ROYALTY</span>
                  <span className="tm-pill tm-pill-outline">FULL FRANCHISE SUPPORT</span>
                  <span className="tm-pill tm-pill-outline">POS & INVENTORY SYSTEM</span>
                  <span className="tm-pill tm-pill-outline">MENU CUSTOMIZATION</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            04 / INTERACTIVE MILESTONES & JOURNEY
            ================================================================= */}
        <section className="tm-section" style={{ backgroundColor: "var(--tm-cream-soft)" }} aria-labelledby="milestones-heading">
          <div className="tm-container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px auto" }}>
              <span className="tm-eyebrow">04 / Our Milestones</span>
              <h2 id="milestones-heading" className="tm-heading-lg">
                The journey so far.<br />
                <em>Step by step.</em>
              </h2>
              <p className="tm-lead">
                From a single recipe perfected through passion to hundreds of cozy cafes humming with laughter and aroma.
              </p>
            </div>

            <div className="tm-timeline">
              <div className="tm-timeline-item">
                <div className="tm-timeline-year">
                  <span>2020</span>
                  <span className="tm-timeline-dot"></span>
                </div>
                <h3 className="tm-heading-md" style={{ fontSize: "19px" }}>The First Cup</h3>
                <p className="tm-body" style={{ fontSize: "14px" }}>
                  The inaugural TeaMax Café opens its doors in India, introducing the pioneering 3-in-1 format
                  to instant customer acclaim and neighborhood loyalty.
                </p>
              </div>

              <div className="tm-timeline-item">
                <div className="tm-timeline-year">
                  <span>2022</span>
                  <span className="tm-timeline-dot"></span>
                </div>
                <h3 className="tm-heading-md" style={{ fontSize: "19px" }}>Crossing 50 Outlets</h3>
                <p className="tm-body" style={{ fontSize: "14px" }}>
                  Expanding across Telangana and Andhra Pradesh with standardized supply chains, centralized
                  tea blends, and dedicated franchise partner training.
                </p>
              </div>

              <div className="tm-timeline-item">
                <div className="tm-timeline-year">
                  <span>2024</span>
                  <span className="tm-timeline-dot"></span>
                </div>
                <h3 className="tm-heading-md" style={{ fontSize: "19px" }}>Going Pan-India</h3>
                <p className="tm-body" style={{ fontSize: "14px" }}>
                  Reaching key regional hubs in Karnataka (Bangalore), Tamil Nadu (Chennai), West Bengal (Kolkata),
                  and Odisha, serving over 100,000 satisfied patrons weekly.
                </p>
              </div>

              <div className="tm-timeline-item">
                <div className="tm-timeline-year">
                  <span>2026</span>
                  <span className="tm-timeline-dot"></span>
                </div>
                <h3 className="tm-heading-md" style={{ fontSize: "19px" }}>250+ Cafés Strong</h3>
                <p className="tm-body" style={{ fontSize: "14px" }}>
                  Now celebrated across 250+ vibrant locations, with expanded wellness herbal lines,
                  enhanced digital experience, and nationwide brand recognition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            05 / SIX CORE QUALITY PILLARS
            ================================================================= */}
        <section className="tm-section" aria-labelledby="principles-heading">
          <div className="tm-container">
            <div style={{ maxWidth: "640px" }}>
              <span className="tm-eyebrow">05 / The TeaMax Standard</span>
              <h2 id="principles-heading" className="tm-heading-lg">
                Six principles that guide<br />
                <em>every single brew.</em>
              </h2>
              <p className="tm-lead">
                Consistency is not an accident; it is the deliberate result of caring deeply about details.
              </p>
            </div>

            <div className="tm-principles-grid">
              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>01 / Purity</span>
                <h3>Whole Leaves & Fresh Milk</h3>
                <p className="tm-body">
                  No synthetic tea concentrates or powdered milk. We source estate-fresh tea leaves and combine
                  them with pure dairy and hand-crushed whole spices.
                </p>
              </div>

              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>02 / Health</span>
                <h3>Zero Added Water Juices</h3>
                <p className="tm-body">
                  Our juice center extracts pure nectar straight from ripe, hand-selected fruits without watering
                  down the nutritional integrity or authentic taste.
                </p>
              </div>

              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>03 / Hospitality</span>
                <h3>Quick, Friendly Service</h3>
                <p className="tm-body">
                  Whether you have two minutes between meetings or two hours to catch up with friends, our team
                  serves you promptly with genuine warmth.
                </p>
              </div>

              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>04 / Atmosphere</span>
                <h3>Contemporary Ambience</h3>
                <p className="tm-body">
                  Thoughtfully designed spaces with soothing cream tones, deep accents, comfortable seating,
                  and ambient lighting where everyone feels at home.
                </p>
              </div>

              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>05 / Value</span>
                <h3>Affordable Everyday Luxury</h3>
                <p className="tm-body">
                  Great taste and beautiful surroundings should be accessible every day, not just on special occasions.
                  Our pricing reflects honest value.
                </p>
              </div>

              <div className="tm-principle-card">
                <span className="tm-pill tm-pill-yellow" style={{ marginBottom: "14px" }}>06 / Partnership</span>
                <h3>360° Franchise Care</h3>
                <p className="tm-body">
                  We empower our outlet owners with comprehensive training, standardized operations, robust marketing,
                  and ongoing operational mentoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            06 / CERTIFICATIONS & CORPORATE TRUST
            ================================================================= */}
        <section className="tm-section tm-section-teal" aria-labelledby="certifications-heading">
          <div className="tm-container" style={{ textAlign: "center" }}>
            <span className="tm-eyebrow tm-eyebrow-light">06 / Quality & Governance</span>
            <h2 id="certifications-heading" className="tm-heading-lg" style={{ color: "#FFF8EE" }}>
              Certified excellence.<br />
              <em>Rooted in compliance.</em>
            </h2>
            <p className="tm-lead" style={{ maxWidth: "650px", margin: "0 auto 30px auto", color: "rgba(255,248,238,0.85)" }}>
              TeaMax is operated under structured corporate standards, adhering to national food safety,
              enterprise registration, and quality management protocols.
            </p>

            <div className="tm-cert-strip">
              <span className="tm-cert-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                ISO 9001:2015 Certified
              </span>

              <span className="tm-cert-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                GMP Certified Operations
              </span>

              <span className="tm-cert-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                  <path d="M12 2 2 7l10 5 10-5-10-5Z"></path>
                </svg>
                MSME Registered Enterprise
              </span>

              <span className="tm-cert-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
                FSSAI Food Safety Compliant
              </span>

              <span className="tm-cert-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                </svg>
                GST Registered Business
              </span>
            </div>
          </div>
        </section>

        {/* =================================================================
            07 / GEOGRAPHIC PRESENCE & STORE DIRECTORY NOTE
            ================================================================= */}
        <section className="tm-section" aria-labelledby="presence-heading">
          <div className="tm-container">
            <div className="tm-geo-strip">
              <div>
                <span className="tm-eyebrow">Local Footprint · Across India</span>
                <h3 id="presence-heading" className="tm-heading-md" style={{ margin: "4px 0 8px 0" }}>
                  Serving 250+ locations across 6 vibrant states.
                </h3>
                <p className="tm-body" style={{ margin: 0, maxWidth: "600px" }}>
                  Find a TeaMax Café in your neighborhood or highway stop. We are proudly brewing fresh daily in:
                </p>
                <div className="tm-city-badges">
                  <span className="tm-city-badge">Telangana (Hyderabad, Warangal)</span>
                  <span className="tm-city-badge">Andhra Pradesh (Vijayawada, Vizag, Guntur)</span>
                  <span className="tm-city-badge">Karnataka (Bangalore, Mysuru)</span>
                  <span className="tm-city-badge">Tamil Nadu (Chennai, Coimbatore)</span>
                  <span className="tm-city-badge">West Bengal (Kolkata)</span>
                  <span className="tm-city-badge">Odisha (Bhubaneswar, Cuttack)</span>
                </div>
              </div>

              <div>
                <Link href="/stores" className="tm-btn tm-btn-teal" style={{ whiteSpace: "nowrap" }}>
                  Find Nearest Café ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            08 / ANSWER ENGINE OPTIMIZATION (AEO) FAQs
            ================================================================= */}
        <section className="tm-section" style={{ backgroundColor: "var(--tm-cream-soft)" }} id="faqs" aria-labelledby="story-faq-heading">
          <div className="tm-container" style={{ maxWidth: "860px" }}>
            <span className="tm-eyebrow">Quick Answers</span>
            <h2 id="story-faq-heading" className="tm-heading-lg">
              Frequently asked questions.
            </h2>
            <p className="tm-lead">
              Clear, direct information about TeaMax Café, our heritage, products, and franchise philosophy.
            </p>

            <div className="tm-faq-list">
              {storyFaqs.map((faq, index) => (
                <details key={faq.q} className="tm-faq-item" open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            09 / CALL TO ACTION
            ================================================================= */}
        <section className="tm-section" style={{ textAlign: "center", paddingBottom: "120px" }}>
          <div className="tm-container" style={{ maxWidth: "640px" }}>
            <span className="tm-eyebrow">Experience TeaMax</span>
            <h2 className="tm-heading-lg">
              Every craving.<br />
              <em>One comforting café.</em>
            </h2>
            <p className="tm-lead">
              Come in for a warm chai, an icy cold-pressed juice, or a rich scoop of ice cream. We would love to share a cup with you.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
              <Link href="/menu" className="tm-btn tm-btn-yellow">
                View Full Menu →
              </Link>
              <Link href="/franchise#apply" className="tm-btn tm-btn-outline">
                Become a Franchisee
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <JsonLd data={pageSchema} />
      <FaqJsonLd questions={storyFaqs} />
    </>
  );
}
