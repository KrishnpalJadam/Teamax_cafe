import Link from "next/link";
import { getAllBlogPosts } from "../blog/blog-data";
import "./HomeBlogSection.css"
export default function HomeBlogSection() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="tm-home-blog-section">
      <div className="tm-container">

        {/* ================================
            SECTION HEADER
        ================================= */}

        <div className="tm-home-blog-header">

          <div className="tm-home-blog-heading-wrap">

            <span className="tm-home-blog-eyebrow">
              Insights &amp; Stories
            </span>

            <h2 className="tm-home-blog-heading">
            News Blog & Updates
            </h2>

            <p className="tm-home-blog-description">
              Discover franchise insights, café business strategies,
              brewing stories, and beverage trends from TeaMax.
            </p>

          </div>


          {/* Desktop View All */}

          <Link
            href="/blog"
            className="tm-home-blog-view-all"
          >
            View all stories
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

        </div>


        {/* ================================
            BLOG CARDS
        ================================= */}

        <div className="tm-home-blog-grid">

          {posts.map((post) => (

            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="tm-home-blog-card"
            >

              {/* Image */}

              {/* <div className="tm-home-blog-image-wrap">

                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="tm-home-blog-image"
                  loading="lazy"
                />

              </div> */}


              {/* Content */}

              <div className="tm-home-blog-content">

                {/* Top meta */}

                <div className="tm-home-blog-meta">

                  <span className="tm-home-blog-category">
                    {post.category}
                  </span>

                  <span className="tm-home-blog-read-time">
                    {post.readTime}
                  </span>

                </div>


                {/* Title */}

                <h3 className="tm-home-blog-title">
                  {post.title}
                </h3>


                {/* Description */}

                <p className="tm-home-blog-excerpt">
                  {post.excerpt}
                </p>


                {/* Footer */}

                <div className="tm-home-blog-card-footer">

                  <span className="tm-home-blog-date">
                    {post.date}
                  </span>

                  <span className="tm-home-blog-read">
                    Read story

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>


        {/* ================================
            MOBILE VIEW ALL
        ================================= */}

        <div className="tm-home-blog-mobile-action">

          <Link
            href="/blog"
            className="tm-home-blog-view-all"
          >
            View all stories

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>

          </Link>

        </div>

      </div>
    </section>
  );
}