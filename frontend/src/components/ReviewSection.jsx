import React, { useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../index.css"

import "swiper/css";

const reviews = [
  { id: 1, image: "/reviews/review-1.PNG" },
  { id: 2, image: "/reviews/review-2.PNG" },
  { id: 3, image: "/reviews/review-3.PNG" },
  { id: 4, image: "/reviews/review-4.PNG" },
  { id: 5, image: "/reviews/review-5.PNG" },
  { id: 6, image: "/reviews/review-6.PNG" },
  { id: 7, image: "/reviews/review-7.PNG" },
  { id: 8, image: "/reviews/review-8.PNG" },
  { id: 9, image: "/reviews/review-9.PNG" },
];

const ReviewSection = () => {
  return (
    <section className="py-20 bg-[#fdfbf7]">

      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#064e3b]">
          Honest <span className="italic text-[#c5a059]">Reflections</span>
        </h2>
        <p className="text-lg text-[#064e3b]">The real results from the people who have tried it</p>
      </div>

      {/* Narrow centered container */}
      <div className="max-w-3xl mx-auto">

        <Swiper
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1.5}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 1.7,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 25,
            },
          }}
          modules={[Autoplay]}
          className="reviewSwiper touch-pan-y"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <img
                  src={review.image}
                  alt="review"
                  className="w-full h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default ReviewSection;