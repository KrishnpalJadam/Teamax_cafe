import type { Metadata } from "next";
import { Header, Footer } from "../../components";
import { FranchiseOpportunityDetails } from "./components";
import { getFranchiseOpportunities, getFranchiseOpportunityBySlug } from "../../lib/api";

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

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            images: item.primaryImage ? [item.primaryImage] : [],
        },
    };
}

export default async function FranchiseOpportunityPage({ params }: PageProps) {
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
            <Header active="/franchise-opportunities" />
            <FranchiseOpportunityDetails
                opportunity={opportunity || fallbackOpportunity}
                slug={slug}
            />
            <Footer />
        </>
    );
}
