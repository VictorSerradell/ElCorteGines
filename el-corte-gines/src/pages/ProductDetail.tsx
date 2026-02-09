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
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">
          Cargando producto...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-xl text-gray-700 mb-8">
          {error || "Producto no encontrado"}
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
      >
        ← Volver a productos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-blue-700">
              {product.price.toFixed(2)} €
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <span className="text-2xl">★</span>
              <span className="text-xl font-medium">{product.rating.rate}</span>
              <span className="text-gray-500 text-sm">
                ({product.rating.count} reseñas)
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-blue-600 text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md hover:shadow-lg"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
