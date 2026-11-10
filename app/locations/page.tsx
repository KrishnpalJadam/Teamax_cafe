import type { Metadata } from "next";
import { Header, Footer } from "../components";
import OurCentresContent from "../ourcentres/components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
    title: "TeaMax Café Locations | Find a TeaMax Near You",
    description: "Explore TeaMax Café centres across India. Visit your nearest outlet for authentic chai, coffee, and delicious café favourites.",
    alternates: {
        canonical: `${siteUrl}/locations`,
    },
    openGraph: {
        title: "TeaMax Café Locations | Find a TeaMax Near You",
        description: "Explore TeaMax Café centres across India. Visit your nearest outlet for authentic chai, coffee, and delicious café favourites.",
        url: `${siteUrl}/locations`,
        type: "website",
    },
};

export default function LocationsPage() {
    return (
        <>
            <Header active="/locations" />
            <OurCentresContent />
            <Footer />
        </>
    );
}

