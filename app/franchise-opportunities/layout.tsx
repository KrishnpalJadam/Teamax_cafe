import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeaMax Franchise Opportunities",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.teamaxcafe.in/franchise/",
  },
};

export default function FranchiseOpportunitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

