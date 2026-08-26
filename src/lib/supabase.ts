import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Category, User } from '../types';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const STORAGE_KEY_URL = 'loby_supabase_url';
const STORAGE_KEY_KEY = 'loby_supabase_anon_key';

export function getSupabaseConfig(): SupabaseConfig {
  // @ts-ignore
  const envUrl = import.meta.env?.VITE_SUPABASE_URL;
  // @ts-ignore
  const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  let url = localStorage.getItem(STORAGE_KEY_URL);
  let anonKey = localStorage.getItem(STORAGE_KEY_KEY);
  if (!url || !anonKey) {
    url = 'https://mkjxewpobfjgrytvnlib.supabase.co';
    anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ranhld3BvYmZqZ3J5dHZubGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMzE1ODUsImV4cCI6MjEwMTgwNzU4NX0.DGtvHNS1XZ7vPhR29M6VTFE7TI_pVH55zw-YCF34cb4';
    localStorage.setItem(STORAGE_KEY_URL, url);
    localStorage.setItem(STORAGE_KEY_KEY, anonKey);
  }
  return { url, anonKey };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  localStorage.setItem(STORAGE_KEY_URL, url.trim());
  localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
}

export function clearSupabaseConfig() {
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_KEY);
}

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export async function loadSupabaseConfigFromServer(): Promise<SupabaseConfig> {
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = await res.json();
      if (data.url && data.anonKey) {
        localStorage.setItem(STORAGE_KEY_URL, data.url.trim());
        localStorage.setItem(STORAGE_KEY_KEY, data.anonKey.trim());
        cachedClient = null;
        return { url: data.url.trim(), anonKey: data.anonKey.trim() };
      }
    }
  } catch (err) {
    console.error("Failed to load custom Supabase config from server, using local instead:", err);
  }
  return getSupabaseConfig();
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;
  
  if (cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey);
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to init Supabase client:', err);
    return null;
  }
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!url || !anonKey) {
      return { success: false, message: 'URL y Anon Key son requeridos.' };
    }
    const client = createClient(url.trim(), anonKey.trim());
    
    // Check products table
    const { error: prodError } = await client.from('products').select('id').limit(1);
    if (prodError) {
      if (prodError.message.includes('does not exist') || prodError.code === '42P01') {
        return { 
          success: false, 
          message: '¡Conexión básica establecida, pero la tabla "products" NO existe en tu Supabase! Debes ejecutar el script SQL de abajo en el SQL Editor de tu panel de Supabase para crearla.' 
        };
      }
      if (prodError.message.includes('JWT') || prodError.message.includes('API key') || prodError.message.includes('Invalid') || prodError.code === 'PGRST301') {
        return { success: false, message: `Error de Autenticación de Supabase (las credenciales son inválidas): ${prodError.message}` };
      }
      return { success: false, message: `Error al verificar la tabla "products": ${prodError.message}` };
    }

    // Check categories table
    const { error: catError } = await client.from('categories').select('id').limit(1);
    if (catError) {
      if (catError.message.includes('does not exist') || catError.code === '42P01') {
        return { 
          success: false, 
          message: '¡Conexión y tabla "products" listas, pero la tabla "categories" NO existe en tu Supabase! Debes ejecutar el script SQL de abajo completo en el SQL Editor.' 
        };
      }
      return { success: false, message: `Error al verificar la tabla "categories": ${catError.message}` };
    }

    return { success: true, message: '¡Conexión 100% exitosa y tablas verificadas! La sincronización está totalmente operativa.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error al conectar con Supabase.' };
  }
}

