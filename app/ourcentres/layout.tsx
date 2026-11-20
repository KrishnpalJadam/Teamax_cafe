import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeaMax Locations",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.teamaxcafe.in/locations/",
  },
};

export default function OurCentresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

