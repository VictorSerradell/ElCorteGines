export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-bold text-gray-300">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">
        Página no encontrada
      </p>
      <a
        href="/"
        className="mt-8 inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}
