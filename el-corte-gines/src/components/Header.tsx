import { Link } from "react-router-dom"; // lo agregaremos después si usamos router

export default function Header() {
  return (
    <header>
      <h1>El Corte Ginés</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Hombre</a>
          </li>
          <li>
            <a href="#">Mujer</a>
          </li>
          <li>
            <a href="#">Electrónica</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
