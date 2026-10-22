"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./franchise.css";
import { Header } from "../components";
import FranchiseFormSection from "./franchise-form";
import {
  Users,
  MapPin,
  Percent,
  Download,
  IndianRupee,
  ChefHat,
  Coins,
  Store,
  Award,
  TrendingUp,
  Laptop,
  Megaphone,
  Headphones,
  Calculator,
  Maximize2,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Handshake,
  LayoutGrid,
  Wrench,
  Rocket,
  Check,
  Star,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


import dynamic from "next/dynamic";

const FranchiseIndiaMap = dynamic(
  () => import("./FranchiseIndiaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="tm-fc-map-loading">Loading map...</div>
    ),
  }
);

export function FranchiseClient() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Categories slider state
  const [catIndex, setCatIndex] = useState(0);
  const [itemsPerViewCat, setItemsPerViewCat] = useState(6);
  const catTouchStartX = useRef<number | null>(null);

  // Testimonials slider state
  const [testIndex, setTestIndex] = useState(0);
  const [itemsPerViewTest, setItemsPerViewTest] = useState(3);
  const testTouchStartX = useRef<number | null>(null);

  // Categories list (8 items)
  const categories = [
    {
      name: "Tea & Coffee",
      image:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Burgers & Sandwiches",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Fries & Snacks",
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Pizza & Pasta",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Milkshakes & Thickshakes",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mojitos & Refreshers",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Gourmet Momos",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Artisanal Desserts",
      image:
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Testimonials list (6 items)
  const testimonials = [
    {
      name: "Rohit Sharma",
      city: "Bangalore",
      quote:
        "Simple operations, great support and a popular brand. TeaMax has been a wonderful business opportunity for me.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Pooja Nair",
      city: "Kolkata",
      quote:
        "The training and marketing guidance helped us open smoothly. Our customers love the menu and quality.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Amit Verma",
      city: "Pune",
      quote:
        "No royalty and a clear business model. TeaMax is easy to manage and gives exceptional daily returns.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Rajesh Patel",
      city: "Ahmedabad",
      quote:
        "The chef-less setup made it so simple to launch. Footfall and repeat chai lovers have exceeded our targets.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Sneha Reddy",
      city: "Hyderabad",
      quote:
        "From location audit to Swiggy & Zomato onboarding, the operational helpline supported us at every stage.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Vikram Chauhan",
      city: "Jaipur",
      quote:
        "Low investment with turnkey 25-day opening. TeaMax provides true national brand power and high margins.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    },
  ];

  // FAQs list
  const faqs = [
    {
      q: "How much does a TeaMax franchise cost?",
      a: "The core TeaMax franchise package starts at ₹3,69,999 (+ applicable taxes). Depending on your chosen location, initial raw materials, transport and shop interior setup (approx ₹60,000–₹70,000 for 100 sq.ft), the total estimated setup budget is approximately ₹4.39 Lakhs.",
    },
    {
      q: "What is the franchise license period?",
      a: "The standard franchise license agreement is granted for 5 Years. After 5 years, license renewal terms apply as per company policy with minimal administrative overhead.",
    },
    {
      q: "Does TeaMax charge royalty?",
      a: "No! TeaMax operates on a 0% ongoing royalty model. All profits from your day-to-day beverage and food sales belong 100% to you as the franchise partner.",
    },
    {
      q: "How long does café setup take?",
      a: "Our streamlined setup timeline is only 25 to 30 days from agreement signing to store inauguration, thanks to our standardized kitchen equipment package and modular counter designs.",
    },
    {
      q: "Do I need experience in the food business?",
      a: "No prior experience is necessary. Our chef-less operating model, standardized recipes, automated kitchen machinery, and in-depth training ensure anyone can operate the cafe smoothly.",
    },
    {
      q: "Does TeaMax guarantee profits?",
      a: "While no business can guarantee absolute profits, TeaMax provides high gross margins (55%–65%), proven operating SOPs, national marketing visibility, and aggregator onboarding (Swiggy/Zomato) to maximize your success.",
    },
  ];

  // Screen resize listener for dynamic slide counts
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setItemsPerViewCat(2);
        setItemsPerViewTest(1);
      } else if (w < 768) {
        setItemsPerViewCat(3);
        setItemsPerViewTest(1);
      } else if (w < 1024) {
        setItemsPerViewCat(4);
        setItemsPerViewTest(2);
      } else {
        setItemsPerViewCat(6);
        setItemsPerViewTest(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Category slider controls
  const maxCatIndex = Math.max(0, categories.length - itemsPerViewCat);
  const handleCatPrev = () => {
    setCatIndex((prev) => (prev > 0 ? prev - 1 : maxCatIndex));
  };
  const handleCatNext = () => {
    setCatIndex((prev) => (prev < maxCatIndex ? prev + 1 : 0));
  };

  // Testimonial slider controls
  const maxTestIndex = Math.max(0, testimonials.length - itemsPerViewTest);
  const handleTestPrev = () => {
    setTestIndex((prev) => (prev > 0 ? prev - 1 : maxTestIndex));
  };
  const handleTestNext = () => {
    setTestIndex((prev) => (prev < maxTestIndex ? prev + 1 : 0));
  };

  // Touch Swipe handlers for Categories
  const handleCatTouchStart = (e: React.TouchEvent) => {
    catTouchStartX.current = e.touches[0].clientX;
  };
  const handleCatTouchEnd = (e: React.TouchEvent) => {
    if (catTouchStartX.current === null) return;
    const diff = catTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleCatNext();
    else if (diff < -40) handleCatPrev();
    catTouchStartX.current = null;
  };

  // Touch Swipe handlers for Testimonials
  const handleTestTouchStart = (e: React.TouchEvent) => {
    testTouchStartX.current = e.touches[0].clientX;
  };
  const handleTestTouchEnd = (e: React.TouchEvent) => {
    if (testTouchStartX.current === null) return;
    const diff = testTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleTestNext();
    else if (diff < -40) handleTestPrev();
    testTouchStartX.current = null;
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleHeroWhatsApp = () => {
    const msg =
      "Hi TeaMax Team, I would like to get franchise details for TeaMax Cafe (₹3.69 Lakh model). Please send me the franchise proposal.";
    window.open(
      `https://api.whatsapp.com/send?phone=919505047047&text=${encodeURIComponent(
        msg
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const scrollToForm = () => {
    const el = document.getElementById("franchise-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tm-fc-page">
      {/* ====================================================================
          1. HEADER / NAVBAR
          ==================================================================== */}
      <Header />

      {/* ====================================================================
          2. HERO SECTION
          ==================================================================== */}
      <section className="tm-fc-hero">
        <div className="tm-fc-container">
          <div className="tm-fc-hero-grid">
            {/* Left Content */}
            <div className="tm-fc-hero-content">
              <span className="tm-fc-tag-script">#aajkichai</span>

              <h1 className="tm-fc-hero-title">
                Start Your Own
                <br />
                TeaMax Café Franchise
                <span className="highlight-yellow">at ₹3.69 Lakh*</span>
              </h1>

              <p className="tm-fc-hero-sub">
                Zero Royalty. Chef-less Operations.
                <br />
                Complete Franchise Support.
              </p>

              {/* Stats badges with Lucide Icons */}
              <div className="tm-fc-hero-stats">
                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <Users size={18} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>1,200+</strong>
                    <span>Partner Signups</span>
                  </div>
                </div>

                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <MapPin size={18} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>27+</strong>
                    <span>States</span>
                  </div>
                </div>

                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <Percent size={18} strokeWidth={2.5} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>0%</strong>
                    <span>Royalty</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tm-fc-hero-actions">
                <button
                  onClick={handleHeroWhatsApp}
                  className="tm-fc-btn-primary"
                >
                  <span>Get Details on WhatsApp</span>
                  <FaWhatsapp size={19} />
                </button>

                <button
                  onClick={scrollToForm}
                  className="tm-fc-btn-secondary"
                >
                  <span>Download Proposal</span>
                  <Download size={17} strokeWidth={2.2} />
                </button>
              </div>

              <p className="tm-fc-hero-disclaimer">
                *Franchise fee ₹3,69,999 + applicable taxes. Interior setup and
                other applicable expenses are additional.
              </p>
            </div>

            {/* Right Visual Image */}
            <div className="tm-fc-hero-visual">
              <div className="tm-fc-hero-img-wrap">
                <img
                  src="/images/franchise-hero-combo.jpg"
                  alt="TeaMax Food & Beverage Combo Spread"
                  className="tm-fc-hero-img"
                  width="500"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. KEY HIGHLIGHTS BAR (Ribbon) - Lucide Icons
          ==================================================================== */}
      <section className="tm-fc-ribbon">
        <div className="tm-fc-container">
          <div className="tm-fc-ribbon-grid">
            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <Percent size={22} strokeWidth={2.5} />
              </div>
              <div className="tm-fc-ribbon-title">Zero Royalty</div>
              <div className="tm-fc-ribbon-sub">No monthly royalty</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <ChefHat size={23} strokeWidth={2.2} />
              </div>
              <div className="tm-fc-ribbon-title">Chef-less Model</div>
              <div className="tm-fc-ribbon-sub">Easy SOP operations</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <IndianRupee size={22} strokeWidth={2.4} />
              </div>
              <div className="tm-fc-ribbon-title">Affordable Investment</div>
              <div className="tm-fc-ribbon-sub">₹3.69 Lakh + taxes</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <Store size={22} strokeWidth={2.2} />
              </div>
              <div className="tm-fc-ribbon-title">Complete Setup Support</div>
              <div className="tm-fc-ribbon-sub">Equipment & training</div>
            </div>

            <div className="tm-fc-ribbon-item ribbon-span-mobile">
              <div className="tm-fc-ribbon-icon">
                <Award size={23} strokeWidth={2.2} />
              </div>
              <div className="tm-fc-ribbon-title">Proven Business Model</div>
              <div className="tm-fc-ribbon-sub">Pan India success</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. YOUR CAFÉ BUSINESS, MADE SIMPLE. - Lucide Icons
          ==================================================================== */}
      <section className="tm-fc-simple-section">
        <div className="tm-fc-container">
          <div className="tm-fc-simple-grid">
            <div className="tm-fc-simple-media">
              <img
                src="/images/franchise-storefront.jpg"
                alt="Modern TeaMax Cafe Storefront and Counter"
                width="600"
                height="450"
              />
            </div>

            <div className="tm-fc-simple-content">
              <h2>
                Your Café Business,
                <br />
                Made Simple.
              </h2>
              <p className="lead">
                TeaMax brings together a standardized food and beverage menu,
                practical operating procedures and franchise support to help
                entrepreneurs start and manage their own branded café.
              </p>

              <div className="tm-fc-features-grid">
                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Percent size={20} strokeWidth={2.4} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>No Royalty</strong>
                    <span>on your sales</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <ChefHat size={21} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Chef-less</strong>
                    <span>operations</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Coins size={20} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Low Investment</strong>
                    <span>₹3.69 Lakh + taxes</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Laptop size={20} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Training &</strong>
                    <span>POS support</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Megaphone size={20} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Marketing</strong>
                    <span>guidance</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Headphones size={20} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Ongoing</strong>
                    <span>franchise support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. FRANCHISE INVESTMENT SECTION - Lucide Icons
          ==================================================================== */}
      <section className="tm-fc-investment-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header left-aligned">
            <h2 className="tm-fc-section-title">Franchise Investment</h2>
            <p className="tm-fc-section-desc" style={{ margin: 0 }}>
              A clear investment structure to help you plan confidently.
            </p>
          </div>

          <div className="tm-fc-invest-grid">
            {/* Card 1: Dark Forest Green */}
            <div className="tm-fc-invest-card-dark">
              <div>
                <span className="card-tag">Franchise Package</span>
                <div className="card-price">₹3,69,999</div>
                <div className="card-tax">+ Applicable Taxes</div>

                <ul className="tm-fc-dark-list">
                  <li>
                    <span>Franchise License</span>
                    <strong>5 Years</strong>
                  </li>
                  <li>
                    <span>Royalty</span>
                    <strong>0%</strong>
                  </li>
                  <li>
                    <span>Booking Amount</span>
                    <strong>₹10,000</strong>
                  </li>
                </ul>
              </div>

              <p className="card-foot">
                *Booking amount adjusted against final franchise fee.
              </p>
            </div>

            {/* Card 2: White Table Card */}
            <div className="tm-fc-invest-card-table">
              <div>
                <h3>Additional Setup Investment (Estimated)</h3>
                <div className="tm-fc-table-rows">
                  <div className="tm-fc-table-row">
                    <span>Interior & Exterior Setup (100 sq. ft.)</span>
                    <strong>₹60,000 – ₹70,000</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Initial Raw Materials</span>
                    <strong>Additional</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Transportation</span>
                    <strong>Additional</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Shop Rent, Deposit & Utilities</span>
                    <strong>As applicable</strong>
                  </div>
                </div>

                <div className="tm-fc-table-highlight">
                  <span>Illustrative Total (Excl. Taxes)</span>
                  <strong>₹4,39,999</strong>
                </div>
              </div>

              <p className="note">
                *Interior estimate is based on planning figure. Actual cost
                depends on location, size, layout and materials.
              </p>
            </div>

            {/* Card 3: Yellow Download Card with Calculator icon */}
            <div className="tm-fc-invest-card-yellow">
              <div className="tm-fc-calc-icon">
                <Calculator size={26} strokeWidth={2.2} />
              </div>

              <h3>Get Detailed Investment Breakup</h3>

              <button onClick={scrollToForm} className="tm-fc-btn-dark">
                <span>Download Now</span>
                <Download size={16} strokeWidth={2.3} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. WHAT'S INCLUDED IN THE FRANCHISE PACKAGE
          ==================================================================== */}
      <section className="tm-fc-package-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header left-aligned">
            <h2 className="tm-fc-section-title">
              What&apos;s Included in the Franchise Package
            </h2>
            <p className="tm-fc-section-desc" style={{ margin: 0 }}>
              Everything you need to get started.
            </p>
          </div>

          <div className="tm-fc-package-grid">
            {/* Card 1: Kitchen Equipment */}
            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/franchise-kitchen-equipment.jpg"
                  alt="Kitchen Equipment Set"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Kitchen Equipment</h3>
                <ul className="tm-fc-package-list">
                  <li>Tea & Coffee Machine</li>
                  <li>Deep Freezer</li>
                  <li>Refrigerator</li>
                  <li>Griller, Fryer, Blender</li>
                  <li>Chopper, Induction Stove</li>
                  <li>Beverage Flask</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Café Setup & Branding */}
            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/franchise-setup-branding.jpg"
                  alt="Café Setup and Branding"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Café Setup & Branding</h3>
                <ul className="tm-fc-package-list">
                  <li>Café Layout & Design Guidelines</li>
                  <li>3D Design Assistance</li>
                  <li>Branding Guidelines</li>
                  <li>Menu Designs</li>
                  <li>Startup Kit & Packaging Essentials</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Training & Technology */}
            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/franchise-training-tech.jpg"
                  alt="Training and POS Technology"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Training & Technology</h3>
                <ul className="tm-fc-package-list">
                  <li>Owner & Staff Training</li>
                  <li>Standard Recipes & SOPs</li>
                  <li>POS Billing Software</li>
                  <li>Inventory Management</li>
                  <li>Sales Reporting Tools</li>
                </ul>
              </div>
            </div>

            {/* Card 4: Business Support */}
            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/franchise-business-support.jpg"
                  alt="Business Support and Partnership"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Business Support</h3>
                <ul className="tm-fc-package-list">
                  <li>FSSAI Registration Assistance</li>
                  <li>Swiggy & Zomato Onboarding</li>
                  <li>Marketing Guidelines</li>
                  <li>Franchise Helpline</li>
                  <li>Operational Assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SMALL SPACE. BIG BUSINESS POSSIBILITIES. - Lucide Icons
          ==================================================================== */}
      <section className="tm-fc-space-section">
        <div className="tm-fc-container">
          <div className="tm-fc-space-grid">
            <div className="tm-fc-space-content">
              <h2>
                Small Space.
                <br />
                Big Business Possibilities.
              </h2>
              <p className="lead">
                TeaMax is designed to operate in compact spaces, making it
                suitable for high-footfall areas.
              </p>

              <div className="tm-fc-space-stats">
                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Maximize2 size={18} strokeWidth={2.3} />
                  </div>
                  <strong>80-100 sq. ft.</strong>
                  <span>Min. Space</span>
                </div>

                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Store size={18} strokeWidth={2.3} />
                  </div>
                  <strong>150-200 sq. ft.</strong>
                  <span>Recommended</span>
                </div>

                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Building2 size={18} strokeWidth={2.3} />
                  </div>
                  <strong>Ground Floor</strong>
                  <span>Preferred</span>
                </div>
              </div>

              <button onClick={scrollToForm} className="tm-fc-btn-primary">
                <span>Check My Location Eligibility</span>
                <ArrowRight size={17} strokeWidth={2.3} />
              </button>
            </div>

            {/* Split Dark Card with Lucide MapPin */}
            <div className="tm-fc-space-card-split">
              <div className="tm-fc-space-locations">
                <h3>Ideal Café Locations</h3>
                <ul className="tm-fc-location-list">
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    Colleges & Educational Areas
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    Residential Neighbourhoods
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    Commercial Markets
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    Office & Business Districts
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    Main Roads & Shopping Streets
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.4} className="tm-fc-loc-icon" />
                    High-Footfall Transit Areas
                  </li>
                </ul>
              </div>

              <div className="tm-fc-space-img-wrap">
                <img
                  src="/images/franchise-storefront.jpg"
                  alt="Compact TeaMax Kiosk Storefront"
                  className="tm-fc-space-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. ONE CAFÉ. MULTIPLE FOOD & BEVERAGE CATEGORIES. (ACTIVE SLIDER)
          ==================================================================== */}
      <section className="tm-fc-categories-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header">
            <h2 className="tm-fc-section-title">
              One Café. Multiple Food & Beverage Categories.
            </h2>
            <p className="tm-fc-section-desc">
              A flexible menu designed around convenience, standardized
              preparation and customer preferences.
            </p>
          </div>

          <div
            className="tm-fc-slider-wrapper"
            onTouchStart={handleCatTouchStart}
            onTouchEnd={handleCatTouchEnd}
          >
            <button
              className="tm-fc-slider-arrow prev"
              onClick={handleCatPrev}
              aria-label="Previous category slide"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <div className="tm-fc-slider-track-container">
              <div
                className="tm-fc-slider-track"
                style={{
                  transform: `translateX(-${(catIndex * 100) / itemsPerViewCat}%)`,
                }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="tm-fc-slide-item"
                    style={{
                      flex: `0 0 ${100 / itemsPerViewCat}%`,
                      maxWidth: `${100 / itemsPerViewCat}%`,
                    }}
                  >
                    <div className="tm-fc-cat-card">
                      <div className="tm-fc-cat-thumb">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          width="240"
                          height="180"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="tm-fc-cat-name">{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="tm-fc-slider-arrow next"
              onClick={handleCatNext}
              aria-label="Next category slide"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="tm-fc-slider-dots">
            {Array.from({ length: maxCatIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`tm-fc-dot ${catIndex === idx ? "active" : ""}`}
                onClick={() => setCatIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FROM APPLICATION TO CAFÉ LAUNCH (TIMELINE)
          ==================================================================== */}
      <section className="tm-fc-timeline-section">
        <div className="tm-fc-container">
          <div className="tm-fc-timeline-header-wrap">
            <h2 className="tm-fc-section-title">
              From Application to Café Launch
            </h2>
            <div className="tm-fc-timeline-badge">
              Estimated Setup Timeline: 25–30 Days
            </div>
          </div>

          <div className="tm-fc-timeline-grid">
            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <FileText size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Apply for Franchise</h3>
              <p className="tm-fc-step-desc">
                Submit your enquiry and receive the proposal.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Handshake size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Registration & Agreement</h3>
              <p className="tm-fc-step-desc">
                Complete registration and review terms.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <MapPin size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Location Assessment</h3>
              <p className="tm-fc-step-desc">
                Share your proposed premises for evaluation.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <LayoutGrid size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Café Design & Equipment</h3>
              <p className="tm-fc-step-desc">
                Get design guidance and material processing.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Wrench size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Setup & Training</h3>
              <p className="tm-fc-step-desc">
                Complete café setup and training.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Rocket size={22} strokeWidth={2.2} />
              </div>
              <h3 className="tm-fc-step-title">Launch Your TeaMax</h3>
              <p className="tm-fc-step-desc">
                Start operations with launch guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. BUSINESS SUPPORT + FRANCHISE NETWORK
          ==================================================================== */}
      <section className="tm-fc-network-section">
        <div className="tm-fc-container">
          <div className="tm-fc-network-grid">

            <div className="tm-fc-support-col">
              <h2>
                You&apos;re in Business
                <br />
                for Yourself, Not by Yourself.
              </h2>
              <p className="lead">
                TeaMax provides support at every stage of your franchise
                journey.
              </p>

              <ul className="tm-fc-support-checklist">
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Location analysis & design support
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Training & operational guidance
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  National brand visibility
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Social media & local marketing guidelines
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Swiggy & Zomato onboarding support
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Franchise helpline and ongoing assistance
                </li>
              </ul>
            </div>


            <div className="tm-fc-network-card">
              {/* <div className="tm-fc-network-stats-col">
                <h3>Our Franchise Network</h3>
                <div className="tm-fc-network-stats-grid">
                  <div className="tm-fc-net-stat-row">
                    <div className="tm-fc-net-stat-icon">
                      <Users size={18} strokeWidth={2.3} />
                    </div>
                    <div className="tm-fc-net-stat-info">
                      <strong>1,298+</strong>
                      <span>Franchise Partner Signups</span>
                    </div>
                  </div>

                  <div className="tm-fc-net-stat-row">
                    <div className="tm-fc-net-stat-icon">
                      <MapPin size={18} strokeWidth={2.3} />
                    </div>
                    <div className="tm-fc-net-stat-info">
                      <strong>27+</strong>
                      <span>States</span>
                    </div>
                  </div>

                  <div className="tm-fc-net-stat-row">
                    <div className="tm-fc-net-stat-icon">
                      <TrendingUp size={18} strokeWidth={2.3} />
                    </div>
                    <div className="tm-fc-net-stat-info">
                      <strong>14+</strong>
                      <span>Avg. Launches per Month</span>
                    </div>
                  </div>

                  <div className="tm-fc-net-stat-row">
                    <div className="tm-fc-net-stat-icon">
                      <Star size={18} strokeWidth={2.3} fill="#102d29" />
                    </div>
                    <div className="tm-fc-net-stat-info">
                      <strong>9.1/10</strong>
                      <span>Partner Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="tm-fc-network-map-col">
                <span className="tm-fc-map-tag">Growing Across India</span>
                <svg
                  className="tm-fc-map-svg"
                  viewBox="0 0 300 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M135 25 L160 20 L180 40 L165 75 L200 95 L220 85 L250 115 L230 140 L200 135 L190 170 L210 190 L180 230 L160 270 L140 330 L130 290 L100 240 L85 200 L75 160 L50 145 L70 110 L100 95 L110 50 Z"
                    fill="#0a3d38"
                    stroke="#1c5c55"
                    strokeWidth="2"
                  />
                  <line
                    x1="60"
                    y1="100"
                    x2="240"
                    y2="100"
                    stroke="#144e47"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="70"
                    y1="180"
                    x2="210"
                    y2="180"
                    stroke="#144e47"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="100"
                    y1="260"
                    x2="170"
                    y2="260"
                    stroke="#144e47"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                 
                  <circle cx="135" cy="85" r="5" fill="#ffd028" />
                  <circle
                    cx="135"
                    cy="85"
                    r="9"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />

                  <circle cx="85" cy="185" r="5" fill="#ffd028" />
                  <circle
                    cx="85"
                    cy="185"
                    r="9"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />

                  <circle cx="115" cy="265" r="5" fill="#ffd028" />
                  <circle
                    cx="115"
                    cy="265"
                    r="9"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />

                  <circle cx="130" cy="215" r="5" fill="#ffd028" />
                  <circle cx="135" cy="275" r="4.5" fill="#ffd028" />
                  <circle cx="210" cy="145" r="5" fill="#ffd028" />
                  <circle
                    cx="210"
                    cy="145"
                    r="9"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  <circle cx="120" cy="140" r="4" fill="#ffd028" />
                  <circle cx="78" cy="140" r="4" fill="#ffd028" />

                  <polygon
                    points="245,285 260,260 275,285 260,310"
                    fill="none"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                  <polygon
                    points="25,45 35,30 45,45 35,60"
                    fill="none"
                    stroke="#ffd028"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                </svg>
              </div> */}
              <FranchiseIndiaMap />
            </div>
          </div>
        </div>

      </section>

      {/* ====================================================================
          11. WHAT OUR FRANCHISE PARTNERS SAY (ACTIVE SLIDER)
          ==================================================================== */}
      <section className="tm-fc-testimonials-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header">
            <h2 className="tm-fc-section-title">
              What Our Franchise Partners Say
            </h2>
          </div>

          <div
            className="tm-fc-slider-wrapper"
            onTouchStart={handleTestTouchStart}
            onTouchEnd={handleTestTouchEnd}
          >
            <button
              className="tm-fc-slider-arrow prev"
              onClick={handleTestPrev}
              aria-label="Previous testimonial slide"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <div className="tm-fc-slider-track-container">
              <div
                className="tm-fc-slider-track"
                style={{
                  transform: `translateX(-${(testIndex * 100) / itemsPerViewTest}%)`,
                }}
              >
                {testimonials.map((test) => (
                  <div
                    key={test.name}
                    className="tm-fc-slide-item"
                    style={{
                      flex: `0 0 ${100 / itemsPerViewTest}%`,
                      maxWidth: `${100 / itemsPerViewTest}%`,
                    }}
                  >
                    <div className="tm-fc-test-card">
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          marginBottom: "12px",
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            fill="#ffd028"
                            color="#ffd028"
                          />
                        ))}
                      </div>
                      <p className="tm-fc-test-quote">“{test.quote}”</p>
                      <div className="tm-fc-test-author">
                        <img
                          src={test.image}
                          alt={test.name}
                          className="tm-fc-test-avatar"
                        />
                        <div className="tm-fc-test-info">
                          <strong>{test.name}</strong>
                          <span>{test.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="tm-fc-slider-arrow next"
              onClick={handleTestNext}
              aria-label="Next testimonial slide"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="tm-fc-slider-dots">
            {Array.from({ length: maxTestIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`tm-fc-dot ${testIndex === idx ? "active" : ""}`}
                onClick={() => setTestIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. FREQUENTLY ASKED QUESTIONS
          ==================================================================== */}
      <section className="tm-fc-faq-section">
        <div className="tm-fc-container">
          <div className="tm-fc-faq-top">
            <h2 className="tm-fc-section-title">Frequently Asked Questions</h2>

          </div>

          <div className="tm-fc-faq-grid">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className={`tm-fc-faq-item ${openFaq === idx ? "open" : ""}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="tm-fc-faq-question">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <HelpCircle size={17} className="tm-fc-faq-icon-user" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="tm-fc-faq-chevron"
                    style={{
                      transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </div>
                {openFaq === idx && (
                  <div className="tm-fc-faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          13. BOTTOM LEAD CAPTURE FORM (From franchise-form.tsx)
          ==================================================================== */}
      <div id="#apply">
        <FranchiseFormSection />
      </div>
    </div>
  );
}
