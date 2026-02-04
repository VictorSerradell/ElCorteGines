import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,               // reintenta 1 vez
      refetchOnWindowFocus: false, // evita refetch automático al volver a la pestaña
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {" "}
        {/* ← ESTO DEBE ENVOLVER TODO lo que use useCart */}
        <div className="flex flex-col min-h-screen">
          <Header /> {/* Header usa useCart para el contador */}
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:categoryName" element={<Home />} />
              {/* ... tus otras rutas */}
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;