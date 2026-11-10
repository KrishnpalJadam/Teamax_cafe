
"use client";

import React, { useState } from "react";
import "./AwardsRecognitions.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

const awards = [
  {
    title: "Restaurant of the Year",
    text: "Awarded by Harpal Singh Sokhi at 11th Annual Restaurant Award.",
    image:
      "https://static.wixstatic.com/media/ac5a6b_9d24531761e04c1aac7007f18c9c71ea~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Icons%20for%20TeaMax%20Website%202023.webp",
    alt: "Restaurant of the Year award",
  },
  {
    title: "Top Performing Franchise",
    text: "Awarded by Ashneer Grover at the Bharat Business Awards",
    image:
      "https://static.wixstatic.com/media/ac5a6b_666cfcb6b8a14854898cb9a2f0e09de1~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bharat%20Business%20Awards%20TeaMax%20Cafe%20India.webp",
    alt: "Top Performing Franchise award",
  },
  {
    title: "Brand Innovation of the Year",
    text: "Awarded by Sri Suresh Kumar Singhal, then President of FTCCI, at the",
    image:
      "https://static.wixstatic.com/media/ac5a6b_bcc45811a2094ae0a53990faf9b0f0b8~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IRIE%20Awards.webp",
    alt: "Brand Innovation of the Year award",
  },
  {
    title: "Franchise of the Year",
    text: "Awarded by Shri Madan Lal at the Global Business & Education Awards",
    image:
      "https://static.wixstatic.com/media/ac5a6b_f0e8410376ac4d94ba02c9a202b63d4e~mv2.jpg/v1/crop/x_0,y_0,w_500,h_382/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GBEA%20Awards_edited.jpg",
    alt: "Franchise of the Year award",
  },
  {
    title: "India Brand Icon Awards",
    text: "Awarded by Sunil Gavaskar at International Award Meet",
    image: "/images/IABC 2025 Ashoka FranMark.webp",
    alt: "India Brand Icon Awards",
  },
  {
    title: "Franchise of the Year",
    text: "Awarded by Bhumika Chawla at the Telangana Business Innovation Award",
    image: "/images/Franchise of the Year 2025.webp",
    alt: "Franchise of the Year",
  },
  {
    title: "International Excellence Award",
    text: "Awarded by Padma Shri Saina Nehwal at the International Excellence Awards 2026, organised by Kiteskraft Productions LLP.",
    image:
      "/images/IEA 2026, by Padma Shri Saina Nehwal (1).webp",
    alt: "International Excellence Award",
  },
  {
    title: "Franchise Ecosystem Builder of the Year",
    text: "Awarded by Jaya Prada at the Pride of Southern India Awards",
    image: "/images/Pride of south.webp",
    alt: "Franchise Ecosystem Builder of the Year",
  },
];

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H4v2a4 4 0 0 0 4 4" />
      <path d="M16 6h4v2a4 4 0 0 1-4 4" />
      <path d="M12 13v5" />
      <path d="M8 21h8" />
      <path d="M9 18h6" />
    </svg>
  );
}

export default function AwardsRecognitions() {
  const [expandedAwards, setExpandedAwards] = useState<number[]>([]);

  const toggleDescription = (index: number) => {
    setExpandedAwards((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      className="tmx-awards-section"
      id="awards-recognition"
      aria-labelledby="awards-title"
    >
      <div className="tmx-awards-container">

        {/* Section Heading */}
        <div className="section-heading steps-heading tmx-awards-heading-row">
          <div>
            <h2 id="awards-title">Awards &amp; Recognitions</h2>
            <span className="short-line" />
          </div>

          <p>
            Recognised for our work across café experiences, franchise growth
            and brand innovation.
          </p>
        </div>

        {/* Awards Swiper Slider */}
        <Swiper
          className="tmx-awards-grid"
          modules={[Autoplay, Grid]}
          loop={true}
          speed={1300}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={20}
          grid={{
            rows: 1,
            fill: "row",
          }}
          watchOverflow={true}
          breakpoints={{
            // Mobile: 2 columns x 2 rows
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 12,
              grid: {
                rows: 2,
                fill: "row",
              },
            },

            // Tablet: 2 cards in one row
            601: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 18,
              grid: {
                rows: 1,
                fill: "row",
              },
            },

            // Desktop: 4 cards in one row
            901: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
              grid: {
                rows: 1,
                fill: "row",
              },
            },
          }}
        >
          {awards.map((award, index) => {
            const isExpanded = expandedAwards.includes(index);
            const isLong = award.text.length > 75;

            return (
              <SwiperSlide key={`${award.title}-${index}`}>
                <article className="tmx-award-card">

                  {/* Award Image */}
                  <div className="tmx-award-image-box">
                    <img
                      src={award.image}
                      alt={award.alt}
                      className="tmx-award-image"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Award Content */}
                  <div className="tmx-award-content">

                    {/* Title and Trophy */}
                    <div className="tmx-award-heading">
                      <h3 className="tmx-award-title">
                        {award.title}
                      </h3>

                      <span className="tmx-award-trophy">
                        <TrophyIcon />
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className={`tmx-award-text ${isLong && !isExpanded ? "is-collapsed" : ""
                        }`}
                    >
                      {award.text}
                    </p>

                    {/* View More / Less */}
                    {isLong && (
                      <button
                        type="button"
                        className="tmx-award-view-more"
                        onClick={() => toggleDescription(index)}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded
                            ? `Show less about ${award.title}`
                            : `View more about ${award.title}`
                        }
                      >
                        {isExpanded ? "View less" : "View more"}
                      </button>
                    )}

                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Bottom Note */}
        <div className="tmx-awards-note">
          <span />

          <p>
            Please note: Award presenters are not associated with the brand
            TeaMax Cafe India.
          </p>

          <span />
        </div>

      </div>
    </section>
  );
}
