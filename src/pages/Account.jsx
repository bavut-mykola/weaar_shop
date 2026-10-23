import userIcon from "../assets/icons/user.svg";
import ordersIcon from "../assets/icons/package.svg";
import cartIcon from "../assets/icons/cart.svg";
import settingsIcon from "../assets/icons/settings.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { Link } from "react-router-dom";

import "../styles/account.scss";

import { API_URL } from "../api";
import { useState } from "react";

function Account({ setIsAuthenticated, userEmail, setUserEmail }) {
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
            <p className="account-eyebrow">SIGNED IN AS</p>
            <p className="account-email">{userEmail}</p>
          </div>
        </div>

        <div className="account-menu">
          <div className="account-menu-item">
            <img src={ordersIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>My orders</p>
              <span>View orders history and status</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </div>

          <Link to={"/cart"} className="account-menu-item">
            <img src={cartIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>My cart</p>
              <span>Return to your shopping cart</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </Link>

          <Link to={"/account-settings"} className="account-menu-item">
            <img src={settingsIcon} alt="" className="account-menu-icon" />
            <div className="account-menu-copy">
              <p>Account settings</p>
              <span>Change account details</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </Link>
        </div>

        <Link to={"/"} className="account-logout" onClick={makeLogOut}>
          <img src={logoutIcon} alt="" className="account-logout-icon" />
          <span>Log out</span>
        </Link>
      </div>

      <Link to="/" className="account-back-home">
        Back to home
      </Link>
    </section>
  );
}

export default Account;
