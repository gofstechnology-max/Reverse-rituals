import React from 'react';
import { Link } from 'react-router-dom';
// import { Package, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#064e3b] border-t border-[#c5a059]/10 py-32 px-6 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#c5a059] rounded-xl flex items-center justify-center shadow-2xl shadow-[#c5a059]/20">
               <span className="text-[#064e3b] text-2xl font-black">R</span>
            </div>
            <span className="text-3xl font-serif font-black text-white tracking-tighter">Reverse Rituals</span>
          </div>
          <p className="text-[#fdfbf7]/40 mb-12 max-w-xs leading-relaxed font-medium">
             Engineering the future of botanical longevity. Our rituals are designed to reverse the cellular timeline of damage.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#064e3b] transition-all duration-500 group shadow-xl">
               <span className="text-xs font-bold font-serif italic border-b border-transparent group-hover:border-current">Ig</span>
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#064e3b] transition-all duration-500 group shadow-xl">
               <span className="text-xs font-bold font-serif italic border-b border-transparent group-hover:border-current">Tw</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-10 text-[#c5a059]">The Collections</h4>
          <ul className="space-y-6 text-[#fdfbf7]/40 text-sm font-bold">
            <li><Link to="/" className="hover:text-white transition-colors tracking-widest uppercase">Signature Alchemy</Link></li>
            <li><Link to="/#products" className="hover:text-white transition-colors tracking-widest uppercase">Clinical Rituals</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors tracking-widest uppercase">The Alchemist Journal</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors tracking-widest uppercase">Boutique Locations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-10 text-[#c5a059]">Concierge</h4>
          <ul className="space-y-6 text-[#fdfbf7]/40 text-sm font-bold">
            <li><a href="#" className="hover:text-white transition-colors tracking-widest uppercase">Shipping Rituals</a></li>
            <li><a href="#" className="hover:text-white transition-colors tracking-widest uppercase">Return Policies</a></li>
            <li><a href="#" className="hover:text-white transition-colors tracking-widest uppercase">Privacy Boutique</a></li>
            <li><a href="#" className="hover:text-white transition-colors tracking-widest uppercase">Terms of Alchemy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-10 text-[#c5a059]">Presence</h4>
          <ul className="space-y-6 text-[#fdfbf7]/40 text-sm font-bold">
            <li className="leading-relaxed tracking-widest uppercase">
              77 Alchemist Lane,<br />
              Tamil Nadu, 600001
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-pulse"></span>
              <span className="tracking-widest underline decoration-[#c5a059]/40 underline-offset-8">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-pulse"></span>
              <span className="tracking-widest underline decoration-[#c5a059]/40 underline-offset-8">rituals@reverse.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[#fdfbf7]/20 text-[10px] font-black uppercase tracking-[0.4em]">
        <p>&copy; 2026 Reverse Rituals. All biological rights reserved.</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white/40">Privacy</a>
          <a href="#" className="hover:text-white/40">Terms</a>
          <a href="#" className="hover:text-white/40">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};




export default Footer;
