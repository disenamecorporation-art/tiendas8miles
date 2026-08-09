import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, RotateCcw, Check, ChevronDown, SlidersHorizontal, Grid, LayoutGrid } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES, BRANDS, AVAILABLE_SIZES, AVAILABLE_COLORS } from '../../data/mockData';
import { ProductCard } from '../Product/ProductCard';
import { ShineButton } from '../ui/ShineButton';

export const CatalogPage: React.FC = () => {
  const {
    filterState,
    setFilterState,
    resetFilters,
    filteredProducts,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
  } = useShop();

  const [cols, setCols] = useState<3 | 4>(3);

  // Active filters count
  const activeFiltersCount =
    (filterState.category !== 'all' ? 1 : 0) +
    filterState.brands.length +
    filterState.sizes.length +
    filterState.colors.length +
    (filterState.priceRange[0] > 0 || filterState.priceRange[1] < 250 ? 1 : 0);

  const toggleBrand = (brand: string) => {
    setFilterState((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const toggleSize = (size: string) => {
    setFilterState((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  const toggleColor = (colorName: string) => {
    setFilterState((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c !== colorName)
          : [...prev.colors, colorName],
      };
    });
  };

  // Sidebar Filter UI Content Reusable Component
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#df0024]" />
          <h3 className="font-extrabold text-slate-900 text-base">Filtros de Búsqueda</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-red-500/10 text-[#df0024]">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Categorías & Subcategorías
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setFilterState((prev) => ({ ...prev, category: 'all' }))}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterState.category === 'all'
                ? 'bg-[#df0024] text-white shadow-xs'
                : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>Todas las categorías</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isCatSelected = filterState.category === cat.id;
            return (
              <div key={cat.id} className="space-y-1">
                <button
                  onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isCatSelected
                      ? 'bg-[#df0024] text-white shadow-xs'
                      : 'bg-slate-100/80 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono ${isCatSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {cat.itemCount}
                  </span>
                </button>

                {/* Subcategories */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-slate-200/80 ml-2">
                    {cat.subcategories.map((sub) => {
                      const isSubSelected = filterState.category === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setFilterState((prev) => ({ ...prev, category: sub.id }))}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                            isSubSelected
                              ? 'bg-red-50 text-[#df0024] font-bold border border-[#df0024]/20'
                              : 'text-slate-600 hover:text-[#df0024] hover:bg-slate-50'
                          }`}
                        >
                          <span>{sub.name}</span>
                          <span className="text-[10px] text-slate-300">›</span>
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

      {/* Marca LOBY */}
      <div className="space-y-2.5 pt-4 border-t border-slate-200">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Colección / Marca
        </h4>
        <div className="space-y-1.5">
          {BRANDS.map((brand) => {
            const isChecked = filterState.brands.includes(brand);
            return (
              <label
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 select-none"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'bg-[#df0024] border-[#df0024] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rango de Precio */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Rango de Precio ($)
          </h4>
          <span className="font-mono text-xs text-[#df0024] font-bold">
            ${filterState.priceRange[0]} - ${filterState.priceRange[1]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max={filterState.priceRange[1]}
            value={filterState.priceRange[0]}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:border-red-600"
            placeholder="Min"
          />
          <span className="text-slate-400 font-mono">-</span>
          <input
            type="number"
            min={filterState.priceRange[0]}
            max="300"
            value={filterState.priceRange[1]}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:border-red-600"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Tallas */}
      <div className="space-y-2.5 pt-4 border-t border-slate-200">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Talla
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((sz) => {
            const isSelected = filterState.sizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colores Swatches */}
      <div className="space-y-2.5 pt-4 border-t border-slate-200">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((col) => {
            const isSelected = filterState.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                title={col.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform ${
                  isSelected
                    ? 'border-[#df0024] scale-110 shadow-md'
                    : 'border-slate-200 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      col.name === 'Blanco Nieve' ? 'text-slate-900' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catalog Title Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
            Catálogo Oficial LOBY — Manufacturas Todo Terreno
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            EQUIPAMIENTO & VESTUARIO OUTDOOR
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Encuentra prendas con tecnología hidro-repelente, mochilas anatómicas y calzado waterproof garantizado.
          </p>
        </div>
      </div>

      {/* Main WooCommerce 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* LEFT COLUMN: Sticky Filter Sidebar (25% on desktop) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <FilterSidebarContent />
        </aside>

        {/* RIGHT COLUMN: Product Grid & Sorting (75% on desktop) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Sort & Counter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {/* Mobile Filter Toggle Trigger */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider"
              >
                <Filter className="w-4 h-4 text-[#df0024]" />
                <span>Filtrar</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#df0024] text-white text-[10px] flex items-center justify-center font-mono">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <span className="text-xs font-semibold text-slate-600 font-mono">
                Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> de {filteredProducts.length} productos
              </span>
            </div>

            {/* View Grid Switcher & Sorting */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50">
                <button
                  onClick={() => setCols(3)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    cols === 3 ? 'bg-white shadow-xs text-[#df0024]' : 'text-slate-400'
                  }`}
                  title="3 Columnas"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCols(4)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    cols === 4 ? 'bg-white shadow-xs text-[#df0024]' : 'text-slate-400'
                  }`}
                  title="4 Columnas"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 hidden sm:inline">Ordenar:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold focus:outline-none focus:border-red-600 cursor-pointer shadow-xs"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="newest">Más Nuevos</option>
                  <option value="rating">Mejor Valorados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 space-y-4">
              <div className="p-4 rounded-full bg-red-50 text-[#df0024] w-16 h-16 mx-auto flex items-center justify-center">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No hay productos que coincidan con estos filtros
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Prueba ajustando el rango de precios o cambiando las categorías seleccionadas.
              </p>
              <ShineButton onClick={resetFilters} variant="primary" size="sm">
                Restablecer Filtros
              </ShineButton>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Bottom Load More indicator */}
          {filteredProducts.length > 0 && (
            <div className="pt-8 text-center border-t border-slate-200">
              <p className="text-xs text-slate-400 font-mono mb-3">
                Has visto {filteredProducts.length} de {filteredProducts.length} productos disponibles
              </p>
              <div className="w-48 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-[#df0024] w-full" />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS BOTTOM SHEET / DRAWER */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 top-16 bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
                <h3 className="font-extrabold text-base">Filtros de Búsqueda</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterSidebarContent />
              </div>
              <div className="p-4 border-t border-slate-200 bg-white">
                <ShineButton
                  onClick={() => setIsMobileFiltersOpen(false)}
                  variant="primary"
                  fullWidth
                >
                  Ver ({filteredProducts.length}) Resultados
                </ShineButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
