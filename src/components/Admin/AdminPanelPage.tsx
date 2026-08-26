import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit,
  Package,
  Layers,
  Search,
  CheckCircle,
  X,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Shield,
  ArrowLeft,
  Eye,
  Database,
  Key,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Category, Product, SubCategory } from '../../types';
import { getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection, fetchProductsFromSupabase } from '../../lib/supabase';

export const AdminPanelPage: React.FC = () => {
  const {
    products,
    setProducts,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    setCurrentRoute,
    user,
    navigateToProduct
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'supabase'>('products');
  const [searchTerm, setSearchTerm] = useState('');

  // Supabase Config State
  const [supabaseUrl, setSupabaseUrl] = useState(() => getSupabaseConfig().url);
  const [supabaseKey, setSupabaseKey] = useState(() => getSupabaseConfig().anonKey);
  const [supabaseStatus, setSupabaseStatus] = useState<{ testing: boolean; success?: boolean; message?: string }>({ testing: false });
  const [syncingSupabase, setSyncingSupabase] = useState(false);

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseUrl, supabaseKey);
    setSupabaseStatus({ testing: false, success: true, message: '¡Credenciales de Supabase guardadas correctamente en este navegador!' });
  };

  const handleTestSupabase = async () => {
    setSupabaseStatus({ testing: true });
    const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setSupabaseStatus({ testing: false, success: res.success, message: res.message });
  };

  const handleSyncSupabase = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setSupabaseStatus({ testing: false, success: false, message: 'Por favor ingresa URL y Key antes de sincronizar.' });
      return;
    }
    setSyncingSupabase(true);
    const remoteProducts = await fetchProductsFromSupabase(supabaseUrl, supabaseKey);
    setSyncingSupabase(false);
    if (remoteProducts !== null) {
      if (remoteProducts.length > 0) {
        setProducts(remoteProducts);
        setSupabaseStatus({ testing: false, success: true, message: `¡Sincronización exitosa! Se cargaron ${remoteProducts.length} productos desde Supabase.` });
      } else {
        setSupabaseStatus({ testing: false, success: true, message: 'Conexión exitosa, pero la tabla "products" está vacía en Supabase.' });
      }
    } else {
      setSupabaseStatus({ testing: false, success: false, message: 'No se pudo sincronizar productos. Verifica que la tabla "products" exista en Supabase.' });
    }
  };

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State for Products
  const [pName, setPName] = useState('');
  const [pSubtitle, setPSubtitle] = useState('');
  const [pCategory, setPCategory] = useState('deportes');
  const [pSubCategory, setPSubCategory] = useState('');
  const [pBrand, setPBrand] = useState('LOBY Technical Pro');
  const [pPrice, setPPrice] = useState('35.00');
  const [pOrigPrice, setPOrigPrice] = useState('45.00');
  const [pDescription, setPDescription] = useState('');
  const [pSizes, setPSizes] = useState('S, M, L, XL');
  const [pImages, setPImages] = useState('');
  const [pInStock, setPInStock] = useState(true);
  const [pIsNew, setPIsNew] = useState(true);
  const [pIsFeatured, setPIsFeatured] = useState(false);

  // Form State for Categories
  const [cName, setCName] = useState('');
  const [cSlug, setCSlug] = useState('');
  const [cDescription, setCDescription] = useState('');
  const [cImage, setCImage] = useState('');
  const [cSubcategories, setCSubcategories] = useState<SubCategory[]>([]);

  // Subcategory inline form state
  const [subName, setSubName] = useState('');
  const [subDescription, setSubDescription] = useState('');
  const [editingSubIdx, setEditingSubIdx] = useState<number | null>(null);

  // Open Product Modal for Create or Edit
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setPName(prod.name);
      setPSubtitle(prod.subtitle || '');
      setPCategory(prod.category);
      setPSubCategory(prod.subCategory || '');
      setPBrand(prod.brand);
      setPPrice(prod.price.toString());
      setPOrigPrice(prod.originalPrice ? prod.originalPrice.toString() : '');
      setPDescription(prod.description);
      setPSizes(prod.sizes.join(', '));
      setPImages(prod.images.join('\n'));
      setPInStock(prod.inStock);
      setPIsNew(Boolean(prod.isNew));
      setPIsFeatured(Boolean(prod.isFeatured));
    } else {
      setEditingProduct(null);
      setPName('');
      setPSubtitle('');
      setPCategory(categories[0]?.id || 'deportes');
      setPSubCategory('');
      setPBrand('LOBY Technical Pro');
      setPPrice('35.00');
      setPOrigPrice('');
      setPDescription('');
      setPSizes('S, M, L, XL');
      setPImages('https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80');
      setPInStock(true);
      setPIsNew(true);
      setPIsFeatured(false);
    }
    setIsProductModalOpen(true);
  };

  // Open Category Modal
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCName(cat.name);
      setCSlug(cat.slug);
      setCDescription(cat.description);
      setCImage(cat.image);
      setCSubcategories(cat.subcategories || []);
    } else {
      setEditingCategory(null);
      setCName('');
      setCSlug('');
      setCDescription('');
      setCImage('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80');
      setCSubcategories([]);
    }
    setSubName('');
    setSubDescription('');
    setEditingSubIdx(null);
    setIsCategoryModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imageList = pImages
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const sizeList = pSizes
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const priceNum = parseFloat(pPrice) || 0;
    const origPriceNum = pOrigPrice ? parseFloat(pOrigPrice) : undefined;
    const discount = origPriceNum && origPriceNum > priceNum
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
      : undefined;

    const prodData: Product = {
      id: editingProduct ? editingProduct.id : `loby-${Date.now()}`,
      name: pName,
      subtitle: pSubtitle,
      category: pCategory,
      subCategory: pSubCategory || undefined,
      brand: pBrand,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: discount,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      isNew: pIsNew,
      isFeatured: pIsFeatured,
      images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'],
      sizes: sizeList.length > 0 ? sizeList : ['S', 'M', 'L'],
      colors: [
        { name: 'Negro Carbón', hex: '#1E293B' },
        { name: 'Rojo Expedición', hex: '#DC2626' }
      ],
      description: pDescription || 'Producto técnico LOBY de alta calidad.',
      features: [
        'Confeccionado por Manufacturas Todo Terreno',
        'Tecnología de ventilación y resistencia térmica',
        'Garantía oficial LOBY Venezuela'
      ],
      techSpecs: {
        weight: '250g',
        material: 'Poliéster técnico LOBY-Tex',
        recommendedUse: 'Outdoor, montaña y diario'
      },
      inStock: pInStock,
      tags: [pCategory, pBrand, 'LOBY']
    };

    if (editingProduct) {
      updateProduct(prodData);
    } else {
      addProduct(prodData);
    }
    setIsProductModalOpen(false);
  };

  // Subcategory helper interactions
  const handleAddOrUpdateSubcategory = () => {
    if (!subName.trim()) return;
    const slug = subName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newSub: SubCategory = {
      id: editingSubIdx !== null && cSubcategories[editingSubIdx] ? cSubcategories[editingSubIdx].id : slug,
      name: subName.trim(),
      slug: slug,
      description: subDescription.trim() || undefined,
      itemCount: editingSubIdx !== null && cSubcategories[editingSubIdx] ? cSubcategories[editingSubIdx].itemCount : 0
    };

    if (editingSubIdx !== null) {
      setCSubcategories(prev => prev.map((item, idx) => idx === editingSubIdx ? newSub : item));
      setEditingSubIdx(null);
    } else {
      setCSubcategories(prev => [...prev, newSub]);
    }
    setSubName('');
    setSubDescription('');
  };

  const handleEditSubcategoryClick = (index: number) => {
    const sub = cSubcategories[index];
    if (sub) {
      setSubName(sub.name);
      setSubDescription(sub.description || '');
      setEditingSubIdx(index);
    }
  };

  const handleDeleteSubcategory = (index: number) => {
    setCSubcategories(prev => prev.filter((_, idx) => idx !== index));
    if (editingSubIdx === index) {
      setEditingSubIdx(null);
      setSubName('');
      setSubDescription('');
    }
  };

  // Save Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = cSlug || cName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const catData: Category = {
      id: editingCategory ? editingCategory.id : slug,
      name: cName,
      slug: slug,
      iconName: 'Package',
      image: cImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      itemCount: editingCategory ? editingCategory.itemCount : 0,
      description: cDescription || 'Categoría de productos de aventura LOBY.',
      subcategories: cSubcategories
    };

    if (editingCategory) {
      updateCategory(catData);
    } else {
      addCategory(catData);
    }
    setIsCategoryModalOpen(false);
  };

  const filteredProductsAdmin = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-red-50 text-[#df0024] rounded-xl">
                <Shield className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-[#df0024] uppercase tracking-widest">
                Panel de Administración LOBY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Gestión de Catálogo e Inventario
            </h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              Añade, edita y elimina productos y categorías. Todos los cambios se reflejan al instante en la tienda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute('store')}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Tienda</span>
            </button>
            <button
              onClick={() => setCurrentRoute('home')}
              className="px-3 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Inicio</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase">Total Productos</span>
              <Package className="w-4 h-4 text-[#df0024]" />
            </div>
            <p className="text-2xl font-black text-slate-900">{products.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase">Categorías</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{categories.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase">En Oferta</span>
              <Tag className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {products.filter((p) => p.originalPrice && p.originalPrice > p.price).length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase">En Stock</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {products.filter((p) => p.inStock).length}
            </p>
          </div>
        </div>

        {/* Main Tab Switcher */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-white text-[#df0024] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Productos ({products.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'categories'
                    ? 'bg-white text-[#df0024] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categorías ({categories.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'supabase'
                    ? 'bg-white text-[#df0024] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>API Supabase</span>
              </button>
            </div>

            {/* Actions & Search */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {activeTab === 'products' && (
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>
              )}

              {activeTab === 'products' ? (
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-4 py-2 bg-[#df0024] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Producto</span>
                </button>
              ) : activeTab === 'categories' ? (
                <button
                  onClick={() => handleOpenCategoryModal()}
                  className="px-4 py-2 bg-[#df0024] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Categoría</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* SUPABASE API TAB PANEL */}
          {activeTab === 'supabase' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Configuración de Supabase API</h2>
                  <p className="text-xs text-slate-500">Conecta tu propia base de datos Supabase para sincronizar inventario, productos y pedidos.</p>
                </div>
              </div>

              {/* WARNING ALERT FOR LOCAL STORAGE VS SHARED DB */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  ⚠️ Sincronización entre múltiples dispositivos
                </p>
                <p className="leading-relaxed">
                  Si guardas las credenciales usando el formulario a continuación, éstas se guardarán <strong>únicamente en este navegador</strong>. Para que tu catálogo y categorías se sincronicen de forma automática en <strong>todos los dispositivos de tus clientes y colaboradores</strong>, debes añadir las siguientes variables de entorno en la configuración de tu plataforma de despliegue (como el panel de control de <strong>Netlify</strong>):
                </p>
                <div className="font-mono bg-white/70 p-2.5 rounded-xl border border-amber-200/50 space-y-1 mt-1 text-[11px] text-slate-700">
                  <div><strong>VITE_SUPABASE_URL</strong> = <span className="text-slate-500">[Tu URL de Supabase]</span></div>
                  <div><strong>VITE_SUPABASE_ANON_KEY</strong> = <span className="text-slate-500">[Tu Anon Key de Supabase]</span></div>
                </div>
              </div>

              <form onSubmit={handleSaveSupabase} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Supabase Project URL
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Database className="w-4 h-4" />
                    </span>
                    <input
                      type="url"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://tu-proyecto.supabase.co"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Lo encuentras en tu panel de Supabase &gt; Project Settings &gt; API &gt; URL.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Supabase Anon / Public API Key
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Key className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Clave pública anon/public de API en la configuración de tu proyecto Supabase.</p>
                </div>

                {supabaseStatus.message && (
                  <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 ${
                    supabaseStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {supabaseStatus.success ? <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-[#df0024]" />}
                    <span>{supabaseStatus.message}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleTestSupabase}
                    disabled={supabaseStatus.testing}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-xs rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    {supabaseStatus.testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    <span>Probar Conexión</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 py-3 bg-[#df0024] hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>Guardar Credenciales Supabase</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500">¿Tienes datos en tu tabla <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">products</code>?</p>
                  <button
                    type="button"
                    onClick={handleSyncSupabase}
                    disabled={syncingSupabase}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {syncingSupabase ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    <span>Sincronizar Catálogo</span>
                  </button>
                </div>
              </form>

              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 mt-8">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Esquema SQL Sugerido para Supabase</h3>
                <p className="text-xs text-slate-600">
                  Para habilitar almacenamiento persistente en tu base de datos Supabase PostgreSQL, ejecuta el siguiente comando SQL en tu <span className="font-bold">Supabase SQL Editor</span>:
                </p>
                <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-x-auto whitespace-pre">
{`-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  main_category TEXT,
  sub_category TEXT,
  brand TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percent NUMERIC,
  rating NUMERIC DEFAULT 5,
  reviews_count NUMERIC DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_top_discount BOOLEAN DEFAULT false,
  images TEXT[],
  sizes TEXT[],
  colors JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  features TEXT[],
  tech_specs JSONB DEFAULT '{}'::jsonb,
  in_stock BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_name TEXT,
  image TEXT,
  item_count NUMERIC DEFAULT 0,
  description TEXT,
  sub_categories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                </pre>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB TABLE */}
          {activeTab === 'products' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px] bg-slate-50">
                    <th className="py-3 px-4">Producto</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Marca</th>
                    <th className="py-3 px-4">Precio</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProductsAdmin.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-xl border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{prod.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{prod.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize font-medium text-slate-700">{prod.category}</td>
                      <td className="py-3 px-4 text-slate-600">{prod.brand}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#df0024]">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through ml-1">
                            ${prod.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {prod.inStock ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                            Disponible
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-bold text-[10px]">
                            Agotado
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigateToProduct(prod.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Ver en la Tienda"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenProductModal(prod)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CATEGORIES TAB GRID */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded-2xl border border-slate-200/60 shadow-xs"
                      />
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-900 text-base leading-tight">{cat.name}</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-slate-400 font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-md">ID: {cat.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2 mt-1">{cat.description}</p>
                      </div>
                    </div>

                    {/* Subcategories list displaying beautifully */}
                    <div className="bg-slate-50/80 border border-slate-100/80 rounded-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Subcategorías ({cat.subcategories ? cat.subcategories.length : 0})
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#df0024]"></span>
                      </div>
                      
                      {cat.subcategories && cat.subcategories.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-0.5">
                          {cat.subcategories.map((sub) => (
                            <div
                              key={sub.id}
                              className="inline-flex flex-col px-2.5 py-1.5 bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-xl text-[10px] text-slate-700 font-medium transition-all max-w-full group shadow-2xs"
                              title={sub.description || 'Sin descripción'}
                            >
                              <span className="font-bold text-slate-800 truncate">{sub.name}</span>
                              {sub.description && (
                                <span className="text-[8px] text-slate-400 truncate max-w-[150px] leading-tight">
                                  {sub.description}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400 italic text-center py-1">Sin subcategorías asociadas</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {cat.itemCount || 0} Productos en total
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleOpenCategoryModal(cat)}
                        className="p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
                        title="Editar Categoría"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all"
                        title="Eliminar Categoría"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-6 my-8"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-lg">
                  {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Nombre del Producto</label>
                    <input
                      type="text"
                      required
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="Ej: Chaqueta Térmica LOBY Pro"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Subtítulo / Eslogan</label>
                    <input
                      type="text"
                      value={pSubtitle}
                      onChange={(e) => setPSubtitle(e.target.value)}
                      placeholder="Ej: Membrana impermeable 10K"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Categoría Principal</label>
                    <select
                      value={pCategory}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        setPCategory(newCat);
                        // Automatically set subcategory to the first available or empty
                        const subcats = categories.find((c) => c.id === newCat)?.subcategories || [];
                        setPSubCategory(subcats[0]?.id || '');
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Subcategoría</label>
                    <select
                      value={pSubCategory}
                      onChange={(e) => setPSubCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none animate-fade-in"
                    >
                      <option value="">-- Ninguna --</option>
                      {(categories.find((c) => c.id === pCategory)?.subcategories || []).map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Marca</label>
                    <input
                      type="text"
                      value={pBrand}
                      onChange={(e) => setPBrand(e.target.value)}
                      placeholder="LOBY Technical Pro"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Precio Actual ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Precio Anterior (Opcional $)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={pOrigPrice}
                      onChange={(e) => setPOrigPrice(e.target.value)}
                      placeholder="Dejar vacío si no está en descuento"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tallas Disponibles (Separadas por coma)</label>
                  <input
                    type="text"
                    value={pSizes}
                    onChange={(e) => setPSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">URLs de Imágenes (Una por línea)</label>
                  <textarea
                    rows={3}
                    value={pImages}
                    onChange={(e) => setPImages(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Descripción del Producto</label>
                  <textarea
                    rows={3}
                    required
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    placeholder="Descripción detallada..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={pInStock}
                      onChange={(e) => setPInStock(e.target.checked)}
                      className="w-4 h-4 text-[#df0024] rounded"
                    />
                    <span>Disponible en Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={pIsNew}
                      onChange={(e) => setPIsNew(e.target.checked)}
                      className="w-4 h-4 text-[#df0024] rounded"
                    />
                    <span>Etiqueta "Nuevo"</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={pIsFeatured}
                      onChange={(e) => setPIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#df0024] rounded"
                    />
                    <span>Destacado en Inicio</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#df0024] text-white rounded-xl font-bold uppercase shadow-md hover:bg-red-700"
                  >
                    Guardar Producto
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE / EDIT CATEGORY MODAL */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-6 my-8"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-lg">
                  {editingCategory ? 'Editar Categoría' : 'Añadir Nueva Categoría'}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Nombre de Categoría</label>
                  <input
                    type="text"
                    required
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="Ej: Accesorios & Guantes"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">URL de Imagen Promocional</label>
                  <input
                    type="text"
                    required
                    value={cImage}
                    onChange={(e) => setCImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Descripción Breve</label>
                  <textarea
                    rows={3}
                    required
                    value={cDescription}
                    onChange={(e) => setCDescription(e.target.value)}
                    placeholder="Equipamiento técnico para..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none"
                  />
                </div>

                {/* INTERACTIVE SUBCATEGORIES SECTION */}
                <div className="border-t border-slate-150 pt-5 mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#df0024]" />
                      <span>Subcategorías ({cSubcategories.length})</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-light">Administra las subcategorías vinculadas</span>
                  </div>

                  {/* List of current subcategories */}
                  {cSubcategories.length === 0 ? (
                    <div className="p-5 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-slate-500 font-medium text-[11px]">
                      No hay subcategorías registradas en esta categoría. Agrega una a continuación.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto p-1.5 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-inner">
                      {cSubcategories.map((sub, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow">
                          <div className="space-y-0.5 min-w-0">
                            <p className="font-bold text-slate-800 text-xs truncate flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                              {sub.name}
                            </p>
                            <p className="text-[9px] text-slate-400 font-mono">Slug: <span className="text-slate-500">{sub.slug}</span></p>
                            {sub.description && (
                              <p className="text-[10px] text-slate-500 line-clamp-1 font-light leading-snug mt-0.5">{sub.description}</p>
                            )}
                          </div>
                          <div className="flex shrink-0 gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditSubcategoryClick(idx)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                              title="Editar subcategoría"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubcategory(idx)}
                              className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                              title="Eliminar subcategoría"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subcategory form builder */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
                      <span className="w-1.5 h-3 bg-slate-900 rounded-xs"></span>
                      <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
                        {editingSubIdx !== null ? 'Editar' : 'Agregar Nueva'} Subcategoría
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1 text-[10px] tracking-wide">Nombre de la Subcategoría</label>
                        <input
                          type="text"
                          value={subName}
                          onChange={(e) => setSubName(e.target.value)}
                          placeholder="Ej: Chaquetas Térmicas, Licras, etc."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1 text-[10px] tracking-wide">Descripción (Opcional)</label>
                        <input
                          type="text"
                          value={subDescription}
                          onChange={(e) => setSubDescription(e.target.value)}
                          placeholder="Ej: Ropa de primera capa térmica"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#df0024] focus:outline-none shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      {editingSubIdx !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSubIdx(null);
                            setSubName('');
                            setSubDescription('');
                          }}
                          className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-[10px] rounded-xl uppercase tracking-wider hover:bg-slate-300 transition-colors"
                        >
                          Cancelar Edición
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleAddOrUpdateSubcategory}
                        disabled={!subName.trim()}
                        className="px-5 py-2 bg-slate-900 text-white font-bold text-[10px] rounded-xl uppercase tracking-wider hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-2xs"
                      >
                        {editingSubIdx !== null ? 'Actualizar Subcategoría' : 'Añadir a la lista'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#df0024] text-white rounded-xl font-bold uppercase shadow-md hover:bg-red-700"
                  >
                    Guardar Categoría
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
