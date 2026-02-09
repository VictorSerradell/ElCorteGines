import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, removeFromCart, updateQuantity } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  // ... (mantén los useEffect para Esc, focus trap y overflow igual que antes)

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
            <h2
              id="cart-modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              Tu Carrito
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          <div className="p-6 space-y-6">
            {state.cart.length === 0 ? (
              <p className="text-center text-gray-600 py-12 text-lg">
                El carrito está vacío
              </p>
            ) : (
              <>
                {state.cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain border border-gray-200 rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.price.toFixed(2)} € × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
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

                <div className="text-right pt-4">
                  <p className="text-xl font-bold text-gray-900">
                    Total: {state.totalPrice.toFixed(2)} €
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Seguir comprando
            </button>
            <button
              disabled={state.cart.length === 0}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
