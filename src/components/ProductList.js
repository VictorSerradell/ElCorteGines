import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
export default function ProductList({ searchQuery = "" }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products?limit=12&search=${searchQuery}`);
                if (!res.ok)
                    throw new Error("Error al cargar productos");
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
    }, []);
    if (error) {
        return (_jsxs("p", { className: "py-12 text-xl font-medium text-center text-red-600", children: ["Error: ", error] }));
    }
    return (_jsxs("section", { className: "px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8", children: [_jsx("h2", { className: "mb-8 text-3xl font-bold text-center text-white-600", children: "Productos Destacados" }), loading ? (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: [...Array(8)].map((_, i) => (_jsx(SkeletonCard, {}, i))) })) : (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in", children: products.map((product, index) => (_jsx(ProductCard, { product: product, index: index }, product.id))) }))] }));
}
