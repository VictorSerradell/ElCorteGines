import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import type { Product } from "../types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Props {
  product: Product;
  index?: number;
}

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

  if (error) {
    return (
      <p className="py-12 text-xl font-medium text-center text-red-600">
        Error: {error}
      </p>
    );
  }

  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
        Productos Destacados
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} index={0} />
          ))}
        </div>
      )}
    </section>
  );
}
