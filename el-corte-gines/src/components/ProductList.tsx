import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Si hay error mostramos mensaje, sino skeletons o productos
  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "3rem" }}>
        Error: {error}
      </p>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        Productos Destacados
      </h2>

      {loading ? (
        <div className="products-grid">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
