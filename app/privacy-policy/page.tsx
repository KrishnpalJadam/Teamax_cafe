
import type { ComponentType } from "react";

// @ts-expect-error PrivacyPolicy is an existing JavaScript JSX component.
import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
    title: "Privacy & Refund Policy | TeaMax Cafe India",
    description:
        "Read TeaMax Cafe India's privacy and refund policy, including information collection, data use, cookies, third-party links and contact details.",
};

export default function PrivacyPolicyPage() {
    const PolicyComponent = PrivacyPolicy as ComponentType;

    return <PolicyComponent />;
}
