"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FranchiseOpportunitiesRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.location.replace("/franchise");
        } else {
            router.replace("/franchise");
        }
    }, [router]);

    return (
        <div style={{ textAlign: "center", padding: "120px 20px", fontFamily: "sans-serif" }}>
            <p style={{ fontSize: "18px", color: "#2b3b38" }}>
                Redirecting to{" "}
                <a href="/franchise" style={{ color: "#127252", fontWeight: "bold" }}>
                    Franchise Opportunities (/franchise)
                </a>
                ...
            </p>
        </div>
    );
}
