import React, { useState, useEffect } from "react";
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
      title: "Stop Hair Fall.\nRegrow Hair.",
      desc: "Scientifically blended Ayurvedic ingredients designed to reduce hair fall, activate dormant follicles, and restore scalp health.",
      image: "/ingredient.png"
    },
    {
      subtitle: "The Reverse Ritual",
      title: "Stronger Roots.\nThicker Hair.",
      desc: "A complete hair care system with Rosemary Alchemy Water, Neem Comb & Massager for visible results in 21 days.",
      image: "/ingredient.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
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
      className="relative w-full h-[850px] md:h-[600px] lg:h-[550px] overflow-hidden bg-[#fdfbf7]"
      style={{
        backgroundImage: "url('/leaves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: ""
      }}
    >
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Fixed height container - content centered */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 lg:gap-8 items-center relative z-10 w-full h-full px-4 md:px-8">

        {/* Image - only desktop */}
        <div className=" lg:flex items-center justify-center mx-auto">
          <div className="w-[300px] xl:w-[420px] ">
            <motion.img
              key={`img-${current}`}
              src={slides[current].image}
              alt="Hair Growth Product"
              loading="eager"
              className="w-full object-contain drop-shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Text Content - centered in container */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
          <div className="flex flex-col items-center lg:items-start max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 mb-4"
                >
                  <Sparkles size={14} />
                  <span className="text-xs tracking-[0.1em] uppercase font-bold">
                    {slides[current].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#064e3b] leading-tight mb-4 whitespace-pre-line"
                >
                  {slides[current].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#064e3b]/80 text-sm md:text-base mb-6 font-medium"
                >
                  {slides[current].desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-6 mb-8 mx-auto justify-center"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#c5a059]" />
                    <span className="text-sm font-medium">Chemical Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-[#c5a059]" />
                    <span className="text-sm font-medium">Ayurvedic Formula</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 justify-center md:flex-row flex-col items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToProducts}
                    className="px-8 py-4 rounded-full bg-[#064e3b] text-white font-bold flex items-center gap-3 hover:bg-[#064e3b]/90 cursor-pointer"
                  >
                    Shop Now
                    <ArrowRight size={18} />
                  </motion.button>

                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full border border-[#c5a059]/30 font-bold hover:bg-[#c5a059]/10 cursor-pointer"
                    >
                      Our Story
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;