import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Checkout() {
    const { state, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const handleFakePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            alert("¡Pago procesado con éxito! (simulación)");
            clearCart(); // vaciar carrito
            navigate("/"); // volver a home
        }, 2000); // simula 2 segundos de procesamiento
    };
    if (state.cart.length === 0) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4", children: [_jsx("h1", { className: "mb-6 text-3xl font-bold text-gray-900 dark:text-white", children: "Carrito vac\u00EDo" }), _jsx("p", { className: "mb-8 text-lg text-gray-600 dark:text-gray-400", children: "No hay productos para pagar. \u00A1A\u00F1ade algo!" }), _jsx(Link, { to: "/", className: "px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600", children: "Volver a la tienda" })] }));
    }
    return (_jsx("div", { className: "min-h-screen px-4 py-12 bg-background text-foreground", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "mb-10 text-3xl font-bold text-center md:text-4xl", children: "Finalizar Compra" }), _jsxs("div", { className: "p-6 mb-8 bg-white shadow-lg dark:bg-gray-800 rounded-xl", children: [_jsx("h2", { className: "mb-6 text-2xl font-semibold", children: "Resumen de tu pedido" }), _jsx("div", { className: "space-y-4", children: state.cart.map((item) => (_jsxs("div", { className: "flex items-center justify-between pb-4 border-b dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: item.image, alt: item.title, className: "object-contain w-16 h-16" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: item.title }), _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [item.quantity, " \u00D7 ", item.price.toFixed(2), " \u20AC"] })] })] }), _jsxs("p", { className: "font-semibold", children: [(item.price * item.quantity).toFixed(2), " \u20AC"] })] }, item.id))) }), _jsx("div", { className: "mt-6 text-right", children: _jsxs("p", { className: "text-xl font-bold", children: ["Total: ", state.totalPrice.toFixed(2), " \u20AC"] }) })] }), _jsx("div", { className: "text-center", children: _jsx("button", { onClick: handleFakePayment, disabled: isProcessing, className: `
              px-10 py-4 text-lg font-bold text-white rounded-xl transition-all
              ${isProcessing
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 active:scale-95"}
            `, children: isProcessing ? "Procesando..." : "Pagar ahora" }) }), _jsx("p", { className: "mt-6 text-sm text-center text-gray-500 dark:text-gray-400", children: "Esta es una simulaci\u00F3n de pago. No se procesa ning\u00FAn cargo real." })] }) }));
}
