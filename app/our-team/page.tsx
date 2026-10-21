
import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components";
import "./OurTeam.css";

export const dynamic = "force-static";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
    title: "Meet the TeaMax Café Team | Our Vision & Leadership",
    description:
        "Meet the people behind TeaMax Café. Discover our leadership, journey, recognitions, franchise support and commitment to growing our café network across India.",
    keywords: [
        "TeaMax team",
        "TeaMax Café leadership",
        "TeaMax Café founder",
        "TeaMax franchise team",
        "TeaMax company",
    ],
    alternates: {
        canonical: `${siteUrl}/our-team`,
    },
    openGraph: {
        title: "Meet the People Behind TeaMax Café",
        description:
            "Discover the people, vision and support behind the TeaMax Café franchise network.",
        url: `${siteUrl}/our-team`,
        type: "website",
    },
};

const teamMembers = [
    {
        name: "Vikas Singh",
        role: "Ivey Business School Alumni",
        image:
            "https://pixel-perfect-design-revival.lovable.app/teamax/vikas.jpg",
        imageAlt: "Vikas Singh, TeaMax Café team",
        side: "left",
    },
    {
        name: "Jai Prakash",
        role: "CMD, Ashoka Group",
        image:
            "https://pixel-perfect-design-revival.lovable.app/teamax/jai.jpg",
        imageAlt: "Jai Prakash, TeaMax Café team",
        side: "right",
    },
];

const teamFeatures = [
    {
        icon: "✦",
        title: "The Visionary Behind TeaMax Café",
        description:
            "TeaMax Café was founded by Vikas Singh, an alumnus of VIT and Ivey Business School (Ontario, Canada), holding CFA and CAIIB certifications. His vision was to create an affordable yet premium tea café franchise that could expand rapidly across India, providing budding entrepreneurs with a robust business model.",
    },
    {
        icon: "↗",
        title: "Our Journey and Milestones",
        description:
            "Since its launch, TeaMax Café has experienced significant growth, building a strong and expanding franchise network across India. As of August 2026, TeaMax Café has recorded 1,286+ franchisee signups, reflecting growing interest in its tea café franchise model. Its presence across multiple states and cities highlights the brand's business model, operational support and franchise partner network.",
    },
    {
        icon: "★",
        title: "Recognitions and Awards",
        description:
            "Our dedication to excellence and innovation has been recognized with several awards. In 2022, TeaMax Café was honored with the “Restaurant of the Year” award at the 11th Annual Restaurant Awards. The following year, we received the “Franchise of the Year” award at the 4th Global Excellence Awards. These accolades reflect our commitment to service and franchise support.",
    },
    {
        icon: "✓",
        title: "Comprehensive Support for Franchisees",
        description:
            "At TeaMax Café, we believe in providing comprehensive support to our franchisees. This includes staff hiring guidelines, owner management training, and online and offline staff training modules. Our café management software simplifies inventory management and sales tracking. We also focus on low-cost raw materials and branded packaging to help franchisees manage their operations.",
    },
    {
        icon: "♧",
        title: "A Community of Entrepreneurs",
        description:
            "Joining TeaMax Café means becoming part of a community of entrepreneurs. We offer ongoing growth monitoring and a dedicated support helpline to assist franchise partners. Our pan-India digital branding efforts aim to improve café visibility, attract customers and support business growth.",
    },
];

export default function OurTeamPage() {
    return (
        <>

            <div className="tm-team-page">
                {/* Hero */}
                <section className="tm-hero">
                    <div className="tm-container tm-hero-container">
                        <div className="tm-hero-copy">
                            <div className="tm-badge-row">
                                <span className="tm-badge">OUR TEAM</span>
                                <span className="tm-badge-line" />
                            </div>

                            <h1 className="tm-title">
                                Meet the People
                                <br />
                                <span>Behind TeaMax Café</span>
                            </h1>

                            <p className="tm-lead team2">
                                Step into TeaMax Café Franchise and be greeted by our
                                exceptional team. With passion and dedication, they work
                                towards creating memorable dining experiences. Their
                                knowledge, warmth and commitment help us support our customers
                                and franchise partners.
                            </p>
                        </div>

                        <div className="tm-hero-art" aria-hidden="true">
                            <div className="tm-script">
                                <span className="ray r1" />
                                <span className="ray r2" />
                                <span className="ray r3" />
                                <span className="ray r4" />
                                Great
                                <br />
                                People
                                <br />
                                Better
                                <br />
                                Brews
                                <svg
                                    className="tm-underline"
                                    viewBox="0 0 200 30"
                                    fill="none"
                                >
                                    <path
                                        d="M5 25 Q100 0 195 8"
                                        stroke="#f6d75a"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <svg
                                className="tm-leaf-top"
                                viewBox="0 0 80 80"
                                fill="none"
                                stroke="#f6d75a"
                                strokeWidth="3"
                                strokeLinecap="round"
                            >
                                <path d="M20 70 Q40 50 70 45" />
                                <path d="M30 60 C10 50 15 25 25 10 C40 25 40 45 30 60Z" />
                                <path d="M45 52 C45 30 60 15 75 12 C75 30 65 45 45 52Z" />
                                <path d="M55 48 C65 40 75 42 78 44 C70 55 60 55 55 48Z" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Team members and story */}
                <section className="tm-body">
                    <div className="tm-blob-bl" aria-hidden="true" />
                    <div className="tm-blob-br" aria-hidden="true" />

                    <div className="tm-container tm-body-content">
                        <div className="tm-people">
                            {teamMembers.map((member) => (
                                <article
                                    className={`tm-person ${member.side}`}
                                    key={member.name}
                                >
                                    <span className="spark s1" aria-hidden="true" />
                                    <span className="spark s2" aria-hidden="true" />
                                    <span className="spark s3" aria-hidden="true" />

                                    <div className="tm-photo">
                                        <img
                                            src={member.image}
                                            alt={member.imageAlt}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="tm-card">
                                        <h2>{member.name}</h2>
                                        <p>{member.role}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="tm-features">
                            {teamFeatures.map((feature) => (
                                <article className="tm-feature" key={feature.title}>
                                    <div className="tm-icon" aria-hidden="true">
                                        {feature.icon}
                                    </div>

                                    <div className="tm-feature-copy">
                                        <h2>{feature.title}</h2>
                                        <p>{feature.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="tm-foot">
                            <span className="tm-pin" aria-hidden="true">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>
                            </span>

                            <span className="tm-sep" />

                            <p>
                                For more information on our franchise opportunities and
                                operational locations, please visit our{" "}
                                <Link href="/ourcentres">locations page</Link>.
                            </p>
                        </div>
                    </div>

                    <span className="tm-leaf-bl" aria-hidden="true">
                        ❋
                    </span>
                    <span className="tm-cup" aria-hidden="true">
                        ☕
                    </span>
                </section>
            </div>


        </>
    );
}
