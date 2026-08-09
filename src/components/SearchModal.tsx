import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToCatalog } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = PRODUCTS.filter((product) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3 text-white">
              <Search className="w-5 h-5 text-[#df0024] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar chaquetas, botas, morrales LOBY, bastones..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white font-mono"
              >
                ESC
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {!query.trim() ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Búsquedas populares
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Chaqueta Impermeable',
                      'Chaleco Trail',
                      'Mochila 55L',
                      'Botas Waterproof',
                      'Saco de Dormir -5°C',
                      'Bastones Carbono',
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-[#df0024] text-slate-700 text-xs font-semibold transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <p className="font-bold text-slate-800 mb-1">No encontramos resultados para "{query}"</p>
                  <p className="text-xs text-slate-500 mb-4">Intenta con términos más generales como "chaqueta", "morral" o "calzado".</p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateToCatalog();
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#df0024] hover:underline"
                  >
                    <span>Ver todo el catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Resultados ({searchResults.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateToProduct(product.id);
                        }}
                        className="flex gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-red-500/20 hover:bg-red-50/50 cursor-pointer transition-all duration-200 group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-[#df0024] transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono font-extrabold text-[#df0024] text-xs">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateToCatalog();
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#df0024] hover:underline"
                    >
                      Ver todos los resultados en el catálogo →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
