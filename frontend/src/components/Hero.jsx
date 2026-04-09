import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Leaf, Droplets, ChevronDown, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const slides = [
    {
      subtitle: "Natural Hair Recovery System",
      title: "Stop Hair Fall.\nRegrow .",
      desc: "Scientifically blended Ayurvedic ingredients designed to reduce hair fall, activate dormant follicles, and restore scalp health.",
    },
    {
      subtitle: "Chemical-Free Hair Care",
      title: "Stronger Roots.\nHealthier Hair.",
      desc: "A complete ritual that detoxifies scalp, improves blood circulation, and promotes thicker and healthier hair growth.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden min-h-screen bg-white"
      style={{
        backgroundImage: "url('/leaves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft White Overlay */}
      <div className="absolute inset-0 bg-white/20 "></div>

      {/* Animated Particles/Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#064e3b]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full px-6 md:px-16 py-20">
        
        {/* Mobile: Image First - Desktop: Content First */}
        {/* Mobile Order: Image (1) -> Content (2) */}
        {/* Desktop Order: Content (1) -> Image (2) */}
        
        {/* Right/Top - Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="relative flex justify-center lg:order-2 order-1"
        >
          <div className="relative w-[280px] sm:w-[420px] md:w-[520px] lg:w-[600px] aspect-square flex items-center justify-center">

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(197,160,89,0.3)",
                  "0 0 100px rgba(197,160,89,0.5)",
                  "0 0 60px rgba(197,160,89,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[#c5a059]/10 blur-[80px] rounded-full"
            />

            <motion.img
              src="/Hero.png"
              alt="Hair Oil"
              className="relative z-20 w-full object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              fetchpriority="high"
            />

          </div>
        </motion.div>

        {/* Left/Bottom - Text Content */}
        <div className="text-center lg:text-left lg:order-1 order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#c5a059]/10 backdrop-blur-sm text-[#c5a059] border border-[#c5a059]/20 mb-6"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-xs tracking-[0.3em] uppercase font-bold">
                  {slides[current].subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-black text-[#064e3b] leading-[1.1] mb-4 whitespace-pre-line"
              >
                {slides[current].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-[#064e3b]/80 text-sm md:text-base lg:text-xl max-w-lg mx-auto lg:mx-0 mb-6"
              >
                {slides[current].desc}
              </motion.p>

              {/* Trust Icons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-[#1a1a1a]/80">
                  <Leaf size={18} className="text-[#c5a059]" />
                  <span className="text-sm font-medium">100% Natural</span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-[#1a1a1a]/80">
                  <ShieldCheck size={18} className="text-[#c5a059]" />
                  <span className="text-sm font-medium">Chemical Free</span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-[#1a1a1a]/80">
                  <Droplets size={18} className="text-[#c5a059]" />
                  <span className="text-sm font-medium">Ayurvedic Formula</span>
                </motion.div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToProducts}
                  className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-[#064e3b] text-white font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-[#064e3b]/90 transition-all group"
                >
                  Shop Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 md:px-10 md:py-5 rounded-full border border-[#c5a059]/30 text-[#1a1a1a] font-bold text-base md:text-lg hover:bg-[#c5a059]/10 transition-all"
                  >
                    Our Story
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;