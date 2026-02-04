// src/pages/Home.tsx
import { useFilter } from "../context/FilterContext";
import ProductList from "../components/ProductList";


export default function Home() {
  const { searchQuery, setSearchQuery } = useFilter();

  return (
    <div className="min-h-screen">
      {/* Buscador */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pl-12 text-lg border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 shadow-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {/* icono lupa */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
