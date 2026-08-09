import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentRoute, navigateToCatalog } = useShop();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Brand Promise Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-xl bg-[#df0024]/20 text-[#df0024] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Distribuidor Oficial LOBY</h4>
              <p className="text-xs text-slate-400">Más de 20 años en el rubro deportivo y outdoor</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-xl bg-[#df0024]/20 text-[#df0024] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantía Directa de Fábrica</h4>
              <p className="text-xs text-slate-400">Manufacturas Todo Terreno RIF J-40739900-4</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-xl bg-[#df0024]/20 text-[#df0024] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Atención Personalizada</h4>
              <p className="text-xs text-slate-400">WhatsApp / Teléfono {COMPANY_INFO.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand Info & Legal RIF */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={COMPANY_INFO.logoUrl}
              alt="tienda8miles"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white">
                tienda<span className="text-[#df0024]">8miles</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Official LOBY Distributor
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            {COMPANY_INFO.tagline} Distribuidores oficiales de la marca LOBY: vestuario, equipos y accesorios ergonómicos para deporte, aventura y turismo en toda Venezuela.
          </p>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
            <p className="font-bold text-white">{COMPANY_INFO.legalName}</p>
            <p className="text-slate-400 font-mono">RIF: {COMPANY_INFO.rif}</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={COMPANY_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-slate-800 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-slate-800 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_INFO.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-slate-800 text-xs font-mono font-bold transition-colors"
            >
              Threads
            </a>
          </div>
        </div>

        {/* Col 2: Categorías */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Categorías LOBY
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => navigateToCatalog('ropa-termica')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Ropa Térmica & Chaquetas
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToCatalog('trail-running')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Trail Running & Hidratación
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToCatalog('montanismo-trekking')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Montañismo & Trekking
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToCatalog('morrales-mochilas')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Morrales & Mochilas LOBY
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToCatalog('camping-expedicion')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Camping & Carpas
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToCatalog('calzado-tecnico')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Calzado Técnico Waterproof
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Servicios & Ayuda */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Atención al Cliente
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setCurrentRoute('about')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Quiénes Somos
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentRoute('contact')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Cambios y Devoluciones
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentRoute('contact')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Guía de Tallas
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentRoute('contact')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Envíos Nacionales
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentRoute('contact')}
                className="hover:text-red-500 transition-colors text-left"
              >
                Preguntas Frecuentes
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Contacto */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Contacto Directo
          </h3>
          <div className="space-y-2.5 text-xs">
            <a
              href={`https://wa.me/584241324497`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-[#df0024] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#df0024] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">0424-1324497</p>
                <p className="text-[10px] text-slate-400">Atención WhatsApp</p>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-start gap-2 hover:text-[#df0024] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#df0024] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{COMPANY_INFO.email}</p>
                <p className="text-[10px] text-slate-400">Soporte por email</p>
              </div>
            </a>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#df0024] shrink-0 mt-0.5" />
              <p className="text-slate-400">
                Caracas, Venezuela. Envíos nacionales por Zoom, MRW, Tealca.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 tienda8miles. Manufacturas Todo Terreno — RIF J-40739900-4. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Términos y Condiciones</span>
            <span>•</span>
            <span>Políticas de Privacidad</span>
            <span>•</span>
            <a
              href="https://instagram.com/legaint.ve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#df0024] font-semibold hover:underline"
            >
              Hecho por Legaint Corporation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
