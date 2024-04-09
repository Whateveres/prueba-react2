//Imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Carrito from "./views/Carrito";
import Pizza from "./views/Pizza";
import Home from "./views/Home";
import './App.css';

//Import Context
import { PizzasProvider } from "./context/MyContext";

const App = () => {
  return (
    <PizzasProvider> {/* Envolviendo la App con el componente Provider para generar estado global compartido */}
        <Navbar />
        <Routes> {/* Definiendo rutas para la navegación */}
          <Route path="/" element={<Home />} /> {/* Ruta para la página "Home" */}
          <Route path="/pizza/:id" element={<Pizza />} /> {/* Ruta para la página de detalles de "Pizza" */}
          <Route path="/carrito" element={<Carrito />} /> {/* Ruta para la página "Carrito" */}
        </Routes>
    </PizzasProvider>
  );
};

export default App;
