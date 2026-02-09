  import { useState } from "react";
  import { useCart } from "../context/CartContext";
  import CartModal from "./CartModal";
  import { Link } from "react-router-dom";

  export default function Header() {
    const { state } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
      <>
        <header className="bg-blue-700 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight">
                El Corte Ginés
              </h1>

              <nav>
                <ul className="flex flex-wrap justify-center gap-6 text-lg font-medium">
                  <li>
                    <Link
                      to="#"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Hombre
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Mujer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Electrónica
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="flex items-center gap-2 hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    >
                      Carrito
                      {state.totalItems > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[1.5rem] text-center">
                          {state.totalItems}
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Categorías
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </>
    );
  }
