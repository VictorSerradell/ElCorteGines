import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import "./styles/global.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <ProductList />
        {/* Aquí podrías poner <Cart /> más adelante */}
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
