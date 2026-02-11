import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function ProductDetail() {
    const { id } = useParams(); // useParams tipado
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id)
            return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://.com/products/${id}`);
                if (!res.ok)
                    throw new Error("Producto no encontrado");
                const data = await res.json();
                setProduct(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "text-xl text-gray-600 animate-pulse", children: "Cargando producto..." }) }));
    }
    if (error || !product) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen px-4", children: [_jsx("h1", { className: "mb-4 text-4xl font-bold text-red-600", children: "Error" }), _jsx("p", { className: "mb-8 text-xl text-gray-700", children: error || "Producto no encontrado" }), _jsx(Link, { to: "/", className: "px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700", children: "Volver a la tienda" })] }));
    }
    return (_jsxs("div", { className: "max-w-6xl px-4 py-12 mx-auto", children: [_jsx(Link, { to: "/", className: "inline-flex items-center mb-8 font-medium text-blue-600 hover:text-blue-800", children: "\u2190 Volver a productos" }), _jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2", children: [_jsx("div", { className: "flex items-center justify-center p-8 bg-white border border-gray-200 shadow-lg rounded-2xl", children: _jsx("img", { src: product.image, alt: product.title, className: "max-h-[500px] w-full object-contain mix-blend-multiply" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "mb-2 text-sm tracking-wide text-gray-500 uppercase", children: product.category }), _jsx("h1", { className: "mb-4 text-3xl font-bold text-gray-900 md:text-4xl", children: product.title }), _jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsxs("span", { className: "text-4xl font-bold text-blue-700", children: [product.price.toFixed(2), " \u20AC"] }), _jsxs("div", { className: "flex items-center gap-1 text-yellow-500", children: [_jsx("span", { className: "text-2xl", children: "\u2605" }), _jsx("span", { className: "text-xl font-medium", children: product.rating.rate }), _jsxs("span", { className: "text-sm text-gray-500", children: ["(", product.rating.count, " rese\u00F1as)"] })] })] }), _jsx("p", { className: "mb-8 text-lg leading-relaxed text-gray-700", children: product.description }), _jsx("button", { onClick: () => addToCart(product), className: "w-full px-10 py-4 text-lg font-bold text-white transition-all bg-blue-600 shadow-md md:w-auto rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-lg", children: "A\u00F1adir al carrito" })] })] })] }));
}