function mapDbProductToReact(dbProd: any): Product {
  return {
    id: dbProd.id,
    name: dbProd.name,
    subtitle: dbProd.subtitle || '',
    category: dbProd.category,
    mainCategory: dbProd.main_category || dbProd.mainCategory || '',
    subCategory: dbProd.sub_category || dbProd.subCategory || '',
    brand: dbProd.brand,
    price: Number(dbProd.price),
    originalPrice: dbProd.original_price !== undefined ? Number(dbProd.original_price) : (dbProd.originalPrice !== undefined ? Number(dbProd.originalPrice) : undefined),
    discountPercent: dbProd.discount_percent !== undefined ? Number(dbProd.discount_percent) : (dbProd.discountPercent !== undefined ? Number(dbProd.discountPercent) : undefined),
    rating: dbProd.rating !== undefined ? Number(dbProd.rating) : 5,
    reviewsCount: dbProd.reviews_count !== undefined ? Number(dbProd.reviews_count) : (dbProd.reviewsCount !== undefined ? Number(dbProd.reviewsCount) : 0),
    isNew: dbProd.is_new !== undefined ? Boolean(dbProd.is_new) : (dbProd.isNew !== undefined ? Boolean(dbProd.isNew) : false),
    isFeatured: dbProd.is_featured !== undefined ? Boolean(dbProd.is_featured) : (dbProd.isFeatured !== undefined ? Boolean(dbProd.isFeatured) : false),
    isTopDiscount: dbProd.is_top_discount !== undefined ? Boolean(dbProd.is_top_discount) : (dbProd.isTopDiscount !== undefined ? Boolean(dbProd.isTopDiscount) : false),
    images: Array.isArray(dbProd.images) ? dbProd.images : [],
    sizes: Array.isArray(dbProd.sizes) ? dbProd.sizes : [],
    colors: Array.isArray(dbProd.colors) ? dbProd.colors : [],
    description: dbProd.description || '',
    features: Array.isArray(dbProd.features) ? dbProd.features : [],
    techSpecs: dbProd.tech_specs || dbProd.techSpecs || {},
    inStock: dbProd.in_stock !== undefined ? Boolean(dbProd.in_stock) : (dbProd.inStock !== undefined ? Boolean(dbProd.inStock) : true),
    tags: Array.isArray(dbProd.tags) ? dbProd.tags : [],
  };
}

function mapDbCategoryToReact(dbCat: any): Category {
  return {
    id: dbCat.id,
    name: dbCat.name,
    slug: dbCat.slug,
    iconName: dbCat.icon_name || dbCat.iconName || 'ShoppingBag',
    image: dbCat.image || '',
    itemCount: dbCat.item_count !== undefined ? Number(dbCat.item_count) : (dbCat.itemCount !== undefined ? Number(dbCat.itemCount) : 0),
    description: dbCat.description || '',
    subcategories: dbCat.sub_categories || dbCat.subcategories || [],
  };
}

export async function fetchProductsFromSupabase(url: string, anonKey: string): Promise<any[] | null> {
  try {
    const client = createClient(url.trim(), anonKey.trim());
    const { data, error } = await client.from('products').select('*');
    if (error) throw error;
    return (data || []).map(mapDbProductToReact);
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return null;
  }
}

// Additional Categories, Products and Auth APIs

export function isAdminEmail(email?: string): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase();
  return (
    normalized.includes('admin') ||
    normalized === 'tienda8miles@gmail.com' ||
    normalized === 'admin@tienda8miles.com'
  );
}

export async function fetchCategoriesFromSupabase(): Promise<Category[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('categories').select('*');
    if (error) throw error;
    return (data || []).map(mapDbCategoryToReact);
  } catch (err) {
    console.error('Error fetching categories from Supabase:', err);
    return null;
  }
}

export async function upsertProductToSupabase(product: Product): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  
  // Build a tolerant payload that supports both snake_case and camelCase schemas
  const payload: any = {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle || null,
    category: product.category,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice || null,
    original_price: product.originalPrice || null,
    discountPercent: product.discountPercent || null,
    discount_percent: product.discountPercent || null,
    rating: product.rating || 5,
    reviewsCount: product.reviewsCount || 0,
    reviews_count: product.reviewsCount || 0,
    isNew: product.isNew ?? false,
    is_new: product.isNew ?? false,
    isFeatured: product.isFeatured ?? false,
    is_featured: product.isFeatured ?? false,
    isTopDiscount: product.isTopDiscount ?? false,
    is_top_discount: product.isTopDiscount ?? false,
    images: product.images || [],
    sizes: product.sizes || [],
    colors: product.colors || [],
    description: product.description || '',
    features: product.features || [],
    techSpecs: product.techSpecs || {},
    tech_specs: product.techSpecs || {},
    inStock: product.inStock ?? true,
    in_stock: product.inStock ?? true,
    tags: product.tags || [],
    mainCategory: product.mainCategory || null,
    main_category: product.mainCategory || null,
    subCategory: product.subCategory || null,
    sub_category: product.subCategory || null,
  };

  let attempts = 0;
  while (attempts < 15) {
    try {
      const { error } = await client.from('products').upsert(payload);
      if (!error) {
        console.log('Successfully upserted product to Supabase:', product.name);
        return true;
      }

      const msg = error.message || '';
      console.warn(`Supabase upsert warning (attempt ${attempts + 1}):`, msg);

      // Extract and delete missing column if Postgres rejects it
      if (msg.includes('column') && msg.includes('does not exist')) {
        const match = msg.match(/column "([^"]+)"/);
        if (match && match[1]) {
          const offendingColumn = match[1];
          console.log(`Removing unsupported product column from payload: ${offendingColumn}`);
          delete payload[offendingColumn];
          attempts++;
          continue;
        }
      }
      throw error;
    } catch (err) {
      console.error('Failed to upsert product to Supabase:', err);
      return false;
    }
  }
  return false;
}

