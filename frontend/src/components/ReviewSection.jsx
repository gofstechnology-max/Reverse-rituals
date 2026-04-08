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
    <section className="py-16 md:py-20 bg-[#fdfbf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#064e3b]">
            Happy Clients
          </h2>
          <p className="mt-3 md:mt-4 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Real WhatsApp reviews and results from our customers.
          </p>
        </div>

        {/* Auto-Scrolling Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#fdfbf7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#fdfbf7] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex animate-scroll gap-4 md:gap-6">
            {/* First set */}
            {reviews.map((review) => (
              <motion.div
                key={`first-${review.id}`}
                className="flex-shrink-0 w-[65%] sm:w-[45%] md:w-[32%] lg:w-[24%]"
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelected(review.image)}
                >
                  <img
                    src={review.image}
                    alt="review"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            ))}
            {/* Duplicate for infinite scroll */}
            {reviews.map((review) => (
              <motion.div
                key={`second-${review.id}`}
                className="flex-shrink-0 w-[65%] sm:w-[45%] md:w-[32%] lg:w-[24%]"
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelected(review.image)}
                >
                  <img
                    src={review.image}
                    alt="review"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
     
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-10 right-0 text-white hover:text-[#c5a059] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img
                src={selected}
                alt="review"
                className="rounded-xl w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for auto-scroll animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;