
import { ArrowRight, ArrowUp, Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { WhatsAppButton } from "./WhatsAppButton";
import FranchiseBookingButton from "./stores/FranchiseBookingButton";

/* =========================================
   HEADER
========================================= */

export function Header({ active }: { active?: string }) {
  const nav = [
    ["/", "Home"],
    ["/about-us", "Our Story"],
    ["/menu", "Menu"],
    ["/cafe-franchise-india", "Franchise"],
    ["/reviews", "Reviews"],
    ["/blog", "Blog"],
    ["/offers", "Offers"],
  ] as const;

  return (
    <header className="site-header" aria-label="TeaMax site header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="TeaMax home">
          <img
            className="brand-max"
            width={200}
            src="/images/logomain.avif"
            alt="TeaMax"
          />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={active === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-action">
          <Link
            href="/cafe-franchise-india#apply"
            className="cafe-action"
          >
            Apply for Franchise <ArrowRight size={17} />
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <Menu size={22} />
          </summary>

          <nav aria-label="Mobile navigation">
            {nav.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}

            <Link
              href="/cafe-franchise-india#apply"
              className="cafe-action"
            >
              Apply for Franchise <ArrowRight size={17} />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

/* =========================================
   FOOTER
========================================= */

export function Footer() {
  return (
    <footer id="footer" className="tm-footer">

      <div className="tm-footer-container container-xl">

        {/* BRAND */}

        <div className="tm-footer-brand">

          <Link
            href="/"
            className="tm-footer-brand-logo"
            aria-label="TeaMax home"
          >
            <img
              src="/images/logo4.png"
              alt="TeaMax Cafe"
            />
          </Link>

          <p className="tm-footer-description">
            Tea, coffee, fresh juices, shakes, ice creams and café
            favourites — served in a warm, contemporary space made
            for everyday moments.
          </p>

          <div className="tm-footer-venture">
            <span>A Venture of Ashoka Group</span>
            <strong>Since 1969</strong>
          </div>

        </div>

        {/* EXPLORE */}

        <div className="tm-footer-column">

          <h4>Explore</h4>

          <div className="tm-footer-links">
            <Link href="/">Home</Link>
            <Link href="/about-us">Our Story</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/locations">Cafes</Link>
            <Link href="/cafe-franchise-india#apply">Franchise</Link>
            <Link href="/blog">Blog</Link>
          </div>

        </div>

        {/* IMPORTANT LINKS */}

        <div className="tm-footer-column tm-footer-contact">

          <h4>Important Links</h4>

          <div className="tm-footer-links">

            <Link href="/franchise">
              Franchise Opportunities
            </Link>

            <a
              href="https://drive.google.com/file/d/1hXeKMuqImeq0eA3cL_934FS44iZvXJRQ/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Franchise Proposal
            </a>

            <a
              href="https://go.teamaxcafe.in/ythindi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Franchise Explainer
            </a>

            {/* CLIENT COMPONENT BUTTON */}
            <FranchiseBookingButton />

            <Link href="/blog">
              Team Login
            </Link>

          </div>

        </div>

        {/* CONTACT US */}

        <div className="tm-footer-column tm-footer-connect">

          <h4>Contact Us</h4>

          <div className="tm-footer-office">

            <strong>
              TeaMax Cafe India Regd. Office:
            </strong>

            <p>
              4th Floor, Surabhi Rama Complex, Plot No. 106,
              Suchitra Rd, above Kalyan Jewellers, Green Park,
              Kompally, Hyderabad, Telangana 500067
            </p>

          </div>

          <div className="tm-footer-contact-items">

            <a href="tel:+919505047047">
              <Phone size={17} strokeWidth={1.8} />
              <span>+91 9505 047 047</span>
            </a>

            <a href="mailto:hello@teamaxcafe.in">
              <Mail size={17} strokeWidth={1.8} />
              <span>hello@teamaxcafe.in</span>
            </a>

          </div>

          {/* SOCIAL ICONS */}

          <div className="tm-footer-socials pt-5">

            <a
              href="https://www.youtube.com/@teamaxcafeindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TeaMax YouTube"
              title="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.facebook.com/TeaMaxCafe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TeaMax Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/teamaxcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TeaMax Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://link.teamaxcafe.in/whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TeaMax WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

      </div>

      {/* FOOTER BOTTOM */}

      <div className="tm-footer-bottom">

        <Link href="/privacy-policy">
          General & Privacy Policy
        </Link>

        <p>
          © {new Date().getFullYear()} All Rights Reserved with{" "}
          <strong>Ashoka FranMark</strong>
          {" | "}
          A Venture of Ashoka Group
          {" | "}
          Since 1969
        </p>

        <a
          href="#top"
          className="tm-footer-top"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={17} />
        </a>

      </div>

      <WhatsAppButton />

    </footer>
  );
}

/* =========================================
   JSON-LD
========================================= */

export function JsonLd({
  data,
}: {
  data: object | object[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/* =========================================
   FAQ JSON-LD
========================================= */

export function FaqJsonLd({
  questions,
}: {
  questions: {
    q: string;
    a: string;
  }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      }}
    />
  );
}
