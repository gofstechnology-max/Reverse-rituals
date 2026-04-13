import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      subtitle: "Natural Hair Recovery System",
      title: "Stop Hair Fall. Regrow Hair.",
      desc: "Scientifically blended Ayurvedic ingredients designed to reduce hair fall, activate dormant follicles, and restore scalp health."
    },
    {
      subtitle: "The Reverse Ritual",
      title: "Stronger Roots. Thicker Hair.",
      desc: "A complete hair care system with Rosemary Alchemy Water, Neem Comb & Massager for visible results in 21 days."
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

  const content = slides[current];

  return (
    <section
      className="relative w-full h-[650px] md:h-[600px] lg:h-[600px] overflow-hidden bg-[#fdfbf7]"
      style={{
        backgroundImage: "url('/leaves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-white/30"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 w-full h-full px-4 md:px-8">

        {/* Left Side - Image (first on mobile, second on desktop) */}
        <div className="flex items-center justify-center order-1 lg:order-2">
          <div className="w-[280px] md:w-[350px] lg:w-[420px]">
            <img
              src="/ingredient.png"
              alt="Hair Growth Product"
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Side - Text (second on mobile, first on desktop) */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="flex flex-col items-center lg:items-start max-w-lg">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 mb-4">
              <Sparkles size={14} />
              <span className="text-xs tracking-[0.1em] uppercase font-bold">
                {content.subtitle}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#064e3b] leading-tight mb-4">
              {content.title}
            </h1>

            <p className="text-[#064e3b]/80 text-sm md:text-base mb-6 font-medium">
              {content.desc}
            </p>

            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#c5a059]" />
                <span className="text-sm font-medium">Chemical Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-[#c5a059]" />
                <span className="text-sm font-medium">Ayurvedic Formula</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={scrollToProducts}
                className="px-8 py-4 rounded-full bg-[#064e3b] text-white font-bold flex items-center gap-3 hover:bg-[#064e3b]/90 cursor-pointer"
              >
                Shop Now
                <ArrowRight size={18} />
              </button>

              <Link
                to="/about"
                className="px-8 py-4 rounded-full border border-[#c5a059]/30 font-bold hover:bg-[#c5a059]/10 cursor-pointer"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;