import "../styles/accountSettings.scss";

import { Link } from "react-router-dom";

import editIcon from "../assets/icons/edit.svg";

function AccountSettings() {
  return (
    <section className="account-settings-page" aria-label="Account settings">
      <div className="account-settings-card">
        <div className="account-settings-header">
          <div className="account-settings-avatar" aria-hidden="true">
            <span className="account-settings-pencil">
              <img src={editIcon} alt="" />
            </span>
          </div>

          <div className="account-settings-identity">
            <p>Your name</p>
            <p>your@gmail.com</p>
          </div>

          <Link to="/account" className="account-settings-close-link">
            <button
              type="button"
              className="account-settings-close"
              aria-label="Close account settings"
            >
              ×
            </button>
          </Link>
        </div>

        <div className="account-settings-fields">
          <div className="account-settings-field account-settings-field--readonly">
            <span>Email</span>
            <span className="account-settings-readonly">your email</span>
          </div>

          <div className="account-settings-field">
            <span>Name</span>
            <span className="account-settings-value" data-tooltip="Edit name">
              your name
            </span>
          </div>

          <div className="account-settings-field">
            <span>Mobile number</span>
            <span
              className="account-settings-value"
              data-tooltip="Edit mobile number"
            >
              Add number
            </span>
          </div>
        </div>

        <button type="button" className="account-settings-save">
          SAVE CHANGES
        </button>
      </div>
    </section>
  );
}

export default AccountSettings;
