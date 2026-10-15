import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SearchResult from "./components/SearchResult";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Auth from "./components/Auth"; // Імпортуємо твій новий компонент
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { API_URL } from "./api";

function App() {
  const [cartCount, setCartCount] = useState(null);

  async function refreshCart() {
    try {
      const res = await fetch(`${API_URL}/api/cart`);
      const data = await res.json();
      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar cartCount={cartCount} />
        <main className="app-content" aria-label="Main content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/search" element={<SearchResult />} />
            <Route
              path="/catalog/product/:id"
              element={<ProductPage refreshCart={refreshCart} />}
            />
            <Route path="/cart" element={<Cart refreshCart={refreshCart} />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
