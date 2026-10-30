import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components";
import FranchiseOpportunityDetails, {
    type FranchiseOpportunity,
} from "./components";
import "./components.css";

const CAFE_IMAGE =
    "https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg";

const opportunities: FranchiseOpportunity[] = [
    {
        id: 1,
        franchiseName: "TeaMax Cafe – Kompally",
        slug: "teamax-kompally",
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
        shortDescription: "Bring the TeaMax café experience to Kompally, Hyderabad.",
        description: "<p>Become a part of the <strong>TeaMax</strong> franchise network and build a memorable café experience.</p>",
        primaryImage: CAFE_IMAGE,
    },
    {
        id: 2,
        franchiseName: "TeaMax Cafe – Gachibowli",
        slug: "teamax-gachibowli",
        country: "India",
        state: "Telangana",
        city: "Hyderabad",
        shortDescription: "Explore a TeaMax franchise opportunity in Gachibowli.",
        description: "<p>Partner with TeaMax and create a welcoming destination for tea lovers.</p>",
        primaryImage: CAFE_IMAGE,
    },
    {
        id: 3,
        franchiseName: "TeaMax Cafe – Indore",
        slug: "teamax-indore",
        country: "India",
        state: "Madhya Pradesh",
        city: "Indore",
        shortDescription: "Build your TeaMax franchise in the vibrant city of Indore.",
        description: "<p>Join the TeaMax franchise family and bring quality tea, coffee and food to your city.</p>",
        primaryImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80",
    },
    {
        id: 4,
        franchiseName: "TeaMax Cafe – Bhopal",
        slug: "teamax-bhopal",
        country: "India",
        state: "Madhya Pradesh",
        city: "Bhopal",
        shortDescription: "Discover the TeaMax franchise opportunity in Bhopal.",
        description: "<p>Create a warm café destination for tea and coffee lovers with TeaMax.</p>",
        primaryImage: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1000&auto=format&fit=crop&q=80",
    },
];

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return opportunities.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const item = opportunities.find((opportunity) => opportunity.slug === slug);

    if (!item) return { title: "Franchise Opportunity Not Found | TeaMax" };

    return {
        title: `${item.franchiseName} | TeaMax Franchise Opportunity`,
        description: item.shortDescription,
        openGraph: {
            title: `${item.franchiseName} | TeaMax`,
            description: item.shortDescription,
            images: [item.primaryImage],
        },
    };
}

export default async function FranchiseOpportunityPage({ params }: PageProps) {
    const { slug } = await params;
    const opportunity = opportunities.find((item) => item.slug === slug);

    if (!opportunity) notFound();

    return (
        <>
            <Header active="/franchise-opportunities" />
            <FranchiseOpportunityDetails opportunity={opportunity} />
            <Footer />
        </>
    );
}
