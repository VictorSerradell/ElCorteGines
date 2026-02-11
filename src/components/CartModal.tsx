import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, removeFromCart, updateQuantity } = useCart(); // ← destructuramos aquí (clave)
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con tecla Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Focus trap básico (mejora accesibilidad)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    modal.addEventListener("keydown", trap);
    first?.focus();

    return () => modal.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop borroso */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <h2
              id="cart-modal-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Tu Carrito ({state.cart.length})
            </h2>
            <button
              onClick={onClose}
              className="text-3xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-6">
            {state.cart.length === 0 ? (
              <p className="py-12 text-lg text-center text-gray-600 dark:text-gray-400">
                El carrito está vacío. ¡Añade productos!
              </p>
            ) : (
              <>
                {state.cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-20 h-20 border border-gray-200 rounded dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {item.price.toFixed(2)} € × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded dark:border-gray-600">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-medium dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    Total: {state.totalPrice.toFixed(2)} €
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex gap-4 px-6 py-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <button
              onClick={onClose}
              className="flex-1 py-3 font-medium text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Seguir comprando
            </button>
            <button
              disabled={state.cart.length === 0}
              className="flex-1 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
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
