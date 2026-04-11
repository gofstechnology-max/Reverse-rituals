import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Droplets
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      subtitle: "Natural Hair Recovery System",
      title: "Stop Hair Fall.\nRegrow .",
      desc: "Scientifically blended Ayurvedic ingredients designed to reduce hair fall, activate dormant follicles, and restore scalp health.",
      image: "/ingredient.png"
    },
    {
      subtitle: "Chemical-Free Hair Care",
      title: "Stronger Roots.\nHealthier Hair.",
      desc: "A complete ritual that detoxifies scalp, improves blood circulation, and promotes thicker and healthier hair growth.",
      image: "/ingredient.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative flex items-center overflow-hidden bg-[#fdfbf7]"
      style={{
        backgroundImage: "url('/leaves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/30"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10 w-full px-6 md:px-16 py-12 md:py-20">

        {/* Right Image */}
        <div className="relative flex justify-center lg:order-2 order-1 w-full">
          <div className="relative w-[260px] sm:w-[380px] md:w-[480px] lg:w-[550px] aspect-square flex items-center justify-center">

            <motion.img
              src={slides[current].image}
              alt="Hair Growth Product"
              loading="eager"
              className="w-full h-full object-contain drop-shadow-xl transform-gpu will-change-transform"

              animate={{
                y: [0, -15, 0]
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

          </div>
        </div>

        {/* Left Content */}
        <div className="text-center lg:text-left lg:order-1 order-2">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >

              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 mb-6">
                <Sparkles size={14} />
                <span className="text-xs tracking-[0.3em] uppercase font-bold">
                  {slides[current].subtitle}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-[#064e3b] leading-[1.1] mb-6 whitespace-pre-line">
                {slides[current].title}
              </h1>

              {/* Description */}
              <p className="text-[#064e3b]/80 text-sm md:text-base lg:text-xl max-w-lg mx-auto lg:mx-0 mb-8 font-medium">
                {slides[current].desc}
              </p>

              {/* Trust Icons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">

                <div className="w-10 md:w-20">
                  <img
                    src="/rr-logo.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>



                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#c5a059]" />
                  <span className="text-sm font-medium">Chemical Free</span>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets size={18} className="text-[#c5a059]" />
                  <span className="text-sm font-medium">Ayurvedic Formula</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

                <button
                  onClick={scrollToProducts}
                  className="px-8 py-4 rounded-full bg-[#064e3b] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#064e3b]/90"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>

                <Link to="/about">
                  <button className="px-8 py-4 rounded-full border border-[#c5a059]/30 font-bold hover:bg-[#c5a059]/10">
                    Our Story
                  </button>
                </Link>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Hero;