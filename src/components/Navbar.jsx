import { useState, useEffect } from "react";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import phoneIcon from "../assets/icons/phone.svg";
import userIcon from "../assets/icons/user.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss";

function Navbar({ cartCount }) {
  const [isBurgerClicked, setISBurgerClicked] = useState(false);

  const [searchterm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const locPath = location.pathname;

  function handleKeyDown(e) {
    if (searchterm !== "" && e.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchterm)}`);
      setISBurgerClicked(false);
    }
  }

  useEffect(() => {
    if (locPath !== "/search") {
      setSearchTerm("");
    }
  }, [locPath]);

  return (
    <header className="head">
      <div className="logo-box">
        <button
          className={`burger-btn ${isBurgerClicked ? "active" : ""}`}
          type="button"
          aria-label={
            isBurgerClicked ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isBurgerClicked}
          onClick={() => setISBurgerClicked(!isBurgerClicked)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link className="logo-link" to="/" aria-label="WEA.R home">
          <h2 className="logo">WEA.R</h2>
        </Link>
      </div>

      <nav className={`navigation ${isBurgerClicked ? "opened" : ""}`}>
        <ul className="nav-links">
          <Link
            to="/catalog"
            className="nav-link"
            onClick={() => setISBurgerClicked(false)}
          >
            Catalog
          </Link>
          <a href="" className="nav-link">
            SpotLight
          </a>
        </ul>

        <div className="search-box">
          <div className="search-title">
            <h3>LOOKING FOR SOMETHING</h3>
          </div>
          <div className="search">
            <Link
              to={
                searchterm.trim()
                  ? `/search?query=${encodeURIComponent(searchterm)}`
                  : "#"
              }
            >
              <img src={searchIcon} alt="search" className="search-icon" />
            </Link>
            <input
              type="text"
              className="search-input"
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
          aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
        >
          <img src={cartIcon} alt="Cart" className="head-btn" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <Link to={"/auth"}>
          <img src={userIcon} alt="Account" className="head-btn" />
        </Link>
        <img src={phoneIcon} alt="Contact" className="head-btn" />
      </div>
    </header>
  );
}

export default Navbar;
