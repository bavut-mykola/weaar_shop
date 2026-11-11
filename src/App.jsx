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
import ContactMenu from "./components/ContactMenu";
import { contactInfo } from "./data/contactInfo";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import { API_URL } from "./api";

import { getGuestId } from "./utils/guestCart";

function App() {
  const [cartCount, setCartCount] = useState(null);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [accountDeletedNotice, setAccountDeletedNotice] = useState(null);
  const [isDemoNoticeOpen, setIsDemoNoticeOpen] = useState(
    () => localStorage.getItem("demoNoticeDismissed") !== "true",
  );

  const location = useLocation();
  const navigate = useNavigate();

  function handleContactOpen() {
    setIsContactMenuOpen(true);
  }

  function handleContactClose() {
    setIsContactMenuOpen(false);
  }

  function closeDemoNotice() {
    localStorage.setItem("demoNoticeDismissed", "true");
    setIsDemoNoticeOpen(false);
  }

  useEffect(() => {
    if (!isDemoNoticeOpen || location.pathname !== "/") return;

    const timeoutId = window.setTimeout(() => {
      localStorage.setItem("demoNoticeDismissed", "true");
      setIsDemoNoticeOpen(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [isDemoNoticeOpen, location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!location.state?.accountDeleted) return;

    setAccountDeletedNotice("open");
    navigate("/", { replace: true, state: null });
  }, [location.state, navigate]);

  useEffect(() => {
    if (!accountDeletedNotice) return;

    const timeoutId = window.setTimeout(
      () => {
        setAccountDeletedNotice((currentState) =>
          currentState === "open" ? "closing" : null,
        );
      },
      accountDeletedNotice === "open" ? 3000 : 260,
    );

    return () => window.clearTimeout(timeoutId);
  }, [accountDeletedNotice]);

  async function refreshCart() {
    try {
      const guestId = getGuestId();

      const res = await fetch(`${API_URL}/api/cart`, {
        headers: { "X-Guest-ID": guestId },
        credentials: "include",
      });
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
        await refreshCart();
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
      <Navbar
        cartCount={cartCount}
        isAuthenticated={isAuthenticated}
        isContactMenuOpen={isContactMenuOpen}
        onContactClick={handleContactOpen}
      />
      <ContactMenu
        isOpen={isContactMenuOpen}
        onClose={handleContactClose}
        contactInfo={contactInfo}
      />
      {accountDeletedNotice && (
        <div
          className={`account-deleted-notice${
            accountDeletedNotice === "closing" ? " is-closing" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          <span>Account was successfully deleted.</span>
          <button
            type="button"
            className="account-deleted-notice__close"
            aria-label="Close account deletion message"
            onClick={() => setAccountDeletedNotice("closing")}
          >
            ×
          </button>
        </div>
      )}
      {location.pathname === "/" && isDemoNoticeOpen && (
        <aside className="demo-site-notice" role="note">
          <span>Demo site — please don&apos;t use real personal or payment details.</span>
          <button
            type="button"
            className="demo-site-notice__close"
            aria-label="Close demo site notice"
            onClick={closeDemoNotice}
          >
            ×
          </button>
        </aside>
      )}
      <main className="app-content" aria-label="Main content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog key={location.search} />} />
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
                refreshCart={refreshCart}
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
                refreshCart={refreshCart}
              />
            }
          />
          <Route
            path="/account-settings"
            element={
              <AccountSettings
                userEmail={userEmail}
                setIsAuthenticated={setIsAuthenticated}
                setUserEmail={setUserEmail}
                refreshCart={refreshCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
