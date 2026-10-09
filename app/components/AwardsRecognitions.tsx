"use client";

import { useEffect, useRef } from "react";
import "./AwardsRecognitions.css";

const awards = [
  {
    year: "2022",
    title: "Restaurant of the Year",
    text: "Awarded Restaurant of the Year 2022 @ 11th Annual Restaurant Awards",
    image: "https://static.wixstatic.com/media/ac5a6b_9d24531761e04c1aac7007f18c9c71ea~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Icons%20for%20TeaMax%20Website%202023.webp",
    alt: "Restaurant of the Year 2022",
  },
  {
    year: "2024",
    title: "Top Performing Franchise",
    text: "Awarded Top Performing Franchise @ Bharat Business Awards 2024",
    image: "https://static.wixstatic.com/media/ac5a6b_666cfcb6b8a14854898cb9a2f0e09de1~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bharat%20Business%20Awards%20TeaMax%20Cafe%20India.webp",
    alt: "Top Performing Franchise Bharat Business Awards 2024",
  },
  {
    year: "2024",
    title: "Brand Innovation of the Year",
    text: "Awarded Brand Innovation of the Year @ 2nd IRIE Annual Awards 2024",
    image: "https://static.wixstatic.com/media/ac5a6b_bcc45811a2094ae0a53990faf9b0f0b8~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IRIE%20Awards.webp",
    alt: "Brand Innovation of the Year 2024",
  },
  {
    year: "2023",
    title: "Franchise of the Year",
    text: "Awarded Franchise of the Year 2023 @ GBEA Business Awards 2023",
    image: "https://static.wixstatic.com/media/ac5a6b_f0e8410376ac4d94ba02c9a202b63d4e~mv2.jpg/v1/crop/x_0,y_0,w_500,h_382/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GBEA%20Awards_edited.jpg",
    alt: "Franchise of the Year 2023",
  },
];

export default function AwardsRecognitions() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>(".tmx-award-card")
    );
    if (cards.length === 0) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return; // Last card stays scale 1
          const nextPin = cards[index + 1]?.parentElement;
          if (!nextPin) return;

          const cardRect = card.getBoundingClientRect();
          const nextRect = nextPin.getBoundingClientRect();

          // How much the next card has overlapped over this card
          const overlap = Math.max(0, cardRect.bottom - nextRect.top);
          const range = cardRect.height * 0.9;
          const progress = Math.min(1, Math.max(0, overlap / (range || 1)));

          // Scale smoothly down to 0.94 and slightly dim
          const scale = 1 - progress * 0.055;
          const brightness = 1 - progress * 0.08;

          card.style.transform = `scale(${scale.toFixed(3)})`;
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="tmx-awards-section"
      id="awards-recognition"
      aria-labelledby="tmx-awards-title"
    >
      <div className="tmx-awards-container">
        {/* Header */}

        <div className="section-heading steps-heading">

          <div>
            <h2 id="how-heading"> Award &amp; Recognition</h2>
            <span className="short-line" />
          </div>

          <p>
            Celebrating the milestones, achievements and recognition that have shaped the TeaMax Café journey.
          </p>
        </div>
        {/* Overlapping Card Stack */}
        <div ref={stackRef} className="tmx-awards-stack">
          {awards.map((award, index) => (
            <div
              key={`${award.year}-${award.title}`}
              className="tmx-award-card-pin"
              style={{
                top: `calc(90px + ${index * 26}px)`,
                zIndex: index + 1,
                ["--pin-idx" as string]: index,
              } as React.CSSProperties}
            >
              <article
                className={`tmx-award-card ${index % 2 === 1 ? "tmx-award-card-reverse" : ""
                  }`}
              >
                <div className="tmx-award-image-box">
                  <img
                    src={award.image}
                    alt={award.alt}
                    className="tmx-award-image"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                <div className="tmx-award-content">
                  <div className="tmx-award-meta">
                    <span className="tmx-award-label">TeaMax Recognition</span>
                    <span className="tmx-award-year">{award.year}</span>
                  </div>
                  <h3 className="tmx-award-title">{award.title}</h3>
                  <p className="tmx-award-text">{award.text}</p>
                  <div className="tmx-award-accent">
                    <span />
                    <span />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
