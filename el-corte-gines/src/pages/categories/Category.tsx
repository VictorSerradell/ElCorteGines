import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const decodedCategory = decodeURIComponent(category);
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(decodedCategory)}`,
        );
        if (!res.ok)
          throw new Error(
            "No se pudieron cargar los productos de esta categoría",
          );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryName = decodeURIComponent(category || "");
  const displayName = categoryName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xl text-gray-600 animate-pulse">
          Cargando productos de {displayName}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-lg text-gray-700 mb-8">{error}</p>
        <Link
          to="/categories"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {displayName}
        </h1>
        <Link
          to="/categories"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← Volver a categorías
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-16">
          No hay productos disponibles en esta categoría actualmente.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
