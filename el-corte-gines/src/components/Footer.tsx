export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} El Corte Ginés - Proyecto de portafolio
          (no oficial)
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          Hecho con React + Vite + Tailwind CSS + Fake Store API
        </p>
      </div>
    </footer>
  );
}
