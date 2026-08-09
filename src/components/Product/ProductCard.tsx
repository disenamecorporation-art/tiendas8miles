import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { navigateToProduct, addToCart, wishlist, toggleWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = wishlist.includes(product.id);
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div 
        onClick={() => navigateToProduct(product.id)}
        className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        {/* Main & Hover Images */}
        <img
          src={mainImage}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-500 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />
        <img
          src={hoverImage}
          alt={`${product.name} detalle`}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountPercent && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-[#df0024] text-white shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
              Nuevo
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          type="button"
          aria-label="Añadir a favoritos"
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-20 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay */}
        <div className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 z-20 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#df0024] transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToProduct(product.id);
            }}
            type="button"
            aria-label="Vista rápida del producto"
            className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white shadow-md transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
          <span className="uppercase tracking-wider text-slate-400 font-semibold">{product.brand}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700 text-xs">{product.rating}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => navigateToProduct(product.id)}
          className="font-bold text-slate-900 text-sm md:text-base leading-snug line-clamp-2 mb-2 cursor-pointer hover:text-[#df0024] transition-colors"
        >
          {product.name}
        </h3>

        {/* Sizes preview */}
        {!compact && (
          <div className="flex items-center gap-1 my-1.5 flex-wrap">
            {product.sizes.slice(0, 5).map((sz) => (
              <span
                key={sz}
                className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] text-slate-500 font-mono"
              >
                {sz}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-slate-400 font-mono">+{product.sizes.length - 5}</span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-extrabold text-[#df0024] font-mono">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-lg text-slate-700 hover:text-[#df0024] hover:bg-red-50 transition-colors"
            title="Agregar al carrito"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
