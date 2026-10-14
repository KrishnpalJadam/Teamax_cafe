
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

  // Duplicate items for a continuous loop.
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <>
      <div className="container-xl mt-5 pt-5">
        <div className="container-xl tmx-trusted-heading-container">
          <div className="section-heading why-heading tmx-trusted-heading">
            <div>
              <h2 id="why-heading">Our Associate Partners</h2>
              <span className="short-line" />
            </div>
          </div>
        </div>
      </div>
      <section
        className="tmx-trusted-brands"
        aria-label="TeaMax associate partners"
      >
        {/* Heading aligned with the other XL sections */}


        {/* Full-width wallpaper with slider on top */}
        <div className="tmx-trusted-brands-inner">
          <div className="tmx-trusted-brands-slider">
            {/* Previous button */}
            <button
              type="button"
              className="tmx-trusted-swipe-arrow tmx-trusted-swipe-left"
              aria-label="Previous brand"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg
                viewBox="0 0 16 26"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 3L3 13L13 23"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Brand carousel */}
            <Swiper
              modules={[Autoplay, Navigation, FreeMode]}
              className="tmx-trusted-brands-swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
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
                stopOnLastSlide: false,
                waitForTransition: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2.5,
                  spaceBetween: 12,
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
                      sizes="(max-width: 480px) 86px, (max-width: 767px) 96px, (max-width: 1100px) 112px, 126px"
                      className="tmx-trusted-brand-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Next button */}
            <button
              type="button"
              className="tmx-trusted-swipe-arrow tmx-trusted-swipe-right"
              aria-label="Next brand"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg
                viewBox="0 0 16 26"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 3L13 13L3 23"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
