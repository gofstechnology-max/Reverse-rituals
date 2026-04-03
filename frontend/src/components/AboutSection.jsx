import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Heart, Sparkles, Leaf, Award, Users, Clock, Shield, Quote,
  ArrowRight
} from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const timeline = [
    { year: "2024", title: "The Beginning", desc: "Started our journey from a small home studio" },
    { year: "2024", title: "First Product", desc: "Launched our signature Rosemary Alchemy Water" },
    { year: "2025", title: "Growing Community", desc: "Helped 10,000+ customers transform their hair" },
    { year: "2025", title: "Today", desc: "Continuing to innovate with natural solutions" },
  ];

  const values = [
    { icon: <Shield />, title: "Honesty", desc: "No false claims, only real results" },
    { icon: <Sparkles />, title: "Transparency", desc: "Clear ingredients, clear process" },
    { icon: <Leaf />, title: "Quality", desc: "100% natural, clinically tested" },
    { icon: <Heart />, title: "Results", desc: "Visible transformation guaranteed" },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 overflow-hidden relative">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/bg-about.png"
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#fdfbf7]/90" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Behind the Brand</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#064e3b] leading-tight">
            The Story of <span className="italic text-[#c5a059]">Reverse Rituals</span>
          </h2>
        </motion.div>

        {/* Main Content - Image Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Side - Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-[#064e3b]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#c5a059]/10 rounded-xl flex items-center justify-center">
                  <Heart className="text-[#c5a059]" size={20} />
                </div>
                <span className="text-[#c5a059] font-bold uppercase tracking-wider text-sm">Our Beginning</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#064e3b] mb-4">Born from Personal Experience</h3>
              <p className="text-[#064e3b]/60 leading-relaxed">
                Our brand was born from personal experience and a deep belief in the power of natural hair care. Our journey began with a simple goal — to solve common hair concerns like hair fall, dandruff, etc.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-[#064e3b]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#064e3b]/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-[#064e3b]" size={20} />
                </div>
                <span className="text-[#064e3b] font-bold uppercase tracking-wider text-sm">The Transformation</span>
              </div>
              <p className="text-[#064e3b]/60 leading-relaxed">
                After struggling with common hair concerns, we began experimenting with traditional herbs. With consistent use, we experienced visible transformation — stronger roots, reduced hair fall, and healthier growth.
              </p>
            </div>
          </motion.div>

          {/* Center - Image/Quote */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-[#c5a059]/10 rounded-full flex items-center justify-center">
                <Quote className="text-[#c5a059]" size={40} />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-[#c5a059]/30 rounded-full"
              />
            </div>
          </motion.div>

          {/* Right Side - More Story + Founder */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#064e3b] p-6 md:p-8 rounded-2xl md:rounded-3xl text-white">
              <h3 className="text-xl md:text-2xl font-black mb-4">Our Philosophy</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Every product is thoughtfully crafted, tested, and used personally to ensure it delivers visible and consistent results. We believe in combining the power of nature with the right formulations.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 bg-[#c5a059] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <p className="font-bold">R. Sadiq Basha</p>
                  <p className="text-white/50 text-sm">Founder</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-[#064e3b]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="text-green-600" size={20} />
                </div>
                <span className="text-[#064e3b] font-bold uppercase tracking-wider text-sm">Our Core Values</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {values.map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-[#064e3b] font-bold text-sm">{val.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

{/* Brand Meaning Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ duration: 0.8 }}
  className="mb-24"
>
  <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-[#064e3b]/5 p-10 md:p-16 overflow-hidden">

    {/* subtle gradient glow */}
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#c5a059]/10 blur-[100px] rounded-full"></div>

    {/* Header */}
    <div className="text-center mb-14">
      <span className="text-[#c5a059] font-semibold uppercase tracking-[0.3em] text-xs">
        Brand Philosophy
      </span>

      <h3 className="text-3xl md:text-5xl font-semibold text-[#064e3b] mt-4 leading-tight">
        The Meaning of{" "}
        <span className="italic font-serif text-[#c5a059]">
          Reverse Rituals
        </span>
      </h3>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">

      {[
        {
          title: "Reverse",
          desc: "To repair, restore and bring back your natural strength.",
          bg: "#064e3b",
        },
        {
          title: "Rituals",
          desc: "Daily self-care practices that create lasting transformation.",
          bg: "#c5a059",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.2 }}
          className="group relative p-8 rounded-3xl bg-[#fdfbf7] border border-[#064e3b]/5 hover:shadow-2xl transition-all duration-500"
        >

          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition"
            style={{ background: item.bg }}
          >
            {item.title[0]}
          </div>

          {/* Content */}
          <h4 className="text-2xl font-semibold text-[#064e3b] mb-3">
            {item.title}
          </h4>

          <p className="text-[#064e3b]/60 leading-relaxed">
            {item.desc}
          </p>

        </motion.div>
      ))}
    </div>

    {/* Quote */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 }}
      className="mt-14 text-center max-w-3xl mx-auto"
    >
      <p className="text-[#064e3b]/80 text-lg md:text-xl italic leading-relaxed">
        “Reverse Rituals is not just a product — it’s a journey of restoring
        what was lost and building a daily ritual that brings your hair back
        to life.”
      </p>
    </motion.div>

  </div>
</motion.div>


{/* Stats Section */}


      </div>
    </section>
  );
};

function CheckCircle({ className, size = 16 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default AboutSection;