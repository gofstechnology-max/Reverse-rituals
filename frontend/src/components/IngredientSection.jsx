import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ingredients = [
    {
        name: "Rosemary",
        emoji: "🌿",
        angle: 0,
        tagline: "The Growth Catalyst",
        details: `Rosemary Alchemy Water is your main active ingredient for growth.

Key nutrients: Rosmarinic acid, ursolic acid, antioxidants.

Benefits:
• Stimulates hair growth: Improves blood circulation to hair follicles, providing more oxygen and nutrients.
• Reduces hair fall: Strengthens hair roots and prevents premature shedding.
• DHT control: Helps block DHT, a hormone linked to hair loss.
• Fights dandruff: Natural antifungal and antibacterial properties.
• Prevents premature greying: Antioxidants reduce oxidative stress.`,
    },
    {
        name: "Bhringraj",
        emoji: "🌱",
        angle: 72,
        tagline: "King of Hair",
        details: `Also known as "King of Hair" in Ayurveda, it works deeply on regrowth.

Key compounds: Wedelolactone, flavonoids.

Benefits:
• Promotes new hair growth: Activates dormant hair follicles.
• Reduces thinning: Improves hair density and volume.
• Controls hair fall: Strengthens roots from within.
• Delays greying: Supports melanin production.
• Soothes scalp: Natural cooling and anti-inflammatory effect.`,
    },
    {
        name: "Fenugreek",
        emoji: "🌾",
        angle: 144,
        tagline: "The Strengthener",
        details: `Acts as a natural conditioner + strengthening agent.

Key nutrients: Protein, nicotinic acid, lecithin.

Benefits:
• Strengthens hair shaft: High protein helps repair damaged hair.
• Reduces hair fall: Nourishes weak roots.
• Deep conditioning: Makes hair soft, smooth, and frizz-free.
• Fights dandruff: Reduces dryness and flakiness.
• Adds shine: Improves overall hair texture.`,
    },
    {
        name: "Black Seeds",
        emoji: "🌿",
        angle: 216,
        tagline: "Scalp Healer",
        details: `Provides scalp healing and follicle stimulation.

Key compound: Thymoquinone.

Benefits:
• Boosts hair growth: Stimulates follicles and improves density.
• Reduces hair thinning: Strengthens roots and prevents breakage.
• Fights scalp infections: Strong antibacterial and antifungal.
• Improves scalp health: Reduces inflammation and irritation.
• Regrowth support: Helps with thinning patches.`,
    },
    {
        name: "Clove",
        emoji: "🌸",
        angle: 288,
        tagline: "Circulation Booster",
        details: `Works as a circulation booster + scalp cleanser.

Key compounds: Eugenol, antioxidants.

Benefits:
• Improves blood circulation: Helps nutrients reach roots faster.
• Promotes faster growth: Directly stimulates follicles.
• Antimicrobial: Fights dandruff and scalp infections.
• Strengthens roots: Reduces breakage and shedding.
• Activates scalp: Provides mild warmth to trigger activity.`,
    },
];

const ProductShowcase = () => {
    const [selected, setSelected] = useState(null);
    const [screenWidth, setScreenWidth] = useState(1200);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScreenWidth(window.innerWidth);
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "auto";
    }, [selected]);

    const isMobile = screenWidth < 768;
    const radius = isMobile ? Math.min(screenWidth * 0.35, 130) : 320;

    return (
        <section className="relative py-12 md:py-20 bg-[#063b2c] overflow-hidden text-white">

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059]/5 blur-[150px] -mr-64 -mt-64 rounded-full" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Title */}
                <div className="text-center md:mb-24">
                    <span className="text-[#c5a059] text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-4 block">
                        Ancient Wisdom
                    </span>

                    <h3 className="text-3xl md:text-5xl lg:text-7xl font-black">
                        The Science of <span className="italic font-serif text-[#c5a059]">Alchemy</span>
                    </h3>
                </div>

                {/* Orbit Section */}
                <div className="relative flex justify-center items-center h-[420px] md:h-[700px]">

                    <div className="relative flex justify-center items-center w-full h-full">

                        {/* Glow */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute w-64 md:w-[600px] h-64 md:h-[600px] rounded-full bg-[#c5a059]/10 blur-[120px]"
                        />

                        {/* Orbit */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="relative w-[280px] md:w-[650px] h-[280px] md:h-[650px]">

                                {ingredients.map((ing) => {
                                    const rad = (ing.angle * Math.PI) / 180;
                                    const x = Math.cos(rad) * radius;
                                    const y = Math.sin(rad) * radius;

                                    return (
                                        <motion.div
                                            key={ing.name}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            style={{ x, y }}
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                            onClick={() => setSelected(ing)}
                                        >
                                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-3 md:px-8 py-1.5 md:py-4 text-[9px] md:text-sm whitespace-nowrap flex items-center gap-2 md:gap-4 shadow-2xl cursor-pointer hover:border-[#c5a059]/40 transition">

                                                <span className="text-base md:text-3xl">
                                                    {ing.emoji}
                                                </span>

                                                <span className="font-black uppercase tracking-widest">
                                                    {ing.name}
                                                </span>

                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Center Bottle */}
                        <motion.img
                            src="/ingredient.png"
                            alt="Signature Alchemy Water"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-36 md:w-[480px]"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">

                        <motion.div
                            className="absolute inset-0 bg-[#063b2c]/95 backdrop-blur-xl"
                            onClick={() => setSelected(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="relative w-full max-w-2xl max-h-[90vh] bg-[#0f4b3b] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full border border-white/10"
                            >
                                <X size={22} />
                            </button>

                            <div className="p-8 md:p-12 border-b border-white/5 flex gap-6">

                                <div className="text-5xl md:text-7xl">
                                    {selected.emoji}
                                </div>

                                <div>
                                    <h4 className="text-3xl md:text-5xl font-black">
                                        {selected.name}
                                    </h4>

                                    <p className="text-[#c5a059] mt-2 uppercase tracking-widest text-xs">
                                        {selected.tagline}
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-y-auto p-8 md:p-12 space-y-6">

                                <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
                                    {selected.details}
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">

                                    <div className="bg-white/5 p-5 rounded-2xl">
                                        <ShieldCheck className="text-[#c5a059]" />
                                        <p className="text-sm mt-2">
                                            Clinical-grade extracts solar-infused for 21 days
                                        </p>
                                    </div>

                                    <div className="bg-white/5 p-5 rounded-2xl">
                                        <Sparkles className="text-[#c5a059]" />
                                        <p className="text-sm mt-2">
                                            100% Organic concentrated botanicals
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Button */}
            <div className="flex justify-center md:pt-10 relative z-10">
                <Link
                    to="/product/alchemy-water"
                    className="bg-[#c5a059] text-[#064e3b] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 hover:bg-white transition"
                >
                    Explore Masterpiece
                    <FlaskConical className="inline ml-3" size={18} />
                </Link>
            </div>

        </section>
    );
};

export default ProductShowcase;