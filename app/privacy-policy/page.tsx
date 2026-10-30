
import type { ComponentType } from "react";

// @ts-expect-error PrivacyPolicy is an existing JavaScript JSX component.
import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
    title: "General & Privacy Policy | TeaMax Cafe India",
    description:
        "Read the TeaMax Cafe India privacy policy, information collection practices, data security and franchise refund policy.",
};

export default function PrivacyPolicyPage() {
    const PolicyComponent = PrivacyPolicy as ComponentType;

    return <PolicyComponent />; 
}
