import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, MapPin, Phone, User, ArrowRight, ShieldCheck, 
  LocateFixed, Navigation, CheckCircle2, Loader2, Search, ArrowLeft,
  Package, Truck, Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    phone: user?.phone || '',
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const shipping = cartTotal > 500 ? 0 : 49;
  const finalTotal = cartTotal + shipping;

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: "India" });
        if (data && !data.error) {
          setStates(data.data.states.map(s => s.name));
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) { setCities([]); return; }
      setLoadingCities(true);
      try {
        const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
          country: "India", state: formData.state
        });
        if (data && !data.error) setCities(data.data);
      } catch (error) { console.error("Error fetching cities:", error); }
      finally { setLoadingCities(false); }
    };
    fetchCities();
  }, [formData.state]);

  const handlePincodeChange = async (e) => {
    const code = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData({ ...formData, zipCode: code });

    if (code.length === 6) {
      setIsFetchingPincode(true);
      try {
        const { data } = await axios.get(`https://api.postalpincode.in/pincode/${code}`);
        if (data && data[0].Status === "Success") {
          const postoffice = data[0].PostOffice[0];
          setFormData({ 
            ...formData, 
            state: postoffice.State === "Delhi" ? "National Capital Territory of Delhi" : postoffice.State,
            city: postoffice.District || postoffice.Name,
            zipCode: code
          });
          toast.success(`Detected: ${postoffice.District}, ${postoffice.State}`);
        }
      } catch (error) { console.error("Pincode API error:", error); }
      finally { setIsFetchingPincode(false); }
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
        const data = await response.json();
        if (data && data.address) {
          const addr = data.address;
          setFormData({
            ...formData,
            address: [addr.road, addr.suburb, addr.neighborhood].filter(Boolean).join(', '),
            zipCode: addr.postcode || '',
            state: addr.state === "Delhi" ? "National Capital Territory of Delhi" : (addr.state || ''),
            city: addr.city || addr.town || addr.village || '',
          });
          toast.success("Location detected!");
        }
      } catch (error) { toast.error("Could not fetch address"); }
      finally { setIsLocating(false); }
    }, (error) => { toast.error("Location denied"); setIsLocating(false); });
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/checkout');
    } else if (!authLoading && user) {
      setIsCheckingAuth(false);
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (cartItems.length === 0 && !isCheckingAuth) navigate('/cart');
  }, [cartItems, navigate, isCheckingAuth]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) { toast.error("Please agree to the terms"); return; }

    const res = await loadRazorpay();
    if (!res) { toast.error('Razorpay failed to load'); return; }

    try {
      const orderConfig = { headers: { 'Content-Type': 'application/json', Authorization: user ? `Bearer ${user.token}` : undefined } };
      const orderData = {
        orderItems: cartItems.map(item => ({ 
          name: item.name || 'Product', 
          qty: Number(item.qty) || 1, 
          image: item.image || '',
          price: Number(item.price) || 0
        })),
        shippingAddress: { 
          fullName: formData.fullName || '', 
          address: formData.address || '', 
          city: formData.city || '', 
          state: formData.state || '', 
          zipCode: formData.zipCode || '', 
          country: 'India', 
          phone: formData.phone || ''
        },
        itemsPrice: Number(cartTotal) || 0, 
        shippingPrice: Number(shipping) || 0, 
        totalPrice: Number(finalTotal) || 0,
        paymentMethod: 'Razorpay'
      };

      let order, razorpayOrder;
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/orders`, orderData, orderConfig);
        order = data.order;
        razorpayOrder = data.razorpayOrder;
      } catch (err) {
        console.error('Order error:', err.response?.data);
        toast.error(err.response?.data?.message || 'Order failed');
        return;
      }

      const options = {
        key: 'rzp_test_SXrg4UT1hSVB4n',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Reverse Rituals',
        description: 'Payment for your hair transformation',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            const verifyRes = await axios.post(`${API_URL}/api/orders/verify`, { ...response, orderId: order._id });
            if (verifyRes.data.message === "Payment verified successfully") {
              toast.success('Payment Successful!');
              clearCart();
              // Store latest order for notification
              localStorage.setItem('latestOrder', JSON.stringify({
                ...order,
                isPaid: true,
                shippingAddress: order.shippingAddress,
                totalPrice: order.totalPrice,
                orderItems: order.orderItems
              }));
              navigate('/orders');
            }
          } catch (err) { toast.error('Payment verification failed'); }
        },
        prefill: { name: formData.fullName, email: user?.email || '', contact: formData.phone },
        theme: { color: '#064e3b' },
      };

      new window.Razorpay(options).open();
    } catch (error) { toast.error(error.response?.data?.message || 'Checkout failed'); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    authLoading || isCheckingAuth ? (
      <div className="min-h-screen bg-[#fdfbf7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#064e3b]/60">Please wait...</p>
        </div>
      </div>
    ) : (
    <div className="min-h-screen bg-[#fdfbf7] pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Link to="/cart" className="inline-flex items-center gap-2 text-[#064e3b]/50 hover:text-[#064e3b] mb-6 font-medium text-sm">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Complete Purchase</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#064e3b]">Secure <span className="text-[#c5a059]">Checkout</span></h1>
          </div>
          <div className="flex items-center gap-2 text-[#064e3b]/50 text-sm">
            <Lock size={16} /> SSL Encrypted
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#064e3b]/5">
                <h3 className="text-lg font-black text-[#064e3b] mb-5 flex items-center gap-2">
                  <User size={20} className="text-[#c5a059]" /> Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">Full Name</label>
                    <input type="text" required name="fullName" value={formData.fullName} onChange={handleChange}
                      className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">Phone Number</label>
                    <input type="tel" required name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" placeholder="10-digit number" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#064e3b]/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h3 className="text-lg font-black text-[#064e3b] flex items-center gap-2">
                    <MapPin size={20} className="text-[#c5a059]" /> Shipping Address
                  </h3>
                  <button type="button" onClick={detectLocation} disabled={isLocating}
                    className="px-4 py-2 bg-[#064e3b]/5 text-[#064e3b] rounded-xl font-bold text-sm hover:bg-[#064e3b] hover:text-white transition-all flex items-center gap-2">
                    {isLocating ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
                    {isLocating ? 'Detecting...' : 'Detect Location'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">Street Address</label>
                    <textarea required name="address" value={formData.address} onChange={handleChange} rows={2}
                      className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" placeholder="House No, Building, Street, Area" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">Pincode</label>
                      <div className="relative">
                        {isFetchingPincode && <Loader2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a059] animate-spin" />}
                        <input type="text" required name="zipCode" value={formData.zipCode} onChange={handlePincodeChange} maxLength={6}
                          className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059] pl-10" placeholder="6 digits" />
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">State</label>
                      <select required name="state" value={formData.state} onChange={handleChange}
                        className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]">
                        <option value="">Select</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-[#064e3b]/60 ml-1 mb-2 block">City</label>
                      <select required name="city" value={formData.city} onChange={handleChange} disabled={!formData.state}
                        className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059] disabled:opacity-50">
                        <option value="">Select</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-4 bg-[#fdfbf7] rounded-xl">
                <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 mt-1 accent-[#064e3b]" />
                <label htmlFor="terms" className="text-sm text-[#064e3b]/60">
                  I agree to the <span className="text-[#064e3b] font-bold underline">Terms & Conditions</span> and <span className="text-[#064e3b] font-bold underline">Privacy Policy</span>
                </label>
              </div>

              {/* Pay Button */}
              <button type="submit" className="w-full py-5 bg-[#064e3b] text-white rounded-2xl font-bold hover:bg-[#c5a059] transition-all flex items-center justify-center gap-3 text-lg">
                <CreditCard size={24} /> Pay ₹{finalTotal.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#064e3b]/5 sticky top-24">
              <h3 className="text-lg font-black text-[#064e3b] mb-5 flex items-center gap-2">
                <Package size={20} className="text-[#c5a059]" /> Order Summary
              </h3>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 p-2 bg-[#fdfbf7] rounded-xl">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#064e3b] text-sm truncate">{item.name}</p>
                      <p className="text-[#064e3b]/40 text-xs">Qty: {item.qty} × ₹{item.price}</p>
                    </div>
                    <span className="font-bold text-[#064e3b] text-sm">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#064e3b]/10">
                <div className="flex justify-between text-[#064e3b]/60">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[#064e3b]/60">
                  <span className="flex items-center gap-2"><Truck size={14} /> Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#c5a059]">Add ₹{500 - cartTotal} more for FREE shipping!</p>
                )}
                <div className="flex justify-between pt-3 border-t border-[#064e3b]/10">
                  <span className="font-bold text-[#064e3b]">Total</span>
                  <span className="text-xl font-black text-[#c5a059]">₹{finalTotal}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#c5a059]/5 rounded-xl flex items-start gap-3">
                <ShieldCheck className="text-[#c5a059] mt-1" size={20} />
                <div>
                  <p className="font-bold text-[#064e3b] text-sm">Secure Payment</p>
                  <p className="text-[#064e3b]/40 text-xs">Your payment is secured by Razorpay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
};

export default CheckoutPage;