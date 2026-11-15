import userIcon from "../assets/icons/user.svg";
import ordersIcon from "../assets/icons/package.svg";
import cartIcon from "../assets/icons/cart.svg";
import settingsIcon from "../assets/icons/settings.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { Link } from "react-router-dom";

import "../styles/account.scss";

import { translations } from "../locales/translations";

import { API_URL } from "../api";
import { useState } from "react";

import { getGuestId } from "../utils/guestCart";

function Account({
  setIsAuthenticated,
  userEmail,
  setUserEmail,
  refreshCart,
  language,
}) {
  const text = translations[language];

  const [logOutError, setLogOutError] = useState("");

  async function makeLogOut() {
    try {
      const response = await fetch(`${API_URL}/api/accounts/logout`, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setLogOutError(result.message);
        return;
      }

      localStorage.removeItem("guestId");
      getGuestId();

      refreshCart();

      setIsAuthenticated(false);
      localStorage.removeItem("userEmail");
      setUserEmail("");
    } catch (error) {
      console.log(error);
      setLogOutError(result.message);
    }
  }

  return (
    <section className="account-page">
      <div className="account-card">
        <div className="account-profile">
          <img src={userIcon} alt="" className="account-profile-icon" />
          <div>
            <p className="account-eyebrow">{text.account.signedInAs}</p>
            <p className="account-email">{userEmail}</p>
          </div>
        </div>

        <div className="account-menu">
          <div className="account-menu-item">
            <img src={ordersIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>{text.account.orders}</p>
              <span>{text.account.ordersDescription}</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </div>

          <Link to={"/cart"} className="account-menu-item">
            <img src={cartIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>{text.account.cart}</p>
              <span>{text.account.cartDescription}</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </Link>

          <Link to={"/account-settings"} className="account-menu-item">
            <img src={settingsIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>{text.account.settings}</p>
              <span>{text.account.settingsDescription}</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </Link>
        </div>

        <Link to={"/"} className="account-logout" onClick={makeLogOut}>
          <img src={logoutIcon} alt="" className="account-logout-icon" />
          <span>{text.account.logOut}</span>
        </Link>
      </div>

      <Link to="/" className="account-back-home">
        {text.common.backHome}
      </Link>
    </section>
  );
}

export default Account;
