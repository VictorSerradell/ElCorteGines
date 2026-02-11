import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard"; // ← ruta correcta
import SkeletonCard from "../../components/SkeletonCard";
// Mapeo de nombres bonitos
const categoryDisplay = {
    electronics: "Electrónica",
    jewelery: "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
};
export default function CategoryProducts() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Calculamos displayName ANTES de cualquier return
    const decodedCategory = decodeURIComponent(categoryName || "");
    const displayName = categoryDisplay[decodedCategory] ||
        decodedCategory ||
        "Categoría";
    useEffect(() => {
        if (!categoryName)
            return;
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const decoded = decodeURIComponent(categoryName);
                const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(decoded)}`);
                if (!res.ok)
                    throw new Error("Categoría no encontrada o error en la API");
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
        fetchCategoryProducts();
    }, [categoryName]);
    if (loading) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4", children: [_jsxs("div", { className: "text-xl font-medium text-gray-700 dark:text-gray-300 animate-pulse", children: ["Cargando ", displayName, "..."] }), _jsx("div", { className: "grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: [...Array(8)].map((_, i) => (_jsx(SkeletonCard, {}, i))) })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4", children: [_jsx("h1", { className: "mb-4 text-4xl font-bold text-red-600 dark:text-red-400", children: "Error" }), _jsx("p", { className: "mb-8 text-xl text-gray-700 dark:text-gray-300", children: error }), _jsx(Link, { to: "/categories", className: "px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600", children: "Ver todas las categor\u00EDas" })] }));
    }
    return (_jsxs("div", { className: "px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-background text-foreground", children: [_jsxs("div", { className: "flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white md:text-4xl", children: displayName }), _jsx(Link, { to: "/categories", className: "flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300", children: "\u2190 Volver a categor\u00EDas" })] }), products.length === 0 ? (_jsx("p", { className: "py-16 text-xl text-center text-gray-600 dark:text-gray-400", children: "No hay productos en esta categor\u00EDa por el momento." })) : (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: products.map((product, index) => (_jsx(ProductCard, { product: product, index: index }, product.id))) }))] }));
}
