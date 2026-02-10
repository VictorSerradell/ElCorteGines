// src/components/Cart.tsx
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types"; // ← type-only import

export default function Cart() {
  const { state, removeFromCart, updateQuantity } = useCart();

  if (state.cart.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        El carrito está vacío
      </p>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Tu Carrito</h2>
      {state.cart.map(
        (
          item: CartItem, // ← tipado explícito aquí si hace falta
        ) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "1rem 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div>
                <h4>{item.title}</h4>
                <p>
                  {item.price.toFixed(2)} € × {item.quantity}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span style={{ margin: "0 1rem" }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  marginLeft: "1rem",
                  color: "red",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ),
      )}
      <div style={{ marginTop: "2rem", textAlign: "right" }}>
        <h3>Total: {state.totalPrice.toFixed(2)} €</h3>
      </div>
    </div>
  );
}
