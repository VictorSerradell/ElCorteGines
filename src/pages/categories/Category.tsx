import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import type { Product } from "../../types";


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
        <div className="text-xl text-gray-600 bg-background animate-pulse">
          Cargando productos de {displayName}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-3xl font-bold text-red-600">Error</h2>
        <p className="mb-8 text-lg text-gray-700">{error}</p>
        <Link
          to="/categories"
          className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {displayName}
        </h1>
        <Link
          to="/categories"
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
        >
          ← Volver a categorías
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-xl text-center text-gray-600">
          No hay productos disponibles en esta categoría actualmente.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} index={0} />
          ))}
        </div>
      )}
    </div>
  );
}
