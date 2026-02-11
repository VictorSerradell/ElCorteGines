import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
export default function Category() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!category)
            return;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const decodedCategory = decodeURIComponent(category);
                const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(decodedCategory)}`);
                if (!res.ok)
                    throw new Error("No se pudieron cargar los productos de esta categoría");
                const data = await res.json();
                setProducts(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);
    const categoryName = decodeURIComponent(category || "");
    const displayName = categoryName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    if (loading) {
        return (_jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: _jsxs("div", { className: "text-xl text-gray-600 bg-background animate-pulse", children: ["Cargando productos de ", displayName, "..."] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4", children: [_jsx("h2", { className: "mb-4 text-3xl font-bold text-red-600", children: "Error" }), _jsx("p", { className: "mb-8 text-lg text-gray-700", children: error }), _jsx(Link, { to: "/categories", className: "px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700", children: "Ver todas las categor\u00EDas" })] }));
    }
    return (_jsxs("div", { className: "px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 md:text-4xl", children: displayName }), _jsx(Link, { to: "/categories", className: "flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800", children: "\u2190 Volver a categor\u00EDas" })] }), products.length === 0 ? (_jsx("p", { className: "py-16 text-xl text-center text-gray-600", children: "No hay productos disponibles en esta categor\u00EDa actualmente." })) : (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: products.map((product) => (_jsx(ProductCard, { product: product, index: 0 }, product.id))) }))] }));
}
