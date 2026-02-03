import { useState, useEffect } from "react";
import type { Product } from "../../types";
import ProductCard from "../ProductDetail";


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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">
          Cargando productos de {decodeURIComponent(categoryName || "")}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-xl text-gray-700 mb-8">{error}</p>
        <Link
          to="/categories"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {displayName}
        </h1>
        <Link
          to="/categories"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← Todas las categorías
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-16">
          No hay productos en esta categoría por el momento.
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
function useParams<T>(): { categoryName: any; } {
    throw new Error("Function not implemented.");
}

