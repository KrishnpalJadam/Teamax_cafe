"use client";

import { useState } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://teamaxcafe.com/blog/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareWhatsapp = () => {
    const text = encodeURIComponent(`${title} — Read on TeaMax: ${getUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`${title} via @TeaMaxCafe`);
    const url = encodeURIComponent(getUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareLinkedin = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="tm-share-btn-row">
      <button
        type="button"
        onClick={shareWhatsapp}
        className="tm-share-btn"
        aria-label="Share on WhatsApp"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        WhatsApp
      </button>

      <button
        type="button"
        onClick={shareTwitter}
        className="tm-share-btn"
        aria-label="Share on Twitter / X"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464l6.768-6.768"></path>
        </svg>
        X (Twitter)
      </button>

      <button
        type="button"
        onClick={shareLinkedin}
        className="tm-share-btn"
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
        LinkedIn
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="tm-share-btn"
        aria-label="Copy link to clipboard"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
        {copied ? "Link Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
