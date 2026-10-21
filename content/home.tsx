import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChefHat,
  Coffee,
  Handshake,
  IndianRupee,
  MapPinned,
  MessageCircle,
  Play,
  Rocket,
  Store,
  Target,
  UsersRound,
} from "lucide-react";
import HowItWorks from "../app/HowItWorks";
import FranchiseStories from "../app/components/FranchiseStories";
import TrustedBrands from "../app/components/TrustedBrands";
import HomeBlogSection from "../app/components/HomeBlogSection";
import WhyChooseUs from "../app/components/WhyChooseUs";
import AwardsRecognitions from "../app/components/AwardsRecognitions";
import HomeMenuCategories from "../app/components/HomeMenuCategories";

const A = "https://cafe-blueprint-magic.lovable.app/assets";

const benefits = [
  { icon: IndianRupee, label: <>1242 +<br /></>, des: <>Franchise Partners</> },
  { icon: BarChart3, label: <>27 +<br /></>, des: <>States</> },
  { icon: ChefHat, label: <>51 +<br /></>, des: <>Months</> },
  // { icon: Target, label: <>Complete<br /></>,des:<>Franchise Partners</> },
];

const whyChoose = [
  { icon: Store, text: <>Proven<br />Business Model</> },
  { icon: UsersRound, text: <>Training &amp;<br />Operations Support</> },
  { icon: MessageCircle, text: <>Marketing<br />Support</> },
  { icon: Coffee, text: <>POS &amp;<br />Technology</> },
  { icon: Handshake, text: <>Owner &amp; Staff<br />Training</> },
];

const faqs = [
  [
    "What should I consider before investing in a cafe franchise in India?",
    "Before investing in a cafe franchise, entrepreneurs should evaluate factors such as investment requirement, brand support, menu options, operational guidance, location suitability, and long-term business potential. A structured franchise model can help first-time business owners start their café journey with proper guidance."
  ],
  [
    "Why is TeaMax Cafe considered an affordable cafe franchise opportunity in India?",
    "TeaMax Cafe provides an affordable café franchise model with a focus on simplified operations, standardized processes, menu support, training, and branding assistance. It is designed for entrepreneurs looking for an organized entry into the food and beverage industry."
  ],
  [
    "What makes TeaMax Cafe a suitable chai franchise option for new entrepreneurs?",
    "TeaMax Cafe combines the popularity of chai culture in India with a wider café menu including beverages and snacks. The model supports entrepreneurs with setup guidance, training, operational systems, and marketing assistance to help manage the outlet effectively."
  ],
  [
    "How can I start a cafe franchise business with TeaMax Cafe?",
    "To start a TeaMax Cafe franchise, you can submit a franchise enquiry, discuss business requirements with the team, finalize a suitable location, complete the franchise process, and receive support for café setup, training, and launch."
  ],
  [
    "What support does TeaMax Cafe provide to cafe franchise partners?",
    "TeaMax Cafe supports franchise partners with café setup guidance, equipment assistance, menu planning, training, branding support, digital marketing assistance, and operational guidance to help establish the outlet."
  ]
];

