import type { Metadata } from "next";
import { Footer } from "../components";
import { FranchiseClient } from "../franchise/FranchiseClient";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Cafe Franchise in India | Zero Royalty | TeaMax Cafe",
  description:
    "Start your cafe journey with TeaMax's zero-royalty franchise model. Explore investment details, equipment, training, setup guidance and ongoing support.",
  keywords: [
    "TeaMax franchise",
    "tea cafe franchise India",
    "cafe franchise India",
    "low cost tea franchise",
    "best tea franchise under 5 lakhs",
    "chai cafe franchise",
    "zero royalty franchise",
    "TeaMax cafe franchise cost",
    "food and beverage franchise India",
  ],
  alternates: {
    canonical: `${siteUrl}/cafe-franchise-india`,
  },
  openGraph: {
    title: "Cafe Franchise in India | Zero Royalty | TeaMax Cafe",
    description:
      "Start your cafe journey with TeaMax's zero-royalty franchise model. Explore investment details, equipment, training, setup guidance and ongoing support.",
    url: `${siteUrl}/cafe-franchise-india`,
    type: "website",
    images: [
      {
        url: "/images/franchise-hero-combo.jpg",
        width: 1200,
        height: 630,
        alt: "TeaMax Café Franchise Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe Franchise in India | Zero Royalty | TeaMax Cafe",
    description:
      "Start your cafe journey with TeaMax's zero-royalty franchise model. Explore investment details, equipment, training, setup guidance and ongoing support.",
    images: ["/images/franchise-hero-combo.jpg"],
  },
};

export default function CafeFranchiseIndiaPage() {
  return (
    <main>
      <FranchiseClient />
      <Footer />
    </main>
  );
}

