import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#064e3b] hover:text-[#c5a059] transition-colors mb-12">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-serif font-black text-[#064e3b] mb-12">Terms of Service</h1>
        
        <div className="space-y-8 text-[#064e3b]/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the Reverse Rituals website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use Reverse Rituals website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">3. Product Information</h2>
            <p>We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct any errors, inaccuracies, or omissions and to change information at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">4. Ordering and Payment</h2>
            <p>By placing an order, you warrant that you are at least 18 years old and have the legal capacity to enter into a binding contract. All payments are processed securely through Razorpay.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">5. Shipping and Delivery</h2>
            <p>Orders are processed and shipped within 3-5 business days. Delivery times may vary based on location. We ship across India.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">6. Returns and Refunds</h2>
            <p>We offer a 7-day return policy for unused products in original packaging. Please contact us to initiate a return.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">7. Intellectual Property</h2>
            <p>All content on this website is the property of Reverse Rituals and may not be reproduced without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">8. Limitation of Liability</h2>
            <p>Reverse Rituals shall not be liable for any damages arising from the use or inability to use our products or website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#064e3b] mb-4">9. Contact Information</h2>
            <p>For questions about these terms, please contact us at rituals@reverse.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