export default function Home() {
  return (
    <div className="tm-home">
      <section className="hero-section martop" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src={`${A}/hero-cafe-zlWPzgb-.jpg`}
          width={1536}
          height={1024}
          priority
          unoptimized
          alt="Tea, burger and fries at TeaMax"
        />
        <div className="container-xl hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">CHAI <span>|</span> CAFÉ <span>|</span> EXPRESS <span>|</span> LOUNGE</p>
            <h1 id="hero-title">A Café<br />Business<br /><span className="marker">Built for You</span></h1>
            <p className="hero-description">Build your café with TeaMax  – a structured franchise model with no royalty and support across setup, training, technology and marketing. </p>
            <div className="hero-actions">
              <Link href="/franchise#apply" className="cafe-action">Get Franchise Details <ArrowRight size={17} /></Link>
              <Link href="/blog" className="play-button" aria-label="Watch TeaMax stories"><Play size={15} fill="currentColor" /></Link>
              <span className="watch-label">Watch Video</span>
            </div>
          </div>
          <div className="hero-handwriting" aria-hidden="true">Good<br />Tea<br /><span>Brighter<br />Days</span></div>
        </div>
      </section>

      <section id="about" className="container-xl perks-wrap" aria-label="TeaMax benefits">
        <div className="perks">
          {benefits.map(({ icon: Icon, label, des }, i) => (
            <div className={`perk perk-${i + 1}`} key={i}>
              {/* <span className="icon-spot"><Icon size={31} strokeWidth={1.6} /></span> */}
              <strong>{label}</strong>
              <span>{des}</span>
            </div>
          ))}
        </div>
      </section>

      <HomeMenuCategories />
      <TrustedBrands />
      <AwardsRecognitions />

      <section id="franchise" className="franchise-section">
        <div className="franchise-photo">
          <Image src={`${A}/shop-cafe-BAkc0VxX.jpg`} alt="TeaMax café store interior" width={1024} height={1024} unoptimized loading="lazy" />
        </div>
        <div className="franchise-content">
          <p className="eyebrow">FRANCHISE OPPORTUNITY</p>
          <h2>Start Your Own<br /><span className="marker">TeaMax Café</span></h2>
          <p className="franchise-description">Build your café with a structured franchise model, backed by setup, training, technology, marketing and operational support.</p>
          <div className="franchise-features">
            {[
              { icon: IndianRupee, a: "Affordable", b: "Investment" },
              { icon: Handshake, a: "No", b: "Royalty" },
              { icon: BarChart3, a: "8–12 Months", b: "ROI" },
              { icon: MapPinned, a: "Pan India", b: "Support" },
            ].map(({ icon: Icon, a, b }) => (
              <div key={a}><span className="round-icon"><Icon size={25} strokeWidth={1.5} /></span><strong>{a}<br />{b}</strong></div>
            ))}
          </div>
          <Link href="/franchise#apply" className="cafe-action">Apply for Franchise <ArrowRight size={17} /></Link>
        </div>
      </section>

      {/* <section className="stats-band " aria-label="TeaMax by the numbers">
        <div className="container-xl stats-inner">
          <div className="stats-map" aria-hidden="true"><MapPinned size={76} strokeWidth={0.7} /></div>
          <div className="stat"><strong>1242+</strong><span>Franchise Partners</span></div>
          <div className="stat"><strong>27+</strong><span>States</span></div>
          <div className="stat"><strong>51</strong><span>Months</span></div>
          <p className="stats-script">Brewing<br />Success<br /><span>Together ♥</span></p>
        </div>
      </section> */}

      {/* <section className="why-section container-xl section-space" aria-labelledby="why-heading">
        <div className="section-heading why-heading">
          <div><h2 id="why-heading">Why Choose TeaMax?</h2><span className="short-line" /></div>
          <p>A simple, profitable and scalable café business backed by a strong brand and dedicated support.</p>
        </div>
        <div className="why-grid">
          {whyChoose.map(({ icon: Icon, text }, i) => (
            <div className="why-item" key={i}><span className="round-icon"><Icon size={26} strokeWidth={1.5} /></span><strong>{text}</strong></div>
          ))}
        </div>

        <div id="stories" className="story-section">
          <div className="story-photo">
            <Image src={`${A}/partner-cafe-DmVDPVbU.jpg`} width={1024} height={768} alt="TeaMax franchise partner holding a cup" unoptimized loading="lazy" />
            <Link href="/blog" className="story-play" aria-label="View TeaMax partner stories"><Play fill="currentColor" /></Link>
          </div>
          <div className="story-copy">
            <p className="eyebrow">PARTNER STORIES</p>
            <blockquote><span>“</span> TeaMax gave me a business that is easy to run and highly profitable. <span>”</span></blockquote>
            <span className="short-line" />
            <p><strong>Franchise Partner</strong><br />Bangalore, Karnataka</p>
            <div className="story-arrows"><Link href="/blog" aria-label="Previous partner story">‹</Link><Link href="/blog" aria-label="Next partner story">›</Link></div>
          </div>
        </div>
      </section> */}
      <WhyChooseUs />

      {/* <section id="gallery" className="steps-section container-xl section-space" aria-labelledby="how-heading">
        <div className="section-heading steps-heading">
          <div><h2 id="how-heading">How It Works?</h2><span className="short-line" /></div>
          <p>A simple 4-step process to start your TeaMax Café.</p>
        </div>
        <div className="steps-grid">
          {[
            { icon: IndianRupee, title: "Apply", detail: "Fill the franchise form" },
            { icon: MessageCircle, title: "Connect", detail: "Discuss with our team" },
            { icon: Store, title: "Confirm", detail: "Finalize location & agreement" },
            { icon: Rocket, title: "Launch", detail: "Get setup & start your café" },
          ].map(({ icon: Icon, title, detail }, i) => (
            <div className="step" key={title}>
              <div className="step-count"><span>{i + 1}</span><b>{i + 1}</b></div>
              <span className="step-icon"><Icon size={25} strokeWidth={1.4} /></span>
              <h3>{title}</h3><p>{detail}</p>
            </div>
          ))}
        </div>
      </section> */}

      <HowItWorks />
      <FranchiseStories />
      <HomeBlogSection />
      <section className="home-faq container-xl " aria-labelledby="faq-heading">
        <div className="home-faq-inner">
          <div><p className="eyebrow">QUICK ANSWERS</p><h2 id="faq-heading">TeaMax Café<br /><span className="marker">FAQs.</span></h2><p>Clear answers about TeaMax, the menu and the franchise opportunity.</p></div>
          <div className="faq-list">
            {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section id="contact" className="container-xl contact-section ">
        <div className="contact-banner">
          <Image src={`${A}/cta-cafe-Du07tmgM.jpg`} width={1200} height={704} alt="A warm cup of chai at TeaMax Café" unoptimized loading="lazy" />
          <div className="contact-shape">
            <h2>Let&apos;s Brew<br />Your Success Story</h2>
            <p>Own a TeaMax Café and be part of a growing community of successful franchise partners.</p>
            <Link href="/franchise#apply" className="cafe-action">Get Franchise Details <ArrowRight size={17} /></Link>
          </div>
          <div className="contact-script">Chai<br /><span>People</span><br />Good<br /><span>Stories</span></div>
        </div>
      </section>
    </div>
  );
}


