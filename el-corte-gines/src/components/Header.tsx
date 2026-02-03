import { useCart } from "../context/CartContext";

export default function Header() {
  const { state } = useCart();

  return (
    <header>
      <h1>El Corte Ginés</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          {/* ... otros links */}
          <li>
            Carrito
            {state.totalItems > 0 && (
              <span
                style={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: "0.8rem",
                  marginLeft: "5px",
                }}
              >
                {state.totalItems}
              </span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
