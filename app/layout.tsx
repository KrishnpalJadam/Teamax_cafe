import type { Metadata } from "next";
import { DM_Sans, Outfit, Kalam } from "next/font/google";
import "./reference.css";
import "./story-and-menu.css";
import "./teamax-theme.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TeaMax Café | Tea, Coffee, Shakes & Fresh Café Favourites",
    template: "%s | TeaMax Café",
  },
  description:
    "TeaMax is a warm, contemporary Indian café serving tea, coffee, herbal drinks, fresh juices, shakes, ice creams and café favourites across 250+ outlets.",
  keywords: [
    "TeaMax",
    "TeaMax cafe",
    "tea cafe",
    "coffee cafe",
    "Indian cafe franchise",
    "fresh juices",
    "milkshakes",
    "ice cream cafe",
    "cafe near me",
    "best tea cafe India",
    "kadak chai",
    "3 in 1 cafe model",
  ],
  applicationName: "TeaMax Café",
  authors: [{ name: "TeaMax Café" }],
  creator: "TeaMax Café",
  publisher: "TeaMax Café",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "TeaMax Café",
    title: "TeaMax Café | A Taste Worth Sharing",
    description:
      "A modern Indian café experience with tea, coffee, fresh juices, shakes, ice creams and everyday favourites.",
    url: siteUrl,
    locale: "en_IN",
    images: [{ url: "/images/cafe-interior.jpg", width: 1080, height: 864, alt: "TeaMax café interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeaMax Café",
    description: "Tea, coffee, fresh juices, shakes and café favourites.",
    images: ["/images/cafe-interior.jpg"],
  },
  icons: { icon: "/images/logo.webp" },
};

import { ScrollAnimations } from "./scroll-animations";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${dmSans.variable} ${kalam.variable}`}>
      <body className="antialiased">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}

