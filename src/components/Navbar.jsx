import { useState, useEffect } from "react";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import phoneIcon from "../assets/icons/phone.svg";
import userIcon from "../assets/icons/user.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss";
import { translations } from "../locales/translations";

function Navbar({
  cartCount,
  isAuthenticated,
  isContactMenuOpen,
  onContactClick,
  language,
  setLanguage,
  isFilterOpen,
}) {
  const text = translations[language];

  const [isBurgerClicked, setISBurgerClicked] = useState(false);

  const [searchterm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const locPath = location.pathname;

  function handleKeyDown(e) {
    if (searchterm !== "" && e.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchterm)}`);
      setSearchTerm("");
      setISBurgerClicked(false);
    }
  }

  useEffect(() => {
    if (locPath !== "/search") {
      setSearchTerm("");
    }
  }, [locPath]);

  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 420);
  }, [window.innerWidth]);

  useEffect(() => {
    if (!isMobile) return;

    let previousScroll = window.scrollY;
    let scrollTimer;

    function doScroll() {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      const currentScroll = window.scrollY;

      const scrollValue = Math.abs(currentScroll - previousScroll);

      if (scrollValue <= 10) {
        return;
      } else {
        previousScroll = currentScroll;
        setIsScrolling(true);
      }
    }

    window.addEventListener("scroll", doScroll);

    return () => {
      window.removeEventListener("scroll", doScroll);
    };
  }, [isMobile]);

  return (
    <header className="head">
      <div className="logo-box">
        <button
          className={`burger-btn ${isBurgerClicked ? "active" : ""}`}
          type="button"
          aria-label={
            isBurgerClicked ? text.navbar.closeMenu : text.navbar.openMenu
          }
          aria-expanded={isBurgerClicked}
          onClick={() => setISBurgerClicked(!isBurgerClicked)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link className="logo-link" to="/" aria-label={text.navbar.home}>
          <img src="/the_main_logo.svg" alt="WEA.R" className="logo" />
        </Link>
      </div>

      <nav
        className={`navigation ${isBurgerClicked ? "opened" : ""} ${isScrolling ? "navigation-close" : ""} ${isFilterOpen ? "navigation-close" : ""}`}
      >
        <ul className="nav-links">
          <Link
            to="/catalog"
            className="nav-link"
            onClick={() => setISBurgerClicked(false)}
          >
            {text.navbar.catalog}
          </Link>
          <a
            href="/spotlight"
            className="nav-link"
            onClick={() => setISBurgerClicked(false)}
          >
            {text.navbar.spotlight}
          </a>
        </ul>
        <span
          className="navbar-languages navbar-languages--mobile"
          translate="no"
        >
          <button
            type="button"
            className={`navbar-language ${language === "en" ? "is-active" : ""}`}
            aria-pressed={language === "en"}
            onClick={() => {
              setLanguage("en");
            }}
          >
            EN
          </button>
          <span aria-hidden="true"> | </span>
          <button
            type="button"
            className={`navbar-language ${language === "uk" ? "is-active" : ""}`}
            aria-pressed={language === "uk"}
            onClick={() => {
              setLanguage("uk");
            }}
          >
            UK
          </button>
        </span>

        <div className={`search-box`}>
          <div className="search">
            <Link
              to={
                searchterm.trim()
                  ? `/search?query=${encodeURIComponent(searchterm)}`
                  : "#"
              }
              onClick={() => [setSearchTerm("")]}
            >
              <img
                src={searchIcon}
                alt={text.navbar.searchIcon}
                className="search-icon"
              />
            </Link>
            <input
              type="text"
              className="search-input"
              placeholder={text.navbar.searchPlaceholder}
              aria-label={text.navbar.search}
              value={searchterm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </nav>

      <div className="header-buttons-box">
        <Link
          to={"/cart"}
          className="cart-button-link"
          aria-label={
            cartCount > 0
              ? text.navbar.cartWithCount(cartCount)
              : text.navbar.cart
          }
        >
          <img src={cartIcon} alt={text.navbar.cart} className="head-btn" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <Link
          to={isAuthenticated ? "/account" : "/auth"}
          className="account-button-link"
        >
          <img src={userIcon} alt={text.navbar.account} className="head-btn" />
          {isAuthenticated && <span className="active-user-dot"></span>}
        </Link>
        <button
          className="header-icon-button"
          type="button"
          aria-label={text.navbar.openContacts}
          aria-haspopup="dialog"
          aria-expanded={isContactMenuOpen}
          onClick={() => {
            setISBurgerClicked(false);
            onContactClick();
          }}
        >
          <img src={phoneIcon} alt="" className="head-btn" />
        </button>
        <span
          className="navbar-languages navbar-languages--desktop"
          translate="no"
        >
          <button
            type="button"
            className={`navbar-language ${language === "en" ? "is-active" : ""}`}
            aria-pressed={language === "en"}
            onClick={() => {
              setLanguage("en");
            }}
          >
            EN
          </button>
          <span aria-hidden="true"> | </span>
          <button
            type="button"
            className={`navbar-language ${language === "uk" ? "is-active" : ""}`}
            aria-pressed={language === "uk"}
            onClick={() => {
              setLanguage("uk");
            }}
          >
            UK
          </button>
        </span>
      </div>
    </header>
  );
}

export default Navbar;
