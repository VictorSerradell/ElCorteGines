import { useRef, useEffect } from "react"; // ← añadimos useEffect para Esc y focus
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, removeFromCart, updateQuantity } = useCart(); // ← destructuramos aquí
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con tecla Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Focus trap básico (opcional pero mejora accesibilidad)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    modal.addEventListener("keydown", trapFocus);
    firstElement?.focus(); // foco inicial

    return () => modal.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop (borroso) */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <h2
              id="cart-modal-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Tu Carrito
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
                El carrito está vacío
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

          {/* Footer con botones */}
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
