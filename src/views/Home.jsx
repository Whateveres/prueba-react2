import React, { useContext } from "react";
import { PizzasContext } from "../context/MyContext";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Utilizando 'useContext' para acceder al contexto de PizzasContext
  const { pizzas, addToCarrito } = useContext(PizzasContext);
  // Usando 'useNavigate' para la navegación programática
  const navigate = useNavigate();

  // Manejando la acción de añadir al carrito
  const handleAddToCart = (pizzaId) => {
    addToCarrito(pizzaId);
  };

  // Navegando hacia los detalles de la pizza
  const viewPizzaDetails = (pizzaId) => {
    navigate(`/pizza/${pizzaId}`);
  };

  return (
    <Container>
      <h1 className="text-center my-4">¡Pizzería Mamma Mia!</h1>
      <h5 className="text-center my-4">¡Tenemos las mejores pizzas que podrás encontrar!</h5>
      <hr />
      {/* Listando las pizzas disponibles */}
      <Row xs={1} md={3} className="g-4">
        {pizzas.map((pizza) => (
          <Col key={pizza.id} md={4} lg={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={pizza.img} />
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>
                  <hr />
                  <h6>Ingredientes:</h6>
                  <ul>
                    {pizza.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <hr />
                </Card.Text>
                <h4 className="price text-muted">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                    minimumFractionDigits: 0,
                  }).format(pizza.price)}
                </h4>
                <div className="d-flex justify-content-evenly button-group">
                  <Button variant="info" size="sm" onClick={() => viewPizzaDetails(pizza.id)}>
                    Ver Más 👀
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleAddToCart(pizza.id)}>
                    Añadir 🛒
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
