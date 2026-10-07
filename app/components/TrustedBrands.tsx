"use client";

import Image from "next/image";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import "./TrustedBrands.css";

const brands = [
  {
    name: "Razorpay",
    image: "/images/brands/Razorpay TeaMax Cafe.webp",
  },
  {
    name: "Amazon",
    image: "/images/brands/amazon.webp",
  },
  {
    name: "Swiggy",
    image: "/images/brands/TeaMax Cafe Swiggy.webp",
  },
  {
    name: "Zomato",
    image: "/images/brands/TeaMax Cafe Zomato.webp",
  },
  {
    name: "Rapido",
    image: "/images/brands/rapido.webp",
  },
  {
    name: "Dunzo",
    image: "/images/brands/TeaMax Cafe Duzo.webp",
  },
  {
    name: "Gati",
    image: "/images/brands/TeaMax Cafe Gati.webp",
  },
];

export default function TrustedBrands() {
  const swiperRef = useRef<SwiperType | null>(null);
const marqueeBrands = [...brands, ...brands, ...brands];
  return (
    <section
      className="tmx-trusted-brands container-xl section-space"
      aria-label="TeaMax trusted partners "
    >
          <div className="section-heading why-heading">
          <div><h2 id="why-heading">Our Associate Partners</h2><span className="short-line" /></div>
          {/* <p>A simple, profitable and scalable café business backed by a strong brand and dedicated support.</p> */}
        </div>
      <div className="tmx-trusted-brands-inner">

        {/* =========================================
            TEAMAX BACKGROUND LOGO
        ========================================= */}

        {/* <img
          src="/images/logo4.png"
          alt=""
          aria-hidden="true"
          className="tmx-trusted-brands-background-logo"
        /> */}


        {/* =========================================
            SLIDER
        ========================================= */}

        <div className="tmx-trusted-brands-slider">

          {/* MOBILE PREVIOUS BUTTON */}

          <button
            type="button"
            className="tmx-trusted-swipe-arrow tmx-trusted-swipe-left"
            aria-label="Previous brand"
          >
            <span>‹</span>
          </button>


          {/* =========================================
              SWIPER
          ========================================= */}

         <Swiper
  modules={[Autoplay, Navigation, FreeMode]}
  className="tmx-trusted-brands-swiper"

  onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}

  navigation={{
    prevEl: ".tmx-trusted-swipe-left",
    nextEl: ".tmx-trusted-swipe-right",
  }}

  slidesPerView={7}
  spaceBetween={24}

  loop={true}
  loopAdditionalSlides={brands.length}

  speed={5000}

  freeMode={{
    enabled: true,
    momentum: false,
  }}

  allowTouchMove={true}
  grabCursor={true}

  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}

  breakpoints={{
    0: {
      slidesPerView: 3,
      spaceBetween: 14,
    },

    480: {
      slidesPerView: 3,
      spaceBetween: 16,
    },

    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1100: {
      slidesPerView: 7,
      spaceBetween: 24,
    },
  }}
>
{marqueeBrands.map((brand, index) => (
    <SwiperSlide
      key={`${brand.name}-${index}`}
      className="tmx-trusted-brands-slide"
    >
      <div className="tmx-trusted-brand-circle">
        <Image
          src={brand.image}
          alt={brand.name}
          width={142}
          height={142}
          className="tmx-trusted-brand-image"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>


          {/* MOBILE NEXT BUTTON */}

          <button
            type="button"
            className="tmx-trusted-swipe-arrow tmx-trusted-swipe-right"
            aria-label="Next brand"
          >
            <span>›</span>
          </button>

        </div>

      </div>
    </section>
  );
}