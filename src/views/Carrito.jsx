import { Link } from "react-router-dom";
import { useContext } from "react";
import { PizzasContext } from "../context/MyContext"; 

const Navbar = () => {
  const { carrito, getCarritoTotal } = useContext(PizzasContext); // Usando 'carrito' para contar los items

  // Contando los items en el carrito
  const itemsCount = carrito.reduce((total, item) => total + item.quantity, 0);

  // Llamando a getCarritoTotal para obtener el total del carrito
  const total = getCarritoTotal();

  return (
    <nav className="navbar bg-info">
      {/* Brand */}
      <Link to="/" className="navbar-brand text-white">
        🍕 Pizzería Mamma Mia!
      </Link>

      {/* Cart */}
      <Link to="/carrito" className="navbar-cart text-white">
        <span className="cart-icon">🛒</span>
        {/* Mostrando el número de items en el carrito si hay más de cero */}
        {itemsCount > 0 && (
          <span className="cart-amount-badge">{itemsCount}</span>
        )}
        <span className="cart-amount">
          {new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
          }).format(total)}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
