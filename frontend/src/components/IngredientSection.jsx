import { motion } from "framer-motion";

const ingredients = [
    { name: "Amla", emoji: "🫒", angle: 0 },
    { name: "Bhringraj", emoji: "🌿", angle: 60 },
    { name: "Coconut", emoji: "🥥", angle: 120 },
    { name: "Castor Oil", emoji: "💧", angle: 180 },
    { name: "Neem", emoji: "🍃", angle: 240 },
    { name: "Hibiscus", emoji: "🌺", angle: 300 },
];

const ProductShowcase = () => {
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#0b3d2e] via-[#114c39] to-[#145c43] overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[500px] h-[500px] bg-green-400/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white">
                        Powered by{" "}
                        <span className="text-[#c5a059] italic font-serif">
                            Natural Ingredients
                        </span>
                    </h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">
                        A powerful blend of Ayurvedic herbs designed to nourish your scalp,
                        strengthen roots, and promote healthy hair growth.
                    </p>
                </motion.div>

                {/* Layout */}
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT → PRODUCT (CENTERED PERFECTLY) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative flex justify-center items-center"
                    >

                        {/* Glow Circle */}
                        <div className="absolute w-80 h-80 rounded-full bg-[#c5a059]/10 blur-3xl" />

                        {/* Rotating Ingredients (UNCHANGED LOGIC) */}
                        <motion.div
                            className="absolute w-96 h-96"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        >
                            {ingredients.map((ing) => {
                                const rad = (ing.angle * Math.PI) / 180;
                                const x = Math.cos(rad) * 180;
                                const y = Math.sin(rad) * 180;

                                return (
                                    <motion.div
                                        key={ing.name}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        style={{ x, y }}
                                        animate={{ rotate: -360 }}
                                        transition={{
                                            duration: 30,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <div className="bg-[#0f2f25]/80 backdrop-blur-md border border-[#c5a059]/20 rounded-full px-3 py-2 text-xs whitespace-nowrap flex items-center gap-2 shadow-lg hover:scale-110 transition">

                                            <span>{ing.emoji}</span>
                                            <span className="text-white/80 font-medium">
                                                {ing.name}
                                            </span>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Product Bottle */}
                        <motion.img
                            src="/ingredient.png"
                            alt="Hair Oil"
                            className="relative z-10 w-64 md:w-80 drop-shadow-2xl"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            whileHover={{ scale: 1.05 }}
                        />
                    </motion.div>

                    {/* RIGHT → CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-white"
                    >

                        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                            Why This Works
                        </h3>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Our formula combines time-tested Ayurvedic ingredients with modern
                            extraction techniques to deliver deep nourishment and visible
                            results. Each ingredient is carefully selected for its proven
                            benefits in hair health.
                        </p>

                        {/* Feature Points */}
                        <div className="space-y-4">

                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-[#c5a059] rounded-full mt-2"></span>
                                <p className="text-gray-300 text-sm">
                                    Strengthens hair roots and reduces hair fall
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-[#c5a059] rounded-full mt-2"></span>
                                <p className="text-gray-300 text-sm">
                                    Improves scalp health and boosts hair growth
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-[#c5a059] rounded-full mt-2"></span>
                                <p className="text-gray-300 text-sm">
                                    100% natural, no harmful chemicals
                                </p>
                            </div>

                        </div>

                        {/* CTA */}
                        <button className="mt-8 bg-[#c5a059] text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                            Explore Product
                        </button>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;