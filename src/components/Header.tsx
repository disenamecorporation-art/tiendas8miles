import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  User,
  ShieldCheck,
  Store,
  Shield,
  Instagram,
  Facebook
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    navigateToCatalog,
    navigateToStore,
    categories,
    user
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState<string | false>(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar Announcement */}
      <div className="bg-slate-950 text-slate-300 text-[11px] font-medium py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#df0024] bg-slate-900 hover:bg-slate-800 p-1.5 rounded-lg border border-slate-800 flex items-center justify-center transition-all"
                title="Instagram @tienda8miles"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#df0024] bg-slate-900 hover:bg-slate-800 p-1.5 rounded-lg border border-slate-800 flex items-center justify-center transition-all"
                title="Facebook tienda8miles"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#df0024] bg-slate-900 hover:bg-slate-800 px-2 py-1 rounded-lg border border-slate-800 flex items-center justify-center transition-all font-black text-xs"
                title="Threads @tienda8miles"
              >
                @
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1 hover:text-[#df0024] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#df0024]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">RIF {COMPANY_INFO.rif}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar (White Background) */}
      <nav className="w-full bg-white border-b border-slate-200 py-2.5 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo (Image ONLY) */}
          <div
            onClick={() => setCurrentRoute('home')}
            className="flex items-center cursor-pointer group shrink-0"
          >
            <img
              src={COMPANY_INFO.logoUrl}
              alt="tienda8miles LOBY"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Search Bar next to Logo */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-3">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="w-full relative cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 rounded-xl transition-all text-slate-500">
                <Search className="w-4 h-4 text-[#df0024] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-500 truncate">
                  Buscar en la tienda... (ej. chaquetas, botas, morrales)
                </span>
              </div>
            </div>
          </div>

          {/* Admin Button if Admin User */}
          {user?.role === 'admin' && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setCurrentRoute('admin')}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  currentRoute === 'admin'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#df0024]" />
                <span>Panel Admin</span>
              </button>
            </div>
          )}

          {/* Quick Actions (Search, Wishlist, User/Auth, Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#df0024] hover:bg-slate-100 transition-colors"
              title="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#df0024] hover:bg-slate-100 transition-colors relative"
              title="Mi Cuenta / Iniciar Sesión"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            <button
              onClick={() => navigateToCatalog()}
              className="relative p-2 rounded-xl text-slate-700 hover:text-[#df0024] hover:bg-slate-100 transition-colors hidden sm:block"
              title="Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#df0024] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 px-3 rounded-xl bg-[#df0024]/10 text-[#df0024] border border-[#df0024]/20 hover:bg-[#df0024] hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-xs uppercase font-mono">Carrito</span>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="px-2 py-0.5 rounded-full bg-[#df0024] text-white text-xs font-mono font-extrabold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#df0024] hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Bar */}
        <div className="hidden lg:block border-t border-slate-100 mt-2.5 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-7">
            <button
              onClick={() => setCurrentRoute('home')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                currentRoute === 'home' ? 'text-[#df0024]' : 'text-slate-800 hover:text-[#df0024]'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => navigateToStore()}
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 flex items-center gap-1 ${
                currentRoute === 'store' ? 'text-[#df0024]' : 'text-slate-800 hover:text-[#df0024]'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#df0024]" />
              <span>Tienda</span>
            </button>

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative group py-1"
                onMouseEnter={() => setIsCategoriesDropdownOpen(cat.id)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  onClick={() => navigateToCatalog(cat.id)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#df0024] transition-colors"
                >
                  <span>{cat.name}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#df0024] transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {/* Subcategories Dropdown Menu */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <AnimatePresence>
                    {isCategoriesDropdownOpen === cat.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-72 mt-1.5 p-3 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 grid grid-cols-1 gap-1"
                      >
                        <div className="px-3 py-1 border-b border-slate-100 mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#df0024] uppercase tracking-widest">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-slate-400">Ver Todo →</span>
                        </div>
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setIsCategoriesDropdownOpen(false);
                              navigateToCatalog(sub.id);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl text-xs text-slate-700 hover:text-[#df0024] hover:bg-red-50/50 transition-all text-left font-medium"
                          >
                            <span>{sub.name}</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-[#df0024]">›</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <button
              onClick={() => setCurrentRoute('about')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                currentRoute === 'about' ? 'text-[#df0024]' : 'text-slate-800 hover:text-[#df0024]'
              }`}
            >
              Quiénes Somos
            </button>

            <button
              onClick={() => setCurrentRoute('contact')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                currentRoute === 'contact' ? 'text-[#df0024]' : 'text-slate-800 hover:text-[#df0024]'
              }`}
            >
              Contacto
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-200">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigateToStore();
                    }}
                    className="p-3 rounded-xl bg-[#df0024] text-white text-xs font-bold uppercase text-left border border-[#df0024] shadow-sm flex items-center gap-2"
                  >
                    <Store className="w-4 h-4" />
                    <span>Tienda</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase text-left border border-slate-900 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#df0024]" />
                    <span>{user ? user.name : 'Iniciar Sesión'}</span>
                  </button>
                </div>

                {user?.role === 'admin' && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentRoute('admin');
                    }}
                    className="w-full p-3 rounded-xl bg-red-50 text-[#df0024] font-bold text-xs uppercase text-left border border-[#df0024]/20 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Ir al Panel Administrador LOBY</span>
                  </button>
                )}

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                    Categorías de Producto
                  </p>
                  {categories.map((cat) => (
                    <div key={cat.id} className="space-y-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateToCatalog(cat.id);
                        }}
                        className="flex items-center justify-between cursor-pointer font-bold text-xs uppercase text-slate-800 hover:text-[#df0024]"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-6 h-6 object-cover rounded-md"
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] text-[#df0024]">Ver →</span>
                      </div>

                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="pt-2 pl-8 space-y-1.5 border-t border-slate-200/60 mt-2">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                navigateToCatalog(sub.id);
                              }}
                              className="w-full text-left text-xs text-slate-600 hover:text-[#df0024] py-1 font-medium flex items-center justify-between"
                            >
                              <span>{sub.name}</span>
                              <span className="text-[10px] text-slate-400">›</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentRoute('about');
                    }}
                    className="w-full text-left py-2 px-2 text-xs font-bold uppercase text-slate-700"
                  >
                    Quiénes Somos (Manufacturas Todo Terreno)
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentRoute('contact');
                    }}
                    className="w-full text-left py-2 px-2 text-xs font-bold uppercase text-slate-700"
                  >
                    Contacto & Soporte
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
