import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.offsetWidth;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#fdfbf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-[#064e3b]">
            Happy Clients
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Real WhatsApp reviews and results from our customers.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3"
          >
            <ChevronLeft />
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3"
          >
            <ChevronRight />
          </button>

          {/* Images */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="snap-center flex-shrink-0 
                w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelected(review.image)}
                >
                  <img
                    src={review.image}
                    alt="review"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex justify-center gap-10 text-center flex-wrap">
          <div>
            <h3 className="text-3xl font-bold text-[#c5a059]">50K+</h3>
            <p className="text-gray-500">Happy Clients</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#c5a059]">4.9</h3>
            <p className="text-gray-500">Rating</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#c5a059]">98%</h3>
            <p className="text-gray-500">Success Rate</p>
          </div>
        </div>
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
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white"
              >
                <X size={32} />
              </button>

              <img
                src={selected}
                alt="review"
                className="rounded-2xl w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewSection;