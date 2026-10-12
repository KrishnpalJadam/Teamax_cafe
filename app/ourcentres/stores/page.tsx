import type { Metadata } from "next";
import "./components.css";
import {

    StoreHero,
    StoreFeatures,
    StorePromos,
    StoreSections,

} from "./components";
import { Footer, Header } from "../../components";

export const metadata: Metadata = {
    title: "TeaMax Cafe – Kompally | Menu, Offers & Opening Hours",
    description:
        "Visit TeaMax Cafe in Kompally, Hyderabad. Explore chai, coffee, snacks, cafe photos, offers and opening hours.",
    openGraph: {
        title: "TeaMax Cafe – Kompally",
        description: "Your neighborhood spot for good tea and good food.",
        type: "website",
    },
};

export default function StorePage() {
    return (
        <div className="tm-page">
            <Header />
            <main className="tm-container tm-main">
                <StoreHero />
                <StoreFeatures />
                <StorePromos />
                <StoreSections />
            </main>
            <Footer />
        </div>
    );
}
