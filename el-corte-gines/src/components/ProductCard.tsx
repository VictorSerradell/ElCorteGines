import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import type { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <Link
        to={`/product/${product.id}`}
        className="aspect-square bg-gray-50 p-6 flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link
          to={`/product/${product.id}`}
          className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors"
        >
          {product.title}
        </Link>

        <p className="text-xl font-bold text-blue-700 mt-auto">
          {product.price.toFixed(2)} €
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic en botón active el Link del contenedor
            addToCart(product);
          }}
          className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
