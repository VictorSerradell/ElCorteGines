import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal"; // ← nuevo import

export default function Header() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header>
      <h1>El Corte Ginés</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Hombre</a>
          </li>
          <li>
            <a href="#">Mujer</a>
          </li>
          <li>
            <a href="#">Electrónica</a>
          </li>
          <li>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                font: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Carrito
              {state.totalItems > 0 && (
                <span
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    fontSize: "0.8rem",
                  }}
                >
                  {state.totalItems}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
