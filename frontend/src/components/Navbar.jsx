import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Menu, X, MessageCircle } from 'lucide-react';
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
    { name: 'About', path: '/about' },
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
          if (data.length > 0 && (!lastOrder || lastOrder._id !== data[0]._id)) {
            setLastOrder(data[0]);
          }
        } catch (err) { console.log(err); }
      };
      fetchLastOrder();
    } else {
      setLastOrder(null);
    }
  }, [user]);

  // Auto-dismiss notification after 15 seconds
  useEffect(() => {
    if (lastOrder && lastOrder.isPaid) {
      const timer = setTimeout(() => {
        setLastOrder(null);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [lastOrder]);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-serif font-black flex items-center gap-2 md:gap-3 group">
          <div className="w-10 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-700 shadow-xl shadow-[#064e3b]/20 border border-[#c5a059]/20">
            <img src="/rr-logo.png" alt="" className='w-full h-full object-cover' />
          </div>
          <span className="text-[#064e3b] tracking-tighter hidden xs:inline">Reverse Rituals</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-widest text-[#1a1a1a]/60">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-[#064e3b] transition-colors">{link.name}</Link>
            ))}
          </div>

          <div className="h-6 w-px bg-black/10 hidden md:block"></div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/cart" className="relative group p-2 rounded-full hover:bg-black/5 transition-colors">
              <ShoppingCart size={22} className="group-hover:text-[#064e3b] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#064e3b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link to="/orders" className="p-2 rounded-full hover:bg-black/5 transition-colors group hidden sm:flex">
                  <Package size={22} className="group-hover:text-[#064e3b]" />
                </Link>
                <Link to={user.isAdmin ? "/admin" : "/orders"} className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#064e3b]/5 rounded-full text-[#064e3b] text-xs md:text-sm font-bold hover:bg-[#064e3b] hover:text-white transition-all">
                  <User size={18} />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button onClick={logout} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors hidden sm:block">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-[#064e3b] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-[#c5a059] transition-colors">
                <User size={20} className="text-[#c5a059]" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#064e3b] hover:bg-black/5 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white z-101 shadow-2xl p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif font-black text-[#064e3b]">Navigation</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-[#064e3b]/5 rounded-full">
                  <X size={24} className="text-[#064e3b]" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-black text-[#064e3b] hover:text-[#c5a059] transition-colors tracking-tighter"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="h-px w-full bg-[#064e3b]/10 my-4" />

                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-[#064e3b]/60 flex items-center gap-3">
                  <Package size={22} />
                  My Orders
                </Link>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-xl font-bold text-red-500 flex items-center gap-3 mt-4"
                  >
                    <LogOut size={22} />
                    Logout
                  </button>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-[#064e3b]/10 text-center">
                <p className="text-xs font-bold text-[#064e3b]/40 uppercase tracking-widest mb-4">Start Your Ritual</p>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-[#064e3b] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl"
                >
                  View Cart <ShoppingCart size={20} />
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
