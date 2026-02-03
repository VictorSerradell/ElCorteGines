import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, removeFromCart, updateQuantity } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con tecla Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Bloqueo de scroll en body (mejora UX)
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus trap básico (opcional pero recomendado para accesibilidad)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalRef.current.focus();
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay (fondo oscuro) */}
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="cart-modal-title">Tu Carrito</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {state.cart.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>
              El carrito está vacío
            </p>
          ) : (
            <>
              {state.cart.map((item: CartItem) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>
                      {item.price.toFixed(2)} € × {item.quantity}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <h3>Total: {state.totalPrice.toFixed(2)} €</h3>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Seguir comprando
          </button>
          <button className="btn-primary" disabled={state.cart.length === 0}>
            Finalizar compra
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
