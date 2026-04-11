import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductsSection = ({ products, loading }) => {

    const sliderRef = useRef(null);

    useEffect(() => {
        if (!sliderRef.current || products.length === 0) return;

        let index = 0;

        const interval = setInterval(() => {
            index++;

            if (index >= products.length) {
                index = 0;
            }

            sliderRef.current.scrollTo({
                left: sliderRef.current.clientWidth * index,
                behavior: "smooth"
            });

        }, 2000);

        return () => clearInterval(interval);
    }, [products]);

    return (
        <section id="products" className="py-10 md:py-10 px-6 overflow-hidden">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-8 md:gap-12">

                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="section-subtitle"
                        >
                            Our Iconic Concentrates
                        </motion.span>

                        <h2 className="section-title">
                            The <span className="italic font-medium text-[#c5a059]">Reverse</span> Collection
                        </h2>

                        <p className="text-[#064e3b]/60 text-lg md:text-2xl font-medium leading-relaxed max-w-xl">
                            Each formulation is a precisely engineered ritual, designed to reverse damage and restore biological vitality.
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/shop"
                            className="flex items-center gap-4 bg-white px-8 py-4 rounded-full border border-black/5 shadow-xl hover:shadow-2xl transition-all group text-[#064e3b]"
                        >
                            <ShoppingBag size={20} className="text-[#c5a059]" />
                            <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                                {products.length} Masterpieces
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </motion.div>

            {/* Loading */}
            {loading ? (
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
                        >
                            <div className="aspect-[4/5] bg-gray-100"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                                <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Mobile Slider */}
                    <div className="md:hidden max-w-sm mx-auto overflow-hidden">

                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4"
                            style={{
                                scrollbarWidth: "none",
                                WebkitOverflowScrolling: "touch"
                            }}
                        >
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="snap-center shrink-0 w-full"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                        {products.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: idx * 0.05
                                }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}

                    </div>
                </>
            )}
        </section>
    );
};

export default ProductsSection;