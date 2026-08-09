import React from 'react';
import {
  Sparkles,
  Compass,
  Flame,
  Shirt,
  Tent,
  Footprints
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { navigateToCatalog } = useShop();

  const decathlonCategories = [
    { name: 'Deportes', icon: Compass, catId: 'all' },
    { name: 'Hombre', icon: Shirt, catId: 'ropa-termica' },
    { name: 'Mujer', icon: Shirt, catId: 'ropa-termica' },
    { name: 'Novedades', icon: Sparkles, catId: 'novedades' },
    { name: 'Ofertas hasta -40%', icon: Flame, catId: 'ofertas' },
    { name: 'Camping & Carpas', icon: Tent, catId: 'camping-expedicion' },
    { name: 'Calzado Waterproof', icon: Footprints, catId: 'calzado-waterproof' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 space-y-4">
      {/* 1. HERO BANNER DE TAMAÑO AJUSTADO A LA IMAGEN (SIN TEXTO NI BOTONES SOBREPUESTOS) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 bg-slate-100 cursor-pointer" onClick={() => navigateToCatalog('all')}>
        <img
          src="https://i.postimg.cc/28tqK9Dr/banner-web2026.jpg"
          alt="Banner Web 2026 8miles LOBY"
          className="w-full h-auto object-cover sm:object-contain block transition-transform duration-500 hover:scale-[1.01]"
        />
      </div>

      {/* 2. OPCIONES PEQUEÑAS DE NAVEGACIÓN UBICADAS DIRECTAMENTE ABAJO DEL BANNER */}
      <div className="pt-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {decathlonCategories.map((item, idx) => {
            const Icon = item.icon;
            const isSpecial = item.name.includes('Ofertas');
            return (
              <button
                key={idx}
                onClick={() => navigateToCatalog(item.catId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                  isSpecial
                    ? 'bg-[#df0024] text-white border-[#df0024] hover:bg-[#b5001d] shadow-xs'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSpecial ? 'text-amber-200' : 'text-[#df0024]'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

