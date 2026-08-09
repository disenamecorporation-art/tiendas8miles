export type Route = 'home' | 'catalog' | 'store' | 'product' | 'about' | 'contact' | 'checkout' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  mainCategory?: string;
  subCategory?: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTopDiscount?: boolean;
  images: string[];
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  description: string;
  features: string[];
  techSpecs: {
    weight?: string;
    material?: string;
    waterproof?: string;
    breathability?: string;
    recommendedUse?: string;
    warranty?: string;
  };
  inStock: boolean;
  tags: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  image?: string;
  itemCount?: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  description: string;
  subcategories?: SubCategory[];
}

export interface FilterState {
  category: string;
  mainCategory?: string;
  subCategory?: string;
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  searchQuery: string;
  inStockOnly: boolean;
}

export interface CartItem {
  id: string; // unique item id based on product + size + color
  product: Product;
  selectedSize: string;
  selectedColor: {
    name: string;
    hex: string;
  };
  quantity: number;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  productImage?: string;
}
