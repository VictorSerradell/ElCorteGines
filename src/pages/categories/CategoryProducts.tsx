import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard"; // ← ruta correcta
import SkeletonCard from "../../components/SkeletonCard";
import type { Product } from "../../types";

// Mapeo de nombres bonitos
const categoryDisplay = {
  electronics: "Electrónica",
  jewelery: "Joyería",
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer",
};

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculamos displayName ANTES de cualquier return
  const decodedCategory = decodeURIComponent(categoryName || "");
  const displayName =
    categoryDisplay[decodedCategory as keyof typeof categoryDisplay] ||
    decodedCategory ||
    "Categoría";

  useEffect(() => {
    if (!categoryName) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const decoded = decodeURIComponent(categoryName);
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(decoded)}`,
        );
        if (!res.ok)
          throw new Error("Categoría no encontrada o error en la API");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4">
        <div className="text-xl font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          Cargando {displayName}...
        </div>
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="mb-4 text-4xl font-bold text-red-600 dark:text-red-400">
          Error
        </h1>
        <p className="mb-8 text-xl text-gray-700 dark:text-gray-300">{error}</p>
        <Link
          to="/categories"
          className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {displayName}
        </h1>
        <Link
          to="/categories"
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Volver a categorías
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-xl text-center text-gray-600 dark:text-gray-400">
          No hay productos en esta categoría por el momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
