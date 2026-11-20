import type { Metadata } from "next";
import { Suspense } from "react";
import "../../ourcentres/stores/components.css";
import {
    StoreHero,
    StoreFeatures,
    StorePromos,
    StoreSections,
    StoreDataProvider,
} from "../../ourcentres/stores/components";
import { Footer, Header } from "../../components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
    title: "TeaMax Cafe Outlets | Find Cafe Timings, Menu & Location",
    description:
        "Explore TeaMax Cafe outlets across India. Check café locations, opening hours, exclusive offers, facilities and menu offerings.",
    alternates: {
        canonical: `${siteUrl}/locations/stores/`,
    },
    openGraph: {
        title: "TeaMax Cafe Outlets | Find Cafe Timings, Menu & Location",
        description: "Your neighborhood spot for good tea and good food.",
        url: `${siteUrl}/locations/stores/`,
        type: "website",
    },
};

export default function StorePage() {
    return (
        <div className="tm-page">
            <Header active="/locations" />
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
                <StoreDataProvider>
                    <main className="tm-container tm-main">
                        <StoreHero />
                        <StoreFeatures />
                        <StorePromos />
                        <StoreSections />
                    </main>
                </StoreDataProvider>
            </Suspense>
            <Footer />
        </div>
    );
}

