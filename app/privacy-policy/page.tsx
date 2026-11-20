import type { ComponentType } from "react";
import type { Metadata } from "next";

// @ts-expect-error PrivacyPolicy is an existing JavaScript JSX component.
import PrivacyPolicy from "./PrivacyPolicy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamaxcafe.in";

export const metadata: Metadata = {
    title: "Privacy & Refund Policy | TeaMax Cafe India",
    description:
        "Read TeaMax Cafe India's privacy and refund policy, including information collection, data use, cookies, third-party links and contact details.",
    alternates: {
        canonical: `${siteUrl}/privacy-policy/`,
    },
    openGraph: {
        title: "Privacy & Refund Policy | TeaMax Cafe India",
        description:
            "Read TeaMax Cafe India's privacy and refund policy, including information collection, data use, cookies, third-party links and contact details.",
        url: `${siteUrl}/privacy-policy/`,
        type: "website",
    },
};

export default function PrivacyPolicyPage() {
    const PolicyComponent = PrivacyPolicy as ComponentType;

    return <PolicyComponent />;
}
