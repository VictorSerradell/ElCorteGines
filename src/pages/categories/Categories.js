import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const categories = [
    {
        name: "men's clothing",
        display: "Ropa de Hombre",
        icon: "👕",
        base: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40",
        hover: "group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/60 dark:group-hover:to-blue-800/60",
    },
    {
        name: "women's clothing",
        display: "Ropa de Mujer",
        icon: "👗",
        base: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/40",
        hover: "group-hover:from-pink-100 group-hover:to-pink-200 dark:group-hover:from-pink-900/60 dark:group-hover:to-pink-800/60",
    },
    {
        name: "jewelery",
        display: "Joyería",
        icon: "💍",
        base: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40",
        hover: "group-hover:from-purple-100 group-hover:to-purple-200 dark:group-hover:from-purple-900/60 dark:group-hover:to-purple-800/60",
    },
    {
        name: "electronics",
        display: "Electrónica",
        icon: "⚡",
        base: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40",
        hover: "group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/60 dark:group-hover:to-green-800/60",
    },
];
// Tipado explícito para variants con stagger (custom)
const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.94 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.7,
            ease: "easeOut",
        },
    }),
    hover: {
        y: -12,
        scale: 1.04,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        transition: { duration: 0.4, ease: "easeOut" },
    },
}; // 'as const' ayuda a TS a no quejarse del tipo de función
export default function Categories() {
    return (_jsx("div", { className: "min-h-screen bg-background text-foreground", children: _jsxs("div", { className: "px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-16 lg:py-20", children: [_jsx(motion.h1, { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 }, className: "mb-12 text-4xl font-extrabold tracking-tight text-center text-transparent md:mb-16 md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm", children: "Categor\u00EDas" }), _jsx(motion.div, { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", initial: "hidden", animate: "visible", children: categories.map((cat, index) => (_jsx(motion.div, { custom: index, variants: cardVariants, whileHover: "hover", className: `
                group relative overflow-hidden
                rounded-2xl border border-gray-200/60 dark:border-gray-700/50
                ${cat.base}
                shadow-md hover:shadow-2xl
                ${cat.hover}
                transition-all duration-400
                will-change-transform
              `, children: _jsxs(Link, { to: `/category/${encodeURIComponent(cat.name)}`, className: "block h-full p-6 text-center md:p-8 lg:p-10", children: [_jsx("div", { className: "mb-6 transition-opacity text-7xl md:text-8xl lg:text-9xl opacity-90 group-hover:opacity-100", children: cat.icon }), _jsx("h2", { className: "mb-3 text-2xl font-bold text-gray-900 transition-colors duration-300 md:mb-4 md:text-3xl lg:text-4xl dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300", children: cat.display }), _jsxs("p", { className: "text-base text-gray-700 transition-colors duration-300 md:text-lg dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100", children: ["Explora nuestra selecci\u00F3n de ", cat.display.toLowerCase()] })] }) }, cat.name))) })] }) }));
}
