import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import {
  MenuClient,
  type MenuCategory,
  type MenuItem,
} from "./menu-client";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "TeaMax Cafe Menu | Chai, Coffee, Burgers & Shakes",
  description:
    "Explore the TeaMax Cafe menu, from aromatic chai and refreshing coffee to burgers, sandwiches, fries and creamy shakes. Find your next favourite.",
  keywords: [
    "TeaMax menu",
    "TeaMax cafe menu",
    "TeaMax price",
    "TeaMax tea",
    "TeaMax coffee",
    "TeaMax burgers",
    "TeaMax snacks",
    "TeaMax thickshakes",
  ],
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "TeaMax Cafe Menu | Chai, Coffee, Burgers & Shakes",
    description:
      "Explore the TeaMax Cafe menu, from aromatic chai and refreshing coffee to burgers, sandwiches, fries and creamy shakes. Find your next favourite.",
    url: `${siteUrl}/menu`,
    type: "website",
    images: [
      {
        url: "/images/hero-cup.webp",
        width: 1200,
        height: 656,
        alt: "TeaMax style takeaway cup with fresh tea leaves",
      },
    ],
  },
};


/* =========================================================
   MOCKUP CATEGORIES
========================================================= */

const menuCategories: MenuCategory[] = [
  {
    id: "tea",
    name: "Tea",
    description: "Freshly brewed TeaMax tea.",
    count: 4,
    image: "/images/dummy",
    icon: "coffee",
  },

];


/*
  Keep your existing detailed menuItems array here.

  IMPORTANT:
  Your existing MenuItem objects already contain:
  name
  description
  category
  categoryId
  isVeg
  isPopular
  badge

  For the new visual design, add these two fields:

  price
  image

  Example:

  {
    id: "masala-chai",
    name: "Masala Chai",
    description:
      "Our signature masala chai with rich Indian spices.",
    category: "Tea",
    categoryId: "tea",
    isVeg: true,
    isPopular: true,
    badge: "Popular",
    price: 20,
    image: "/images/chai.webp",
  }
*/


const menuItems: MenuItem[] = [
  {
    id: "masala-chai",
    name: "Masala Chai",
    description:
      "Our signature masala chai with rich Indian spices.",
    category: "Tea",
    categoryId: "tea",
    isVeg: true,
    isPopular: true,
    badge: "Popular",
    price: 20,
    image: "/images/dummy.jpg",
  },

];


/* =========================================================
   SCHEMA
========================================================= */

const menuSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Menu",
      "@id": `${siteUrl}/menu#menu`,
      name: "TeaMax Café Menu",
      url: `${siteUrl}/menu`,
      description:
        "TeaMax Café menu featuring tea, coffee, burgers, snacks, sandwiches and thickshakes.",
      hasMenuSection: menuCategories.map(
        (category) => ({
          "@type": "MenuSection",
          name: category.name,
          hasMenuItem: menuItems
            .filter(
              (item) =>
                item.categoryId === category.id
            )
            .map((item) => ({
              "@type": "MenuItem",
              name: item.name,
              description: item.description,
              offers:
                typeof item.price === "number"
                  ? {
                    "@type": "Offer",
                    price: item.price,
                    priceCurrency: "INR",
                  }
                  : undefined,
            })),
        })
      ),
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
          name: "Menu",
          item: `${siteUrl}/menu`,
        },
      ],
    },
  ],
};


/* =========================================================
   PAGE
========================================================= */

export default function MenuPage() {
  return (
    <>
      <Header active="/menu" />

      <main className="tx-menu-page">

        {/* COMPACT HERO */}
        <section
          className="tx-menu-hero"
          aria-labelledby="tx-menu-page-title"
        >
          <div className="tx-menu-hero-inner">

            <div className="tx-menu-hero-copy">

              <div className="tx-menu-breadcrumb">
                <a href="/">Home</a>
                <span>›</span>
                <span>Menu</span>
              </div>

              <h1 id="tx-menu-page-title">
                Our Menu
              </h1>

              <p>
                Fresh flavours for every mood
              </p>

              <span className="tx-menu-yellow-rule" />

            </div>

            <div className="tx-menu-hero-art">
              <img
                src="/images/Teamax-Café-Coffee-Banner.webp"
                alt="TeaMax style takeaway cup with fresh tea leaves"
                width={1200}
                height={656}
              // priority
              />

              <div
                className="tx-menu-hero-scribble"
                aria-hidden="true"
              >
                Chai
                <br />
                People
                <br />
                Good
                <br />
                Stories
                <span>♥</span>
              </div>
            </div>

          </div>
        </section>

        <MenuClient
          categories={menuCategories}
          items={menuItems}
        />

      </main>

      <Footer />

      <JsonLd data={menuSchema} />
    </>
  );
}