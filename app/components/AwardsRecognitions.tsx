import Link from "next/link";
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
  return (
    <section
      className="tmx-awards-section section-space"
      aria-labelledby="tmx-awards-title"
    >
      <div className="tmx-awards-container">

        {/* =========================================
            HEADER
        ========================================= */}

        {/* <header className="tmx-awards-header">

          <div className="tmx-awards-eyebrow">
            <span />
            <span>Awards &amp; Recognition</span>
          </div>

          <h2
            id="tmx-awards-title"
            className="tmx-awards-heading"
          >
            Awards &amp; <em>Recognitions.</em>
          </h2>

          <p className="tmx-awards-subtitle">
            Celebrating the milestones, achievements and recognition
            that have shaped the TeaMax Café journey.
          </p>

        </header> */}
 <div className="section-heading menu-heading-grid">
          <div>
            {/* <p className="kicker"><span>O</span>ur Menu</p> */}
            <h2>Award &amp; Recognition </h2>
            <span className="short-line" />
          </div>
          <div className="menu-intro">
            <p> Celebrating the milestones, achievements and recognition
            that have shaped the TeaMax Café journey.
</p>
            {/* <Link href="/menu" className="cafe-action cafe-outline">Explore Full Menu <ArrowRight size={17} /></Link> */}
          </div>
        </div>

        {/* =========================================
            STICKY AWARD STACK
        ========================================= */}

        <div className="tmx-awards-stack">

          {awards.map((award, index) => (
            <div
              className="tmx-award-pin"
              key={`${award.year}-${award.title}`}
            >
              <article
                className={`tmx-award-card ${
                  index % 2 === 1
                    ? "tmx-award-card-reverse"
                    : ""
                }`}
              >

                {/* =====================================
                    IMAGE
                ===================================== */}

                <div className="tmx-award-image-box">

                  <img
                    src={award.image}
                    alt={award.alt}
                    className="tmx-award-image"
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                </div>


                {/* =====================================
                    CONTENT
                ===================================== */}

                <div className="tmx-award-content">

                  <div className="tmx-award-meta">

                    <span className="tmx-award-label">
                      TeaMax Recognition
                    </span>

                    <span className="tmx-award-year">
                      {award.year}
                    </span>

                  </div>


                  <h3 className="tmx-award-title">
                    {award.title}
                  </h3>


                  <p className="tmx-award-text">
                    {award.text}
                  </p>


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