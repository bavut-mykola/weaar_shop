import { translations } from "./locales/translations";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Support from "./pages/Support";
import DeliveryPayment from "./pages/DeliveryPayment";
import ReturnsExchanges from "./pages/ReturnsExchanges";
import SizeGuide from "./pages/SizeGuide";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Catalog from "./pages/Catalog";
import SearchResult from "./components/SearchResult";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import Auth from "./components/Auth";
import Account from "./pages/Account";
import AccountSettings from "./pages/AccountSettings";
import ContactMenu from "./components/ContactMenu";
import Spotlight from "./pages/Spotlight";
import AdminDashboard from "./pages/AdminDashboard";
import { contactInfo } from "./data/contactInfo";

import { Route, Routes, useLocation, useMatch, useNavigate } from "react-router-dom";
import "./App.css";

import { API_URL } from "./api";

import { getGuestId } from "./utils/guestCart";

function App() {
  const [language, setLanguage] = useState(() =>
    localStorage.getItem("language") === "uk" ? "uk" : "en",
  );
  const text = translations[language];
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const [cartCount, setCartCount] = useState(null);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [accountDeletedNotice, setAccountDeletedNotice] = useState(null);
  const [isDemoNoticeOpen, setIsDemoNoticeOpen] = useState(
    () => localStorage.getItem("demoNoticeDismissed") !== "true",
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const isAdminDashboard = useMatch("/adminDashboard");
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

  if (location.pathname === "/auth") {
    return (
      <Auth
        language={language}
        setIsAuthenticated={setIsAuthenticated}
        setUserEmail={setUserEmail}
        refreshCart={refreshCart}
      />
    );
  }

  return (
    <div className="app-shell">
      {!isAdminDashboard && (
        <Navbar
          cartCount={cartCount}
          isAuthenticated={isAuthenticated}
          isContactMenuOpen={isContactMenuOpen}
          onContactClick={handleContactOpen}
          language={language}
          setLanguage={setLanguage}
          isFilterOpen={isFilterOpen}
        />
      )}
      <ContactMenu
        isOpen={isContactMenuOpen}
        onClose={handleContactClose}
        contactInfo={contactInfo}
        language={language}
      />
      {accountDeletedNotice && (
        <div
          className={`account-deleted-notice${
            accountDeletedNotice === "closing" ? " is-closing" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          <span>{text.app.accountDeleted}</span>
          <button
            type="button"
            className="account-deleted-notice__close"
            aria-label={text.app.closeAccountDeleted}
            onClick={() => setAccountDeletedNotice("closing")}
          >
            ×
          </button>
        </div>
      )}
      {location.pathname === "/" && isDemoNoticeOpen && (
        <aside className="demo-site-notice" role="note">
          <span>{text.app.demoNotice}</span>
          <button
            type="button"
            className="demo-site-notice__close"
            aria-label={text.app.closeDemoNotice}
            onClick={closeDemoNotice}
          >
            ×
          </button>
        </aside>
      )}
      <main className="app-content" aria-label={text.app.mainContent}>
        <Routes>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/" element={<Home language={language} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/support" element={<Support language={language} />} />
          <Route
            path="/delivery-payment"
            element={<DeliveryPayment language={language} />}
          />
          <Route
            path="/returns-exchanges"
            element={<ReturnsExchanges language={language} />}
          />
          <Route
            path="/size-guide"
            element={<SizeGuide language={language} />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy language={language} />}
          />
          <Route
            path="/catalog"
            element={
              <Catalog
                key={location.search}
                language={language}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
              />
            }
          />
          <Route
            path="/search"
            element={<SearchResult language={language} />}
          />
          <Route
            path="/catalog/product/:id"
            element={
              <ProductPage refreshCart={refreshCart} language={language} />
            }
          />
          <Route
            path="/cart"
            element={<Cart refreshCart={refreshCart} language={language} />}
          />
          <Route
            path="/order-confirmation/:orderId?"
            element={<OrderConfirmation language={language} />}
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                isAuthenticated={isAuthenticated}
                userEmail={userEmail}
                refreshCart={refreshCart}
                language={language}
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
                language={language}
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
                language={language}
              />
            }
          />
          <Route
            path="/order-history"
            element={<OrderHistory language={language} />}
          />
          <Route
            path="/spotlight"
            element={<Spotlight language={language} />}
          />
        </Routes>
      </main>
      {!isAdminDashboard && <Footer language={language} />}
    </div>
  );
}

export default App;
