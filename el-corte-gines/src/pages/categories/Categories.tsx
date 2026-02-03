import { Link } from "react-router-dom";

const categories = [
  {
    name: "men's clothing",
    display: "Ropa de Hombre",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    name: "women's clothing",
    display: "Ropa de Mujer",
    color: "bg-pink-100 text-pink-800 border-pink-300",
  },
  {
    name: "jewelery",
    display: "Joyería",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    name: "electronics",
    display: "Electrónica",
    color: "bg-green-100 text-green-800 border-green-300",
  },
];

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Categorías
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${encodeURIComponent(cat.name)}`}
            className={`group block p-8 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 ${cat.color}`}
          >
            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-700 transition-colors">
              {cat.display}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800">
              Explora nuestra selección de {cat.display.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
