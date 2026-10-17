import type { Metadata } from "next";
import { Suspense } from "react";
import "./components.css";
import {
    StoreHero,
    StoreFeatures,
    StorePromos,
    StoreSections,
    StoreDataProvider,
} from "./components";
import { Footer, Header } from "../../components";

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
            <Header />
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
