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
      style: {
        background: "#ffffff",
        color: "#064e3b",
        borderRadius: "10px",
        border: "1px solid #e5e7eb"
      },
      progressStyle: {
        background: "#064e3b"
      }
    });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-[4/4.5] overflow-hidden bg-[#fdfbf7]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* soft overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow">

        {/* Category */}
        {product.category && (
          <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-semibold mb-2">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-base md:text-lg font-semibold text-[#064e3b] mb-2 line-clamp-2 group-hover:text-[#c5a059] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short Description (optional) */}
        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {product.description}
          </p>
        )}

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between">

          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xl font-serif text-[#064e3b] font-bold">
              ₹{product.price}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-white text-sm rounded-full hover:bg-[#c5a059] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;