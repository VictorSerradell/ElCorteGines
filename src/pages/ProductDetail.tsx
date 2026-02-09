import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: { rate: number; count: number };
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>(); // useParams tipado
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://.com/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 animate-pulse">
          Cargando producto...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Error</h1>
        <p className="mb-8 text-xl text-gray-700">
          {error || "Producto no encontrado"}
        </p>
        <Link
          to="/"
          className="px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-12 mx-auto">
      <Link
        to="/"
        className="inline-flex items-center mb-8 font-medium text-blue-600 hover:text-blue-800"
      >
        ← Volver a productos
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Imagen */}
        <div className="flex items-center justify-center p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col">
          <span className="mb-2 text-sm tracking-wide text-gray-500 uppercase">
            {product.category}
          </span>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-blue-700">
              {product.price.toFixed(2)} €
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <span className="text-2xl">★</span>
              <span className="text-xl font-medium">{product.rating.rate}</span>
              <span className="text-sm text-gray-500">
                ({product.rating.count} reseñas)
              </span>
            </div>
          </div>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full px-10 py-4 text-lg font-bold text-white transition-all bg-blue-600 shadow-md md:w-auto rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-lg"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
