import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← nuevo
import App from "./App.tsx";
import "./styles/global.css";
import React from "react";
import { FilterProvider } from "./context/FilterContext.tsx";
console.log("React version in main:", React.version);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <FilterProvider>
      <App />
    </FilterProvider>
    </BrowserRouter>
  </StrictMode>,
);
