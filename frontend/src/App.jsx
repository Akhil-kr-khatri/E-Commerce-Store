import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    if (product.stock <= 0) return;

    setCart(previous => {

      const existing = previous.find(
        item => item.id === product.id
      );

      if (existing) {

        if (existing.quantity >= product.stock) {
          return previous;
        }

        return previous.map(item =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  const updateQuantity = (id, change) => {

    setCart(previous =>
      previous
        .map(item =>
          item.id === id
            ? {
              ...item,
              quantity: Math.min(
                item.quantity + change,
                item.stock
              )
            }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {

    setCart(previous =>
      previous.filter(item => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (

    <BrowserRouter>

      <Navbar cartCount={cartCount} />

      <Routes>

        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;