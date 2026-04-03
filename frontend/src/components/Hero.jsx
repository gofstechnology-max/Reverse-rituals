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

        {/* Left Content */}
        <div className="text-center lg:text-left">
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black  text-[#064e3b] leading-tight mb-6 whitespace-pre-line"
              >
                {slides[current].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className=" text-[#064e3b]/80 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProducts}
                  className="px-10 py-5 rounded-full bg-[#ffff] text-[#064e3b] font-bold text-lg flex items-center justify-center gap-3 hover:bg-white transition-all  group"
                >
                  Shop Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full border border-[#c5a059]/30 text-[#1a1a1a] font-bold text-lg hover:bg-[#c5a059] hover:text-[#064e3b] transition-all"
                  >
                    Our Story
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {/* <motion.div className="flex justify-center lg:justify-start gap-3 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${current === i
                    ? "w-16 bg-[#c5a059]"
                    : "w-4 bg-[#1a1a1a]/20 hover:w-8"
                  }`}
              />
            ))}
          </motion.div> */}
        </div>

        {/* Right Product */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="relative flex justify-center"
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
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;