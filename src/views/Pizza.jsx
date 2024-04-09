// Pizza.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PizzasContext } from '../context/MyContext';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

// Definiendo función para capitalizar la primera letra de una cadena
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const Pizza = () => {
  // Accediendo al contexto de pizzas y al método para añadir al carrito
  const { pizzas, addToCarrito } = useContext(PizzasContext);
  // Obteniendo el ID de la pizza desde la URL
  const { id } = useParams();
  // Usando navigate para redirigir al usuario
  const navigate = useNavigate();
  // Buscando la pizza específica por ID
  const pizza = pizzas.find((p) => p.id.toString() === id);

  // Manejando el caso de que la pizza no exista
  if (!pizza) {
    return <div>Pizza no encontrada</div>;
  }

  // Añadiendo la pizza al carrito y navegando al carrito
  const handleAddToCartClick = () => {
    addToCarrito(pizza.id);
    navigate('/carrito');
  };

  return (
    <div className="pizza-detail-container">
      {/* Renderizando la tarjeta de detalles de la pizza */}
      <Card className="pizza-detail-card">
        <Card.Img variant="top" src={pizza.img} className="pizza-detail-image" />
        <Card.Body className="pizza-detail-body">
          <Card.Title as="h2">{capitalize(pizza.name)}</Card.Title>
          <hr />
          <Card.Text>{pizza.desc}</Card.Text>
          <ul className="pizza-ingredients-list">
            {pizza.ingredients.map((ingredient, index) => (
              <li key={index} className="pizza-ingredient-item">
                {capitalize(ingredient)}
              </li>
            ))}
          </ul>
          <div className="price-and-button-container">
            <h1 className="price-text">
              {/* Formateando el precio de la pizza */}
              Precio: {new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
              }).format(pizza.price)}
            </h1>
            <Button 
              variant="danger"
              className="add-to-cart-button" 
              onClick={handleAddToCartClick}
            >
              Añadir
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pizza;
