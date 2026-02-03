import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { state, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Tu Carrito de Compras
      </h1>

      {state.cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Volver a la tienda
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {state.cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain border border-gray-200 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-lg text-blue-700 font-bold mt-2">
                  {item.price.toFixed(2)} € × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-medium bg-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total:</span>
              <span className="text-blue-700">
                {state.totalPrice.toFixed(2)} €
              </span>
            </div>
            <button
              disabled={state.cart.length === 0}
              className="mt-6 w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
