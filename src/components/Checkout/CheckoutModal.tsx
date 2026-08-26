import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, CheckCircle2, MessageCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { COMPANY_INFO } from '../../data/mockData';
import { ShineButton } from '../ui/ShineButton';

export const CheckoutModal: React.FC = () => {
  const { cart, cartTotal, setCurrentRoute, clearCart, showToast } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: 'Distrito Capital',
    city: 'Caracas',
    address: '',
    agency: 'MRW',
    paymentMethod: 'pago-movil',
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const shippingFee = 5.00;
  const finalTotal = cartTotal + shippingFee;

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
    showToast('¡Pedido registrado con éxito!', 'success');
  };

  const getWhatsAppOrderText = () => {
    let text = `*¡NUEVO PEDIDO DESDE TIENDA8MILES!*\n\n`;
    text += `*Cliente:* ${formData.fullName}\n`;
    text += `*Teléfono:* ${formData.phone}\n`;
    text += `*Destino:* ${formData.city}, ${formData.state} (Agencia: ${formData.agency})\n`;
    text += `*Dirección:* ${formData.address}\n`;
    text += `*Método de Pago:* ${formData.paymentMethod.toUpperCase()}\n\n`;
    text += `*PRODUCTOS SOLICITADOS:*\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name}\n   Talla: ${item.selectedSize} | Color: ${item.selectedColor.name} | Cantidad: ${item.quantity} x $${item.product.price.toFixed(2)}\n`;
    });
    text += `\n*Monto Total:* *$${finalTotal.toFixed(2)} USD*\n`;
    text += `_RIF ${COMPANY_INFO.rif}_`;
    return `https://wa.me/584241324497?text=${encodeURIComponent(text)}`;
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">No tienes productos en el carrito</h2>
        <p className="text-xs text-slate-500">Agrega tus prendas y equipos LOBY favoritos para proceder al pago.</p>
        <ShineButton onClick={() => setCurrentRoute('catalog')} variant="primary">
          Ir al Catálogo
        </ShineButton>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={() => setCurrentRoute('catalog')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la tienda</span>
        </button>
        <div className="text-right">
          <span className="font-extrabold text-slate-900 text-lg">tienda<span className="text-[#df0024]">8miles</span></span>
          <p className="text-[10px] text-slate-400 font-mono">RIF {COMPANY_INFO.rif}</p>
        </div>
      </div>

      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6 max-w-2xl mx-auto shadow-2xl border border-slate-800"
        >
          <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 w-20 h-20 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">¡Gracias por tu Pedido!</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Hemos generado el resumen de tu orden. Haz clic abajo para enviarlo directamente a nuestro equipo de ventas por WhatsApp y coordinar el pago y envío.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 text-left space-y-1">
            <p className="text-[#df0024] font-bold">Resumen de Orden:</p>
            <p>• Cliente: {formData.fullName}</p>
            <p>• Destino: {formData.city}, {formData.state} ({formData.agency})</p>
            <p>• Total a Pagar: <strong className="text-emerald-400">${finalTotal.toFixed(2)} USD</strong></p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={getWhatsAppOrderText()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#25D366] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Enviar Pedido por WhatsApp Ahora
            </a>

            <button
              onClick={() => {
                clearCart();
                setCurrentRoute('home');
              }}
              className="text-xs text-slate-400 hover:text-white uppercase font-bold"
            >
              Volver al Inicio
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleProcessOrder} className="space-y-6">
              {/* Shipping Address */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Truck className="w-5 h-5 text-[#df0024]" />
                  <h3 className="font-extrabold text-slate-900 text-base">Datos de Envío (Venezuela)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nombre y Apellido..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0412-1234567..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estado</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ciudad</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Agencia de Envío</label>
                    <select
                      value={formData.agency}
                      onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600 cursor-pointer"
                    >
                      <option value="MRW">MRW</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Tealca">Tealca</option>
                      <option value="Delivery Caracas">Delivery Caracas</option>
                      <option value="Retiro en Tienda">Retiro en Tienda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dirección / Nombre de Agencia</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Especifique dirección exacta o código de la oficina Zoom/MRW/Tealca..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Payment Option Selection */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CreditCard className="w-5 h-5 text-[#df0024]" />
                  <h3 className="font-extrabold text-slate-900 text-base">Método de Pago</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'pago-movil', label: 'Pago Móvil (Bolívares)' },
                    { id: 'zelle', label: 'Zelle ($ USD)' },
                    { id: 'transferencia', label: 'Transferencia Bancaria' },
                    { id: 'efectivo', label: 'Efectivo en Tienda' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-[#df0024] bg-red-50/50 text-slate-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <ShineButton type="submit" variant="primary" fullWidth size="lg">
                Confirmar y Generar Orden
              </ShineButton>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-lg border-b border-slate-800 pb-3">Resumen de Compra</h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded-lg bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-100 line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400">Talla: {item.selectedSize} | {item.selectedColor.name}</p>
                    <p className="text-[#df0024] font-mono font-bold mt-0.5">
                      {item.quantity} x ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Envío Nacional</span>
                <span className="text-white">$5.00</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Final</span>
                <span className="text-[#df0024] text-xl">${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 space-y-1">
              <p className="font-bold text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                Compra Segura LOBY
              </p>
              <p>Manufacturas Todo Terreno — RIF J-40739900-4</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
