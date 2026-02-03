import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-contain p-4"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-blue-600">
          {product.price.toFixed(2)} €
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
