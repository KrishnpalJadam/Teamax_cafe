import type { Metadata } from "next";
import Home from "../content/home";
import { Footer, Header, JsonLd, FaqJsonLd } from "./components";
import FranchisePopup from "./components/FranchisePopup";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "TeaMax Café | Café Franchise in India | Tea, Coffee & More",
  description:
    "Explore TeaMax Café for tea, coffee, fresh juices, shakes, ice creams and café favourites. Discover the TeaMax café franchise opportunity, menu and support across India.",
  keywords: [
    "TeaMax Café",
    "TeaMax cafe franchise",
    "cafe franchise India",
    "tea cafe franchise India",
    "tea cafe business",
    "chai cafe franchise",
    "coffee cafe India",
    "TeaMax menu",
    "cafe franchise opportunity",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "TeaMax Café",
    title: "TeaMax Café | A Café Business Made Simple",
    description:
      "Tea, coffee, fresh juices, shakes, ice creams and a structured café franchise model from TeaMax.",
    url: siteUrl,
    images: [
      {
        url: "https://cafe-blueprint-magic.lovable.app/assets/hero-cafe-zlWPzgb-.jpg",
        width: 1536,
        height: 1024,
        alt: "Tea, burger and fries at TeaMax",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeaMax Café | Café Franchise in India",
    description: "Explore the TeaMax menu and café franchise opportunity.",
    images: ["/images/cafe-interior.jpg"],
  },
};

const faqs = [
  {
    q: "What is TeaMax Café?",
    a: "TeaMax is an Indian café brand built around tea, coffee, beverages, desserts and café favourites, with a franchise-led growth model.",
  },
  {
    q: "How can I apply for a TeaMax franchise?",
    a: "You can submit a franchise enquiry through the TeaMax franchise page. The team can then discuss location, investment and setup requirements.",
  },
  {
    q: "What does TeaMax support include?",
    a: "TeaMax presents a structured support model covering setup guidance, operating processes, staff training, technology and marketing support.",
  },
  {
    q: "Where can I find the TeaMax menu?",
    a: "The complete menu is available on the TeaMax Menu page, covering tea, coffee, shakes, juices, ice creams and other café favourites.",
  },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "TeaMax Café",
        url: siteUrl,
        logo: `${siteUrl}/images/logo4.png`,
        image: `${siteUrl}/images/cafe-interior.jpg`,
        description:
          "Indian café brand serving tea, coffee, fresh juices, shakes, ice creams and café favourites, with franchise opportunities.",
        sameAs: [
          "https://www.instagram.com/teamaxcafe",
          "https://www.facebook.com/TeaMaxCafe/",
          "https://www.youtube.com/@teamaxcafeindia",
          "https://www.linkedin.com/company/ashoka-group-since-1969/",
        ],
        knowsAbout: [
          "Tea",
          "Coffee",
          "Café business",
          "Café franchise",
          "Fresh juices",
          "Milkshakes",
          "Ice cream",
        ],
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${siteUrl}/#cafe`,
        name: "TeaMax Café",
        url: siteUrl,
        image: `${siteUrl}/images/cafe-interior.jpg`,
        logo: `${siteUrl}/images/logo4.png`,
        description:
          "TeaMax Café serves tea, coffee, fresh juices, shakes, ice creams and café favourites across India.",
        servesCuisine: ["Indian", "Cafe", "Tea", "Coffee"],
        priceRange: "₹₹",
        areaServed: { "@type": "Country", name: "India" },
        telephone: "+91-9505047047",
        email: "hello@teamaxcafe.in",
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "TeaMax Café",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "TeaMax Café | Café Franchise in India",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        primaryImageOfPage: "https://cafe-blueprint-magic.lovable.app/assets/hero-cafe-zlWPzgb-.jpg",
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
      },
    ],
  };

  return (
    <>
      <Header active="/" />
      <main id="top" className="page-shell">
        <Home />
      </main>
      <Footer />
        <FranchisePopup />
      <JsonLd data={schema} />
      <FaqJsonLd questions={faqs} />
    </>
  );
}
