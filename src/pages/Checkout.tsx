import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFakePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("¡Pago procesado con éxito! (simulación)");
      clearCart(); // Vacía el carrito tras "pago"
      navigate("/"); // Vuelve a la home
    }, 2000); // Simula 2 segundos de procesamiento
  };

  // Si no hay productos → redirige o muestra mensaje
  if (state.cart.length === 0) {
    return (
      <>
        {/* SEO */}
        <title>Carrito Vacío - El Corte Ginés</title>
        <meta
          name="description"
          content="Tu carrito está vacío. ¡Explora nuestras categorías y añade productos!"
        />
        <meta property="og:title" content="Carrito Vacío - El Corte Ginés" />
        <meta
          property="og:description"
          content="No hay productos en tu carrito. ¡Vuelve a la tienda!"
        />
        <meta property="og:image" content="/og-empty-cart.jpg" />
        <meta
          property="og:url"
          content="https://el-corte-gines.vercel.app/checkout"
        />
        <link
          rel="canonical"
          href="https://el-corte-gines.vercel.app/checkout"
        />

        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-background text-foreground">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Carrito vacío
          </h1>
          <p className="mb-8 text-lg text-center text-gray-600 dark:text-gray-400">
            No hay productos para pagar. ¡Añade algo y vuelve!
          </p>
          <Link
            to="/"
            className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Volver a la tienda
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* SEO */}
      <title>Finalizar Compra - El Corte Ginés</title>
      <meta
        name="description"
        content="Revisa tu pedido y finaliza la compra de forma segura en El Corte Ginés. Total: {state.totalPrice.toFixed(2)} €"
      />
      <meta property="og:title" content="Finalizar Compra - El Corte Ginés" />
      <meta
        property="og:description"
        content="Resumen de tu carrito y pago seguro."
      />
      <meta property="og:image" content="/og-checkout.jpg" />
      <meta
        property="og:url"
        content="https://el-corte-gines.vercel.app/checkout"
      />
      <link rel="canonical" href="https://el-corte-gines.vercel.app/checkout" />

      <div className="min-h-screen px-4 py-12 bg-background text-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-10 text-3xl font-bold text-center md:text-4xl">
            Finalizar Compra
          </h1>

          {/* Resumen del carrito */}
          <div className="p-6 mb-8 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Resumen de tu pedido
            </h2>

            <div className="space-y-6">
              {state.cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-4 border-b dark:border-gray-700 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-16 h-16 border border-gray-200 rounded dark:border-gray-700"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.quantity} × {item.price.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right">
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Total: {state.totalPrice.toFixed(2)} €
              </p>
            </div>
          </div>

          {/* Botón de pago */}
          <div className="text-center">
            <button
              onClick={handleFakePayment}
              disabled={isProcessing}
              className={`
                px-10 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300
                ${
                  isProcessing
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg"
                }
              `}
            >
              {isProcessing ? "Procesando pago..." : "Pagar ahora"}
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
            Esta es una simulación de pago. No se procesa ningún cargo real.
          </p>
        </div>
      </div>
    </>
  );
}
