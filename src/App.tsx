import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Categories from "./pages/categories/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Electronics from "./pages/Electronics";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Checkout from "./components/Checkout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category"element={<CategoryProducts />}/>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
