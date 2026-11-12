
import type { Metadata } from "next";

import { Header, Footer } from "../../components";
import { FranchiseOpportunityDetails } from "./components";

import {
    getFranchiseOpportunities,
    getFranchiseOpportunityBySlug,
    type DynamicFranchiseOpportunity,
} from "../../lib/api";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.teamaxcafe.in";

/* =========================================
   STATIC EXPORT CONFIGURATION
========================================= */

export const dynamic = "force-static";
export const dynamicParams = false;

/* =========================================
   GENERATE STATIC FRANCHISE ROUTES
========================================= */

export async function generateStaticParams(): Promise<
    { slug: string }[]
> {
    const list = await getFranchiseOpportunities("active");

    if (!Array.isArray(list)) {
        throw new Error(
            "Franchise API returned an invalid response during build."
        );
    }

    const uniqueSlugs = Array.from(
        new Set(
            list
                .filter(
                    (item) =>
                        typeof item.slug === "string" &&
                        item.slug.trim().length > 0
                )
                .map((item) => item.slug.trim())
        )
    );

    console.log(
        "========================================"
    );
    console.log("FRANCHISE STATIC ROUTES");
    console.log("Total routes:", uniqueSlugs.length);
    console.log("Slugs:", uniqueSlugs);
    console.log(
        "========================================"
    );

    if (uniqueSlugs.length === 0) {
        throw new Error(
            "No franchise slugs found. Static export stopped to avoid deploying missing franchise pages."
        );
    }

    return uniqueSlugs.map((slug) => ({
        slug,
    }));
}

/* =========================================
   GENERATE SEO METADATA
========================================= */

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const pageUrl = `${SITE_URL}/franchise/${encodeURIComponent(
        slug
    )}`;

    try {
        const item = await getFranchiseOpportunityBySlug(slug);

        if (!item) {
            return {
                title: "Franchise Opportunity | TeaMax",
                description:
                    "Explore TeaMax franchise opportunities in India.",
            };
        }

        const title =
            item.seoTitle ||
            `${item.franchiseName} | TeaMax Franchise Opportunity`;

        const description =
            item.metaDescription ||
            item.shortDescription ||
            "Explore TeaMax franchise opportunities in India.";

        const keywords = item.seoKeywords
            ? item.seoKeywords
                .split(",")
                .map((keyword: string) => keyword.trim())
                .filter(Boolean)
            : undefined;

        return {
            title,
            description,
            keywords,

            alternates: {
                canonical: pageUrl,
            },

            openGraph: {
                title,
                description,
                url: pageUrl,
                type: "website",
                images: item.primaryImage
                    ? [item.primaryImage]
                    : [],
            },
        };
    } catch (error) {
        console.error(
            `Franchise metadata error for ${slug}:`,
            error
        );

        return {
            title: "Franchise Opportunity | TeaMax",
            description:
                "Explore TeaMax franchise opportunities in India.",
        };
    }
}

/* =========================================
   FRANCHISE DETAIL PAGE
========================================= */

export default async function FranchiseOpportunityPage({
    params,
}: PageProps) {
    const { slug } = await params;

    let opportunity: DynamicFranchiseOpportunity | null =
        null;

    try {
        opportunity =
            await getFranchiseOpportunityBySlug(slug);
    } catch (error) {
        console.error(
            `Failed to fetch franchise opportunity: ${slug}`,
            error
        );
    }

    /* =========================================
       FALLBACK CONTENT
    ========================================= */

    const formattedCity = slug
        .replace(/^teamax-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );

    const fallbackOpportunity: DynamicFranchiseOpportunity = {
        id: slug,

        franchiseName: `TeaMax Cafe – ${formattedCity}`,

        slug,

        country: "India",

        state: "Telangana",

        city: formattedCity,

        shortDescription:
            "Explore a TeaMax franchise opportunity in your city.",

        description:
            "<p>Partner with TeaMax and create a welcoming destination for tea lovers.</p>",

        primaryImage:
            "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg",
    };

    return (
        <>
            <Header active="/franchise" />

            <FranchiseOpportunityDetails
                opportunity={
                    opportunity || fallbackOpportunity
                }
                slug={slug}
            />

            <Footer />
        </>
    );
}
