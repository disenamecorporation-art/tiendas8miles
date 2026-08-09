import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShineButton } from './ui/ShineButton';
import { COMPANY_INFO } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setCurrentRoute,
    clearCart,
  } = useShop();

  const shippingFee = 5.00;

  // Format WhatsApp checkout link
  const generateWhatsAppCheckoutLink = () => {
    let message = `*¡Hola tienda8miles! Quiero realizar el siguiente pedido:*%0A%0A`;
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*%0A`;
      message += `   • Talla: ${item.selectedSize} | Color: ${item.selectedColor.name}%0A`;
      message += `   • Cantidad: ${item.quantity} x $${item.product.price.toFixed(2)} = *$${(item.product.price * item.quantity).toFixed(2)}*%0A%0A`;
    });
    message += `*Total a Pagar:* *$${(cartTotal + shippingFee).toFixed(2)} USD*%0A`;
    message += `%0A_Enviado desde la web tienda8miles. RIF ${COMPANY_INFO.rif}_`;
    return `https://wa.me/584241324497?text=${message}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white text-slate-900 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#df0024]" />
                  <h2 className="font-bold text-lg">Tu Carrito de Compras</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-red-500/10 text-[#df0024]">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <div className="p-6 rounded-full bg-red-50 text-[#df0024] mb-4">
                      <ShoppingBag className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-xs">
                      Explora nuestro catálogo técnico LOBY de vestuario, mochilas y equipamiento para aventura.
                    </p>
                    <ShineButton
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentRoute('catalog');
                      }}
                      variant="primary"
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Explorar Productos
                    </ShineButton>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-xl bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <span className="px-2 py-0.5 bg-slate-100 rounded font-mono">
                              Talla: {item.selectedSize}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-mono font-bold text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right font-mono">
                            <span className="font-extrabold text-[#df0024] text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-5 bg-slate-900 text-white border-t border-slate-800 space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Envío a Venezuela</span>
                      <span className="font-mono text-white">$5.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-slate-800">
                      <span>Total Estimado</span>
                      <span className="font-mono text-[#df0024] text-xl">
                        ${(cartTotal + 5).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ShineButton
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentRoute('checkout');
                      }}
                      variant="primary"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Ir a Pagar
                    </ShineButton>

                    <a
                      href={generateWhatsAppCheckoutLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-green-600 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Pedir por WhatsApp Directo
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                      Garantía Manufacturas Todo Terreno
                    </span>
                    <span>RIF {COMPANY_INFO.rif}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
