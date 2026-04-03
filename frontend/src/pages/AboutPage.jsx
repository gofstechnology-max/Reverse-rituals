import React from 'react';
import { Leaf, FlaskConical, Globe, Award, Target, Heart, Check, Droplets, Sparkles, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-[#fdfbf7]  pt-10 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-[#c5a059] font-medium uppercase tracking-widest text-sm mb-4">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#064e3b]">
            Restoring Hair <span className="italic text-[#c5a059]">Naturally</span>
          </h1>
          <p className="text-[#064e3b]/60 max-w-2xl mx-auto mt-6 text-lg">
            Rooted in Ayurvedic tradition, powered by nature, proven by results.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src="/sadiq.JPG"
                alt="R. Sadiq Basha - Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#064e3b] text-white px-6 py-4 rounded-xl shadow-lg">
              <p className="text-2xl font-serif font-bold">5+</p>
              <p className="text-xs opacity-70">Years Experience</p>
            </div>
          </div>

          <div>
            <p className="text-[#c5a059] font-medium uppercase tracking-widest text-sm mb-4">Founder</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#064e3b] mb-6">
              R. Sadiq Basha
            </h2>
            <p className="text-[#064e3b]/70 leading-relaxed mb-4">
              Reverse Rituals was born from a personal journey into the world of botanical hair care. After years of researching traditional Ayurvedic remedies and witnessing their remarkable effects on hair health, I set out to create products that bridge ancient wisdom with modern expectations.
            </p>
            <p className="text-[#064e3b]/70 leading-relaxed mb-6">
              Our formulations combine time-tested ingredients like Rosemary, Bhringraj, Fenugreek, and Black Seeds—each selected for their proven benefits in promoting hair growth, reducing hair fall, and maintaining scalp health.
            </p>
            <p className="text-[#064e3b]/70 leading-relaxed mb-8">
              Every product we create undergoes careful testing to ensure it delivers real results without harsh chemicals or synthetic additives. We believe in transparency, quality, and the power of nature to transform hair from the root.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Award size={24} className="text-[#c5a059]" />
                <span className="text-[#064e3b] font-medium">Certified Formulator</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={24} className="text-[#c5a059]" />
                <span className="text-[#064e3b] font-medium">5000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 mb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-medium uppercase tracking-widest text-sm mb-4">Why Reverse Rituals</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#064e3b]">What Makes Us Different</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets size={28} className="text-[#c5a059]" />
              </div>
              <h3 className="text-lg font-medium text-[#064e3b] mb-2">No Water Dilution</h3>
              <p className="text-[#064e3b]/50 text-sm">
                Our products are concentrated—maximum benefits in every drop.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={28} className="text-[#c5a059]" />
              </div>
              <h3 className="text-lg font-medium text-[#064e3b] mb-2">100% Natural</h3>
              <p className="text-[#064e3b]/50 text-sm">
                No sulfates, no parabens, no harsh chemicals. Just pure herbs.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical size={28} className="text-[#c5a059]" />
              </div>
              <h3 className="text-lg font-medium text-[#064e3b] mb-2">Ayurvedic Formula</h3>
              <p className="text-[#064e3b]/50 text-sm">
                Based on centuries-old Ayurvedic recipes for hair health.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-[#c5a059]" />
              </div>
              <h3 className="text-lg font-medium text-[#064e3b] mb-2">Visible Results</h3>
              <p className="text-[#064e3b]/50 text-sm">
                Most customers see improvements within 3-4 weeks of use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={28} className="text-[#c5a059]" />
            </div>
            <h3 className="text-xl font-medium text-[#064e3b] mb-3">Our Mission</h3>
            <p className="text-[#064e3b]/50 leading-relaxed">
              To provide effective, natural hair care solutions that address root causes rather than just symptoms—helping everyone achieve their best hair health.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf size={28} className="text-[#c5a059]" />
            </div>
            <h3 className="text-xl font-medium text-[#064e3b] mb-3">Our Approach</h3>
            <p className="text-[#064e3b]/50 leading-relaxed">
              Combining ancient Ayurvedic herbs with modern extraction methods for maximum potency. Every ingredient is carefully sourced and tested.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="text-[#c5a059]" />
            </div>
            <h3 className="text-xl font-medium text-[#064e3b] mb-3">Our Promise</h3>
            <p className="text-[#064e3b]/50 leading-relaxed">
              Every product is crafted with integrity, transparency, and a genuine commitment to your hair health. No empty promises—just real results.
            </p>
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="bg-[#064e3b] py-20 mb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-4">Our Product Benefits</h2>
            <p className="text-white/60">What you can expect from our products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Reduces hair fall and strengthens roots",
              "Promotes new hair growth",
              "Controls dandruff and scalp issues",
              "Improves hair thickness and volume",
              "Adds natural shine and luster",
              "Conditions and nourishes hair",
              "Prevents premature greying",
              "Improves scalp blood circulation"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg text-white">
                <Check size={20} className="text-[#c5a059]" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-[#c5a059] font-medium uppercase tracking-widest text-sm mb-4">What We Stand For</p>
          <h2 className="text-3xl font-serif text-[#064e3b]">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-[#064e3b]/10 rounded-xl">
            <Leaf size={32} className="text-[#c5a059] mb-4" />
            <h3 className="text-lg font-medium text-[#064e3b] mb-3">100% Natural</h3>
            <p className="text-[#064e3b]/50 text-sm">
              No harsh chemicals, no sulfates, no parabens. Just pure botanical power for your hair.
            </p>
          </div>
          <div className="p-8 border border-[#064e3b]/10 rounded-xl">
            <FlaskConical size={32} className="text-[#c5a059] mb-4" />
            <h3 className="text-lg font-medium text-[#064e3b] mb-3">Science-Backed</h3>
            <p className="text-[#064e3b]/50 text-sm">
              Each ingredient is selected based on traditional use and modern research for proven results.
            </p>
          </div>
          <div className="p-8 border border-[#064e3b]/10 rounded-xl">
            <Globe size={32} className="text-[#c5a059] mb-4" />
            <h3 className="text-lg font-medium text-[#064e3b] mb-3">Ethically Sourced</h3>
            <p className="text-[#064e3b]/50 text-sm">
              We partner with sustainable farms that practice responsible harvesting and fair trade.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Stats */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-serif text-[#c5a059] font-bold">5000+</p>
            <p className="text-[#064e3b]/50 text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-serif text-[#c5a059] font-bold">4.8</p>
            <p className="text-[#064e3b]/50 text-sm">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-serif text-[#c5a059] font-bold">50+</p>
            <p className="text-[#064e3b]/50 text-sm">Products Sold</p>
          </div>
          <div>
            <p className="text-4xl font-serif text-[#c5a059] font-bold">98%</p>
            <p className="text-[#064e3b]/50 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-12 bg-[#064e3b] rounded-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Join thousands of others who have discovered the power of natural, Ayurvedic hair care. Start your journey to healthier hair today.
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-4 bg-[#c5a059] text-white rounded-full font-medium hover:bg-[#b08d4a] transition-colors"
          >
            Explore Products
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;