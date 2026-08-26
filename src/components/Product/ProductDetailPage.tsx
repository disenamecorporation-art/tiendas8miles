import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Ruler,
  Info
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, COMPANY_INFO } from '../../data/mockData';
import { ProductCard } from './ProductCard';
import { ShineButton } from '../ui/ShineButton';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    wishlist,
    toggleWishlist,
    setCurrentRoute,
    navigateToCatalog,
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product?.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Única');
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || { name: 'Estándar', hex: '#1E293B' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');

  const isFavorite = product ? wishlist.includes(product.id) : false;

  // Related products in same category
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const generateWhatsAppInquiry = () => {
    if (!product) return '';
    const text = `*¡Hola tienda8miles! Me interesa obtener más información sobre este producto:*\n\n• *${product.name}*\n• *Precio:* $${product.price.toFixed(2)} USD\n• *Talla seleccionada:* ${selectedSize}\n• *Color:* ${selectedColor.name}\n\n_Enviado desde tienda8miles_`;
    return `https://wa.me/584241324497?text=${encodeURIComponent(text)}`;
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 font-medium">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div key={product.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => setCurrentRoute('home')} className="hover:text-slate-900">
          Inicio
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button onClick={() => navigateToCatalog()} className="hover:text-slate-900">
          Catálogo
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {product.discountPercent && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#df0024] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                -{product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === img
                    ? 'border-[#df0024] shadow-md scale-105'
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Vista ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Product Info & Purchase Form */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} opiniones)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-red-50/60 border border-orange-200/60 flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#df0024] font-mono">
              ${product.price.toFixed(2)} USD
            </span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through font-mono">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">
              En Stock Disponibilidad Inmediata
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Color Seleccionado: <span className="text-[#df0024]">{selectedColor.name}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                    selectedColor.name === c.name
                      ? 'border-[#df0024] bg-red-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Talla: <span className="text-[#df0024]">{selectedSize}</span>
              </label>
              <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-orange-600">
                <Ruler className="w-3.5 h-3.5" />
                <span>Guía de Tallas LOBY</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedSize === sz
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-600 hover:bg-slate-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-mono font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-600 hover:bg-slate-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <ShineButton
                  onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                  variant="primary"
                  fullWidth
                  size="lg"
                  icon={<ShoppingBag className="w-5 h-5" />}
                >
                  Agregar al Carrito
                </ShineButton>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border-2 transition-colors ${
                  isFavorite
                    ? 'border-rose-500 bg-rose-50 text-rose-500'
                    : 'border-slate-200 text-slate-600 hover:border-rose-300'
                }`}
                title="Favoritos"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp direct buy link */}
            <a
              href={generateWhatsAppInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-green-600 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Consultar disponibilidad en WhatsApp (0424-1324497)
            </a>
          </div>

          {/* Highlights & Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#df0024] shrink-0" />
              <span>Garantía LOBY Oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#df0024] shrink-0" />
              <span>Envíos a todo el país</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#df0024] shrink-0" />
              <span>30 Días para cambios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Descripción / Ficha Técnica / Envíos */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="flex border-b border-slate-200 gap-8">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#df0024] text-[#df0024]'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Descripción Detallada
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-[#df0024] text-[#df0024]'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Ficha Técnica
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'shipping'
                ? 'border-[#df0024] text-[#df0024]'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Envíos y Devoluciones
          </button>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <h4 className="font-bold text-slate-900 text-base">Características Principales:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#df0024] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.techSpecs.weight && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Peso</span>
                  <span className="font-bold text-slate-900 font-mono">{product.techSpecs.weight}</span>
                </div>
              )}
              {product.techSpecs.material && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Material</span>
                  <span className="font-bold text-slate-900">{product.techSpecs.material}</span>
                </div>
              )}
              {product.techSpecs.waterproof && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Impermeabilidad</span>
                  <span className="font-bold text-slate-900 font-mono">{product.techSpecs.waterproof}</span>
                </div>
              )}
              {product.techSpecs.recommendedUse && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Uso Recomendado</span>
                  <span className="font-bold text-slate-900">{product.techSpecs.recommendedUse}</span>
                </div>
              )}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Garantía Oficial</span>
                <span className="font-bold text-slate-900">
                  {product.techSpecs.warranty || 'Garantía por Manufacturas Todo Terreno — RIF J-40739900-4'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>
                Realizamos despachos diarios a toda Venezuela mediante las agencias Zoom, MRW y Tealca con número de guía asegurado. Tarifa estándar de envío nacional.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900">También te puede interesar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
