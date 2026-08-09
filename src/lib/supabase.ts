import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Category, User } from '../types';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const STORAGE_KEY_URL = 'loby_supabase_url';
const STORAGE_KEY_KEY = 'loby_supabase_anon_key';

export function getSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
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
    const { error } = await client.from('products').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('does not exist')) {
      if (error.message.includes('JWT') || error.message.includes('API key') || error.message.includes('Invalid') || error.code === 'PGRST301') {
        return { success: false, message: `Error de Autenticación: ${error.message}` };
      }
    }
    return { success: true, message: '¡Conexión con Supabase establecida exitosamente!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error al conectar con Supabase.' };
  }
}

export async function fetchProductsFromSupabase(url: string, anonKey: string): Promise<any[] | null> {
  try {
    const client = createClient(url.trim(), anonKey.trim());
    const { data, error } = await client.from('products').select('*');
    if (error) throw error;
    return data || [];
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
    return (data as Category[]) || [];
  } catch (err) {
    console.error('Error fetching categories from Supabase:', err);
    return null;
  }
}

export async function upsertProductToSupabase(product: Product): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { error } = await client.from('products').upsert(product);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error upserting product to Supabase:', err);
    return false;
  }
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
  try {
    const { error } = await client.from('categories').upsert(category);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error upserting category to Supabase:', err);
    return false;
  }
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

