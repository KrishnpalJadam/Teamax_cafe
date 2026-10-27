import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import { ReviewClient, type ReviewCategory, type ReviewItem } from "./review-client";

export const dynamic = "force-static";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
    title: "Customer Reviews & Stories | TeaMax Café",
    description:
        "Read reviews and stories from TeaMax franchise partners, staff members and customers.",
    keywords: [
        "TeaMax reviews",
        "TeaMax Cafe reviews",
        "TeaMax franchise partner stories",
        "TeaMax customer reviews",
        "TeaMax staff reviews",
    ],
    alternates: { canonical: "/reviews" },
    openGraph: {
        title: "Our Reviews | TeaMax Café",
        description:
            "Real stories from TeaMax franchise partners, staff and customers.",
        url: `${siteUrl}/reviews`,
        type: "website",
        images: [
            {
                url: "/images/Teamax-Café-Coffee-Banner.webp",
                width: 1200,
                height: 656,
                alt: "TeaMax Café takeaway cup",
            },
        ],
    },
};

const reviewCategories: ReviewCategory[] = [
    { id: "all", name: "All Reviews", icon: "all" },
    { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
    { id: "staff", name: "Staff Reviews", icon: "staff" },
    { id: "customer", name: "Customer Reviews", icon: "customer" },
];

const reviews: ReviewItem[] = [
    {
        id: "default-1",
        type: "franchise",
        name: "Mr. Ravi Kabra",
        location: "TeaMax Cafe Krishi Road, Lucknow",
        image:
            "https://static.wixstatic.com/media/ac5a6b_f13fed47a8734bf682366547e7e065a6~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.webp",
        review:
            "The support from the TeaMax team has been excellent. It made the entire setup and launch process smooth and stress-free.",
        link: "https://www.instagram.com/reel/C4pexddSzPJ/?utm_source=ig_web_button_share_sheet",
        stars: 5,
    },
    {
        id: "default-2",
        type: "franchise",
        name: "Ms. Neeta Parmar",
        location: "TeaMax Cafe Vadodara, Gujarat",
        image:
            "https://static.wixstatic.com/media/ead547_213d1e08ebc54f4e974ccf352efaf843~mv2.jpg/v1/crop/x_71,y_149,w_928,h_890/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.jpg",
        review:
            "The team's guidance and regular support have been very helpful. The business setup was well-organized, and everything moved smoothly.",
        link: "https://www.instagram.com/reel/C57kDhoSj8p/?utm_source=ig_web_button_share_sheet",
        stars: 5,
    },
    {
        id: "default-3",
        type: "franchise",
        name: "Mr. Hemal",
        location: "TeaMax Cafe Gurgaon, Haryana",
        image:
            "https://static.wixstatic.com/media/ac5a6b_f68faa97814d47d9874669b3457c5ebe~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.webp",
        review:
            "The support and transparency from the franchise team have been outstanding. It's a well-structured model with real business potential.",
        link: "https://www.instagram.com/reel/C5sjVIySylq/?utm_source=ig_web_button_share_sheet",
        stars: 5,
    },
    {
        id: "staff-1",
        type: "staff",
        name: "Aarav Sharma",
        location: "TeaMax Café, Indore",
        image: "/images/cafe-interior.jpg",
        review:
            "The team environment is welcoming, and everyone works together to give customers a great café experience.",
        stars: 5,
    },
    {
        id: "staff-2",
        type: "staff",
        name: "Priya Verma",
        location: "TeaMax Café, Bhopal",
        image: "/images/hero-cafe.jpg",
        review:
            "I have learned a lot while working with the team. The focus on service quality and teamwork makes every day rewarding.",
        stars: 4,
    },
    {
        id: "customer-1",
        type: "customer",
        name: "Ananya Mehta",
        location: "TeaMax Café, Hyderabad",
        image: "/images/chai.webp",
        review:
            "Loved the chai and the cosy café atmosphere. A great place to catch up with friends over a cup of tea.",
        stars: 5,
    },
    {
        id: "customer-2",
        type: "customer",
        name: "Rahul Jain",
        location: "TeaMax Café, Lucknow",
        image: "/images/coffee.webp",
        review:
            "The drinks were fresh, the service was friendly, and the menu had something for everyone. Will visit again!",
        stars: 5,
    },
    {
        id: "customer-3",
        type: "customer",
        name: "Simran Patel",
        location: "TeaMax Café, Vadodara",
        image: "/images/milkshake.webp",
        review:
            "A lovely place with tasty beverages and a relaxed vibe. The iced tea was especially refreshing.",
        stars: 4,
    },
];

const reviewsSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${siteUrl}/reviews#page`,
            name: "TeaMax Café Reviews",
            url: `${siteUrl}/reviews`,
            description:
                "Reviews and stories from TeaMax franchise partners, staff members and customers.",
            mainEntity: {
                "@type": "ItemList",
                itemListElement: reviews.map((review, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "Review",
                        name: `${review.type} review by ${review.name}`,
                        reviewBody: review.review,
                        reviewRating: {
                            "@type": "Rating",
                            ratingValue: review.stars,
                            bestRating: 5,
                        },
                        author: { "@type": "Person", name: review.name },
                    },
                })),
            },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Reviews",
                    item: `${siteUrl}/reviews`,
                },
            ],
        },
    ],
};

export default function ReviewPage() {
    return (
        <>
            <Header active="/reviews" />
            <main className="tx-menu-page">
                <section className="tx-menu-hero" aria-labelledby="tx-menu-page-title">
                    <div className="tx-menu-hero-inner">
                        <div className="tx-menu-hero-copy">
                            <div className="tx-menu-breadcrumb">
                                <a href="/">Home</a>
                                <span>›</span>
                                <span>Reviews</span>
                            </div>
                            <h1 id="tx-menu-page-title">Our Mentions & Reviews</h1>
                            <p>Real stories from the TeaMax family</p>
                            <span className="tx-menu-yellow-rule" />
                        </div>
                        <div className="tx-menu-hero-art">
                            <img
                                src="/images/Teamax-Café-Coffee-Banner.webp"
                                alt="TeaMax Café takeaway cup with fresh tea leaves"
                                width={1200}
                                height={656}
                            />
                            <div className="tx-menu-hero-scribble" aria-hidden="true">
                                Chai<br />People<br />Good<br />Stories<span>♥</span>
                            </div>
                        </div>
                    </div>
                </section>

                <ReviewClient categories={reviewCategories} items={reviews} />
            </main>
            <Footer />
            <JsonLd data={reviewsSchema} />
        </>
    );
}
