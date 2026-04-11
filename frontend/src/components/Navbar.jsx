import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Menu, X, MessageCircle, ArrowRight, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const WHATSAPP_NUMBER = "919384642040";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/about' },
  ];

  useEffect(() => {
    if (user) {
      // Check for new order from checkout
      const latestOrderStr = localStorage.getItem('latestOrder');
      if (latestOrderStr) {
        try {
          const latestOrder = JSON.parse(latestOrderStr);
          setLastOrder(latestOrder);
          localStorage.removeItem('latestOrder');
        } catch (e) { console.log(e); }
      }

      const fetchLastOrder = async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
          const { data } = await axios.get(`${API_URL}/api/orders/myorders`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          // Only set if we have orders and the most recent one is paid
          if (data.length > 0 && data[0].isPaid && (!lastOrder || lastOrder._id !== data[0]._id)) {
            setLastOrder(data[0]);
          }
        } catch (err) {
          // Silently handle - user might not have orders yet
          console.log('No orders found');
        }
      };
      fetchLastOrder();
    } else {
      setLastOrder(null);
    }
  }, [user]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-2 md:py-3 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-[#064e3b]/5 will-change-transform">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout: [Cart/Profile] [Logo] [Menu] */}
          <div className="grid grid-cols-3 items-center md:hidden h-12">
            {/* Left: Cart & Profile (Mobile Only) */}
            <div className="flex justify-start items-center gap-1">
              <Link to="/cart" className="relative p-2 rounded-full text-[#064e3b]">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#c5a059] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to={user ? (user.isAdmin ? "/admin" : "/orders") : "/login"} className="p-2 rounded-full text-[#064e3b]">
                <User size={20} />
              </Link>
            </div>

            {/* Center: Logo (Mobile Only) */}
            <div className="flex justify-center">
              <Link to="/" className="w-13">
                <img src="/rr-logo.png" alt="Logo" className="w-full object-contain" />
              </Link>
            </div>

            {/* Right: Menu Toggle (Mobile Only) */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#064e3b]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Layout: [Logo] [Links] [Cart/Profile] */}
          <div className="hidden md:flex justify-between items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-14 lg:w-16 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src="/rr-logo.png" alt="Reverse Rituals" className='w-full h-full object-contain' />
              </div>
            </Link>

            <div className="flex items-center gap-10 font-black text-[12px] lg:text-[14px] uppercase tracking-[0.25em] text-[#064e3b]">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="hover:text-[#c5a059] transition-all hover:tracking-[0.3em]">{link.name}</Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative group p-2 rounded-full hover:bg-[#064e3b]/5 transition-colors">
                <ShoppingCart size={22} className="text-[#064e3b] group-hover:text-[#c5a059]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#c5a059] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to={user.isAdmin ? "/admin" : "/orders"} className="flex items-center gap-2 px-5 py-2.5 bg-[#064e3b] rounded-full text-white text-xs font-black uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-md">
                    <User size={14} />
                    <span>{user.name}</span>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 px-7 py-2.5 border-2 border-[#064e3b] rounded-full text-[#064e3b] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#064e3b] hover:text-white transition-all">
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[110]"
              />
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'tween', duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="fixed top-0 right-0 h-full w-full sm:w-[85%] max-w-sm bg-[#fdfbf7] z-[120] shadow-2xl flex flex-col will-change-transform"
              >
                <div className="flex justify-between items-center p-6 border-b border-[#064e3b]/5">
                  <span className="text-xl font-serif font-black text-[#064e3b]">Ritual Menu</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-[#064e3b]/5 rounded-full text-[#064e3b] hover:bg-[#064e3b] hover:text-white transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="grow overflow-y-auto px-6 py-10 scrollbar-hide">
                  <motion.div
                    initial="closed"
                    animate="open"
                    className="flex flex-col gap-8"
                  >
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        variants={{
                          open: { opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.1 } },
                          closed: { opacity: 0, x: -10 }
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-lg font-serif font-black uppercase tracking-[0.2em] text-[#064e3b] flex items-center justify-between group py-1"
                        >
                          <span className="relative">
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          <ArrowRight size={16} className="text-[#c5a059]/40 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    ))}

                    <div className="h-px w-full bg-[#064e3b]/10 my-2" />

                    <motion.div
                      variants={{
                        open: { opacity: 1, y: 0, transition: { delay: 0.4 } },
                        closed: { opacity: 0, y: 10 }
                      }}
                      className="space-y-4"
                    >
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-[#064e3b]/60 flex items-center gap-3 hover:text-[#064e3b] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#064e3b]/5 flex items-center justify-center">
                          <Package size={16} className="text-[#c5a059]" />
                        </div>
                        Track My Ritual
                      </Link>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#064e3b]/60 flex items-center gap-3 hover:text-[#064e3b] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                          <MessageCircle size={16} className="text-[#128C7E]" />
                        </div>
                        Ritual Support
                      </a>
                    </motion.div>

                    {user && (
                      <motion.div
                        variants={{
                          open: { opacity: 1, y: 0, transition: { delay: 0.5 } },
                          closed: { opacity: 0, y: 10 }
                        }}
                      >
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="text-sm font-bold text-red-500/80 flex items-center gap-3 mt-2 hover:text-red-600 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                            <LogOut size={16} />
                          </div>
                          End Ritual
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="p-6 bg-white border-t border-[#064e3b]/5">
                  <p className="text-[10px] font-black text-[#064e3b]/40 uppercase tracking-[0.3em] mb-4 text-center">Your Selection</p>
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-[#064e3b] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:bg-[#064e3b]/90 transition-all active:scale-[0.98]"
                  >
                    Checkout Ritual <ShoppingCart size={22} />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Order Notification Badge */}
      {lastOrder && lastOrder.isPaid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-[#c5a059]/20 p-4 max-w-xs">
            <button
              onClick={() => setLastOrder(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                ✓
              </div>
              <div>
                <p className="font-bold text-[#064e3b] text-sm">Order Placed!</p>
                <p className="text-xs text-gray-500 mt-1">
                  {lastOrder.shippingAddress?.fullName || lastOrder.user?.name || 'Customer'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {lastOrder.orderItems[0]?.name || 'Product'}
                  {lastOrder.orderItems.length > 1 && ` +${lastOrder.orderItems.length - 1}`}
                </p>
                <p className="text-xs text-[#c5a059] font-semibold mt-1">₹{lastOrder.totalPrice}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
