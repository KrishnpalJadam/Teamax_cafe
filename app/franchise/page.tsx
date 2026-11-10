import type { Metadata } from "next";
import { Header, Footer } from "../components";
import OurFranchiseOpportunitiesContent from "../franchise-opportunities/components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Franchise Opportunities in India | TeaMax Café",
  description:
    "Explore TeaMax Café franchise opportunities across top Indian cities. Zero royalty, low investment, chef-less operations and pan-India brand trust.",
  alternates: {
    canonical: `${siteUrl}/franchise`,
  },
  openGraph: {
    title: "Franchise Opportunities in India | TeaMax Café",
    description:
      "Explore TeaMax Café franchise opportunities across top Indian cities. Zero royalty, low investment, chef-less operations and pan-India brand trust.",
    url: `${siteUrl}/franchise`,
    type: "website",
  },
};

export default function FranchiseOpportunitiesPage() {
  return (
    <>
      <Header active="/franchise" />
      <OurFranchiseOpportunitiesContent />
      <Footer />
    </>
  );
}
