
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
import { getCentreBySlugOrId } from "../../lib/api";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

type Props = {
    searchParams: Promise<{
        slug?: string;
        id?: string;
    }>;
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const params = await searchParams;
    const slug = params.slug || params.id;

    if (!slug) {
        return {
            title: "TeaMax Cafe – Franchise Outlet",
            description:
                "Explore TeaMax Cafe outlets, menus, offers and opening hours.",
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const centre = await getCentreBySlugOrId(slug);

    if (!centre) {
        return {
            title: "Centre Not Found | TeaMax Cafe",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const name = centre.name || "TeaMax Cafe";
    const city = centre.city || "";
    const state = centre.state || "";

    const title = `${name} | TeaMax Cafe${city ? ` ${city}` : ""}`;
    const description =
        centre.metaDescription ||
        `Visit ${name}${city ? ` in ${city}` : ""}${state ? `, ${state}` : ""}. Explore our menu, offers, café facilities and opening hours.`;

    const canonical = `${siteUrl}/locations/stores/?slug=${encodeURIComponent(
        centre.slug || slug
    )}`;

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
        },
        robots: {
            index: false,
            follow: false,
        },
    };
}

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
