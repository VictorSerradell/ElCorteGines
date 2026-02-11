export const categoryTitles = {
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
    "jewelery": "Joyería",
    "electronics": "Electrónica",
    // Puedes añadir más si la API trae otras categorías
};
export const getCategoryTitle = (category) => {
    const normalized = category.toLowerCase().trim();
    return categoryTitles[normalized] ||
        normalized
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
};
