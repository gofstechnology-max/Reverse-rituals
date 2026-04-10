import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 md:py-32 bg-[#fdfbf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black text-[#064e3b]">
            Honest <span className="italic text-[#c5a059]">Reflections</span>
          </h2>
          <p className="mt-6 text-[#064e3b]/40 text-sm md:text-xl max-w-2xl mx-auto font-medium">
            Real voices, real transformations. Experience the power of Ayurvedic excellence.
          </p>
        </div>

        {/* Auto-Scrolling Carousel */}
        <div className="relative overflow-hidden group">
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-[#fdfbf7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-[#fdfbf7] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div 
            className="flex gap-4 md:gap-8 will-change-transform py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 0.995 }}
          >
            {/* First set */}
            {[...reviews, ...reviews].map((review, i) => (
              <motion.div
                key={`${review.id}-${i}`}
                className="shrink-0 w-[240px] sm:w-[300px] md:w-[350px]"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div
                  className="bg-white rounded-[32px] shadow-2xl overflow-hidden cursor-pointer border border-[#c5a059]/10 group/item translate-z-0"
                  onClick={() => setSelected(review.image)}
                >
                  <img
                    src={review.image}
                    alt="review"
                    loading="lazy"
                    className="w-full h-auto object-contain group-hover/item:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/5 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xl flex items-center justify-center z-200 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full flex items-center justify-center translate-z-0"
              initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-16 right-0 md:-right-16 text-white hover:text-[#c5a059] transition-all p-3 bg-white/10 rounded-full backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img
                src={selected}
                alt="review"
                className="rounded-[40px] w-full max-h-[85vh] object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-8 border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewSection;