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
      theme: "light",
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[#fdfbf7]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
      </Link>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col grow">

        {/* Product Title */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#c5a059] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Category (optional) */}
        {product.category && (
          <p className="text-xs text-gray-400 mb-3">
            {product.category}
          </p>
        )}

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between">

          {/* Price */}
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-serif text-[#064e3b] font-bold">
              ₹{product.price}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#064e3b] text-white text-xs md:text-sm rounded-full hover:bg-[#c5a059] transition-all duration-300 shadow-sm hover:shadow-md"
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