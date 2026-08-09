import React from 'react';
import { Award, ShieldCheck, Heart, Compass, Mountain, CheckCircle, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import { ShineButton } from '../ui/ShineButton';
import { useShop } from '../../context/ShopContext';

export const AboutUsPage: React.FC = () => {
  const { navigateToCatalog } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-16 border border-slate-800 text-center space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-red-500/10 text-[#df0024] text-xs font-bold uppercase tracking-widest border border-red-500/20 inline-block">
          Manufacturas Todo Terreno — RIF {COMPANY_INFO.rif}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          QUIÉNES SOMOS EN <span className="text-[#df0024]">TIENDA8MILES</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Distribuidores oficiales de la marca <strong className="text-white">LOBY</strong>. Más de 20 años acompañando a deportistas, montañistas y exploradores en Venezuela.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
            Nuestra Historia & ADN
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            "Somos atletas como tú. Siempre en movimiento, evolución e innovación."
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            En <strong>tienda8miles</strong> (Manufacturas Todo Terreno — RIF J-40739900-4), entendemos la exigencia de las altas montañas, las rutas de trail running y los caminos de expedición. Llevamos más de dos décadas perfeccionando la selección de vestuario, equipos y accesorios para deporte, aventura y turismo.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Como distribuidores oficiales de <strong>LOBY</strong>, ofrecemos productos diseñados bajo cuatro pilares fundamentales: <strong>funcionalidad, ligereza, versatilidad y ergonomía</strong>. Cada prenda y equipo ha sido testeado en terrenos reales para garantizar tu seguridad y confort en cada travesía.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-[#df0024]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-slate-900 text-sm">20+ Años</span>
                <span className="text-xs text-slate-500">De experiencia outdoor</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-[#df0024]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-slate-900 text-sm">Garantía Total</span>
                <span className="text-xs text-slate-500">Respaldo directo de fábrica</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
            alt="Tienda8miles Aventura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
            <span className="text-xs font-mono text-red-500 font-bold uppercase">Aventura & Turismo</span>
            <p className="font-bold text-lg">Pruebas en alta montaña y rutas técnicas</p>
          </div>
        </div>
      </div>

      {/* Brand Pillars */}
      <div className="space-y-8 pt-8 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
            Filosofía LOBY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Nuestros Pilares de Diseño
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Funcionalidad',
              desc: 'Sistemas de capas, membranas impermeables y bolsillos de acceso estratégico.',
              icon: Compass,
            },
            {
              title: 'Ligereza',
              desc: 'Materiales ultraligeros de alta tenacidad que reducen el esfuerzo en la ruta.',
              icon: Mountain,
            },
            {
              title: 'Versatilidad',
              desc: 'Prendas convertibles y adaptables tanto para montaña como uso urbano.',
              icon: Heart,
            },
            {
              title: 'Ergonomía',
              desc: 'Cortes anatómicos que brindan libertad absoluta de movimiento sin roces.',
              icon: CheckCircle,
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-red-500/20 transition-all"
            >
              <div className="p-3 rounded-xl bg-red-500/10 text-[#df0024] w-fit">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Legal & Contact Callout */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-slate-800">
        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold">Datos de Contacto Directo</h3>
          <p className="text-xs text-slate-300">
            Estamos disponibles para asesorarte en la elección del equipamiento adecuado para tu próxima carrera o expedición.
          </p>
          <div className="space-y-2 text-xs pt-2">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#df0024]" />
              <span>WhatsApp / Teléfono: <strong>{COMPANY_INFO.phone}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#df0024]" />
              <span>Correo: <strong>{COMPANY_INFO.email}</strong></span>
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
          <p className="font-bold text-white text-sm">Información Legal:</p>
          <p>• Razon Social: <strong>{COMPANY_INFO.legalName}</strong></p>
          <p>• RIF: <strong>{COMPANY_INFO.rif}</strong></p>
          <p>• Marca Comercial: <strong>{COMPANY_INFO.brandName}</strong></p>
          <p>• Distribución: <strong>LOBY Venezuela</strong></p>
        </div>
      </div>
    </div>
  );
};
