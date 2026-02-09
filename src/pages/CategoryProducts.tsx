// src/pages/CategoryProducts.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import type { Product } from "../types";
import { getCategoryTitle } from "../constants/categoryTitles";

// Banner por categoría (puedes cambiar URLs)
const categoryBanners: Record<string, string> = {
  "men's clothing":
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Hombre: hombre con ropa casual moderna, fondo urbano

  "women's clothing":
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  // Mujer: estilo moda femenina elegante, look contemporáneo

  electronics:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // esta ya funcionaba
  // Electrónica: gadgets y tecnología (mantenemos la original)

  default:
    "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // fondo genérico
};

export default function CategoryProducts({
  categoryName,
}: {
  categoryName?: string;
}) {
  const { category } = useParams<{ category: string }>();
  const finalCategory = categoryName || category || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!finalCategory) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const decoded = decodeURIComponent(finalCategory);
        const encoded = encodeURIComponent(decoded);
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encoded}`,
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
  }, [finalCategory]);

  const displayName = getCategoryTitle(finalCategory);
  const bannerImage =
    categoryBanners[finalCategory.toLowerCase()] || categoryBanners.default;

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
        <h2 className="mb-4 text-3xl font-bold text-red-600 dark:text-red-400">
          Error
        </h2>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">{error}</p>
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
    <div className="min-h-screen bg-background">
      {/* Banner superior personalizado por categoría */}
      <div className="relative h-64 overflow-hidden md:h-80 lg:h-96">
        <img
          src={bannerImage}
          alt={displayName}
          className="absolute inset-0 object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-black/30 to-transparent">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-2xl">
            {displayName}
          </h1>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
          <Link
            to="/categories"
            className="flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            ← Todas las categorías
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="py-16 text-xl text-center text-gray-600 dark:text-gray-400">
            No hay productos en {displayName.toLowerCase()} por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
