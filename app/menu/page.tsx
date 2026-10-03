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
  title: "Our Menu | TeaMax Café",
  description:
    "Explore TeaMax Café's menu of masala chai, coffee, burgers, sandwiches, snacks and thickshakes.",
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
    title: "Our Menu | TeaMax Café",
    description:
      "Fresh flavours for every mood. Explore chai, coffee, burgers, snacks and thickshakes at TeaMax Café.",
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
    image: "/images/chai.webp",
    icon: "coffee",
  },
  {
    id: "coffee",
    name: "Coffee",
    description: "Freshly brewed coffees.",
    count: 4,
    image: "/images/coffee.webp",
    icon: "coffee",
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Fresh and loaded burgers.",
    count: 3,
    image: "/images/hero-cafe.jpg",
    icon: "burger",
  },
  {
    id: "snacks",
    name: "Snacks",
    description: "Crispy cafe favourites.",
    count: 4,
    image: "/images/cafe-interior.jpg",
    icon: "snacks",
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    description: "Fresh grilled sandwiches.",
    count: 3,
    image: "/images/cafe-interior.jpg",
    icon: "sandwich",
  },
  {
    id: "thickshakes",
    name: "Thickshakes",
    description: "Rich creamy shakes.",
    count: 4,
    image: "/images/milkshake.webp",
    icon: "shake",
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
    image: "/images/chai.webp",
  },

  {
    id: "classic-coffee",
    name: "Classic Coffee",
    description:
      "Freshly brewed classic hot coffee.",
    category: "Coffee",
    categoryId: "coffee",
    isVeg: true,
    price: 49,
    image: "/images/coffee.webp",
  },

  {
    id: "cheese-burger",
    name: "Cheese Burger",
    description:
      "Loaded with cheese and fresh toppings.",
    category: "Burgers",
    categoryId: "burgers",
    isVeg: true,
    price: 149,
    image: "/images/coffee.webp",
  },

  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    description:
      "Spicy and flavourful peri peri fries.",
    category: "Snacks",
    categoryId: "snacks",
    isVeg: true,
    price: 59,
    image: "/images/cafe-interior.jpg",
  },

  {
    id: "cold-coffee",
    name: "Cold Coffee",
    description:
      "Chilled coffee with a smooth taste.",
    category: "Coffee",
    categoryId: "coffee",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
  },

  {
    id: "paneer-burger",
    name: "Paneer Burger",
    description:
      "Grilled paneer with lettuce and mayo.",
    category: "Burgers",
    categoryId: "burgers",
    isVeg: true,
    price: 129,
    image: "/images/coffee.webp",
  },

  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    description:
      "Grilled sandwich with fresh vegetables.",
    category: "Sandwiches",
    categoryId: "sandwiches",
    isVeg: true,
    price: 89,
    image: "/images/cafe-interior.jpg",
  },

  {
    id: "chocolate-shake",
    name: "Chocolate Shake",
    description:
      "Rich chocolate with ice cream.",
    category: "Thickshakes",
    categoryId: "thickshakes",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
  },

  {
    id: "strawberry-shake",
    name: "Strawberry Shake",
    description:
      "Fresh strawberries with creamy goodness.",
    category: "Thickshakes",
    categoryId: "thickshakes",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
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
                src="https://mockup-magic-menu.lovable.app/assets/hero-cup-DbXtK8h5.jpg"
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