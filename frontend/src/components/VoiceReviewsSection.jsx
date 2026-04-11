import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Star, MessageCircle, Package, Users } from "lucide-react";
import { motion } from "framer-motion";

const voiceReviews = [
  {
    id: 1,
    name: "Priya S.",
    product: "Reverse Ritual Combo",
    audio: "/voice/voice1.mp3",
    rating: 5,
    duration: "0:45",
  },
  {
    id: 2,
    name: "Anita M.",
    product: "Rosemary Alchemy Water",
    audio: "/voice/voice2.mp3",
    rating: 5,
    duration: "0:32",
  },
  {
    id: 3,
    name: "Rashmi K.",
    product: "Rosemary + Comb Combo",
    audio: "/voice/voice3.mp3",
    rating: 5,
    duration: "0:58",
  },
  {
    id: 4,
    name: "Meera T.",
    product: "Reverse Ritual Combo",
    audio: "/voice/voice1.mp3",
    rating: 5,
    duration: "0:41",
  },
];

const VoiceReviewsSection = () => {
  const [playingId, setPlayingId] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const audioRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter(setOrderCount, 1200);
          animateCounter(setReviewCount, 7500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = (setter, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }
    }, 30);
  };

  const togglePlay = (id) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      Object.values(audioRefs.current).forEach(audio => audio?.pause());
      const audio = audioRefs.current[id];
      if (audio) {
        audio.play();
        setPlayingId(id);
      }
    }
  };

  const handleAudioEnded = () => {
    setPlayingId(null);
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Package className="w-4 h-4 text-[#c5a059]" />
                <span className="text-2xl md:text-3xl font-bold text-[#064e3b]">{orderCount}+</span>
              </div>
              <span className="text-[#064e3b]/50 text-xs uppercase tracking-wide">Orders Delivered</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#c5a059]" />
                <span className="text-2xl md:text-3xl font-bold text-[#064e3b]">{reviewCount}+</span>
              </div>
              <span className="text-[#064e3b]/50 text-xs uppercase tracking-wide">Happy Customers</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-700 text-xs font-semibold uppercase tracking-wide">WhatsApp Voice Reviews</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#064e3b]">
            Hear What <span className="text-[#c5a059]">Customers Say</span>
          </h2>
          <p className="text-[#064e3b]/60 mt-2 text-sm md:text-base">
            Real voice messages from our happy customers
          </p>
        </div>

        {/* Voice Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {voiceReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#fdfbf7] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#064e3b]/5 hover:border-[#c5a059]/30 transition"
            >
              <audio
                ref={el => audioRefs.current[review.id] = el}
                src={review.audio}
                onEnded={handleAudioEnded}
              />

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#c5a059]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c5a059] font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#064e3b] text-sm md:text-base">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${i < review.rating ? "text-[#c5a059] fill-[#c5a059]" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#064e3b]/50 text-xs md:text-sm mt-0.5">{review.product}</p>

                  {/* Audio Player */}
                  <div className="mt-3">
                    <button
                      onClick={() => togglePlay(review.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full transition ${
                        playingId === review.id
                          ? "bg-[#064e3b] text-white"
                          : "bg-white border border-[#064e3b]/10 text-[#064e3b] hover:bg-[#064e3b]/5"
                      }`}
                    >
                      {playingId === review.id ? (
                        <Pause size={16} className="fill-current" />
                      ) : (
                        <Play size={16} className="fill-current" />
                      )}
                      <div className="flex-1 h-1.5 bg-[#064e3b]/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            playingId === review.id ? "bg-[#c5a059]" : "bg-[#064e3b]/30"
                          }`}
                          style={{ width: playingId === review.id ? "60%" : "0%" }}
                        />
                      </div>
                      <span className="text-xs font-medium">{review.duration}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[#064e3b]/40 text-xs mt-6">
          *These are actual voice messages received on WhatsApp
        </p>
      </div>
    </section>
  );
};

export default VoiceReviewsSection;