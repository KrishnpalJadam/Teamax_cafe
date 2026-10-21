import type { Metadata } from "next";
import { Footer } from "../components";
import { FranchiseClient } from "./FranchiseClient";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Start Your Own TeaMax Café Franchise at ₹3.69 Lakh* | Zero Royalty",
  description:
    "Start your own TeaMax Café Franchise with zero royalty, chef-less operations and complete franchise support. 1,200+ partner signups across 27+ states. Turnkey setup in 25-30 days.",
  keywords: [
    "TeaMax franchise",
    "tea cafe franchise India",
    "low cost tea franchise",
    "best tea franchise under 5 lakhs",
    "chai cafe franchise",
    "zero royalty franchise",
    "TeaMax cafe franchise cost",
    "food and beverage franchise India",
  ],
  alternates: {
    canonical: `${siteUrl}/franchise`,
  },
  openGraph: {
    title: "Start Your Own TeaMax Café Franchise at ₹3.69 Lakh* | Zero Royalty",
    description:
      "Join India's fastest growing café network. Zero royalty, chef-less model, complete equipment and training support.",
    url: `${siteUrl}/franchise`,
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
    title: "TeaMax Café Franchise | Start at ₹3.69 Lakh*",
    description:
      "Zero Royalty. Chef-less Operations. Complete Franchise Support.",
    images: ["/images/franchise-hero-combo.jpg"],
  },
};

export default function FranchisePage() {
  return (
    <main>
      <FranchiseClient />
      <Footer />
    </main>
  );
}
