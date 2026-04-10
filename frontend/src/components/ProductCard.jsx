import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
      <Link to={`/product/${product._id}`} className="relative block aspect-4/5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
  
      </Link>

      <div className="p-3 md:p-5 flex flex-col grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm md:text-lg font-medium text-gray-900 mb-1 group-hover:text-[#c5a059] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base md:text-xl font-serif text-gray-900">₹{product.price}</span>
            
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#064e3b] text-white text-xs md:text-sm rounded-full hover:bg-[#c5a059] transition-colors"
          >
            <ShoppingCart size={14} md:size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
