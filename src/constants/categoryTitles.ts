export const categoryTitles: Record<string, string> = {
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer",
  "jewelery": "Joyería",
  "electronics": "Electrónica",
  // Puedes añadir más si la API trae otras categorías
};

export const getCategoryTitle = (category: string): string => {
  const normalized = category.toLowerCase().trim();
  return categoryTitles[normalized] || 
    normalized
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};