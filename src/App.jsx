import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SearchResult from "./components/SearchResult";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Auth from "./components/Auth";
import Account from "./pages/Account";
import AccountSettings from "./pages/AccountSettings";

import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import { API_URL } from "./api";

function App() {
  const [cartCount, setCartCount] = useState(null);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true",
  );

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") || "",
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/api/accounts/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setUserEmail("");
          localStorage.removeItem("userEmail");
          return;
        }

        const data = await response.json();

        setIsAuthenticated(true);
        setUserEmail(data.account.email);
        localStorage.setItem("userEmail", data.account.email);
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthenticated(false);
        setUserEmail("");
        localStorage.removeItem("userEmail");
      }
    }

    checkSession();
  }, [setIsAuthenticated, setUserEmail]);

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} />
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
          <Route
            path="/auth"
            element={
              <Auth
                setIsAuthenticated={setIsAuthenticated}
                setUserEmail={setUserEmail}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                setIsAuthenticated={setIsAuthenticated}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            }
          />
          <Route
            path="/account-settings"
            element={<AccountSettings userEmail={userEmail} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
