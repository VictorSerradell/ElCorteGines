import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FilterContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  return (
    <FilterContext.Provider
      value={{ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter debe usarse dentro de FilterProvider");
  }
  return context;
};
