import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "TeaMax Cafe Offers | Chai, Burger & Combo Deals",
  description:
    "Explore TeaMax Cafe offers on chai, burgers and food-and-drink combos. Check current deals, validity and applicable terms before planning your visit.",
  alternates: {
    canonical: `${siteUrl}/offers/`,
  },
  openGraph: {
    title: "TeaMax Cafe Offers | Chai, Burger & Combo Deals",
    description:
      "Explore TeaMax Cafe offers on chai, burgers and food-and-drink combos. Check current deals, validity and applicable terms before planning your visit.",
    url: `${siteUrl}/offers/`,
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

