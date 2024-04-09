import React, { createContext, useState, useEffect } from "react";

// Creación del contexto
export const PizzasContext = createContext(null);

// Componente que proporciona el estado global
export const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargando las pizzas desde la API local al montar el componente
  useEffect(() => {
    const cargarPizzas = async () => {
      try {
        const response = await fetch("/pizzas.json");
        if (!response.ok) {
          throw new Error("No se pudo completar la solicitud");
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Problema al obtener las pizzas:", error);
      }
    };

    cargarPizzas();
  }, []);

  // Añadiendo pizza al carrito
  const addToCarrito = (pizzaId) => {
    setCarrito((currentCarrito) => {
      const isItemInCart = currentCarrito.some((item) => item.id === pizzaId);
      if (isItemInCart) {
        return currentCarrito.map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const item = pizzas.find((item) => item.id === pizzaId);
        return [...currentCarrito, { ...item, quantity: 1 }];
      }
    });
  };

  // Removiendo pizza del carrito
  const removeFromCarrito = (pizzaId) => {
    setCarrito((currentCarrito) =>
      currentCarrito.reduce((acc, item) => {
        if (item.id === pizzaId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  // Calculando total del carrito
  const getCarritoTotal = () => {
    return carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <PizzasContext.Provider
      value={{
        pizzas,
        carrito,
        addToCarrito,
        removeFromCarrito,
        getCarritoTotal,
      }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
