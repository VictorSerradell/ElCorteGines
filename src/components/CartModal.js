import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/CartModal.tsx
import { useRef } from "react"; // ← quita useEffect si no lo usas
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
export default function CartModal({ isOpen, onClose }) {
    useCart();
    const modalRef = useRef(null);
    // Si tienes useEffect comentado o no usado → quítalo del import
    // Si lo necesitas para algo (ej. focus trap, Esc key), añádelo y úsalo:
    // useEffect(() => {
    //   const handleEsc = (e: KeyboardEvent) => {
    //     if (e.key === "Escape") onClose();
    //   };
    //   window.addEventListener("keydown", handleEsc);
    //   return () => window.removeEventListener("keydown", handleEsc);
    // }, [onClose]);
    if (!isOpen)
        return null;
    return createPortal(_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", onClick: onClose, "aria-hidden": "true" }), _jsx("div", { ref: modalRef, className: "fixed inset-0 z-50 flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-labelledby": "cart-modal-title", tabIndex: -1 })] }), document.body);
}
