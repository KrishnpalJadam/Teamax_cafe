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

const A = "https://cafe-blueprint-magic.lovable.app/assets";

const menuItems = [
  { name: "Tea", qnt: "20", image: `${A}/menu-tea-GDCVsE9V.jpg`, alt: "Tea served at TeaMax" },
  { name: "Coffee", qnt: "49", image: `${A}/menu-coffee-DRjZy5Da.jpg`, alt: "Coffee served at TeaMax" },
  { name: "Burgers", qnt: "149", image: `${A}/hero-cafe-zlWPzgb-.jpg`, alt: "TeaMax burger with fries and coffee" },
  { name: "Snacks", qnt: "59", image: `${A}/menu-fries-CAp5uNC2.jpg`, alt: "TeaMax fries and snacks" },
  { name: "Thickshakes", qnt: "99", image: `${A}/menu-shake-DCrFsPuS.jpg`, alt: "TeaMax thickshake" },
];

const benefits = [
  { icon: IndianRupee, label: <>No<br />Royalty</> },
  { icon: BarChart3, label: <>Quick<br />ROI</> },
  { icon: ChefHat, label: <>Chef-less<br />SOP Cooking</> },
  { icon: Target, label: <>Complete<br />Support</> },
];

const whyChoose = [
  { icon: Store, text: <>Proven<br />Business Model</> },
  { icon: UsersRound, text: <>Training &amp;<br />Operations Support</> },
  { icon: MessageCircle, text: <>Marketing<br />Support</> },
  { icon: Coffee, text: <>POS &amp;<br />Technology</> },
  { icon: Handshake, text: <>Owner &amp; Staff<br />Training</> },
];

const faqs = [
  ["What is TeaMax Café?", "TeaMax is an Indian café brand built around tea, coffee, beverages, desserts and café favourites, with a franchise-led growth model."],
  ["How can I apply for a TeaMax franchise?", "You can submit a franchise enquiry through the TeaMax franchise page. The team can then discuss location, investment and setup requirements."],
  ["What does TeaMax support include?", "TeaMax presents a structured support model covering setup guidance, operating processes, staff training, technology and marketing support."],
  ["Where can I find the TeaMax menu?", "The complete menu is available on the TeaMax Menu page, covering tea, coffee, shakes, juices, ice creams and other café favourites."],
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
          {benefits.map(({ icon: Icon, label }, i) => (
            <div className={`perk perk-${i + 1}`} key={i}>
              <span className="icon-spot"><Icon size={31} strokeWidth={1.6} /></span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="menu-section container-xl section-space">
        <div className="section-heading menu-heading-grid">
          <div>
            <p className="kicker"><span>O</span>ur Menu</p>
            <h2>Something for<br />Every Craving </h2>
            <span className="short-line" />
          </div>
          <div className="menu-intro">
            <p>From classic teas and coffees to shakes, snacks and quick bites, TeaMax offers a menu designed for everyday café moments.
</p>
            <Link href="/menu" className="cafe-action cafe-outline">Explore Full Menu <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div id="menu-cards" className="menu-grid">
          {menuItems.map((item) => (
            <Link href="/menu" className="menu-card" key={item.name}>
              <Image src={item.image} alt={item.alt} width={816} height={816} unoptimized loading="lazy" />
              <div className="menu-card-copy"><h3>{item.name}</h3><p> {item.qnt} +</p></div>
            </Link>
          ))}
        </div>
      </section>
      <TrustedBrands/>

      <section id="franchise" className="franchise-section section-space">
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

      <section className="stats-band " aria-label="TeaMax by the numbers">
        <div className="container-xl stats-inner">
          <div className="stats-map" aria-hidden="true"><MapPinned size={76} strokeWidth={0.7} /></div>
          <div className="stat"><strong>1242+</strong><span>Franchise Partners</span></div>
          <div className="stat"><strong>27+</strong><span>States</span></div>
          <div className="stat"><strong>51</strong><span>Months</span></div>
          <p className="stats-script">Brewing<br />Success<br /><span>Together ♥</span></p>
        </div>
      </section>

      <section className="why-section container-xl section-space" aria-labelledby="why-heading">
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
      </section>

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

      <HowItWorks/>
<FranchiseStories/>
<HomeBlogSection/>
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
