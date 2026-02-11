import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/CartModal.tsx
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function CartModal({ isOpen, onClose }) {
    const { state, removeFromCart, updateQuantity } = useCart();
    // Debug: mira en consola qué devuelve useCart
    console.log("CartModal - state:", state);
    console.log("CartModal - cart length:", state?.cart?.length);
    const modalRef = useRef(null);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleEsc = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return createPortal(_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", onClick: onClose, "aria-hidden": "true" }), _jsx("div", { ref: modalRef, className: "fixed inset-0 z-50 flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-labelledby": "cart-modal-title", tabIndex: -1, children: _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700", children: [_jsxs("h2", { id: "cart-modal-title", className: "text-2xl font-bold text-gray-900 dark:text-white", children: ["Tu Carrito (", state?.cart?.length || 0, ")"] }), _jsx("button", { onClick: onClose, className: "text-3xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", "aria-label": "Cerrar carrito", children: "\u00D7" })] }), _jsx("div", { className: "p-6 space-y-6", children: state?.cart?.length === 0 || !state ? (_jsx("p", { className: "py-12 text-lg text-center text-gray-600 dark:text-gray-400", children: "El carrito est\u00E1 vac\u00EDo. \u00A1A\u00F1ade productos!" })) : (_jsxs(_Fragment, { children: [state.cart.map((item) => (_jsxs("div", { className: "flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0", children: [_jsx("img", { src: item.image, alt: item.title, className: "object-contain w-20 h-20 border border-gray-200 rounded dark:border-gray-700" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-gray-900 dark:text-white line-clamp-2", children: item.title }), _jsxs("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: [item.price.toFixed(2), " \u20AC \u00D7 ", item.quantity] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center border rounded dark:border-gray-600", children: [_jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), disabled: item.quantity <= 1, className: "px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800", children: "-" }), _jsx("span", { className: "px-4 py-1 font-medium dark:text-white", children: item.quantity }), _jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), className: "px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800", children: "+" })] }), _jsx("button", { onClick: () => removeFromCart(item.id), className: "font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300", children: "Eliminar" })] })] }, item.id))), _jsx("div", { className: "pt-4 text-right", children: _jsxs("p", { className: "text-xl font-bold text-gray-900 dark:text-white", children: ["Total: ", state.totalPrice.toFixed(2), " \u20AC"] }) })] })) }), _jsxs("div", { className: "sticky bottom-0 flex gap-4 px-6 py-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700", children: [_jsx("button", { onClick: onClose, className: "flex-1 py-3 font-medium text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600", children: "Seguir comprando" }), _jsx("button", { disabled: state.cart.length === 0, className: "flex-1 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600", children: _jsx(Link, { to: "/checkout", className: "flex-1 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600", children: "Finalizar compra" }) })] })] }) })] }), document.body);
}
