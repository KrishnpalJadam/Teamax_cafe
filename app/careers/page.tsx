import type { Metadata } from "next";
import ClientRedirect from "./client-redirect";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "TeaMax Cafe | Tea, Coffee & Cafe Franchise in India",
  description:
    "Discover TeaMax Cafe for tea, coffee, shakes and tasty bites. Explore our menu, find a cafe or learn about our zero-royalty franchise opportunity.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.teamaxcafe.in/",
  },
};

export default function CareersRedirectPage() {
  return <ClientRedirect />;
}

