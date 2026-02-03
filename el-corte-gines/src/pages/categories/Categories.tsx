import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categoryNames = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const categoryDisplay = {
  electronics: "Electrónica",
  jewelery: "Joyería",
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer",
};

const categoryColors = {
  electronics: "bg-blue-100 text-blue-800 border-blue-300",
  jewelery: "bg-purple-100 text-purple-800 border-purple-300",
  "men's clothing": "bg-green-100 text-green-800 border-green-300",
  "women's clothing": "bg-pink-100 text-pink-800 border-pink-300",
};

export default function Categories() {
  const [loading, setLoading] = useState(true);

  // Podríamos fetch a /products/categories, pero como son fijas y pocas, las hardcodeamos por simplicidad y rendimiento
  // Si quieres dinámica: usa useEffect con fetch('https://fakestoreapi.com/products/categories')

  useEffect(() => {
    // Simulamos carga breve
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">
          Cargando categorías...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Categorías
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryNames.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className={`block p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 text-center ${categoryColors[cat as keyof typeof categoryColors] || "bg-gray-100"}`}
          >
            <h2 className="text-2xl font-semibold mb-3">
              {categoryDisplay[cat as keyof typeof categoryDisplay] || cat}
            </h2>
            <p className="text-gray-600">
              Descubre lo mejor en{" "}
              {categoryDisplay[
                cat as keyof typeof categoryDisplay
              ]?.toLowerCase() || cat}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
