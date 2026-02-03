import { useCart } from "../context/CartContext";
import { Product } from "../types"; // ajusta la ruta si es necesario

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      className="product-card"
      style={
        {
          /* tus estilos */
        }
      }
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "contain",
          padding: "1rem",
        }}
        loading="lazy"
      />
      <div style={{ padding: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          {product.title}
        </h3>
        <p style={{ fontWeight: "bold", color: "#0071dc" }}>
          {product.price.toFixed(2)} €
        </p>

        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#0071dc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
