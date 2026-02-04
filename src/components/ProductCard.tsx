import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../types";

interface Props {
  product: Product;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: {
    y: -8,
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const imageVariants = {
  hover: { scale: 1.04, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="
        group relative
        bg-white dark:bg-gray-900
        rounded-xl overflow-hidden
        border border-gray-200/60 dark:border-gray-800/60
        shadow-sm hover:shadow-xl
        transition-shadow duration-300
        flex flex-col
        min-h-[520px] sm:min-h-[580px] lg:min-h-[620px]
      "
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Imagen – grande, limpia, centrada */}
      <Link
        to={`/product/${product.id}`}
        className="
          block relative
          aspect-[3/4] sm:aspect-square
          bg-white dark:bg-gray-950
          flex items-center justify-center
          overflow-hidden
        "
      >
        <motion.img
          src={product.image}
          alt={product.title}
          className="max-h-[90%] max-w-[90%] object-contain p-4 sm:p-6 lg:p-8"
          loading="lazy"
          variants={imageVariants}
          whileHover="hover"
        />
      </Link>

      {/* Contenido – espacioso, tipografía elegante */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7 gap-4">
        {/* Categoría – pequeña y discreta */}
        <span
          className="
          text-xs sm:text-sm font-medium
          text-gray-500 dark:text-gray-400
          uppercase tracking-wide
        "
        >
          {product.category.toUpperCase()}
        </span>

        {/* Título – legible, no demasiado grande */}
        <Link
          to={`/product/${product.id}`}
          className="
            text-lg sm:text-xl lg:text-2xl
            font-medium leading-tight
            text-gray-900 dark:text-gray-100
            line-clamp-3 min-h-[4.5rem] lg:min-h-[5rem]
            group-hover:text-blue-700 dark:group-hover:text-blue-300
            transition-colors duration-300
          "
        >
          {product.title}
        </Link>

        {/* Rating – compacto */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500 dark:text-yellow-400 text-xl leading-none">
            ★
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {product.rating.rate.toFixed(1)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            ({product.rating.count})
          </span>
        </div>

        {/* Espacio que empuja precio + botón abajo */}
        <div className="flex-1" />

        {/* Precio + Botón – alineados abajo, precio grande */}
        <div className="space-y-4 mt-auto">
          <p
            className="
            text-3xl sm:text-3.5xl lg:text-4xl
            font-bold text-gray-900 dark:text-white
          "
          >
            {product.price.toFixed(2)} €
          </p>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Añadir ${product.title} al carrito`}
            className="
              w-full
              bg-blue-700 hover:bg-blue-800
              dark:bg-blue-600 dark:hover:bg-blue-700
              text-white font-medium
              py-4 px-6 rounded-lg
              transition-all duration-300
              shadow-md hover:shadow-lg
              active:scale-98
            "
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Añadir al carrito
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
