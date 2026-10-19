"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReviews } from "../lib/api";
import "./FranchiseStories.css";

const defaultFranchiseStories = [
  {
    id: "default-1",
    name: "Mr. Ravi Kabra",
    location: "TeaMax Cafe Krishi Road, Lucknow",
    image:
      "https://static.wixstatic.com/media/ac5a6b_f13fed47a8734bf682366547e7e065a6~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.webp",
    review:
      "The support from the TeaMax team has been excellent. It made the entire setup and launch process smooth and stress-free.",
    link: "https://www.instagram.com/reel/C4pexddSzPJ/?utm_source=ig_web_button_share_sheet",
    stars: 5,
  },
  {
    id: "default-2",
    name: "Ms. Neeta Parmar",
    location: "TeaMax Cafe Vadodara, Gujarat",
    image:
      "https://static.wixstatic.com/media/ead547_213d1e08ebc54f4e974ccf352efaf843~mv2.jpg/v1/crop/x_71,y_149,w_928,h_890/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.jpg",
    review:
      "The team's guidance and regular support have been very helpful. The business setup was well-organized, and everything moved smoothly.",
    link: "https://www.instagram.com/reel/C57kDhoSj8p/?utm_source=ig_web_button_share_sheet",
    stars: 5,
  },
  {
    id: "default-3",
    name: "Mr. Hemal",
    location: "TeaMax Cafe Gurgaon, Haryana",
    image:
      "https://static.wixstatic.com/media/ac5a6b_f68faa97814d47d9874669b3457c5ebe~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.webp",
    review:
      "The support and transparency from the franchise team have been outstanding. It's a well-structured model with real business potential.",
    link: "https://www.instagram.com/reel/C5sjVIySylq/?utm_source=ig_web_button_share_sheet",
    stars: 5,
  },
];

export default function FranchiseStories() {
  const [stories, setStories] = useState(defaultFranchiseStories);

  useEffect(() => {
    let mounted = true;
    // Fetch live published reviews from API
    getReviews({ status: "published" })
      .then((data) => {
        if (!mounted || !Array.isArray(data) || data.length === 0) return;

        // Filter reviews designated for homepage or franchise stories, or use top reviews
        const filtered = data.filter(
          (r: any) =>
            !r.displayOn ||
            r.displayOn.length === 0 ||
            r.displayOn.includes("homepage") ||
            r.displayOn.includes("franchise_page")
        );

        const listToUse = filtered.length > 0 ? filtered : data;

        const formatted = listToUse.slice(0, 6).map((r: any, idx: number) => ({
          id: r.id || `live-${idx}`,
          name: r.reviewerName || "Verified Guest",
          location:
            r.relatedCentreName ||
            r.reviewerRole ||
            (r.relatedCentre ? `${r.relatedCentre.name}, ${r.relatedCentre.city}` : "TeaMax Café"),
          image:
            r.reviewerAvatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=420&auto=format&fit=crop&q=80",
          review: r.reviewText,
          link: "https://www.instagram.com/teamaxcafe/",
          stars: r.starRating || 5,
        }));

        setStories(formatted);
      })
      .catch((err) => {
        console.warn("[FranchiseStories] Using default stories due to network:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="tmx-franchise-stories container-xl"
      aria-labelledby="tmx-franchise-stories-title"
    >
      <div className="tmx-franchise-stories-inner">
        {/* LEFT CONTENT */}
        <div className="tmx-franchise-stories-intro">
          <div className="tmx-franchise-stories-eyebrow">
            <span />
            <span>FRANCHISE STORIES &amp; REVIEWS</span>
          </div>

          <h2 id="tmx-franchise-stories-title">
            Built with
            <br />
            <em>TeaMax.</em>
          </h2>

          <p>
            Real stories and reviews from our franchise partners and guests who love
            TeaMax Cafe across India.
          </p>

          {/* Instagram Profile */}
          <a
            href="https://www.instagram.com/teamaxcafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="tmx-franchise-stories-button"
          >
            <span>View More Stories</span>
            <span className="tmx-franchise-stories-arrow">→</span>
          </a>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="tmx-franchise-stories-cards">
          {stories.map((story, index) => (
            <a
              key={story.id || story.name}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`tmx-franchise-story-card tmx-franchise-story-card-${(index % 3) + 1}`}
              aria-label={`View ${story.name}'s TeaMax story`}
            >
              <div className="tmx-franchise-story-avatar">
                <img
                  src={story.image}
                  alt={story.name}
                  loading="lazy"
                />
              </div>

              <h3>{story.name}</h3>

              <div className="tmx-franchise-story-location">
                <span className="tmx-franchise-location-icon">●</span>
                <span>{story.location}</span>
              </div>

              <div
                className="tmx-franchise-story-stars"
                aria-label={`${story.stars} out of 5 stars`}
              >
                {"★".repeat(story.stars || 5)}
              </div>

              <div className="tmx-franchise-story-divider" />

              <p>“{story.review}”</p>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative leaves */}
      <div className="tmx-franchise-stories-leaf tmx-franchise-stories-leaf-top">
        ◇
      </div>

      <div className="tmx-franchise-stories-leaf tmx-franchise-stories-leaf-bottom">
        ◇
      </div>
    </section>
  );
}