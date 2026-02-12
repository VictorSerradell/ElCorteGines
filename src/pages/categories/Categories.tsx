import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

// Banner hero (elige una imagen que te guste o usa una genérica de Unsplash)
const heroImage =
  "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";

const categories = [
  {
    name: "men's clothing",
    display: "Ropa de Hombre",
    icon: "👕",
    gradient:
      "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40",
    hoverGradient:
      "hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/60 dark:hover:to-blue-800/60",
  },
  {
    name: "women's clothing",
    display: "Ropa de Mujer",
    icon: "👗",
    gradient:
      "from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/40",
    hoverGradient:
      "hover:from-pink-100 hover:to-pink-200 dark:hover:from-pink-900/60 dark:hover:to-pink-800/60",
  },
  {
    name: "jewelery",
    display: "Joyería",
    icon: "💍",
    gradient:
      "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40",
    hoverGradient:
      "hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/60 dark:hover:to-purple-800/60",
  },
  {
    name: "electronics",
    display: "Electrónica",
    icon: "⚡",
    gradient:
      "from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40",
    hoverGradient:
      "hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/60 dark:hover:to-green-800/60",
  },
];

// Variants con stagger suave
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
  hover: {
    y: -12,
    scale: 1.04,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
} satisfies Variants;

export default function Categories() {
  return (
    <>
      {/* SEO nativo React 19 */}
      <title>Categorías - El Corte Ginés</title>
      <meta
        name="description"
        content="Explora todas nuestras categorías: Ropa de Hombre, Ropa de Mujer, Joyería y Electrónica con las mejores ofertas y precios."
      />
      <meta property="og:title" content="Categorías - El Corte Ginés" />
      <meta
        property="og:description"
        content="Descubre moda, joyas y tecnología al mejor precio."
      />
      <meta property="og:image" content={heroImage} />
      <meta
        property="og:url"
        content="https://el-corte-gines.vercel.app/categories"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        rel="canonical"
        href="https://el-corte-gines.vercel.app/categories"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Banner */}
        <section className="relative h-64 overflow-hidden md:h-80 lg:h-96">
          <img
            src={heroImage}
            alt="Categorías - Moda y Tecnología"
            className="absolute inset-0 object-cover w-full h-full brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-transparent">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-2xl"
            >
              Categorías
            </motion.h1>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-16 lg:py-20">
          {/* Enlace volver */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Volver al inicio
            </Link>
          </div>

          {/* Grid de tarjetas */}
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className={`
                  group relative overflow-hidden
                  rounded-2xl border border-gray-200/60 dark:border-gray-700/50
                  bg-gradient-to-br ${cat.gradient}
                  shadow-lg hover:shadow-2xl
                  ${cat.hoverGradient}
                  transition-all duration-400
                  will-change-transform
                `}
              >
                <Link
                  to={`/category/${encodeURIComponent(cat.name)}`}
                  className="block h-full p-8 text-center"
                >
                  {/* Icono grande */}
                  <div className="mb-8 transition-opacity duration-300 text-8xl md:text-9xl opacity-90 group-hover:opacity-100">
                    {cat.icon}
                  </div>

                  {/* Título */}
                  <h2
                    className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300  md:text-3xl lg:text-4xl dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                  >
                    {cat.display}
                  </h2>

                  {/* Descripción */}
                  <p
                    className="text-base text-gray-700 transition-colors duration-300  md:text-lg dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                  >
                    Explora nuestra selección de {cat.display.toLowerCase()}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
