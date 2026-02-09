// src/pages/Home.tsx (versión corregida)
import { useState } from "react";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {" "}
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Hero banner - Moda y tecnología"
          className="absolute inset-0 object-cover w-full h-full brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
            Descubre lo mejor en moda, tecnología y mucho más
          </h1>
          <p className="max-w-3xl mb-10 text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg">
            Ofertas exclusivas, novedades y las marcas que amas
          </p>

          <div className="flex flex-col gap-6 sm:flex-row">
            <Link
              to="/categories"
              className="inline-block px-10 py-5 text-xl font-bold text-gray-900 transition-all duration-300 transform bg-white rounded-full shadow-2xl hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
            >
              Explorar categorías
            </Link>

            <Link
              to="/offers"
              className="inline-block px-10 py-5 text-xl font-bold text-white transition-all duration-300 transform rounded-full shadow-2xl bg-eci-red hover:bg-red-700 hover:shadow-xl hover:-translate-y-1"
            >
              Ver ofertas del día
            </Link>
          </div>
        </div>
      </section>
      {/* Buscador */}
      <div className="relative z-20 max-w-4xl px-4 mx-auto -mt-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos, marcas o categorías..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-5 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full shadow-2xl pl-14 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm dark:text-white dark:placeholder-gray-400"
          />
          <div className="absolute text-gray-500 -translate-y-1/2 left-5 top-1/2 dark:text-gray-400">
            <svg
              className="w-7 h-7"
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
      {/* Productos */}
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
