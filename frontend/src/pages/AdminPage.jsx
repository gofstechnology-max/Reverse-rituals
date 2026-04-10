import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag, Package, Truck, CheckCircle, Trash2, Edit3, Plus, X,
  DollarSign, Users, BarChart3, Calendar, Search, Home, Settings,
  LogOut, Bell, Menu, ChevronRight, Image, CreditCard, MapPin, Phone, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', description: '', image: '', category: '', countInStock: '',
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

      // Fetch products from backend only (no frontend fallback)
      let productsRes = { data: [] };
      try {
        productsRes = await axios.get(`${API_URL}/api/products`);
      } catch (err) {
        console.log('Products fetch error:', err.message);
      }

      setProducts(productsRes.data || []);

      // Try to get orders if user is logged in
      let ordersRes = { data: [] };
      if (user?.token) {
        try {
          ordersRes = await axios.get(`${API_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
        } catch (err) {
          console.log('Orders fetch error:', err.message);
        }
      }
      setOrders(ordersRes.data || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      await axios.put(`${API_URL}/api/orders/${id}/deliver`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Order marked as delivered!');
      fetchData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.delete(`${API_URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success('Order deleted!');
        fetchData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.delete(`${API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success('Product deleted!');
        fetchData();
      } catch (error) {
        toast.error('Deletion failed');
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingProduct) {
        await axios.put(`${API_URL}/api/products/${editingProduct._id}`, formData, config);
        toast.success('Product updated!');
      } else {
        await axios.post(`${API_URL}/api/products`, formData, config);
        toast.success('Product created!');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', image: '', category: '', countInStock: '' });
      fetchData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price, description: product.description,
      image: product.image, category: product.category, countInStock: product.countInStock,
    });
    setIsModalOpen(true);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const pendingOrders = orders.filter(o => !o.isDelivered).length;
  const deliveredOrders = orders.filter(o => o.isDelivered).length;
  const lowStockProducts = products.filter(p => p.countInStock < 5).length;

  const filteredOrders = orders.filter(order =>
    order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Overview' },
    { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders', badge: orders.length },
    { id: 'products', icon: <Package size={20} />, label: 'Products', badge: products.length },
    { id: 'customers', icon: <Users size={20} />, label: 'Customers' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#064e3b]/10 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#064e3b]/50 font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#064e3b]/10 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-[#064e3b]/5 rounded-xl">
          <Menu size={24} className="text-[#064e3b]" />
        </button>
        <h1 className="text-lg font-black text-[#064e3b]">Admin</h1>
        <div className="w-9 h-9 bg-[#c5a059] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0)}
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-[#064e3b]">Admin</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2"><X size={24} className="text-[#064e3b]/50" /></button>
              </div>
              <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === item.id ? 'bg-[#064e3b] text-white' : 'text-[#064e3b]/60 hover:bg-[#064e3b]/5'
                      }`}
                  >
                    {item.icon}
                    {item.label}
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${activeTab === item.id ? 'bg-white/20' : 'bg-[#064e3b]/10'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-4 px-5 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all mt-4">
                <LogOut size={20} /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-[#064e3b]/10 flex-col">
        <div className="p-8">
          <h2 className="text-3xl font-black text-[#064e3b]">Admin</h2>
          <p className="text-[#064e3b]/40 text-sm mt-1">Dashboard</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-[#064e3b] text-white shadow-lg shadow-[#064e3b]/20' : 'text-[#064e3b]/60 hover:bg-[#064e3b]/5'
                }`}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${activeTab === item.id ? 'bg-white/20' : 'bg-[#064e3b]/10'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#064e3b]/10">
          <div className="flex items-center gap-4 p-4 bg-[#fdfbf7] rounded-2xl mb-4">
            <div className="w-12 h-12 bg-[#c5a059] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#064e3b] truncate">{user?.name}</p>
              <p className="text-[#064e3b]/40 text-sm truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-5 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 pt-20 lg:pt-0">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {[
              { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'bg-green-500' },
              { title: 'Total Orders', value: orders.length, icon: <ShoppingBag size={24} />, color: 'bg-blue-500' },
              { title: 'Pending', value: pendingOrders, icon: <Truck size={24} />, color: 'bg-yellow-500' },
              { title: 'Products', value: products.length, icon: <Package size={24} />, color: 'bg-purple-500' },
            ].map((stat, idx) => (
              <motion.div
                key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[1.5rem] p-5 lg:p-8 border border-[#064e3b]/5 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-[#064e3b]/40 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-black text-[#064e3b]">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Delivered', value: deliveredOrders, color: 'bg-green-500', percent: orders.length ? (deliveredOrders / orders.length) * 100 : 0 },
              { label: 'Pending', value: pendingOrders, color: 'bg-yellow-500', percent: orders.length ? (pendingOrders / orders.length) * 100 : 0 },
              { label: 'Low Stock', value: lowStockProducts, color: 'bg-red-500', percent: products.length ? (lowStockProducts / products.length) * 100 : 0 },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[1.5rem] p-5 border border-[#064e3b]/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#064e3b]/60">{item.label}</span>
                  <span className="text-xl font-black text-[#064e3b]">{item.value}</span>
                </div>
                <div className="h-2 bg-[#064e3b]/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#064e3b]/30" size={20} />
            <input
              type="text" placeholder={activeTab === 'products' ? 'Search products...' : 'Search orders...'}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-[#064e3b]/10 rounded-2xl focus:outline-none focus:border-[#c5a059] text-[#064e3b] placeholder-[#064e3b]/30"
            />
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#064e3b]">
                {activeTab === 'dashboard' && 'Overview'}
                {activeTab === 'orders' && 'Orders'}
                {activeTab === 'products' && 'Products'}
                {activeTab === 'customers' && 'Customers'}
                {activeTab === 'settings' && 'Settings'}
              </h3>
              <p className="text-[#064e3b]/40 text-sm">
                {activeTab === 'dashboard' && 'Your store at a glance'}
                {activeTab === 'orders' && 'Manage customer orders'}
                {activeTab === 'products' && 'Manage product inventory'}
                {activeTab === 'customers' && 'View customer details'}
                {activeTab === 'settings' && 'Configure your store'}
              </p>
            </div>
            {activeTab === 'products' && (
              <button
                onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', description: '', image: '', category: '', countInStock: '' }); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#064e3b] text-white rounded-xl sm:rounded-2xl font-bold hover:bg-[#c5a059] transition-all text-sm"
              >
                <Plus size={18} /> <span className="hidden sm:inline">Add Product</span>
              </button>
            )}
          </div>

          {/* Content */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-[2rem] p-6 border border-[#064e3b]/5">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-[#064e3b]">Recent Orders</h4>
                  <button onClick={() => setActiveTab('orders')} className="text-[#c5a059] text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order._id} className="flex items-center gap-4 p-4 bg-[#fdfbf7] rounded-2xl hover:shadow-md transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-[#064e3b]/10 rounded-xl flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[#064e3b]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#064e3b] truncate">{order.shippingAddress.fullName}</p>
                        <p className="text-[#064e3b]/40 text-sm">{order.orderItems.length} items • ₹{order.totalPrice}</p>
                      </div>
                      <div>
                        {order.isDelivered ? (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Delivered</span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Products */}
              <div className="bg-white rounded-[2rem] p-6 border border-[#064e3b]/5">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-[#064e3b]">Low Stock Alert</h4>
                  <button onClick={() => setActiveTab('products')} className="text-[#c5a059] text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {products.filter(p => p.countInStock < 10).slice(0, 4).map((product) => (
                    <div key={product._id} className="flex items-center gap-4 p-4 bg-[#fdfbf7] rounded-2xl hover:shadow-md transition-all cursor-pointer">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#064e3b] truncate">{product.name}</p>
                        <p className="text-[#064e3b]/40 text-sm">₹{product.price}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${product.countInStock < 5 ? 'text-red-500' : 'text-yellow-500'}`}>
                          {product.countInStock} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3 sm:space-y-4">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl sm:rounded-2xl border border-[#064e3b]/5 overflow-hidden"
                >
                  <div
                    className="p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-[#fdfbf7]/50 transition-all"
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064e3b]/10 rounded-xl flex items-center justify-center">
                        <ShoppingBag size={18} className="text-[#064e3b]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#064e3b] text-sm sm:text-base">{order.shippingAddress.fullName}</p>
                        <p className="text-[#064e3b]/40 text-xs sm:text-sm">#{order._id.slice(-8)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="text-right">
                        <p className="font-black text-[#c5a059] text-sm sm:text-lg">₹{order.totalPrice}</p>
                        <p className="text-[#064e3b]/40 text-xs sm:text-sm">{order.orderItems.length} items</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.isDelivered ? (
                          <span className="px-2 sm:px-4 py-1 sm:py-2 bg-green-100 text-green-600 rounded-full text-xs sm:text-sm font-bold">Delivered</span>
                        ) : order.isPaid ? (
                          <span className="px-2 sm:px-4 py-1 sm:py-2 bg-yellow-100 text-yellow-600 rounded-full text-xs sm:text-sm font-bold">Pending</span>
                        ) : (
                          <span className="px-2 sm:px-4 py-1 sm:py-2 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold">Unpaid</span>
                        )}
                        {!order.isDelivered && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeliver(order._id); }}
                            className="px-2 sm:px-4 py-1 sm:py-2 bg-[#c5a059] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#064e3b] transition-all"
                          >
                            Deliver
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order._id); }}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold hover:bg-red-200 transition-all"
                          title="Delete Order"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <ChevronRight size={18} className={`text-[#064e3b]/30 transition-transform hidden sm:flex ${expandedOrder === order._id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-[#064e3b]/5">
                        <div className="p-5 lg:p-6 bg-[#fdfbf7]/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="text-sm font-bold text-[#064e3b]/40 uppercase tracking-wider mb-3">Shipping Address</h5>
                              <div className="space-y-2 text-[#064e3b]">
                                <p className="font-bold">{order.shippingAddress.fullName}</p>
                                <p className="text-sm">{order.shippingAddress.address}</p>
                                <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p className="text-sm">{order.shippingAddress.country}</p>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-[#064e3b]/40 uppercase tracking-wider mb-3">Order Items</h5>
                              <div className="grid grid-cols-2 gap-3">
                                {order.orderItems.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-xl">
                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                                    <div className="min-w-0">
                                      <p className="text-sm font-bold text-[#064e3b] truncate">{item.name}</p>
                                      <p className="text-xs text-[#064e3b]/40">₹{item.price} × {item.qty}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="text-center py-16 bg-white rounded-[2rem] border border-[#064e3b]/5">
                  <ShoppingBag size={48} className="mx-auto text-[#064e3b]/20 mb-4" />
                  <p className="text-[#064e3b]/40">No orders found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {/* Add Product Card */}
              <button
                onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', description: '', image: '', category: '', countInStock: '' }); setIsModalOpen(true); }}
                className="bg-white rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-[#064e3b]/20 flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-8 min-h-[160px] sm:min-h-[200px] lg:min-h-[300px] hover:border-[#c5a059] hover:bg-[#fdfbf7]/50 transition-all group"
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#064e3b]/5 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                  <Plus size={20} className="sm:size-8" />
                </div>
                <span className="font-bold text-[#064e3b]/50 group-hover:text-[#064e3b] text-xs sm:text-sm">Add New</span>
              </button>

              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl sm:rounded-[2rem] border border-[#064e3b]/5 overflow-hidden group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold text-[#064e3b]">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h4 className="font-bold text-[#064e3b] mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base line-clamp-1">{product.name}</h4>
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <span className="text-sm sm:text-lg lg:text-xl font-black text-[#c5a059]">₹{product.price}</span>
                      <span className={`text-[10px] sm:text-xs lg:text-sm font-bold ${product.countInStock < 5 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.countInStock}
                      </span>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <button onClick={() => openEditModal(product)} className="flex-1 py-2 sm:py-3 bg-[#064e3b]/5 text-[#064e3b] rounded-lg sm:rounded-xl font-bold hover:bg-[#064e3b] hover:text-white transition-all flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs lg:text-sm">
                        <Edit3 size={12} className="sm:size-4" /> <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-50 text-red-500 rounded-lg sm:rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <Trash2 size={12} className="sm:size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="bg-white rounded-[2rem] border border-[#064e3b]/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-[#fdfbf7]">
                    <tr>
                      <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-[#064e3b]/40">Customer</th>
                      <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-[#064e3b]/40">Orders</th>
                      <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-[#064e3b]/40">Total Spent</th>
                      <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-[#064e3b]/40">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#064e3b]/5">
                    {orders.reduce((acc, order) => {
                      const existing = acc.find(c => c.email === order.shippingAddress.email);
                      if (existing) {
                        existing.orders += 1;
                        existing.spent += order.totalPrice;
                      } else {
                        acc.push({ email: order.shippingAddress.email, name: order.shippingAddress.fullName, orders: 1, spent: order.totalPrice });
                      }
                      return acc;
                    }, []).slice(0, 10).map((customer, idx) => (
                      <tr key={idx} className="hover:bg-[#fdfbf7]/50 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center text-white font-bold">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#064e3b]">{customer.name}</p>
                              <p className="text-sm text-[#064e3b]/40">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5"><span className="font-bold text-[#064e3b]">{customer.orders}</span></td>
                        <td className="p-5"><span className="font-bold text-[#c5a059]">₹{customer.spent}</span></td>
                        <td className="p-5"><span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2rem] p-8 border border-[#064e3b]/5">
                <h4 className="text-xl font-black text-[#064e3b] mb-6">Store Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Store Name</label>
                    <input type="text" defaultValue="Reverse Rituals" className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Email</label>
                    <input type="email" defaultValue={user?.email} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <button className="px-6 py-3 bg-[#064e3b] text-white rounded-xl font-bold hover:bg-[#c5a059] transition-all">Save Changes</button>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-[#064e3b]/5">
                <h4 className="text-xl font-black text-[#064e3b] mb-6">Account</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#fdfbf7] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#c5a059] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#064e3b]">{user?.name}</p>
                        <p className="text-sm text-[#064e3b]/40">Admin</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { logout(); navigate('/'); }} className="w-full py-3 border border-red-500 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2rem] p-6 lg:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-black text-[#064e3b]">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#064e3b]/30 hover:text-[#064e3b]"><X size={28} /></button>
              </div>
              <form onSubmit={handleProductSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Product Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Category</label>
                    <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Price (₹)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Stock</label>
                    <input type="number" required value={formData.countInStock} onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Image URL</label>
                  <input type="text" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#064e3b]/40 mb-2">Description</label>
                  <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-5 py-3 bg-[#fdfbf7] border border-[#064e3b]/10 rounded-xl focus:outline-none focus:border-[#c5a059] resize-none"></textarea>
                </div>
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-[#064e3b]/10 rounded-xl font-bold text-[#064e3b] hover:bg-[#064e3b]/5 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-[#064e3b] text-white rounded-xl font-bold hover:bg-[#c5a059] transition-all">{editingProduct ? 'Save' : 'Create'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;