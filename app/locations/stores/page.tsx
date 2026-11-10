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

export const metadata: Metadata = {
    title: "TeaMax Cafe – Franchise Outlet | Menu, Offers & Opening Hours",
    description:
        "Visit TeaMax Cafe franchise outlets. Explore authentic chai, artisanal coffees, snacks, cafe photos, single active offer, and opening hours.",
    openGraph: {
        title: "TeaMax Cafe – Franchise Outlet",
        description: "Your neighborhood spot for good tea and good food.",
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

