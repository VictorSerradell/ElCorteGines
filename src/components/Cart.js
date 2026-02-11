import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "../context/CartContext";
export default function Cart() {
    const { state, removeFromCart, updateQuantity } = useCart();
    if (state.cart.length === 0) {
        return (_jsx("p", { style: { textAlign: "center", padding: "2rem" }, children: "El carrito est\u00E1 vac\u00EDo" }));
    }
    return (_jsxs("div", { style: { padding: "2rem", maxWidth: "800px", margin: "0 auto" }, children: [_jsx("h2", { children: "Tu Carrito" }), state.cart.map((item) => (_jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    padding: "1rem 0",
                }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [_jsx("img", { src: item.image, alt: item.title, style: { width: "80px", height: "80px", objectFit: "contain" } }), _jsxs("div", { children: [_jsx("h4", { children: item.title }), _jsxs("p", { children: [item.price.toFixed(2), " \u20AC \u00D7 ", item.quantity] })] })] }), _jsxs("div", { children: [_jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), disabled: item.quantity <= 1, children: "-" }), _jsx("span", { style: { margin: "0 1rem" }, children: item.quantity }), _jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), children: "+" }), _jsx("button", { onClick: () => removeFromCart(item.id), style: {
                                    marginLeft: "1rem",
                                    color: "red",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }, children: "Eliminar" })] })] }, item.id))), _jsx("div", { style: { marginTop: "2rem", textAlign: "right" }, children: _jsxs("h3", { children: ["Total: ", state.totalPrice.toFixed(2), " \u20AC"] }) })] }));
}
