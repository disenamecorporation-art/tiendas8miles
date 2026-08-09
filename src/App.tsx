import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/Home/HomePage';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { WooCommerceStorePage } from './components/Store/WooCommerceStorePage';
import { AdminPanelPage } from './components/Admin/AdminPanelPage';
import { ProductDetailPage } from './components/Product/ProductDetailPage';
import { AboutUsPage } from './components/About/AboutUsPage';
import { ContactPage } from './components/Contact/ContactPage';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/Auth/AuthModal';
import { Toast } from './components/ui/Toast';

const MainContent: React.FC = () => {
  const { currentRoute } = useShop();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#df0024] selection:text-white">
      <Header />
      
      <div className="w-full">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'catalog' && <CatalogPage />}
        {currentRoute === 'store' && <WooCommerceStorePage />}
        {currentRoute === 'admin' && <AdminPanelPage />}
        {currentRoute === 'product' && <ProductDetailPage />}
        {currentRoute === 'about' && <AboutUsPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'checkout' && <CheckoutModal />}
      </div>

      <Footer />
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <Toast />
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
