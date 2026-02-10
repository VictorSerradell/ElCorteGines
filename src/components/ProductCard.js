import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.08,
            duration: 0.7,
            ease: "easeOut",
        },
    }),
    hover: {
        y: -12,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: 0.35, ease: "easeOut" },
    },
};
const imageVariants = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};
export default function ProductCard({ product, index }) {
    const { addToCart } = useCart();
    return (_jsxs(motion.div, { custom: index, variants: cardVariants, initial: "hidden", animate: "visible", whileHover: "hover", className: "\r\n        group relative\r\n        bg-white dark:bg-gray-900\r\n        rounded-2xl overflow-hidden\r\n        border border-gray-200/70 dark:border-gray-700/60\r\n        shadow-lg hover:shadow-2xl\r\n        transition-all duration-400\r\n        flex flex-col\r\n        w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px]\r\n        mx-auto\r\n        will-change-transform\r\n      ", children: [_jsx(Link, { to: `/product/${product.id}`, className: "\r\n          block relative\r\n          aspect-[4/5] sm:aspect-[3/4] lg:aspect-square\r\n          bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900\r\n          flex items-center justify-center\r\n          overflow-hidden\r\n        ", children: _jsx(motion.img, { src: product.image, alt: product.title, className: "\r\n            max-h-[92%] max-w-[92%] object-contain p-6 sm:p-8 lg:p-10\r\n            will-change-transform\r\n          ", loading: "lazy", variants: imageVariants, whileHover: "hover" }) }), _jsxs("div", { className: "flex flex-col flex-grow gap-4 p-6 sm:p-7 lg:p-8 lg:gap-5", children: [_jsx("span", { className: "inline-block bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full tracking-wide shadow-sm", children: product.category.toUpperCase() }), _jsx(Link, { to: `/product/${product.id}`, className: "\r\n            text-xl sm:text-2xl lg:text-2.5xl\r\n            font-semibold leading-tight\r\n            text-gray-900 dark:text-gray-50\r\n            line-clamp-3\r\n            group-hover:text-blue-600 dark:group-hover:text-blue-300\r\n            transition-colors duration-300\r\n          ", children: product.title }), _jsxs("div", { className: "flex items-center gap-2 text-base", children: [_jsx("span", { className: "text-2xl leading-none text-yellow-500 dark:text-yellow-400", children: "\u2605" }), _jsx("span", { className: "font-semibold text-gray-800 dark:text-gray-200", children: product.rating.rate.toFixed(1) }), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["(", product.rating.count, ")"] })] }), _jsx("div", { className: "flex-1 min-h-[1rem]" }), _jsxs("div", { className: "mt-auto space-y-6", children: [_jsxs("p", { className: "text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-gray-900 dark:text-white tracking-tight", children: [product.price.toFixed(2), " \u20AC"] }), _jsxs(motion.button, { onClick: (e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }, "aria-label": `Añadir ${product.title} al carrito`, className: "relative w-full px-6 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 rounded-xl hover:shadow-xl", whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 }, children: [_jsx("span", { className: "relative z-10", children: "A\u00F1adir al carrito" }), _jsx("span", { className: "absolute inset-0 transition-transform duration-500 scale-0 rounded-full bg-white/10 group-hover:scale-150" })] })] })] })] }));
}
