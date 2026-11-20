"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/");
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "120px 20px", fontFamily: "sans-serif" }}>
      <p style={{ fontSize: "18px", color: "#2b3b38" }}>
        Redirecting to{" "}
        <a href="/" style={{ color: "#127252", fontWeight: "bold" }}>
          TeaMax Cafe Homepage
        </a>
        ...
      </p>
    </div>
  );
}

