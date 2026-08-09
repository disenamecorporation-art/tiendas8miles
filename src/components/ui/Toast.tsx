import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Toast: React.FC = () => {
  const { toast, setToast } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-slate-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 max-w-md"
        >
          {toast.productImage ? (
            <img
              src={toast.productImage}
              alt="Producto"
              className="w-12 h-12 object-cover rounded-lg border border-slate-700 shrink-0"
            />
          ) : (
            <div className="shrink-0 p-2 rounded-xl bg-red-500/10 text-[#df0024]">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>
          )}

          <div className="flex-1 text-sm font-medium pr-2">
            <p className="text-slate-100">{toast.message}</p>
          </div>

          <button
            onClick={() => setToast(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
