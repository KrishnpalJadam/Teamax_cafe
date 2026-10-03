import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, JsonLd, FaqJsonLd } from "../components";
import { FranchiseForm } from "./franchise-form";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Franchise Opportunity | Start Your Own TeaMax Café",
  description:
    "Own a profitable TeaMax 3-in-1 tea café franchise in India. Low investment starting ₹3.5 Lakhs, 50-65% gross margins, 250+ successful outlets, full kitchen equipment, 2D design, and barista training included.",
  keywords: [
    "TeaMax franchise",
    "tea cafe franchise India",
    "low cost tea franchise",
    "best tea franchise under 5 lakhs",
    "3 in 1 cafe franchise",
    "chai franchise opportunity",
    "tea cafe franchise Andhra Pradesh",
    "tea franchise Telangana Hyderabad",
    "tea cafe franchise Bangalore Karnataka",
    "tea cafe franchise Kolkata West Bengal",
    "tea franchise Chennai Tamil Nadu",
  ],
  alternates: { canonical: "/franchise" },
  openGraph: {
    title: "Start Your Own TeaMax Café Franchise | 250+ Outlets in India",
    description:
      "Join India's premier 3-in-1 tea café franchise. Tea, fresh fruit juices, and artisanal ice creams under one roof. Turnkey setup from ₹3.5 Lakhs.",
    url: `${siteUrl}/franchise`,
    type: "website",
    images: [{ url: "/images/cafe-interior.jpg", width: 1080, height: 864, alt: "TeaMax Café Franchise Experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeaMax Café Franchise Opportunity",
    description: "Start a 3-in-1 tea café franchise with investment starting from ₹3.5 Lakhs.",
    images: ["/images/cafe-interior.jpg"],
  },
};

const franchiseFaqs = [
  {
    q: "How much total investment is required to open a TeaMax franchise?",
    a: "Total turnkey investment starts from ₹3.5 Lakhs to ₹5.5 Lakhs for the Express Kiosk model (100–250 sq.ft) and ₹7.5 Lakhs to ₹14 Lakhs for the full Café & Lounge model (400–1000+ sq.ft). This includes your franchise brand fee, commercial kitchen machines, 2D/3D architectural layout, LED glow signage, initial raw material stock, and barista training.",
  },
  {
    q: "What is the expected Return on Investment (ROI) and payback period?",
    a: "Due to high gross margins of 50% to 65% across hot teas, cold-pressed fruit juices, and artisanal ice cream thick shakes, most TeaMax franchise partners achieve complete capital payback within 6 to 12 months, depending on location footfall and local operational efficiency.",
  },
  {
    q: "Does TeaMax charge ongoing monthly royalties on store sales?",
    a: "TeaMax is committed to entrepreneur-first transparency. We operate on a zero hidden royalty model for our standard franchise tiers, allowing franchise owners to retain maximum operating profits within their unit.",
  },
  {
    q: "What support does TeaMax provide during the cafe launch?",
    a: "We provide comprehensive end-to-end support: commercial site evaluation, 2D/3D counter and interior layout schematics, complete kitchen machinery and smallwares supply, on-site barista and chef training, POS billing software setup, and promotional launch marketing creatives.",
  },
  {
    q: "What commercial space is required, and does TeaMax help find a location?",
    a: "We require a minimum carpet area of 100 to 250 sq.ft for an Express Kiosk, and 400 to 1,000+ sq.ft for a Dine-in Café Lounge. While franchise partners typically propose local commercial locations, our regional operations team conducts on-ground demographic, visibility, and footfall audits to validate the property before signing.",
  },
  {
    q: "How does the 3-in-1 café concept increase store profitability?",
    a: "Unlike single-concept tea stalls that rely solely on morning and evening tea rushes, TeaMax houses a Tea & Coffee Bar, a 0% added sugar Fresh Fruit Juice Center, and an Artisanal Ice Cream Parlour under one roof. This generates steady customer footfall from 8 AM to 11 PM and elevates the Average Order Value (AOV) significantly.",
  },
];

export default function FranchisePage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/franchise#page`,
        url: `${siteUrl}/franchise`,
        name: "Franchise Opportunity | TeaMax Café India",
        description: "Official franchise information, investment models, setup costs, and application form for TeaMax Café.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Franchise", item: `${siteUrl}/franchise` },
          ],
        },
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${siteUrl}/#organization`,
        name: "TeaMax Café",
        legalName: "TeaMax Café India",
        url: siteUrl,
        logo: `${siteUrl}/images/logo.webp`,
        image: `${siteUrl}/images/cafe-interior.jpg`,
        priceRange: "₹₹",
        servesCuisine: ["Chai", "Coffee", "Fresh Fruit Juices", "Ice Creams", "Snacks"],
        areaServed: [
          { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
          { "@type": "AdministrativeArea", name: "Telangana" },
          { "@type": "AdministrativeArea", name: "Karnataka" },
          { "@type": "AdministrativeArea", name: "Tamil Nadu" },
          { "@type": "AdministrativeArea", name: "West Bengal" },
          { "@type": "AdministrativeArea", name: "Odisha" },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/franchise#apply" />

      {/* =================================================================
          1. HERO SECTION (Matching Reference Image 2: tvanamm.com style)
          ================================================================= */}
      <section className="tm-franchise-hero" aria-labelledby="franchise-heading">
        <div className="tm-container">
          <div className="tm-hero-grid">
            <div>
              <span className="tm-eyebrow">Franchise Opportunity · India</span>
              <h1 id="story-hero-heading" className="tm-heading-xl ">
                Start your own<br />
             <em> TeaMax Café Franchise.</em>
              </h1>
              <p className="tm-franchise-hero-lead">
                Join India’s proven 3-in-1 hybrid café network with over 250+ thriving outlets across 6 states.
                Low capital investment starting from ₹3.5 Lakhs, high gross margins, and turnkey setup from day one.
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
              <div className="tm-hero-badge-overlay">
                <div>
                  <strong>TeaMax Café Franchise</strong>
                  <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "rgba(255, 248, 238, 0.7)" }}>
                    India · 250+ Outlets Nationwide
                  </p>
                </div>
                <span>Est. 2020</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="tm-stats-ribbon" style={{ borderTopColor: "rgba(255, 248, 238, 0.15)" }}>
            <div className="tm-stat-item">
              <strong style={{ color: "var(--tm-cream)" }}>250+</strong>
              <span style={{ color: "rgba(255, 248, 238, 0.65)" }}>Outlets Across India</span>
            </div>
            <div className="tm-stat-item">
              <strong style={{ color: "var(--tm-cream)" }}>₹3.5L</strong>
              <span style={{ color: "rgba(255, 248, 238, 0.65)" }}>Starting Investment</span>
            </div>
            <div className="tm-stat-item">
              <strong style={{ color: "var(--tm-cream)" }}>50–65%</strong>
              <span style={{ color: "rgba(255, 248, 238, 0.65)" }}>Gross Profit Margins</span>
            </div>
            <div className="tm-stat-item">
              <strong style={{ color: "var(--tm-cream)" }}>6–12 Mo</strong>
              <span style={{ color: "rgba(255, 248, 238, 0.65)" }}>Expected Payback</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. EDITORIAL INTRO STATEMENT
          ================================================================= */}
      <section className="tm-section" style={{ backgroundColor: "var(--tm-cream)" }}>
        <div className="tm-container">
          <div style={{ maxWidth: "820px" }}>
            <span className="tm-eyebrow">01 / The Business Foundation</span>
            <h2 className="tm-heading-lg">
              A familiar daily ritual.<br />
              <em>A structured, high-volume enterprise.</em>
            </h2>
            <p className="tm-lead">
              TeaMax brings India’s deep love for chai together with cold-pressed natural fruit juices and artisanal
              ice cream sundaes. By uniting three profitable categories under a single roof, we help franchise partners
              build resilient, high-volume businesses that generate footfalls from morning to night.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="tm-principles-grid">
            <div className="tm-principle-card">
              <div className="tm-feature-num">01</div>
              <h3>3-in-1 Diversified Revenue</h3>
              <p className="tm-body">
                Hot teas &amp; coffees for morning commutes, cold 0% added sugar fruit juices for afternoon refreshers,
                and thick shakes and artisanal ice creams for evening family crowds.
              </p>
            </div>

            <div className="tm-principle-card">
              <div className="tm-feature-num">02</div>
              <h3>Accessible Capital Entry</h3>
              <p className="tm-body">
                Turnkey packages starting from just ₹3.5 Lakhs. No prohibitive upfront barriers, no inflated equipment
                markups, and zero hidden royalties on monthly store sales.
              </p>
            </div>

            <div className="tm-principle-card">
              <div className="tm-feature-num">03</div>
              <h3>Turnkey Setup &amp; Architecture</h3>
              <p className="tm-body">
                Complete counter ergonomics, 2D/3D architectural store plans, glow-signage branding, and machinery
                procurement managed directly by our technical project managers.
              </p>
            </div>

            <div className="tm-principle-card">
              <div className="tm-feature-num">04</div>
              <h3>Barista &amp; Recipe Standardization</h3>
              <p className="tm-body">
                Comprehensive training programs covering standardized brewing techniques, hygienic handling, customer
                hospitality, and waste management for all store personnel.
              </p>
            </div>

            <div className="tm-principle-card">
              <div className="tm-feature-num">05</div>
              <h3>Centralized Supply Chain</h3>
              <p className="tm-body">
                Consistent access to proprietary Assam CTC tea blends, signature spice formulations, branded packaging,
                and syrup bases delivered directly to your store doorstep.
              </p>
            </div>

            <div className="tm-principle-card">
              <div className="tm-feature-num">06</div>
              <h3>ISO, MSME &amp; FSSAI Certified</h3>
              <p className="tm-body">
                TeaMax operates with institutional governance — ISO 9001:2015 certified processes, MSME registration,
                and complete food safety protocol compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. FRANCHISE MODELS COMPARISON (Side-by-Side matching Image 2)
          ================================================================= */}
      <section id="models" className="tm-section" style={{ backgroundColor: "var(--tm-cream-soft)", borderTop: "1px solid var(--tm-teal-border)", borderBottom: "1px solid var(--tm-teal-border)" }}>
        <div className="tm-container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px auto" }}>
            <span className="tm-eyebrow">02 / Tailored Formats</span>
            <h2 className="tm-heading-lg" style={{ margin: "0 0 12px 0" }}>
              Franchise models designed for <em>your market.</em>
            </h2>
            <p className="tm-body" style={{ margin: 0 }}>
              Whether you possess a compact transit kiosk or an expansive high-street dine-in space, TeaMax offers a model tailored to your commercial real estate.
            </p>
          </div>

          <div className="tm-models-grid">
            {/* Model 1: Express Kiosk */}
            <div className="tm-model-card">
              <div>
                <span className="tm-model-tag">Express / Kiosk Format</span>
                <h3 className="tm-heading-md" style={{ margin: "0 0 4px 0" }}>
                  Express Kiosk
                </h3>
                <p className="tm-body" style={{ fontSize: "14px", margin: 0 }}>
                  Optimized for fast-paced grab-and-go convenience in high pedestrian transit zones.
                </p>

                <div className="tm-model-price">
                  ₹3.5L – ₹5.5L
                </div>
                <span style={{ fontSize: "12px", color: "var(--tm-teal-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Turnkey Total Capex
                </span>

                <div className="tm-model-specs">
                  <div className="tm-spec-box">
                    <strong>100 – 250 sq.ft</strong>
                    <span>Carpet Area</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>2 – 3 Baristas</strong>
                    <span>Staff Required</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>6 – 9 Months</strong>
                    <span>Expected Payback</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>55% – 65%</strong>
                    <span>Gross Margins</span>
                  </div>
                </div>

                <ul className="tm-check-list">
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Full Hot &amp; Cold Beverage Machinery Kit
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    2D Counter Fabrication Layout &amp; LED Signage
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Cloud POS Billing Machine &amp; Training
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Initial Raw Materials &amp; Tea Blends Stock
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Ideal for: Transit hubs, colleges, IT parks &amp; markets
                  </li>
                </ul>
              </div>

              <a href="#apply" className="tm-btn tm-btn-teal" style={{ width: "100%" }}>
                Apply for Express Model
              </a>
            </div>

            {/* Model 2: Café & Lounge (Featured Dark Teal Card matching Image 2) */}
            <div className="tm-model-card tm-model-card-dark">
              <div>
                <span className="tm-model-tag">Featured · Flagship Format</span>
                <h3 className="tm-heading-md" style={{ margin: "0 0 4px 0" }}>
                  Café &amp; Lounge
                </h3>
                <p className="tm-model-lead" style={{ fontSize: "14px", margin: 0 }}>
                  A full-fledged destination café with indoor seating, warm lighting, and expanded food &amp; dessert menus.
                </p>

                <div className="tm-model-price">
                  ₹7.5L – ₹14L
                </div>
                <span style={{ fontSize: "12px", color: "rgba(255, 248, 238, 0.65)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Turnkey Total Capex
                </span>

                <div className="tm-model-specs">
                  <div className="tm-spec-box">
                    <strong>400 – 1000+ sq.ft</strong>
                    <span>Carpet Area</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>4 – 6 Staff</strong>
                    <span>Staff Required</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>9 – 12 Months</strong>
                    <span>Expected Payback</span>
                  </div>
                  <div className="tm-spec-box">
                    <strong>50% – 60%</strong>
                    <span>Gross Margins</span>
                  </div>
                </div>

                <ul className="tm-check-list">
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Full 3-in-1 Tea, Juice, &amp; Ice Cream Parlour Setup
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    3D Interior Architectural Plans &amp; Furniture Guidelines
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Expanded Kitchen Line: Fresh snacks, waffles &amp; sundaes
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Comprehensive On-Site Staff Barista Boot Camp
                  </li>
                  <li className="tm-check-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Ideal for: High streets, family dining zones &amp; malls
                  </li>
                </ul>
              </div>

              <a href="#apply" className="tm-btn tm-btn-yellow" style={{ width: "100%" }}>
                Apply for Café Lounge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. INVESTMENT TRANSPARENCY TABLE
          ================================================================= */}
      <section className="tm-section" style={{ backgroundColor: "var(--tm-cream)" }}>
        <div className="tm-container">
          <div style={{ maxWidth: "800px" }}>
            <span className="tm-eyebrow">03 / Financial Transparency</span>
            <h2 className="tm-heading-lg">
              Where your investment goes. <em>No hidden surprises.</em>
            </h2>
            <p className="tm-lead">
              We believe in upfront, transparent business relationships. Here is a clear breakdown of how the initial
              franchise budget is allocated toward tangible equipment and revenue-generating assets.
            </p>
          </div>

          <div className="tm-inv-table-wrap">
            <table className="tm-inv-table">
              <thead>
                <tr>
                  <th>Component / Deliverable</th>
                  <th>What is Included</th>
                  <th>Express Model</th>
                  <th>Lounge Model</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Franchise Brand Rights</strong></td>
                  <td>Proprietary brand usage, trade secrets, billing software, and operating manuals</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td><strong>Kitchen Machinery Kit</strong></td>
                  <td>Commercial tea brewers, induction cooktops, heavy-duty blenders, chillers &amp; freezers</td>
                  <td>Complete Kit</td>
                  <td>Expanded Heavy Duty Kit</td>
                </tr>
                <tr>
                  <td><strong>Branding &amp; Signage</strong></td>
                  <td>Main 3D LED glow board, backlit menu displays, uniform aprons &amp; brand collateral</td>
                  <td>Included</td>
                  <td>Included (Interior + Exterior)</td>
                </tr>
                <tr>
                  <td><strong>2D/3D Architecture</strong></td>
                  <td>Ergonomic counter drawings, plumbing &amp; electrical schematics for local contractors</td>
                  <td>2D Counter Plan</td>
                  <td>Complete 2D &amp; 3D Renderings</td>
                </tr>
                <tr>
                  <td><strong>Barista &amp; Staff Training</strong></td>
                  <td>Hands-on training covering all 130+ recipes, customer service, and hygiene protocols</td>
                  <td>Included</td>
                  <td>Extended On-Site Training</td>
                </tr>
                <tr>
                  <td><strong>Initial Raw Material Stock</strong></td>
                  <td>Assam CTC tea blends, signature spices, branded cups, straws, and packaging kits</td>
                  <td>Starter Stock</td>
                  <td>Comprehensive Stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. FRANCHISE INQUIRY APPLICATION FORM (Matching Image 2)
          ================================================================= */}
      <section className="tm-form-section" id="apply">
        <div className="tm-container">
          <div className="tm-form-layout">
            <div>
              <span className="tm-eyebrow">Direct Application</span>
              <h2 className="tm-heading-xl" style={{ color: "var(--tm-cream)" }}>
                Take the first step toward<br />
                <em>ownership.</em>
              </h2>
              <p className="tm-lead" style={{ color: "rgba(255, 248, 238, 0.85)" }}>
                Speak directly with our regional franchise development team. We will analyze your target city, discuss
                commercial unit economics, and provide your personalized business plan.
              </p>

              <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(255, 237, 130, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--tm-yellow)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255, 248, 238, 0.6)" }}>
                      Franchise Hotline
                    </span>
                    <strong style={{ display: "block", fontSize: "16px", color: "var(--tm-cream)", marginTop: "2px" }}>
                      +91 9505 047 047
                    </strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(255, 237, 130, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--tm-yellow)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255, 248, 238, 0.6)" }}>
                      Direct Email
                    </span>
                    <strong style={{ display: "block", fontSize: "16px", color: "var(--tm-cream)", marginTop: "2px" }}>
                      hello@teamaxcafe.in
                    </strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(255, 237, 130, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--tm-yellow)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255, 248, 238, 0.6)" }}>
                      TeaMax Cafe India Regd. Office :
                    </span>
                    <strong style={{ display: "block", fontSize: "15px", color: "var(--tm-cream)", marginTop: "2px" }}>
                      4th Floor, Surabhi Rama Complex, Plot 106, Suchitra Rd,  &amp; Kompally, Hyderabad, TS -67 india
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Component */}
            <FranchiseForm />
          </div>
        </div>
      </section>



      {/* =================================================================
          6. ROADMAP: 6 STEPS TO LAUNCH (Matching Image 2)
          ================================================================= */}
      <section className="tm-section" style={{ backgroundColor: "var(--tm-cream)" }}>
        <div className="tm-container">
          <div style={{ maxWidth: "700px" }}>
            <span className="tm-eyebrow">04 / Clear Timeline</span>
            <h2 className="tm-heading-lg">
              Six simple steps to <em>opening day.</em>
            </h2>
            <p className="tm-body">
              From your initial application to brewing your very first cup of Kadak Chai, our specialized onboarding
              team guides every single stage. Most outlets launch within 30 to 45 days.
            </p>
          </div>

          <div className="tm-steps-grid">
            <div className="tm-step-card">
              <div className="tm-step-num">01</div>
              <h3>Inquiry &amp; Discovery</h3>
              <p>Submit your inquiry form. Our franchise managers share the detailed financial deck, unit economics, and initial territory assessment.</p>
            </div>

            <div className="tm-step-card">
              <div className="tm-step-num">02</div>
              <h3>Site Audit &amp; Feasibility</h3>
              <p>Our team assists in evaluating your proposed commercial location, conducting footfall counts, road visibility checks, and lease review.</p>
            </div>

            <div className="tm-step-card">
              <div className="tm-step-num">03</div>
              <h3>Franchise Agreement</h3>
              <p>Execution of transparent franchise documentation with zero hidden royalty clauses, formally securing your exclusive territory.</p>
            </div>

            <div className="tm-step-card">
              <div className="tm-step-num">04</div>
              <h3>Fabrication &amp; Setup</h3>
              <p>Our architecture team delivers 2D/3D kitchen counter layouts, while commercial machines and branded signage are dispatched to your site.</p>
            </div>

            <div className="tm-step-card">
              <div className="tm-step-num">05</div>
              <h3>Barista Training</h3>
              <p>Comprehensive hands-on training for your baristas and staff on standardized brewing, fresh juicing, POS software, and customer care.</p>
            </div>

            <div className="tm-step-card">
              <div className="tm-step-num">06</div>
              <h3>Grand Opening &amp; Marketing</h3>
              <p>Launch day support, initial marketing creatives, social media announcements, and ongoing operational audits from regional managers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          7. GEOGRAPHIC FOOTPRINT & CITY COVERAGE (GEO Targeting)
          ================================================================= */}
      <section className="tm-section" style={{ backgroundColor: "var(--tm-cream-soft)", borderTop: "1px solid var(--tm-teal-border)" }}>
        <div className="tm-container">
          <div style={{ maxWidth: "750px" }}>
            <span className="tm-eyebrow">05 / Nationwide Presence</span>
            <h2 className="tm-heading-lg">
              Expanding across India. <em>Find TeaMax near you.</em>
            </h2>
            <p className="tm-body">
              With 250+ outlets across 6 states, TeaMax has proven product-market fit in both bustling tier-1 metros
              and high-aspiration tier-2 and tier-3 towns. Territory slots are currently open for new partners.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginTop: "36px" }}>
            <div style={{ background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px", padding: "24px" }}>
              <strong style={{ display: "block", fontSize: "16px", fontFamily: "var(--tm-font-serif)", color: "var(--tm-teal)", marginBottom: "8px" }}>
                Andhra Pradesh (Core Region)
              </strong>
              <div className="tm-city-badges">
                <span className="tm-city-badge">Vijayawada</span>
                <span className="tm-city-badge">Guntur</span>
                <span className="tm-city-badge">Visakhapatnam</span>
                <span className="tm-city-badge">Tirupati</span>
                <span className="tm-city-badge">Kakinada</span>
                <span className="tm-city-badge">Nellore</span>
                <span className="tm-city-badge">Kurnool</span>
                <span className="tm-city-badge">Rajahmundry</span>
              </div>
            </div>

            <div style={{ background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px", padding: "24px" }}>
              <strong style={{ display: "block", fontSize: "16px", fontFamily: "var(--tm-font-serif)", color: "var(--tm-teal)", marginBottom: "8px" }}>
                Telangana (Core Region)
              </strong>
              <div className="tm-city-badges">
                <span className="tm-city-badge">Hyderabad</span>
                <span className="tm-city-badge">Warangal</span>
                <span className="tm-city-badge">Nizamabad</span>
                <span className="tm-city-badge">Karimnagar</span>
                <span className="tm-city-badge">Khammam</span>
                <span className="tm-city-badge">Secunderabad</span>
              </div>
            </div>

            <div style={{ background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px", padding: "24px" }}>
              <strong style={{ display: "block", fontSize: "16px", fontFamily: "var(--tm-font-serif)", color: "var(--tm-teal)", marginBottom: "8px" }}>
                Karnataka &amp; Tamil Nadu
              </strong>
              <div className="tm-city-badges">
                <span className="tm-city-badge">Bengaluru</span>
                <span className="tm-city-badge">Mysuru</span>
                <span className="tm-city-badge">Hubli</span>
                <span className="tm-city-badge">Chennai</span>
                <span className="tm-city-badge">Coimbatore</span>
                <span className="tm-city-badge">Madurai</span>
                <span className="tm-city-badge">Salem</span>
              </div>
            </div>

            <div style={{ background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px", padding: "24px" }}>
              <strong style={{ display: "block", fontSize: "16px", fontFamily: "var(--tm-font-serif)", color: "var(--tm-teal)", marginBottom: "8px" }}>
                Eastern India &amp; Expansion
              </strong>
              <div className="tm-city-badges">
                <span className="tm-city-badge">Kolkata</span>
                <span className="tm-city-badge">Howrah</span>
                <span className="tm-city-badge">Siliguri</span>
                <span className="tm-city-badge">Bhubaneswar</span>
                <span className="tm-city-badge">Cuttack</span>
                <span className="tm-city-badge">Rourkela</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          8. FREQUENTLY ASKED QUESTIONS (Matching Image 2 + AEO Schema)
          ================================================================= */}
      <section className="tm-section" style={{ backgroundColor: "var(--tm-cream)" }}>
        <div className="tm-container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="tm-eyebrow">06 / Questions &amp; Answers</span>
            <h2 className="tm-heading-lg" style={{ margin: "0 0 10px 0" }}>
              Frequently asked <em>questions.</em>
            </h2>
            <p className="tm-body" style={{ margin: 0 }}>
              Clear answers to the most common questions prospective franchise owners ask about TeaMax.
            </p>
          </div>

          <div className="tm-faq-list">
            {franchiseFaqs.map((faq, idx) => (
              <details key={idx} className="tm-faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>

          {/* Quick Bottom CTA */}
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              padding: "36px 24px",
              borderRadius: "20px",
              background: "var(--tm-cream-soft)",
              border: "1px solid var(--tm-teal-border)",
            }}
          >
            <h3 style={{ fontFamily: "var(--tm-font-serif)", fontSize: "20px", color: "var(--tm-teal)", margin: "0 0 8px 0" }}>
              Have a specific question about your city?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--tm-teal-muted)", margin: "0 0 18px 0" }}>
              Our franchise managers are available on call and WhatsApp for instant consultation.
            </p>
            <a href="#apply" className="tm-btn tm-btn-teal tm-btn-sm">
              Speak with Franchise Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <JsonLd data={pageSchema} />
      <FaqJsonLd questions={franchiseFaqs} />
    </div>
  );
}
