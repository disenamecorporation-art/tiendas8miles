import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, user, logout } = useShop();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (ok) setIsAuthModalOpen(false);
      } else {
        const ok = await register(name, email, password);
        if (ok) setIsAuthModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <UserIcon className="w-4 h-4 text-[#df0024]" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Tienda 8miles
              </span>
            </div>
            <h3 className="text-xl font-bold">
              {user ? 'Mi Cuenta' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h3>
            <p className="text-xs text-slate-300 font-light mt-1">
              Ingresa tus datos para continuar.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {user ? (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-red-50 text-[#df0024] rounded-full flex items-center justify-center mx-auto border border-[#df0024]/20">
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{user.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => setIsAuthModalOpen(false)}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                  >
                    Cerrar Ventana
                  </button>
                  <button
                    onClick={() => logout()}
                    className="w-full py-2.5 bg-slate-100 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Auth Mode Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Registrarse
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre y apellido"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@tienda8miles.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#df0024] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isLoading ? 'Procesando...' : (mode === 'login' ? 'Iniciar Sesión' : 'Registrarse')}</span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
