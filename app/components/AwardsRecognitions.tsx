
"use client";

import "./AwardsRecognitions.css";

const awards = [
  {
    year: "2022",
    title: "Restaurant of the Year 2022",
    text: "@ 11th Annual Restaurant Awards",
    image:
      "https://static.wixstatic.com/media/ac5a6b_9d24531761e04c1aac7007f18c9c71ea~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Icons%20for%20TeaMax%20Website%202023.webp",
    alt: "Restaurant of the Year 2022",
  },
  {
    year: "2024",
    title: "Top Performing Franchise",
    text: "@ Bharat Business Awards 2024",
    image:
      "https://static.wixstatic.com/media/ac5a6b_666cfcb6b8a14854898cb9a2f0e09de1~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bharat%20Business%20Awards%20TeaMax%20Cafe%20India.webp",
    alt: "Top Performing Franchise Bharat Business Awards 2024",
  },
  {
    year: "2024",
    title: "Brand Innovation of the Year",
    text: "@ 2nd IRIE Annual Awards 2024",
    image:
      "https://static.wixstatic.com/media/ac5a6b_bcc45811a2094ae0a53990faf9b0f0b8~mv2.webp/v1/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IRIE%20Awards.webp",
    alt: "Brand Innovation of the Year 2024",
  },
  {
    year: "2023",
    title: "Franchise of the Year 2023",
    text: "@ GBEA Business Awards 2023",
    image:
      "https://static.wixstatic.com/media/ac5a6b_f0e8410376ac4d94ba02c9a202b63d4e~mv2.jpg/v1/crop/x_0,y_0,w_500,h_382/fill/w_400,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GBEA%20Awards_edited.jpg",
    alt: "Franchise of the Year 2023",
  },
];

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
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
  return (
    <section
      className="tmx-awards-section"
      id="awards-recognition"
      aria-labelledby="awards-title"
    >
      <div className="tmx-awards-container">
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

        <div className="tmx-awards-grid">
          {awards.map((award, index) => (
            <article
              className="tmx-award-card"
              key={`${award.year}-${award.title}`}
            >
              <div className="tmx-award-image-box">
                <img
                  src={award.image}
                  alt={award.alt}
                  className="tmx-award-image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              <div className="tmx-award-meta">
                <span className="tmx-award-trophy">
                  <TrophyIcon />
                </span>

                <span className="tmx-award-divider" />

                <span className="tmx-award-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="tmx-award-content">
                <h3 className="tmx-award-title">{award.title}</h3>
                <p className="tmx-award-text">{award.text}</p>
              </div>
            </article>
          ))}
        </div>

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
