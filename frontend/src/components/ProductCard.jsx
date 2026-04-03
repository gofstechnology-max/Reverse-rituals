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
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-[#c5a059] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-serif text-gray-900">₹{product.price}</span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-white text-sm rounded-full hover:bg-[#c5a059] transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
