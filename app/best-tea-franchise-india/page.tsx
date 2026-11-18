import type { Metadata } from "next";
import { Footer } from "../components";
import BestFranchise from "../Express/bestFranchise";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Best Tea Franchise in India | Zero Royalty | TeaMax Cafe Express",
  description:
    "Start your own TeaMax Cafe Express franchise in India with zero royalty, chef-less operations and complete franchise support. 1,309+ partner signups across 27+ states. Turnkey setup in 25-30 days.",
  keywords: [
    "best tea franchise in india",
    "tea franchise india",
    "tea cafe franchise",
    "TeaMax express franchise",
    "low cost tea franchise",
    "zero royalty franchise",
    "tea franchise under 5 lakhs",
  ],
  alternates: {
    canonical: `${siteUrl}/best-tea-franchise-india`,
  },
  openGraph: {
    title: "Best Tea Franchise in India | Zero Royalty | TeaMax Cafe Express",
    description:
      "Start your own TeaMax Cafe Express franchise in India with zero royalty, chef-less operations and complete franchise support. 1,309+ partner signups across 27+ states. Turnkey setup in 25-30 days.",
    url: `${siteUrl}/best-tea-franchise-india`,
    type: "website",
    images: [
      {
        url: "/images/franchise-hero-combo.jpg",
        width: 1200,
        height: 630,
        alt: "Best Tea Franchise in India - TeaMax Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Tea Franchise in India | TeaMax Cafe Express",
    description: "Zero Royalty. Chef-less Operations. Complete Franchise Support.",
    images: ["/images/franchise-hero-combo.jpg"],
  },
};

export default function BestTeaFranchiseIndiaPage() {
  return (
    <main>
      <BestFranchise />
      <Footer />
    </main>
  );
}

