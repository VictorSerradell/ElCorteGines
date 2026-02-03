import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import "./styles/global.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
