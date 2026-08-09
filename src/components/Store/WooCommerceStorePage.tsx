import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  ChevronRight,
  ChevronDown,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Tag,
  ShieldCheck,
  Truck,
  CreditCard,
  Grid,
  List
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const WooCommerceStorePage: React.FC = () => {
  const {
    products,
    categories,
    filterState,
    setFilterState,
    resetFilters,
    filteredProducts,
    addToCart,
    toggleWishlist,
    wishlist,
    navigateToProduct,
    setCurrentRoute
  } = useShop();

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    deportes: true,
    hombre: true,
    mujer: true,
    ninos: true,
    corporativo: true
  });

  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleBrandToggle = (brandName: string) => {
    setFilterState((prev) => {
      const exists = prev.brands.includes(brandName);
      const updatedBrands = exists
        ? prev.brands.filter((b) => b !== brandName)
        : [...prev.brands, brandName];
      return { ...prev, brands: updatedBrands };
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <button
                onClick={() => setCurrentRoute('home')}
                className="hover:text-[#df0024] font-medium transition-colors"
              >
                Inicio
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-900 uppercase tracking-wider">Tienda</span>
              {filterState.category !== 'all' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[#df0024] font-bold capitalize">{filterState.category}</span>
                </>
              )}
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tienda Oficial 8miles | Catálogo LOBY
            </h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              Catálogo e-commerce con filtrado avanzado en tiempo real y envíos a toda Venezuela.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-red-50/80 border border-red-200/60 p-3.5 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-[#df0024] shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-950">Garantía Directa de Fábrica LOBY</p>
              <p className="text-[11px] text-red-800 font-light">
                Manufacturas Todo Terreno C.A. • Caracas, Venezuela
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Left + Products Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR (WOOCOMMERCE STYLE) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#df0024]" />
                  <span>Filtros de Tienda</span>
                </h3>
                {(filterState.category !== 'all' || filterState.brands.length > 0 || filterState.inStockOnly) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-[#df0024] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Limpiar</span>
                  </button>
                )}
              </div>

              {/* WIDGET 1: CATEGORÍAS (WOOCOMMERCE TREE) */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-l-2 border-[#df0024] pl-2">
                  Categorías de Producto
                </h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, category: 'all' }))}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all ${
                      filterState.category === 'all'
                        ? 'bg-[#df0024] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>Todas las Categorías</span>
                    <span className="text-[10px] opacity-80 font-mono">{products.length}</span>
                  </button>

                  {categories.map((cat) => {
                    const isCatActive = filterState.category === cat.id;
                    const isExpanded = expandedCategories[cat.id];
                    const hasSubs = cat.subcategories && cat.subcategories.length > 0;

                    return (
                      <div key={cat.id} className="space-y-1">
                        <div
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                            isCatActive
                              ? 'bg-red-50 text-[#df0024] font-bold border border-[#df0024]/20'
                              : 'text-slate-800 hover:bg-slate-100 font-semibold'
                          }`}
                        >
                          <span
                            onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
                            className="flex-1"
                          >
                            {cat.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-slate-400">({cat.itemCount})</span>
                            {hasSubs && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCategoryExpand(cat.id);
                                }}
                                className="p-1 hover:text-[#df0024]"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Subcategories accordion */}
                        {hasSubs && isExpanded && (
                          <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-slate-200 ml-2">
                            {cat.subcategories?.map((sub) => {
                              const isSubActive = filterState.category === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => setFilterState((prev) => ({ ...prev, category: sub.id }))}
                                  className={`w-full text-left px-2.5 py-1 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                    isSubActive
                                      ? 'bg-[#df0024] text-white font-bold'
                                      : 'text-slate-600 hover:text-[#df0024] hover:bg-slate-50 font-medium'
                                  }`}
                                >
                                  <span>{sub.name}</span>
                                  <span className="text-[10px] opacity-60">›</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WIDGET 2: FILTRO POR PRECIO (WOOCOMMERCE PRICE RANGE) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-l-2 border-[#df0024] pl-2">
                  Filtrar por Precio ($ USD)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-800">
                    <span>${filterState.priceRange[0]}</span>
                    <span>${filterState.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="5"
                    value={filterState.priceRange[1]}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))
                    }
                    className="w-full accent-[#df0024] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Precio Máximo: <strong>${filterState.priceRange[1]} USD</strong></span>
                  </div>
                </div>
              </div>

              {/* WIDGET 3: MARCAS */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-l-2 border-[#df0024] pl-2">
                  Marca de Producto
                </h4>
                <div className="space-y-2 text-xs">
                  {['LOBY Technical Pro', 'LOBY', 'Manufacturas Todo Terreno'].map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={filterState.brands.includes(b)}
                        onChange={() => handleBrandToggle(b)}
                        className="w-4 h-4 text-[#df0024] rounded border-slate-300 focus:ring-[#df0024]"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* WIDGET 4: DISPONIBILIDAD */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-l-2 border-[#df0024] pl-2">
                  Estado de Inventario
                </h4>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterState.inStockOnly}
                    onChange={(e) =>
                      setFilterState((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                    }
                    className="w-4 h-4 text-[#df0024] rounded border-slate-300"
                  />
                  <span>Mostrar solo en Stock</span>
                </label>
              </div>

              {/* WIDGET 5: VENTAJA VENEZUELA */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#df0024]">
                  <Truck className="w-4 h-4" />
                  <span className="font-bold uppercase text-[10px] tracking-wider">Envíos Nacionales</span>
                </div>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                  Despachos inmediatos por MRW, Zoom y Tealca. Deliveries directos en Caracas.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Aceptamos Zelle</span>
                  <span>Pago Móvil</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCTS MAIN GRID (WOOCOMMERCE) */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar (Results Count, Sorting, View Switcher) */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-600 font-medium">
                Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> de{' '}
                <strong className="text-slate-900">{products.length}</strong> productos
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Column Layout Switcher */}
                <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 3 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="3 Columnas"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 4 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="4 Columnas Compactas"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Sorting Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:inline">Ordenar:</span>
                  <select
                    value={filterState.sortBy}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        sortBy: e.target.value as any
                      }))
                    }
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  >
                    <option value="relevance">Por defecto (Relevancia)</option>
                    <option value="price-asc">Precio: de menor a mayor</option>
                    <option value="price-desc">Precio: de mayor a menor</option>
                    <option value="newest">Lo más reciente</option>
                    <option value="rating">Mejor valorados</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Badges Bar */}
            {filterState.category !== 'all' && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Filtro Activo:</span>
                <span className="px-3 py-1 bg-[#df0024] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <span>Categoría: {filterState.category}</span>
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, category: 'all' }))}
                    className="hover:opacity-80"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-red-50 text-[#df0024] rounded-full flex items-center justify-center mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No se encontraron productos</h3>
                <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
                  No hay productos coincidentes con los filtros seleccionados. Intenta restablecer los filtros de búsqueda.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#df0024] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-md"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                    >
                      {/* Card Header & Image */}
                      <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => navigateToProduct(product.id)}
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="px-2.5 py-1 bg-[#df0024] text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md">
                              ¡OFERTA!
                            </span>
                          )}
                          {product.isNew && (
                            <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md">
                              NUEVO
                            </span>
                          )}
                        </div>

                        {/* Action Buttons Overlay */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-colors ${
                              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-700 hover:text-red-500'
                            }`}
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="p-2 bg-white/90 text-slate-700 hover:text-[#df0024] rounded-full shadow-md backdrop-blur-md transition-colors"
                            title="Vista Rápida"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span className="font-bold text-slate-700">{product.rating}</span>
                            </div>
                          </div>

                          <h3
                            onClick={() => navigateToProduct(product.id)}
                            className="font-bold text-slate-900 text-sm line-clamp-2 cursor-pointer hover:text-[#df0024] transition-colors leading-snug"
                          >
                            {product.name}
                          </h3>
                        </div>

                        {/* Price & Add To Cart Button */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-base font-black text-[#df0024]">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-slate-400 line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="px-3.5 py-2 bg-slate-900 text-white hover:bg-[#df0024] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Añadir</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-2xl border border-slate-200 shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                  <img
                    src={quickViewProduct.images[0]}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-[#df0024] uppercase tracking-wider">
                    {quickViewProduct.brand}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{quickViewProduct.name}</h3>
                  <p className="text-xs text-slate-600 font-light">{quickViewProduct.description}</p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#df0024]">
                      ${quickViewProduct.price.toFixed(2)} USD
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${quickViewProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-3 bg-[#df0024] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Añadir al Carrito</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateToProduct(quickViewProduct.id);
                        setQuickViewProduct(null);
                      }}
                      className="px-4 py-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200"
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
