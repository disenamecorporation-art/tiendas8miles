import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
  RefreshCw,
  Mountain,
  Footprints,
  Shirt,
  Backpack,
  Tent,
  Bike,
  Compass,
  Award,
  Smartphone,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, SERVICE_HIGHLIGHTS, COMPANY_INFO } from '../../data/mockData';
import { ProductCard } from '../Product/ProductCard';
import { ShineButton } from '../ui/ShineButton';
import { HeroSection } from './HeroSection';

export const HomePage: React.FC = () => {
  const { navigateToCatalog, navigateToProduct, showToast } = useShop();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Carousel refs for smooth horizontal scroll
  const tendenciesRef = useRef<HTMLDivElement>(null);
  const discountsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const activeDiscountsRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const topDiscountProducts = PRODUCTS.filter((p) => p.isTopDiscount || (p.discountPercent && p.discountPercent > 20));
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="space-y-12 pb-16">
      {/* Decathlon-inspired 3-Card Hero Grid */}
      <HeroSection />



      {/* 3. SECCIÓN "TENDENCIAS DEL MOMENTO" (1 Banner Ancho + Carrusel Horizontal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
              Lo más buscado por atletas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tendencias del Momento
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(tendenciesRef, 'left')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(tendenciesRef, 'right')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={tendenciesRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth"
        >
          {PRODUCTS.slice(0, 6).map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. BANNER DE CAMPAÑA ANCHO COMPLETO */}
      <section className="w-full bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=2000&q=80"
            alt="Campaña LOBY"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-[#df0024] border border-red-500/20 text-xs font-bold uppercase tracking-widest">
            Manufacturas Todo Terreno
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            DEPORTE DE CALIDAD A PRECIO ACCESIBLE
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            LOBY combina tecnología de vanguardia, resistencia ergonómica y precios justos para que nada te detenga en la ruta.
          </p>
          <div className="pt-2">
            <ShineButton
              onClick={() => navigateToCatalog()}
              variant="primary"
              size="lg"
            >
              Conocer Todo el Equipamiento
            </ShineButton>
          </div>
        </div>
      </section>

      {/* 5. CARRUSEL "TOP DESCUENTOS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
              Ahorra en tus equipos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Descuentos Activos
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(discountsRef, 'left')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(discountsRef, 'right')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={discountsRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth"
        >
          {topDiscountProducts.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>



      {/* 7. BANNER PROMOCIONAL SECUNDARIO (Ancho completo con imagen de fondo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[320px] flex items-center p-8 sm:p-12 border border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2000&q=80"
            alt="Expedición LOBY"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
          <div className="relative z-10 max-w-lg space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#df0024] text-white">
              LOBY Expedition 2026
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              EQUÍPATE PARA TU PRÓXIMA EXPEDICIÓN
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Carpas 4 estaciones, sacos de dormir para bajas temperaturas y bastones de carbono con garantía oficial Manufacturas Todo Terreno.
            </p>
            <div className="pt-2">
              <ShineButton
                onClick={() => navigateToCatalog('camping-expedicion')}
                variant="primary"
              >
                Ver Equipo de Camping
              </ShineButton>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECCIÓN "NUESTROS DESTACADOS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
              Selección técnica recomendada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Nuestros Destacados
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(featuredRef, 'left')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(featuredRef, 'right')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={featuredRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth"
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. CARRUSEL "DESCUENTOS ACTIVOS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
              Oportunidades de temporada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Descuentos Activos en Calzado y Accesorios
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(activeDiscountsRef, 'left')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(activeDiscountsRef, 'right')}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={activeDiscountsRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth"
        >
          {PRODUCTS.slice(4, 10).map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 10. SECCIÓN DE CONTACTO (Izquierda: Datos de contacto, Derecha: Formulario de contacto) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
          {/* Left Side: Contact Information */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-[#df0024] text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              Atención Directa LOBY
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                PONTE EN CONTACTO CON NOSOTROS
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                ¿Tienes dudas sobre tallas, despachos nacionales o pedidos al mayor para corporativos? Escríbenos y te atenderemos de inmediato.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5 text-slate-300 text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-slate-800 text-[#df0024] border border-slate-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Teléfono / WhatsApp</p>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold hover:text-[#df0024] transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-300 text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-slate-800 text-[#df0024] border border-slate-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Correo Electrónico</p>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold hover:text-[#df0024] transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-300 text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-slate-800 text-[#df0024] border border-slate-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Ubicación</p>
                  <span className="font-bold">{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-slate-800/80">
              {COMPANY_INFO.legalName} — RIF {COMPANY_INFO.rif}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                setContactName('');
                setContactEmail('');
                setContactMessage('');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs border border-slate-800 focus:outline-none focus:border-[#df0024]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Ej. carlos@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs border border-slate-800 focus:outline-none focus:border-[#df0024]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mensaje o Consulta
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Escribe tu consulta sobre productos o pedidos..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs border border-slate-800 focus:outline-none focus:border-[#df0024] resize-none"
                />
              </div>

              <div className="pt-2">
                <ShineButton type="submit" variant="primary" size="lg" className="w-full justify-center">
                  Enviar Mensaje
                </ShineButton>
              </div>
            </form>
          </div>
        </div>
      </section>



      {/* 12. BLOQUE DE 3 BLOQUES DE SERVICIOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_HIGHLIGHTS.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 hover:border-red-500/30 hover:shadow-md transition-all duration-300"
            >
              <div className="p-3.5 rounded-xl bg-red-500/10 text-[#df0024] shrink-0">
                {service.id === 'cambios-devoluciones' && <RefreshCw className="w-6 h-6" />}
                {service.id === 'envios-nacionales' && <Truck className="w-6 h-6" />}
                {service.id === 'atencion-whatsapp' && <MessageCircle className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-base">{service.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
