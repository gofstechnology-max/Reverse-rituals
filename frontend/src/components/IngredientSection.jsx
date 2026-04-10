import { motion } from "framer-motion";
import { useState } from "react";

const ingredients = [
    {
        name: "Rosemary",
        emoji: "🌿",
        angle: 0,
        details: `Key nutrients: Rosmarinic acid, ursolic acid

• Stimulates hair growth
• Reduces hair fall
• Controls DHT
• Fights dandruff
• Prevents greying

👉 Main growth ingredient`,
    },
    {
        name: "Bhringraj",
        emoji: "🌱",
        angle: 72,
        details: `• Promotes new growth
• Improves density
• Reduces thinning
• Delays greying
• Soothes scalp

👉 King of Hair`,
    },
    {
        name: "Fenugreek",
        emoji: "🌾",
        angle: 144,
        details: `• Strengthens hair
• Reduces hair fall
• Deep conditioning
• Fights dandruff
• Adds shine`,
    },
    {
        name: "Black Seeds",
        emoji: "🌿",
        angle: 216,
        details: `• Boosts growth
• Reduces thinning
• Fights infections
• Improves scalp health`,
    },
    {
        name: "Clove",
        emoji: "🌸",
        angle: 288,
        details: `• Improves circulation
• Stimulates growth
• Fights dandruff
• Strengthens roots`,
    },
];

const ProductShowcase = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section className="relative py-24 md:py-32 bg-linear-to-br from-[#0b3d2e] via-[#114c39] to-[#145c43] overflow-hidden text-white">

            <div className="container mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT - PRODUCT + ROTATION */}
                    <div className="relative flex justify-center items-center h-[400px] md:h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            className="relative flex justify-center items-center translate-z-0"
                        >
                            {/* Premium Glow Circle */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-[#c5a059]/20 blur-[100px]"
                            />

                            {/* Rotating Ingredients - Hardware Accelerated */}
                            <motion.div
                                className="absolute w-80 md:w-[520px] h-80 md:h-[520px] will-change-transform"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            >
                                {ingredients.map((ing) => {
                                    const rad = (ing.angle * Math.PI) / 180;
                                    const radius = window.innerWidth < 768 ? 140 : 240;
                                    const x = Math.cos(rad) * radius;
                                    const y = Math.sin(rad) * radius;

                                    return (
                                        <motion.div
                                            key={ing.name}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                                            style={{ x, y }}
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(197, 160, 89, 0.2)" }}
                                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-sm whitespace-nowrap flex items-center gap-2 md:gap-3 shadow-2xl transition-colors cursor-pointer"
                                            >
                                                <span className="text-lg md:text-2xl">{ing.emoji}</span>
                                                <span className="text-white font-bold tracking-tight">{ing.name}</span>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* Product Bottle - Premium Float */}
                            <motion.img
                                src="/ingredient.png"
                                alt="Hair Oil"
                                className="relative z-10 w-56 md:w-[450px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)] will-change-transform"
                                animate={{ y: [0, -20, 0], rotateZ: [0, 2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-center">

                        <motion.h3
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight"
                        >
                            The Science of <span className="italic text-[#c5a059]">Alchemy</span>
                        </motion.h3>

                        {/* BENEFITS TEXT */}
                        <div className="space-y-6 text-white/70 text-base md:text-xl mb-12">
                            {[
                                { label: "Hair Growth", value: "Rosemary + Clove + Black Seeds", icon: "🌱" },
                                { label: "Hair Fall Control", value: "Fenugreek + Bhringraj", icon: "🌿" },
                                { label: "Scalp Health", value: "Synergistic botanical fusion", icon: "✨" },
                                { label: "Thickness & Shine", value: "Triple-extracted concentrates", icon: "💎" },
                            ].map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c5a059]/20 transition-colors">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm md:text-base uppercase tracking-widest mb-1">{benefit.label}</p>
                                        <p className="text-white/40 text-xs md:text-sm">{benefit.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* INGREDIENT BOXES - Mobile Optimized Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
                            {ingredients.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelected(item)}
                                    className="cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all active:scale-95 translate-z-0"
                                >
                                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">{item.emoji}</div>
                                    <div className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white mb-1">{item.name}</div>
                                    <div className="text-[8px] md:text-[10px] text-[#c5a059] font-bold uppercase tracking-tighter opacity-70">
                                        Pure Ritual
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                        <a
                            href="/shop"
                            className="inline-block mt-8 bg-[#c5a059] text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition"
                        >
                            Explore Product
                        </a>

                    </div>
                </div>
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="bg-[#0f2f25] p-6 rounded-xl max-w-md w-full relative">

                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-3 text-xl"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-semibold mb-4">
                            {selected.emoji} {selected.name}
                        </h3>

                        <p className="text-gray-300 text-sm whitespace-pre-line">
                            {selected.details}
                        </p>

                    </div>

                </div>
            )}
        </section>
    );
};

export default ProductShowcase;