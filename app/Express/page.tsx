import BestTeaFranchiseIndiaPage, { metadata as originalMeta } from "../best-tea-franchise-india/page";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...originalMeta,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.teamaxcafe.in/best-tea-franchise-india/",
  },
};

export default BestTeaFranchiseIndiaPage;
