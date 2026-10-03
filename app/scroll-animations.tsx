"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tm-animated");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const selector = [
      ".home-hero",
      ".home-stats",
      ".home-brand-story",
      ".home-why",
      ".home-founder",
      ".home-menu-section",
      ".home-benefit-card",
      ".home-stat",
      ".tm-hero",
      ".tm-franchise-hero",
      ".tm-blog-hero",
      ".tm-menu-hero",
      ".tm-stat-item",
      ".tm-feature-card",
      ".tm-principle-card",
      ".tm-step-card",
      ".tm-menu-banner-card",
      ".tm-blog-card",
      ".tm-model-card",
      ".tm-form-card",
      ".tm-inv-table-wrap",
      ".tm-menu-brewing-banner",
      ".tm-timeline-item",
      ".tm-faq-item",
      ".tm-geo-strip"
    ].join(", ");

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
