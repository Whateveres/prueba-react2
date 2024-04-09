import { Link } from "react-router-dom";
import { useContext } from "react";
import { PizzasContext } from "../context/MyContext"; 

const Navbar = () => {
  const { carrito, getCarritoTotal } = useContext(PizzasContext); 
  const total = getCarritoTotal(); 

  return (
    <nav className="navbar bg-info">
      {/* Brand */}
      <Link to="/" className="navbar-brand text-white">
        🍕 Pizzería Mamma Mia!
      </Link>

      {/* Cart */}
      <Link to="/carrito" className="navbar-cart text-white">
        <span className="cart-cart">🛒</span>
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
