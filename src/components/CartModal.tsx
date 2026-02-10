// src/components/CartModal.tsx
import { useRef } from "react"; // ← quita useEffect si no lo usas
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  // Si tienes useEffect comentado o no usado → quítalo del import
  // Si lo necesitas para algo (ej. focus trap, Esc key), añádelo y úsalo:
  // useEffect(() => {
  //   const handleEsc = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   window.addEventListener("keydown", handleEsc);
  //   return () => window.removeEventListener("keydown", handleEsc);
  // }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
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
        {/* ... resto del modal igual ... */}
      </div>
    </>,
    document.body,
  );
}
