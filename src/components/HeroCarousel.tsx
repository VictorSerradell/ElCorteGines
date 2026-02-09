import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// Datos de ejemplo para los banners (puedes cambiar imágenes y textos)
const banners = [
  {
    id: 1,
    title: "¡Rebajas de invierno hasta -70%!",
    subtitle: "Moda, hogar, tecnología y mucho más",
    buttonText: "Comprar ahora",
    buttonLink: "/categories",
    bgImage:
      "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bgColor: "from-blue-600/70 to-indigo-600/70",
  },
  {
    id: 2,
    title: "Novedades de temporada",
    subtitle: "Las últimas tendencias en moda y belleza",
    buttonText: "Descubrir novedades",
    buttonLink: "/new",
    bgImage:
      "https://images.unsplash.com/photo-1483985988355-763728e01a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bgColor: "from-pink-600/70 to-purple-600/70",
  },
  {
    id: 3,
    title: "Tecnología al mejor precio",
    subtitle: "Smartphones, portátiles y gadgets con envío gratis",
    buttonText: "Ver ofertas tech",
    buttonLink: "/category/electronics",
    bgImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    bgColor: "from-cyan-600/70 to-teal-600/70",
  },
];

export default function HeroCarousel() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              {/* Imagen de fondo */}
              <img
                src={banner.bgImage}
                alt={banner.title}
                className="absolute inset-0 object-cover w-full h-full brightness-75"
              />

              {/* Overlay con gradiente */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`}
              />

              {/* Contenido centrado */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl md:mb-6 drop-shadow-2xl">
                  {banner.title}
                </h1>
                <p className="max-w-3xl mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl md:mb-12 drop-shadow-lg">
                  {banner.subtitle}
                </p>

                <Link
                  to={banner.buttonLink}
                  className="inline-flex items-center px-10 py-5 text-xl font-bold text-gray-900 transition-all duration-300 transform bg-white rounded-full shadow-2xl  md:text-2xl hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 hover:shadow-xl hover:-translate-y-2"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
