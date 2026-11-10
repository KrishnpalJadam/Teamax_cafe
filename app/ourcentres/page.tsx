"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OurCentresRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.location.replace("/locations");
        } else {
            router.replace("/locations");
        }
    }, [router]);

    return (
        <div style={{ textAlign: "center", padding: "120px 20px", fontFamily: "sans-serif" }}>
            <p style={{ fontSize: "18px", color: "#2b3b38" }}>
                Redirecting to{" "}
                <a href="/locations" style={{ color: "#127252", fontWeight: "bold" }}>
                    TeaMax Locations (/locations)
                </a>
                ...
            </p>
        </div>
    );
}
