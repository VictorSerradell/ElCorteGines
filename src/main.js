import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← nuevo
import App from "./App";
import { FilterProvider } from "./context/FilterContext";
import "./styles/global.css";
console.log("React version in main:", React.version);
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(FilterProvider, { children: _jsx(App, {}) }) }) }));
