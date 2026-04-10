import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import AboutSection from '../components/AboutSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ShoppingBag, Star, Zap, Leaf, Shield, Heart, Award, CheckCircle2, Play, BookOpen, FlaskConical, Globe, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import HairProductSection from '../components/HairProductSection';
import IngredientsSection from '../components/IngredientSection';


const HomePage = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [activeFaq, setActiveFaq] = useState(null);
   const [sliderPos, setSliderPos] = useState(50);
   const sliderPosRef = useRef(50);
   const [isDragging, setIsDragging] = useState(false);
   const sliderRef = useRef(null);
   const sliderLineRef = useRef(null);
   const beforeImageRef = useRef(null);
   const [selectedWeek, setSelectedWeek] = useState("Week 1");

   const updateSliderPosition = (pos) => {
      sliderPosRef.current = pos;
      if (sliderLineRef.current) {
         sliderLineRef.current.style.left = `${pos}%`;
      }
      if (beforeImageRef.current) {
         beforeImageRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      }
   };
   useEffect(() => {
      updateSliderPosition(50); // center on load
   }, []);
   const handleMouseDown = (e) => {
      setIsDragging(true);
      // Optional: Prevent text selection while dragging
      e.preventDefault();
   };

   const handleMouseUp = () => {
      setIsDragging(false);
      setSliderPos(sliderPosRef.current);
   };

   useEffect(() => {
      let rafId;
      const onMove = (e) => {
         if (!isDragging || !sliderRef.current) return;

         const rect = sliderRef.current.getBoundingClientRect();
         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
         const pos = ((clientX - rect.left) / rect.width) * 100;
         const clampedPos = Math.max(0, Math.min(100, pos));

         if (rafId) cancelAnimationFrame(rafId);
         rafId = requestAnimationFrame(() => {
            updateSliderPosition(clampedPos);
         });
      };

      if (isDragging) {
         window.addEventListener('mousemove', onMove);
         window.addEventListener('mouseup', handleMouseUp);
         window.addEventListener('touchmove', onMove);
         window.addEventListener('touchend', handleMouseUp);
      }

      return () => {
         window.removeEventListener('mousemove', onMove);
         window.removeEventListener('mouseup', handleMouseUp);
         window.removeEventListener('touchmove', onMove);
         window.removeEventListener('touchend', handleMouseUp);
      };
   }, [isDragging]);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            const cached = localStorage.getItem('home_products');
            const cachedTime = localStorage.getItem('home_products_time');

            if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 1000 * 60 * 5) {
               setProducts(JSON.parse(cached));
               setLoading(false);
               return;
            }

            const { data } = await axios.get(`${API_URL}/api/products`, {
               timeout: 10000,
               headers: { 'Cache-Control': 'no-cache' }
            });

            localStorage.setItem('home_products', JSON.stringify(data));
            localStorage.setItem('home_products_time', Date.now().toString());

            setProducts(data);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching products:', error);
            const cached = localStorage.getItem('home_products');
            if (cached) setProducts(JSON.parse(cached));
            else setProducts([]);
            setLoading(false);
         }
      };
      fetchProducts();
   }, []);

   const whyChoose = [
      { icon: <Shield size={32} />, title: "Clinical Efficacy", desc: "Scientifically proven results in 21 days." },
      { icon: <Heart size={32} />, title: "Pure Botanicals", desc: "Sulfate, Paraben, and Cruelty free." },
      { icon: <Award size={32} />, title: "Gold Standard", desc: "Winner of 2026 Botanical Excellence." },
      { icon: <Award size={32} />, title: "Hand Extracted", desc: "Small-batch clinical concentrates." },
   ];

   const ritualSteps = [
      { number: "01", title: "The Purify Ritual", desc: "Our Alchemical Water strips away environmental pollutants without disrupting the scalp's microbiome.", time: "2 Mins" },
      { number: "02", title: "The Nourish Phase", desc: "Massage our Signature Concentrate into the roots. The botanical oils penetrate cellular membranes.", time: "5 Mins" },
      { number: "03", title: "The Seal Ritual", desc: "Apply the finishing serum to lock in nutrients and provide a natural UV-protective barrier.", time: "1 Min" },
   ];

   const comparison = [
      { feature: "Ingredient Purity", others: "Standard Extracts", ours: "Clinical Alchemical Water" },
      { feature: "Potency", others: "Diluted Oils", ours: "100% Pure Botanical Concentrates" },
      { feature: "Efficacy", others: "Surface Level", ours: "Deep Cellular Penetration" },
      { feature: "Sustainability", others: "Standard Logistics", ours: "Closed-Loop Ethical Sourcing" },
   ];

   const faqs = [
      { q: "How soon will I see results?", a: "Most customers notice reduced hair fall within 21 days. For best results, we recommend using the product consistently for 2-3 months." },
      { q: "Is it safe for colored or treated hair?", a: "Yes! Our formula is gentle and pH-balanced. It's safe for colored hair and helps maintain hair vibrancy while nourishing from within." },
      { q: "Is this product vegan and cruelty-free?", a: "Absolutely. We never test on animals and use 100% plant-based natural ingredients. All products are ethically sourced." },
      { q: "How often should I use it?", a: "For best results, apply 2-3 times per week. Massage into clean, damp scalp and leave for 30 minutes before washing." },
      { q: "What makes this different from other hair oils?", a: "Our unique Ayurvedic blend combines traditional herbs with modern formulation, designed to penetrate deep into the scalp and strengthen roots." },
   ];

   return (
      <div className="overflow-hidden">
         <Hero />

         {/* Trust Badges Section */}
         <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
               {/* Horizontal scroll on mobile, grid on desktop */}
               <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                  {[
                     { icon: <Star className="fill-current" size={24} />, value: "4.9/5", label: "Rating", color: "#c5a059" },
                     { icon: <Heart className="fill-current" size={24} />, value: "50K+", label: "Happy Customers", color: "#064e3b" },
                     { icon: <Leaf className="fill-current" size={24} />, value: "100%", label: "Natural Ingredients", color: "#22c55e" },
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="flex-shrink-0 w-40 md:w-auto flex flex-col items-center text-center p-4 md:p-8 rounded-2xl md:rounded-3xl bg-[#fdfbf7] border border-[#064e3b]/5 hover:shadow-xl hover:border-[#064e3b]/10 transition-all duration-300 group"
                     >
                        <div
                           className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg"
                           style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                           {item.icon}
                        </div>
                        <span className="text-xl md:text-3xl font-serif font-black text-[#1a1a1a] mb-1">{item.value}</span>
                        <span className="text-xs font-medium text-[#1a1a1a]/50 uppercase tracking-wider">{item.label}</span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>
         <section id="products" className="py-10 px-6">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-20px" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="max-w-7xl mx-auto"
            >
               <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-32 gap-8 md:gap-12">
                  <div className="max-w-3xl">
                     <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-subtitle"
                     >Our Iconic Concentrates</motion.span>
                     <h2 className="section-title">The <span className="italic font-medium">Reverse</span> Collection</h2>
                     <p className="text-[#064e3b]/50 text-xl md:text-2xl font-medium leading-relaxed">Each formulation is a precisely engineered ritual, designed to reverse damage and restore biological vitality.</p>
                  </div>
                  <Link to="/shop" className="flex items-center gap-4 md:gap-6 bg-white px-6 md:px-8 py-3 md:py-4 rounded-full border border-black/5 shadow-2xl hover:scale-105 transition-transform group text-[#064e3b]">
                     <ShoppingBag size={20} md:size={24} className="text-[#c5a059]" />
                     <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">{products.length} Masterpieces</span>
                  </Link>
               </div>
            </motion.div>

            {loading ? (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 overflow-hidden">
                  {[1, 2, 3, 4].map(n => (
                     <div key={n} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                        <div className="aspect-[4/5] bg-linear-to-br from-gray-100 to-gray-200 animate-pulse relative overflow-hidden">
                           <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                        </div>
                        <div className="p-4 space-y-3">
                           <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4"></div>
                           <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/2"></div>
                           <div className="flex justify-between items-center mt-4">
                              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
                              <div className="h-8 w-16 bg-green-50 rounded-full animate-pulse"></div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
               >
                  {products.map((product, idx) => (
                     <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                     >
                        <ProductCard product={product} />
                     </motion.div>
                  ))}
               </motion.div>
            )}
         </section>
         <section className="py-12 md:py-20 bg-gradient-to-b from-[#fafafa] to-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8 md:mb-12"
               >
                  <span className="text-[#c5a059] text-xs md:text-sm font-semibold uppercase tracking-widest">
                     Real Customer Results
                  </span>

                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#064e3b] mt-3 md:mt-4 leading-tight">
                     Hair Transformation
                     <span className="block font-serif italic text-[#c5a059] mt-1 md:mt-2">
                        Week 1 to Week 14
                     </span>
                  </h2>

                  <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-base max-w-2xl mx-auto">
                     See real progress of customers using Reverse Rituals products.
                     Visible hair growth, reduced hair fall, and stronger roots in just 8 weeks.
                  </p>
               </motion.div>

               {/* Before After Slider */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-12 md:mb-20 max-w-4xl mx-auto"
               >
                  <div
                     ref={sliderRef}
                     onMouseDown={handleMouseDown}
                     onTouchStart={handleMouseDown}
                     className="relative cursor-ew-resize select-none overflow-hidden rounded-3xl md:rounded-[40px] aspect-[4/5] md:aspect-video shadow-2xl border-4 border-white group"
                  >

                     {/* After Image (Base) */}
                     <img
                        src="/WEEK14.JPG"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        alt="After 14 weeks"
                        loading="lazy"
                     />

                     {/* Before Image (Overlay) */}
                     <div
                        ref={beforeImageRef}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                           clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                        }}
                     >
                        <img
                           src="/WEEK1.PNG"
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                           alt="Before"
                           loading="lazy"
                        />
                     </div>

                     {/* Comparison Line & Handle */}
                     <div
                        ref={sliderLineRef}
                        className="absolute top-0 bottom-0 w-1 bg-white/80 backdrop-blur-sm z-10 pointer-events-none"
                        style={{ transform: 'translateX(-50%)', left: '50%' }}
                     >
                        {/* Glowing Handle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)] border border-white/40 active:scale-95 transition-transform">
                           <div className="flex items-center gap-1">
                              <div className="w-1 h-4 md:h-6 bg-white rounded-full opacity-60"></div>
                              <div className="w-1 h-6 md:h-8 bg-white rounded-full"></div>
                              <div className="w-1 h-4 md:h-6 bg-white rounded-full opacity-60"></div>
                           </div>
                        </div>
                     </div>

                     {/* Floating Badges */}
                     <div className="absolute inset-x-3 md:inset-x-6 top-3 md:top-6 flex justify-between gap-2 pointer-events-none">
                        <div className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-black border border-white/20 tracking-tighter md:tracking-widest uppercase shadow-lg">
                           {selectedWeek}
                        </div>
                        <div className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-[#c5a059]/90 backdrop-blur-md text-white text-[10px] md:text-xs font-black border border-white/20 tracking-tighter md:tracking-widest uppercase shadow-lg">
                           Goal: Week 14
                        </div>
                     </div>

                     {/* Label Overlays */}
                     <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none">
                        <p className="text-white text-xl md:text-5xl font-serif font-black opacity-10 md:opacity-20 select-none tracking-tighter">BEFORE</p>
                     </div>
                     <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 pointer-events-none text-right">
                        <p className="text-white text-xl md:text-5xl font-serif font-black opacity-10 md:opacity-20 select-none tracking-tighter">AFTER</p>
                     </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-4 text-[#064e3b]/40">
                     <div className="h-px w-12 bg-current"></div>
                     <p className="text-sm font-black uppercase tracking-[0.3em] font-serif italic text-[#c5a059]">Slide the Ritual Transformation</p>
                     <div className="h-px w-12 bg-current"></div>
                  </div>
               </motion.div>

               {/* Weekly Progress */}
               <div className="mt-6 md:mt-8 overflow-hidden max-w-4xl mx-auto">

                  <h3 className="text-center text-lg md:text-xl font-semibold text-[#064e3b] mb-4 md:mb-6">
                     Weekly Progress
                  </h3>

                  {/* Scroll Container - Horizontal on mobile */}
                  <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                     <div className="flex gap-3 md:gap-6" style={{ width: 'max-content' }}>

                        {[
                           { week: '01', title: 'Week 1', img: '/WEEK1.PNG' },
                           { week: '02', title: 'Week 2', img: '/WEEK2.PNG' },
                           { week: '04', title: 'Week 4', img: '/WEEK4.PNG' },
                           { week: '08', title: 'Week 8', img: '/WEEK8.PNG' },
                           { week: '14', title: 'Week 14', img: '/WEEK14.JPG' },
                        ].map((step, i) => (

                           <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="w-40 md:w-64 group cursor-pointer flex-shrink-0"
                              onClick={() => {
                                 if (beforeImageRef.current) {
                                    beforeImageRef.current.querySelector("img").src = step.img;
                                    setSelectedWeek(step.title);
                                    updateSliderPosition(50);
                                 }
                              }}
                           >

                              {/* Card */}
                              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">

                                 <img
                                    src={step.img}
                                    alt={step.title}
                                    className="w-full h-32 md:h-48 object-cover group-hover:scale-110 transition duration-500"
                                    loading="lazy"
                                 />

                                 {/* Overlay */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                 {/* Week Badge */}
                                 <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#c5a059] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                    Week {step.week}
                                 </div>

                                 {/* Title */}
                                 <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-white">
                                    <p className="text-xs md:text-sm font-semibold">{step.title}</p>
                                 </div>

                              </div>

                           </motion.div>

                        ))}

                     </div>
                  </div>


               </div>

            </div>
         </section>
         <IngredientsSection />

         {/* <AboutSection /> */}
         <ReviewSection />




         <HairProductSection />







         {/* FAQs Section */}
         {/* FAQ Section */}
         <section className="py-16 md:py-20 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-10"
               >
                  <h2 className="text-2xl md:text-3xl font-medium text-[#064e3b]">
                     Frequently <span className="font-serif italic text-[#c5a059]">Asked</span>
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm">Got questions? We've got answers.</p>
               </motion.div>

               <div className="space-y-3">
                  {faqs.map((faq, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#f8fdf9] rounded-xl overflow-hidden border border-[#c5a059]/10"
                     >
                        <button
                           onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                           className="w-full px-5 py-4 flex items-center justify-between text-left group"
                        >
                           <span className="font-medium text-[#064e3b] text-sm group-hover:text-[#c5a059] transition-colors">{faq.q}</span>
                           <ChevronDown className={`text-[#c5a059] transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} size={18} />
                        </button>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="px-5 pb-4"
                              >
                                 <p className="text-gray-600 text-sm leading-relaxed pt-2 border-t border-[#c5a059]/10">{faq.a}</p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>

               {/* Contact CTA */}
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-10"
               >
                  <p className="text-gray-500 text-sm">Still have questions?</p>
                  <Link to="/contact" className="text-[#c5a059] font-medium text-sm hover:underline mt-1 inline-block">
                     Contact us →
                  </Link>
               </motion.div>
            </div>
         </section>



         {/* 3D Review Carousel */}

         {/* Commitment Section */}

         {/* Founder's Journal Excerpt */}


      </div>
   );
}; export default HomePage;
