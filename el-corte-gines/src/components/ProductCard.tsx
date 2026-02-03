interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
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
      </div>
    </div>
  );
}
