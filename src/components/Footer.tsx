import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-12 mt-auto text-gray-300 bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              El Corte Ginés
            </h3>
            <p className="text-sm">
              Tu tienda online de confianza. Moda, tecnología y mucho más con
              las mejores ofertas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="transition-colors hover:text-white"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition-colors hover:text-white">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Atención al cliente */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Atención al cliente
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contacto"
                  className="transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/envios"
                  className="transition-colors hover:text-white"
                >
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="/preguntas"
                  className="transition-colors hover:text-white"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacidad"
                  className="transition-colors hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos"
                  className="transition-colors hover:text-white"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="transition-colors hover:text-white"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 text-sm text-center border-t border-gray-700">
          © {new Date().getFullYear()} El Corte Ginés. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
