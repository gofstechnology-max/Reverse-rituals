import { useRef, useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { FaSeedling } from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { GiPotionBall } from "react-icons/gi";
import { GiFlowerPot } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { LuLeaf } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";



export default function Surya() {
    const icons = [
        <LuLeaf />,
        <FaSeedling />,
        <GiWheat />,
        <GiPotionBall />,
        <GiFlowerPot />,
    ];
    const bgColors = [
        "bg-green-600 text-white",
        "bg-emerald-800 text-white",
        "bg-yellow-500 text-white",
        "bg-black text-white",
        "bg-rose-500 text-white",
    ];
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    const toggleVideo = () => {
        if (!videoRef.current) return;

        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setPlaying(!playing);
    };

    const ingredients = [
        { title: "Rosemary", desc: "Stimulates hair growth & improves blood circulation to follicles", color: "bg-green-500" },
        { title: "Bhringraj", desc: "The King of Hair - Promotes regrowth & reduces thinning", color: "bg-green-600" },
        { title: "Fenugreek", desc: "Strengthens roots & adds natural shine to hair", color: "bg-yellow-500" },
        { title: "Black Seeds", desc: "Boosts scalp health & fights dandruff naturally", color: "bg-gray-800" },
        { title: "Clove", desc: "Improves circulation & prevents premature greying", color: "bg-red-500", highlight: true },
    ];

    const benefits = [
        { title: "Reduces Hair Fall", desc: "Up to 80% reduction in 21 days" },
        { title: "Stimulates Growth", desc: "Activates dormant follicles" },
        { title: "Fights Dandruff", desc: "Natural antimicrobial protection" },
        { title: "Adds Shine", desc: "Makes hair visibly healthier" },
    ];

    const steps = [
        { num: "01", title: "Apply", desc: "Spray on clean scalp" },
        { num: "02", title: "Massage", desc: "Use fingertips for 5mins" },
        { num: "03", title: "Leave", desc: "Let it absorb naturally" },
        { num: "04", title: "Repeat", desc: "3 times per week" },
    ];


    return (
        <div className="bg-[#f9f7f2] min-h-screen">

            <section className="px-6 pt-10 text-center">
                <p className="text-xs tracking-widest text-[#c5a059] mb-3">
                    THE TRANSFORMATION RITUAL
                </p>

                <h1 className="text-3xl md:text-5xl font-extrabold text-[#064e3b] leading-tight">
                    Rosemary <span className="text-[#c5a059]">Alchemy</span> Water
                </h1>

                <p className="text-green-900 text-sm mt-4 max-w-xl mx-auto">
                    A potent Ayurvedic infusion crafted to transform your hair from root to tip
                </p>
            </section>

            {/* HERO VIDEO */}
            <div className="mt-10 flex justify-center px-4 md:px-6">
                <div className="w-full max-w-6xl rounded-2xl md:rounded-4xl overflow-hidden shadow-gray-500 shadow-lg relative">

                    {/* Video */}
                    <video
                        ref={videoRef}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        autoPlay
                        muted
                        loop
                        className="w-full h-48 sm:h-64 md:h-80 lg:h-[450px] object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-10 text-white">
                        <h3 className="text-sm md:text-lg font-semibold">
                            Watch the transformation ritual
                        </h3>
                        <p className="text-xs opacity-80">
                            See how easy it is to use
                        </p>
                    </div>

                    {/* Play / Pause Button */}
                    <button
                        onClick={toggleVideo}
                        className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white text-lg hover:scale-110 transition"
                    >
                        {playing ? <FiPause /> : <FiPlay />}
                    </button>

                </div>
            </div>

            {/* INGREDIENTS */}
            <section className="px-4 md:px-6 mt-16">

                <div className="max-w-7xl mx-auto text-center">

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#064e3b]">
                        Powerful <span className="text-[#c5a059]">Ayurvedic</span> Ingredients
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 mt-6 md:mt-12 text-left">

                        {ingredients.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 items-start gap-2 md:gap-3 hover:shadow-md hover:bg-white border border-transparent hover:border-[#c5a059]/30 transition-all duration-300"
                            >
                                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-lg md:text-xl ${bgColors[i]}`}>
                                    {icons[i]}
                                </div>

                                <h3 className="font-bold text-[#064e3b] text-xs md:text-sm">
                                    {item.title}
                                </h3>

                                <p className="text-[10px] md:text-xs font-medium text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* BENEFITS */}

            <section className="px-4 md:px-6 mt-16">

                <div className="max-w-7xl mx-auto text-center">

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-8 md:12">

                        {benefits.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-md transition flex flex-col items-center text-center min-h-37.5"
                            >

                                <div className="w-12 h-12 rounded-xl bg-[#f3efe7] flex items-center justify-center mb-4">
                                    <FaRegStar className="text-[#c5a059] text-lg" />
                                </div>

                                <h3 className="font-bold text-[#064e3b] text-lg mb-1">
                                    {item.title}
                                </h3>

                                <p className="text-xs font-medium text-gray-400">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* HOW TO USE */}
            <section className="px-4 md:px-6 mt-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#064e3b]">
                        How To <span className="text-[#c5a059]">Use</span>
                    </h2>
                    
                    {/* Mobile: vertical stack, Desktop: horizontal */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-8 md:12 relative">

                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="relative bg-white rounded-3xl p-10 shadow-lg flex flex-col items-start text-left min-h-37.5"
                            >
                                <p className="absolute top-4 left-8 text-5xl font-extrabold text-[#efe8d8]">
                                    {step.num}
                                </p>

                                <div className="mt-8">
                                    <h3 className="font-bold text-[#064e3b] text-lg">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 mt-1">
                                        {step.desc}
                                    </p>
                                </div>
                                {i !== steps.length - 1 && (
                                    <FiArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 font-semibold text-[#c5a059] text-xl" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center mt-6">
                        <button className="mt-8 md:mt-12 bg-[#064e3b] text-white text-xs md:text-sm font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#064e3b]/90 flex items-center gap-2 transition-all">
                            Start Your Ritual
                            <FiArrowRight className="text-base" />
                        </button>
                    </div>
                </div>
            </section>

            <div className="h-20"></div>
        </div>
    );
}