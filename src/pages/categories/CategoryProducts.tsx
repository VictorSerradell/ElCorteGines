import { useState, useEffect } from "react";
import type { Product } from "../../types";
import ProductCard from "../ProductDetail";
import { Link } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard";


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

  useEffect(() => {
    if (!categoryName) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const decoded = decodeURIComponent(categoryName);
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${decoded}`,
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Error</h1>
        <p className="mb-8 text-xl text-gray-700">{error}</p>
        <Link to="/categories"
          className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  const displayName =
    categoryDisplay[
      decodeURIComponent(categoryName || "") as keyof typeof categoryDisplay
    ] || decodeURIComponent(categoryName || "");

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {displayName}
        </h1>
        <Link
          to="/categories"
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
        >
          ← Todas las categorías
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-xl text-center text-gray-600">
          No hay productos en esta categoría por el momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
function useParams<T>(): { categoryName: any; } {
    throw new Error("Function not implemented.");
}

