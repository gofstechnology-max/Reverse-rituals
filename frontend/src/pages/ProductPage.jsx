import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, Check, ArrowLeft, Minus, Plus, Truck, Shield, Leaf, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { alchemyProducts } from '../data/alchemyProducts';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const localProduct = alchemyProducts.find(p => p._id === id);
      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const { data } = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#fdfbf7] pt-32 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-[#fdfbf7] pt-32 text-center">
      <p className="text-[#064e3b]/50">Product not found</p>
      <Link to="/shop" className="text-[#c5a059] underline mt-4 block">Back to Shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[#064e3b]/50 hover:text-[#c5a059] transition-colors text-sm">
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.tag && (
              <span className="absolute top-4 left-4 px-4 py-1.5 bg-[#c5a059] text-white text-xs font-medium uppercase tracking-wider rounded-full">
                {product.tag}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <p className="text-[#c5a059] font-medium uppercase tracking-wider text-sm mb-3">
              {product.category || 'Botanical Concentrate'}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#064e3b] mb-6">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star 
                    key={star} 
                    size={18} 
                    className={star <= (product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-[#064e3b]/50 text-sm">
                {product.rating || 4}.0 ({product.numReviews || 0} reviews)
              </span>
            </div>

            <p className="text-[#064e3b]/70 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-serif text-[#064e3b]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#064e3b]/40 line-through ml-4">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-[#064e3b]/20 rounded-full overflow-hidden w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#064e3b]/5 transition-colors"
                >
                  <Minus size={18} className="text-[#064e3b]" />
                </button>
                <span className="w-14 text-center font-medium text-[#064e3b]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#064e3b]/5 transition-colors"
                >
                  <Plus size={18} className="text-[#064e3b]" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#064e3b] text-white rounded-full font-medium hover:bg-[#c5a059] transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: <Truck size={20} />, text: 'Free Shipping' },
                { icon: <Shield size={20} />, text: 'Quality Guaranteed' },
                { icon: <Leaf size={20} />, text: '100% Natural' },
                { icon: <RotateCcw size={20} />, text: 'Easy Returns' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[#064e3b]/60 text-sm">
                  <span className="text-[#c5a059]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-[#064e3b]/10">
          <div className="flex gap-8 mb-8 overflow-x-auto">
            {['description', 'ingredients', 'how-to-use'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-[#c5a059] text-[#064e3b] font-medium' 
                    : 'border-transparent text-[#064e3b]/40 hover:text-[#064e3b]'
                }`}
              >
                {tab === 'description' ? 'Description' : tab === 'ingredients' ? 'Ingredients' : 'How to Use'}
              </button>
            ))}
          </div>

          <div className="pb-16">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-medium text-[#064e3b] mb-4">About this product</h3>
                <p className="text-[#064e3b]/70 leading-relaxed">{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#064e3b]/70">
                        <Check size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-medium text-[#064e3b] mb-6">Key Ingredients</h3>
                {product.ingredients && product.ingredients.length > 0 ? (
                  <div className="space-y-4">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="p-6 bg-white rounded-xl border border-[#064e3b]/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#c5a059]/10 rounded-lg flex items-center justify-center">
                            <Leaf size={20} className="text-[#c5a059]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#064e3b]">{ing.name}</h4>
                            <p className="text-sm text-[#064e3b]/50">{ing.description}</p>
                          </div>
                        </div>
                        {ing.points && ing.points.length > 0 && (
                          <ul className="space-y-2 ml-14">
                            {ing.points.map((point, j) => (
                              <li key={j} className="text-sm text-[#064e3b]/60 flex items-start gap-2">
                                <Check size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#064e3b]/50">Natural botanical extracts carefully sourced from certified organic farms.</p>
                )}
              </div>
            )}

            {activeTab === 'how-to-use' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-medium text-[#064e3b] mb-6">How to Use</h3>
                <ol className="space-y-4">
                  {product.usageTips ? product.usageTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#064e3b]/10">
                      <span className="w-8 h-8 bg-[#c5a059]/10 text-[#c5a059] rounded-full flex items-center justify-center font-medium text-sm shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[#064e3b]/70">{tip}</span>
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#064e3b]/10">
                        <span className="w-8 h-8 bg-[#c5a059]/10 text-[#c5a059] rounded-full flex items-center justify-center font-medium text-sm shrink-0">1</span>
                        <span className="text-[#064e3b]/70">Apply to clean, damp hair and scalp.</span>
                      </li>
                      <li className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#064e3b]/10">
                        <span className="w-8 h-8 bg-[#c5a059]/10 text-[#c5a059] rounded-full flex items-center justify-center font-medium text-sm shrink-0">2</span>
                        <span className="text-[#064e3b]/70">Massage gently for 2-3 minutes to stimulate follicles.</span>
                      </li>
                      <li className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#064e3b]/10">
                        <span className="w-8 h-8 bg-[#c5a059]/10 text-[#c5a059] rounded-full flex items-center justify-center font-medium text-sm shrink-0">3</span>
                        <span className="text-[#064e3b]/70">Leave in for best results. Use daily for optimal benefits.</span>
                      </li>
                    </>
                  )}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
