import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { Link } from "react-router-dom";
export default function Header() {
    const { state } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved)
            return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    // Cerrar menú móvil al redimensionar a desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const menuItems = [
        { to: "/", label: "Inicio" },
        { to: "/men", label: "Hombre" },
        { to: "/women", label: "Mujer" },
        { to: "/electronics", label: "Electrónica" },
        { to: "/categories", label: "Categorías" },
    ];
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "sticky top-0 z-50 transition-colors border-b border-gray-200 shadow-sm bg-white/80 dark:bg-gray-950/80 backdrop-blur-md dark:border-gray-800", children: _jsx("div", { className: "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx(Link, { to: "/", className: "text-xl font-bold tracking-tight text-gray-900 transition-colors md:text-2xl dark:text-white hover:text-blue-600 dark:hover:text-blue-400", children: "El Corte Gin\u00E9s" }), _jsx("nav", { className: "items-center hidden gap-6 md:flex lg:gap-8", children: menuItems.map((item) => (_jsx(Link, { to: item.to, className: "text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400", children: item.label }, item.to))) }), _jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [_jsxs("button", { onClick: () => setIsCartOpen(true), className: "relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1.5", "aria-label": `Carrito (${state.totalItems} items)`, children: ["Carrito", state.totalItems > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[18px] h-5 flex items-center justify-center rounded-full px-1.5", children: state.totalItems }))] }), _jsx("button", { onClick: () => setDarkMode((prev) => !prev), className: "p-2 text-gray-700 transition-colors rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500", "aria-label": darkMode ? "Activar modo claro" : "Activar modo oscuro", children: darkMode ? (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) })) : (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })) }), _jsx("button", { className: "p-2 text-gray-700 transition-transform duration-200 rounded-md md:hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500", onClick: () => setIsMenuOpen(!isMenuOpen), "aria-expanded": isMenuOpen, "aria-label": isMenuOpen ? "Cerrar menú" : "Abrir menú", children: isMenuOpen ? (_jsx("svg", { className: "w-6 h-6 transition-transform duration-300 transform rotate-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })) : (_jsx("svg", { className: "w-6 h-6 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })) })] })] }) }) }), _jsx("div", { className: `
          fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white dark:bg-gray-900 
          shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `, children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800", children: [_jsx("span", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "Men\u00FA" }), _jsx("button", { onClick: () => setIsMenuOpen(false), className: "p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsx("nav", { className: "flex flex-col flex-1 gap-6 px-5 py-8 text-lg font-medium", children: menuItems.map((item, index) => (_jsx(Link, { to: item.to, className: `
                  block text-gray-800 dark:text-gray-200 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  transition-all duration-400 transform
                  ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
                `, style: { transitionDelay: `${index * 80}ms` }, onClick: () => setIsMenuOpen(false), children: item.label }, item.to))) })] }) }), isMenuOpen && (_jsx("div", { className: "fixed inset-0 z-40 transition-opacity duration-300 bg-black/50 backdrop-blur-sm md:hidden", onClick: () => setIsMenuOpen(false), "aria-hidden": "true" })), _jsx(CartModal, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false) })] }));
}
