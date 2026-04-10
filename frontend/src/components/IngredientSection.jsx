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
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#0b3d2e] via-[#114c39] to-[#145c43] overflow-hidden text-white">

            <div className="container mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT - PRODUCT + ROTATION */}
                    <div className="relative flex justify-center items-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="relative flex justify-center items-center" 
                        >
                            {/* Glow Circle */}
                            <div className="absolute w-64 md:w-80 h-64 md:h-80 rounded-full bg-[#c5a059]/10 blur-3xl" />
                            
                            {/* Rotating Ingredients */}
                            <motion.div 
                                className="absolute w-72 md:w-96 h-72 md:h-96" 
                                animate={{ rotate: 360 }} 
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                {ingredients.map((ing) => {
                                    const rad = (ing.angle * Math.PI) / 180;
                                    const x = Math.cos(rad) * 140; // Reduced radius for mobile
                                    const y = Math.sin(rad) * 140;
                                    
                                    return (
                                        <motion.div 
                                            key={ing.name} 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                            style={{ x, y }} 
                                            animate={{ rotate: -360 }} 
                                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div className="bg-[#0f2f25]/80 backdrop-blur-md border border-[#c5a059]/20 rounded-full px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs whitespace-nowrap flex items-center gap-1 md:gap-2 shadow-lg hover:scale-110 transition">
                                                <span>{ing.emoji}</span>
                                                <span className="text-white/80 font-medium">{ing.name}</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                            
                            {/* Product Bottle */}
                            <motion.img 
                                src="/ingredient.png" 
                                alt="Hair Oil" 
                                className="relative z-10 w-48 md:w-80 drop-shadow-2xl" 
                                animate={{ y: [0, -10, 0] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                                whileHover={{ scale: 1.05 }} 
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <div>

                        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                            Why This Works
                        </h3>

                        {/* BENEFITS TEXT */}
                        <div className="space-y-3 text-gray-300 text-sm mb-8">
                            <p>🌱 Hair Growth: Rosemary + Clove + Black Seeds</p>
                            <p>🌿 Hair Fall Control: Fenugreek + Bhringraj</p>
                            <p>✨ Scalp Health: All ingredients combined</p>
                            <p>💎 Thickness & Shine: Fenugreek + Bhringraj</p>
                        </div>

                        {/* NEW INGREDIENT BOXES (SEPARATE SECTION) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                            {ingredients.map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => setSelected(item)}
                                    className="cursor-pointer bg-[#0f2f25]/80 border border-[#c5a059]/20 rounded-xl p-3 text-center hover:scale-105 transition"
                                >
                                    <div className="text-lg">{item.emoji}</div>
                                    <div className="text-sm">{item.name}</div>
                                    <div className="text-[10px] text-[#c5a059] mt-1">
                                        View Benefits
                                    </div>
                                </div>
                            ))}

                        </div>

                        <a
                            href="/product"
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