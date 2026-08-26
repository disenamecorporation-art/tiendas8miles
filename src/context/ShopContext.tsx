import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { CartItem, Category, FilterState, Product, Route, ToastNotification, User } from '../types';
import { CATEGORIES as INITIAL_CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from '../data/mockData';
import { 
  getSupabaseConfig, 
  loadSupabaseConfigFromServer,
  fetchProductsFromSupabase,
  fetchCategoriesFromSupabase,
  upsertProductToSupabase,
  deleteProductFromSupabase,
  upsertCategoryToSupabase,
  deleteCategoryFromSupabase,
  supabaseLogin,
  supabaseRegister,
  supabaseLogout,
  fetchSupabaseSessionUser,
  isAdminEmail
} from '../lib/supabase';

interface ShopContextType {
  currentRoute: Route;
  setCurrentRoute: (route: Route) => void;
  selectedProductId: string | null;
  selectedCategory: string | null;
  cart: CartItem[];
  wishlist: string[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  filteredProducts: Product[];
  toast: ToastNotification | null;
  setToast: (toast: ToastNotification | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  // Auth
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean> | boolean;
  register: (name: string, email: string, pass: string) => Promise<boolean> | boolean;
  logout: () => void | Promise<void>;
  loginAsAdmin: () => void;

  // Admin Product CRUD
  addProduct: (product: Product) => void | Promise<void>;
  updateProduct: (product: Product) => void | Promise<void>;
  deleteProduct: (productId: string) => void | Promise<void>;

  // Admin Category CRUD
  addCategory: (category: Category) => void | Promise<void>;
  updateCategory: (category: Category) => void | Promise<void>;
  deleteCategory: (categoryId: string) => void | Promise<void>;

  // Navigation & Actions
  navigateToProduct: (productId: string) => void;
  navigateToCatalog: (categorySlug?: string) => void;
  navigateToStore: (categorySlug?: string) => void;
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning', productImage?: string) => void;
  sendCartToWhatsApp: (shippingInfo?: { name: string; phone: string; address: string; city: string }) => void;
  cartTotal: number;
  cartCount: number;
}

const initialFilterState: FilterState = {
  category: 'all',
  brands: [],
  priceRange: [0, 300],
  sizes: [],
  colors: [],
  sortBy: 'relevance',
  searchQuery: '',
  inStockOnly: false,
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // User state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('8miles_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dynamic Products List
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      localStorage.removeItem('8miles_products_v2');
      const saved = localStorage.getItem('8miles_products_v3');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Dynamic Categories List
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      localStorage.removeItem('8miles_categories_v2');
      const saved = localStorage.getItem('8miles_categories_v3');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Cart persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('8miles_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('8miles_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Save user to localStorage
  useEffect(() => {
    try {
      if (user) localStorage.setItem('8miles_user', JSON.stringify(user));
      else localStorage.removeItem('8miles_user');
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Auto-fetch products and categories from Supabase on mount
  useEffect(() => {
    async function syncRemoteData() {
      try {
        const { url, anonKey } = await loadSupabaseConfigFromServer();
        if (url && anonKey) {
          const remoteProducts = await fetchProductsFromSupabase(url, anonKey);
          if (remoteProducts && remoteProducts.length > 0) {
            setProducts(remoteProducts);
          }
          const remoteCategories = await fetchCategoriesFromSupabase();
          if (remoteCategories && remoteCategories.length > 0) {
            setCategories(remoteCategories);
          }
          
          // Verify active session in Supabase and sync latest role from database
          const sessionUser = await fetchSupabaseSessionUser();
          if (sessionUser) {
            setUser(sessionUser);
            console.log('Synchronized Supabase user session:', sessionUser);
          }
        }
      } catch (e) {
        console.error('Error syncing remote data with Supabase:', e);
      }
    }
    syncRemoteData();
  }, []);

  // Save products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('8miles_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Save categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('8miles_categories_v3', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('8miles_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('8miles_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedProductId]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success', productImage?: string) => {
    const id = Date.now().toString();
    setToast({ id, message, type, productImage });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth Functions
  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const sbUser = await supabaseLogin(email, pass);
      if (sbUser) {
        setUser(sbUser);
        showToast(`¡Bienvenido de nuevo, ${sbUser.name}!`, 'success');
        return true;
      }
    } catch (err: any) {
      console.warn('Supabase login failed, using fallback authentication:', err);
    }

    if (email.toLowerCase() === 'admin@tienda8miles.com' && pass === 'admin123') {
      const adminUser: User = {
        id: 'usr_admin',
        name: 'Administrador 8miles',
        email: 'admin@tienda8miles.com',
        role: 'admin',
      };
      setUser(adminUser);
      showToast('¡Bienvenido Panel Administrador!', 'success');
      return true;
    }
    
    if (email && pass.length >= 4) {
      const normalUser: User = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: isAdminEmail(email) ? 'admin' : 'user',
      };
      setUser(normalUser);
      showToast(`¡Bienvenido de nuevo, ${normalUser.name}!`, 'success');
      return true;
    }
    
    showToast('Credenciales inválidas o error de Supabase.', 'warning');
    return false;
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const sbUser = await supabaseRegister(name, email, pass);
      if (sbUser) {
        setUser(sbUser);
        showToast(`¡Cuenta creada con éxito! Bienvenido ${name}`, 'success');
        return true;
      }
    } catch (err: any) {
      console.warn('Supabase registration failed, using fallback:', err);
      showToast(err?.message || 'Error al registrar en Supabase.', 'warning');
    }

    if (name && email && pass.length >= 4) {
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name,
        email,
        role: isAdminEmail(email) ? 'admin' : 'user',
      };
      setUser(newUser);
      showToast(`¡Cuenta local creada con éxito! Bienvenido ${name}`, 'success');
      return true;
    }
    showToast('Por favor completa todos los campos correctamente.', 'warning');
    return false;
  };

  const logout = async () => {
    try {
      await supabaseLogout();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    showToast('Sesión cerrada correctamente', 'info');
    if (currentRoute === 'admin') {
      setCurrentRoute('home');
    }
  };

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'usr_admin',
      name: 'Administrador LOBY',
      email: 'admin@tienda8miles.com',
      role: 'admin',
    };
    setUser(adminUser);
    setCurrentRoute('admin');
    showToast('¡Sesión iniciada como Administrador!', 'success');
  };

  // Product CRUD
  const addProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Producto "${newProduct.name}" guardado localmente`, 'success', newProduct.images[0]);
    
    try {
      const success = await upsertProductToSupabase(newProduct);
      if (success) {
        showToast(`Producto "${newProduct.name}" guardado en Supabase`, 'success');
      }
    } catch (err) {
      console.error('Error saving product to Supabase:', err);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast(`Producto "${updatedProduct.name}" actualizado localmente`, 'success');

    try {
      const success = await upsertProductToSupabase(updatedProduct);
      if (success) {
        showToast(`Producto "${updatedProduct.name}" actualizado en Supabase`, 'success');
      }
    } catch (err) {
      console.error('Error updating product in Supabase:', err);
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Producto eliminado localmente', 'info');

    try {
      const success = await deleteProductFromSupabase(productId);
      if (success) {
        showToast('Producto eliminado de Supabase', 'info');
      }
    } catch (err) {
      console.error('Error deleting product from Supabase:', err);
    }
  };

  // Category CRUD
  const addCategory = async (newCat: Category) => {
    setCategories((prev) => [...prev, newCat]);
    showToast(`Categoría "${newCat.name}" añadida`, 'success');

    try {
      const success = await upsertCategoryToSupabase(newCat);
      if (success) {
        showToast(`Categoría guardada en Supabase`, 'success');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCategory = async (updatedCat: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
    showToast(`Categoría "${updatedCat.name}" actualizada`, 'success');

    try {
      const success = await upsertCategoryToSupabase(updatedCat);
      if (success) {
        showToast(`Categoría actualizada en Supabase`, 'success');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Categoría eliminada', 'info');

    try {
      const success = await deleteCategoryFromSupabase(catId);
      if (success) {
        showToast('Categoría eliminada de Supabase', 'info');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentRoute('product');
  };

  const navigateToCatalog = (categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
      setFilterState((prev) => ({ ...prev, category: categorySlug }));
    } else {
      setSelectedCategory(null);
    }
    setCurrentRoute('catalog');
  };

  const navigateToStore = (categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
      setFilterState((prev) => ({ ...prev, category: categorySlug }));
    } else {
      setSelectedCategory(null);
    }
    setCurrentRoute('store');
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    quantity: number = 1
  ) => {
    const selectedSize = size || product.sizes[0] || 'Única';
    const selectedColor = color || product.colors[0] || { name: 'Estándar', hex: '#1E293B' };
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });

    showToast(`¡Añadido al carrito: ${product.name}!`, 'success', product.images[0]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Eliminado de favoritos', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Añadido a tus favoritos', 'success');
        return [...prev, productId];
      }
    });
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
    setSelectedCategory(null);
  };

  // WhatsApp Order Integration
  const sendCartToWhatsApp = (shippingInfo?: { name: string; phone: string; address: string; city: string }) => {
    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'warning');
      return;
    }

    let message = `*¡NUEVO PEDIDO DESDE LA TIENDA TIENDA8MILES - LOBY VENEZUELA!* 🏔️🎒\n\n`;
    if (shippingInfo && shippingInfo.name) {
      message += `*Cliente:* ${shippingInfo.name}\n`;
      message += `*Teléfono:* ${shippingInfo.phone}\n`;
      message += `*Ciudad/Dirección:* ${shippingInfo.city} - ${shippingInfo.address}\n\n`;
    }
    
    message += `*DETALLE DEL PEDIDO:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Talla: ${item.selectedSize} | Color: ${item.selectedColor.name}\n`;
      message += `   - Cantidad: ${item.quantity} x $${item.product.price.toFixed(2)} = *$${(item.quantity * item.product.price).toFixed(2)}*\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    message += `*TOTAL A PAGAR:* $${total.toFixed(2)} USD\n\n`;
    message += `Por favor confirmen disponibilidad y métodos de pago (Zelle, Pago Móvil, Efectivo, Binance). ¡Muchas gracias!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/584241324497?text=${encoded}`, '_blank');
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category / Subcategory / Main Category filter
      if (filterState.category && filterState.category !== 'all') {
        const catKey = filterState.category.toLowerCase();
        const matchesCat =
          product.category?.toLowerCase() === catKey ||
          product.mainCategory?.toLowerCase() === catKey ||
          product.subCategory?.toLowerCase() === catKey ||
          product.tags?.some((t) => t.toLowerCase() === catKey || catKey.includes(t.toLowerCase())) ||
          product.name.toLowerCase().includes(catKey);
        if (!matchesCat) return false;
      }

      // Brand filter
      if (filterState.brands.length > 0) {
        if (!filterState.brands.includes(product.brand)) return false;
      }

      // Price filter
      if (
        product.price < filterState.priceRange[0] ||
        product.price > filterState.priceRange[1]
      ) {
        return false;
      }

      // Size filter
      if (filterState.sizes.length > 0) {
        const hasSize = product.sizes.some((s) => filterState.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (filterState.colors.length > 0) {
        const hasColor = product.colors.some((c) => filterState.colors.includes(c.name));
        if (!hasColor) return false;
      }

      // In stock filter
      if (filterState.inStockOnly && !product.inStock) {
        return false;
      }

      // Search query
      if (filterState.searchQuery.trim() !== '') {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      return 0; // relevance / default
    });
  }, [filterState, products]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedProductId,
        selectedCategory,
        cart,
        wishlist,
        filterState,
        setFilterState,
        resetFilters,
        products,
        setProducts,
        categories,
        filteredProducts,
        toast,
        setToast,
        isCartOpen,
        setIsCartOpen,
        isMobileFiltersOpen,
        setIsMobileFiltersOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        login,
        register,
        logout,
        loginAsAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        navigateToProduct,
        navigateToCatalog,
        navigateToStore,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        showToast,
        sendCartToWhatsApp,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

