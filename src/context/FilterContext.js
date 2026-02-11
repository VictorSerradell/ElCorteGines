import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const FilterContext = createContext(undefined);
export function FilterProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(null);
    return (_jsx(FilterContext.Provider, { value: { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter }, children: children }));
}
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter debe usarse dentro de FilterProvider");
    }
    return context;
};
