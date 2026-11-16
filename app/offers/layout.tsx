import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeaMax Cafe Offers | Chai, Burger & Combo Deals",
  description:
    "Explore TeaMax Cafe offers on chai, burgers and food-and-drink combos. Check current deals, validity and applicable terms before planning your visit.",
  openGraph: {
    title: "TeaMax Cafe Offers | Chai, Burger & Combo Deals",
    description:
      "Explore TeaMax Cafe offers on chai, burgers and food-and-drink combos. Check current deals, validity and applicable terms before planning your visit.",
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