export async function deleteProductFromSupabase(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting product from Supabase:', err);
    return false;
  }
}

export async function upsertCategoryToSupabase(category: Category): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  
  const payload: any = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    iconName: category.iconName,
    icon_name: category.iconName,
    image: category.image || null,
    itemCount: category.itemCount || 0,
    item_count: category.itemCount || 0,
    description: category.description || null,
    subcategories: category.subcategories || [],
    sub_categories: category.subcategories || [],
  };

  let attempts = 0;
  while (attempts < 10) {
    try {
      const { error } = await client.from('categories').upsert(payload);
      if (!error) {
        console.log('Successfully upserted category to Supabase:', category.name);
        return true;
      }

      const msg = error.message || '';
      console.warn(`Supabase category upsert warning (attempt ${attempts + 1}):`, msg);

      if (msg.includes('column') && msg.includes('does not exist')) {
        const match = msg.match(/column "([^"]+)"/);
        if (match && match[1]) {
          const offendingColumn = match[1];
          console.log(`Removing unsupported category column from payload: ${offendingColumn}`);
          delete payload[offendingColumn];
          attempts++;
          continue;
        }
      }
      throw error;
    } catch (err) {
      console.error('Error upserting category to Supabase:', err);
      return false;
    }
  }
  return false;
}

export async function deleteCategoryFromSupabase(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { error } = await client.from('categories').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting category from Supabase:', err);
    return false;
  }
}

// Authentication wrappers
export async function supabaseLogin(email: string, pass: string): Promise<User | null> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase no está configurado');
  }
  
  const { data, error } = await client.auth.signInWithPassword({ email, password: pass });
  if (error) throw error;
  if (!data.user) return null;
  
  // Obtener perfil para rol
  const { data: profile } = await client
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();
    
  return {
    id: data.user.id,
    name: profile?.name || data.user.user_metadata?.name || email.split('@')[0],
    email: data.user.email || email,
    role: (profile?.role === 'admin' || isAdminEmail(email)) ? 'admin' : 'user',
  };
}

export async function supabaseRegister(name: string, email: string, pass: string): Promise<User | null> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase no está configurado');
  }
  
  const { data, error } = await client.auth.signUp({
    email,
    password: pass,
    options: {
      data: { name }
    }
  });
  if (error) throw error;
  if (!data.user) return null;
  
  // Pequeña espera para asegurar que el trigger de base de datos haya creado el perfil
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const { data: profile } = await client
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();
    
  return {
    id: data.user.id,
    name: profile?.name || name,
    email: data.user.email || email,
    role: (profile?.role === 'admin' || isAdminEmail(email)) ? 'admin' : 'user',
  };
}

export async function supabaseLogout(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
}

export async function fetchSupabaseSessionUser(): Promise<User | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data: { user }, error: userError } = await client.auth.getUser();
    if (userError || !user) return null;
 
    const { data: profile } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
 
    return {
      id: user.id,
      name: profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
      email: user.email || '',
      role: (profile?.role === 'admin' || isAdminEmail(user.email || '')) ? 'admin' : 'user',
    };
  } catch (err) {
    console.error('Error fetching Supabase session user:', err);
    return null;
  }
}

