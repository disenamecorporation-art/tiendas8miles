import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Send, MessageCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import { ShineButton } from '../ui/ShineButton';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Asesoría de Producto',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('¡Mensaje enviado con éxito! Te responderemos muy pronto.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: 'Asesoría de Producto', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#df0024]">
          Atención al Cliente
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contacto & Soporte Técnico
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          ¿Tienes dudas sobre tallas, garantías o envíos? Contáctanos directamente y un especialista te orientará.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-start gap-4 hover:bg-[#25D366]/20 transition-all group"
          >
            <div className="p-3 rounded-xl bg-[#25D366] text-white shrink-0">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">WhatsApp Directo</h3>
              <p className="font-mono font-bold text-emerald-700 text-sm">{COMPANY_INFO.phone}</p>
              <p className="text-xs text-slate-600 mt-1">Respuesta rápida e inmediata</p>
            </div>
          </a>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 text-[#df0024] shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Correo Electrónico</h3>
              <p className="font-mono font-bold text-slate-800 text-sm">{COMPANY_INFO.email}</p>
              <p className="text-xs text-slate-500 mt-1">Atención para ventas al mayor e instituciones</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Datos Fiscales</span>
            </div>
            <p className="text-sm font-bold">{COMPANY_INFO.legalName}</p>
            <p className="text-xs text-slate-300 font-mono">RIF: {COMPANY_INFO.rif}</p>
            <p className="text-xs text-slate-400">
              Marca comercial: tienda8miles. Caracas, Venezuela — Envíos a todo el país.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-xl mb-4">Envíanos un Mensaje</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@correo.com..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0412-1234567..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Asunto
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600 cursor-pointer"
                >
                  <option value="Asesoría de Producto">Asesoría de Producto LOBY</option>
                  <option value="Consulta de Envío">Estado de Envío / Guía</option>
                  <option value="Garantía o Cambio">Garantía o Cambio de Talla</option>
                  <option value="Venta al Mayor">Ventas Institucionales / Mayorista</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mensaje
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escribe tu consulta detallada..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
              />
            </div>

            <ShineButton type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
              Enviar Mensaje
            </ShineButton>
          </form>
        </div>
      </div>
    </div>
  );
};
