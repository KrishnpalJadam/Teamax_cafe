import type { Metadata } from "next";
import { Header, Footer } from "../components";
import OurFranchiseOpportunitiesContent from "../franchise-opportunities/components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  title: "Cafe Franchise Opportunities Near You | TeaMax Cafe",
  description:
    "Explore TeaMax Cafe franchise opportunities by location. Find an area of interest and connect with our team about investment, requirements and support.",
  alternates: {
    canonical: `${siteUrl}/franchise/`,
  },
  openGraph: {
    title: "Cafe Franchise Opportunities Near You | TeaMax Cafe",
    description:
      "Explore TeaMax Cafe franchise opportunities by location. Find an area of interest and connect with our team about investment, requirements and support.",
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
