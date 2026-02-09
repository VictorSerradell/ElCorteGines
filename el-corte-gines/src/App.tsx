import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import CartModal from "./components/CartModal";
import { useState } from "react";
import { useCart } from "./context/CartContext";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/categories/Categories";
import CategoryProducts from "./pages/categories/CategoryProducts";
import Category from "./pages/categories/Category";

function App() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Modal del carrito (se mantiene como overlay, no como ruta) */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
