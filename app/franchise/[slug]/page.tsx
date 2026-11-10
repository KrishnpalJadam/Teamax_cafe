import type { Metadata } from "next";
import { Header, Footer } from "../../components";
import { FranchiseOpportunityDetails } from "../../franchise-opportunities/[slug]/components";
import { getFranchiseOpportunities, getFranchiseOpportunityBySlug } from "../../lib/api";

export const dynamic = "force-static";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const list = await getFranchiseOpportunities('active');
    return list.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const item = await getFranchiseOpportunityBySlug(slug);

    if (!item) return { title: "Franchise Opportunity | TeaMax" };

    const title = item.seoTitle || `${item.franchiseName} | TeaMax Franchise Opportunity`;
    const description = item.metaDescription || item.shortDescription;
    const keywords = item.seoKeywords
        ? item.seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : undefined;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: `${siteUrl}/franchise/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteUrl}/franchise/${slug}`,
            images: item.primaryImage ? [item.primaryImage] : [],
        },
    };
}

export default async function FranchiseOpportunitySlugPage({ params }: PageProps) {
    const { slug } = await params;
    const opportunity = await getFranchiseOpportunityBySlug(slug);

    const fallbackOpportunity = {
        id: slug,
        franchiseName: `TeaMax Cafe – ${slug.replace(/^teamax-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
        slug,
        country: "India",
        state: "Telangana",
        city: slug.replace(/^teamax-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        shortDescription: "Explore a TeaMax franchise opportunity in your city.",
        description: "<p>Partner with TeaMax and create a welcoming destination for tea lovers.</p>",
        primaryImage: "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg",
    };

    return (
        <>
            <Header active="/franchise" />
            <FranchiseOpportunityDetails
                opportunity={opportunity || fallbackOpportunity}
                slug={slug}
            />
            <Footer />
        </>
    );
}

