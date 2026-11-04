"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function FranchiseRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/cafe-franchise-india");
    } else {
      router.replace("/cafe-franchise-india");
    }
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "120px 20px", fontFamily: "sans-serif" }}>
      <p style={{ fontSize: "18px", color: "#2b3b38" }}>
        Redirecting to{" "}
        <a href="/cafe-franchise-india" style={{ color: "#127252", fontWeight: "bold" }}>
          TeaMax Franchise (/cafe-franchise-india)
        </a>
        ...
      </p>
    </div>
  );
}
