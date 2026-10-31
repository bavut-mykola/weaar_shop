import "../styles/accountSettings.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import editIcon from "../assets/icons/edit.svg";

import { API_URL } from "../api";

function AccountSettings({
  userEmail,
  setIsAuthenticated,
  setUserEmail,
}) {
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const navigate = useNavigate();

  const [isInvalidPhone, setIsInvalidPhone] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const phoneInputRef = useRef(null);
  const nameInputRef = useRef();
  const imageInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isPhoneClicked) phoneInputRef.current?.focus();
  }, [isPhoneClicked]);

  useEffect(() => {
    if (isNameClicked) nameInputRef.current?.focus();
  }, [isNameClicked]);

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setImageFile(file);
  }

  async function loadProfileData() {
    try {
      const res = await fetch(`${API_URL}/api/accounts/profile`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to load profile: ${res.status}`);
      }

      const result = await res.json();

      setName(result.name ?? "");
      setPhone(
        (result.phone ?? "").replace(/\D/g, "").replace(/^380/, "").slice(0, 9),
      );
      setImage(result.profile_image ? `${API_URL}${result.profile_image}` : "");
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  useEffect(() => {
    loadProfileData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  async function changeProfileData() {
    const profileData = new FormData();

    profileData.append("name", name || "");
    profileData.append("phone", phone ? `+380${phone}` : "");

    if (imageFile) {
      profileData.append("image", imageFile);
    }

    if (phone && phone.length !== 9) {
      setIsInvalidPhone(true);
      return;
    } else {
      setIsInvalidPhone(false);
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/api/accounts/profile`, {
        method: "PATCH",
        body: profileData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to save profile: ${res.status}`);
      }

      const result = await res.json();

      setName(result.name ?? "");
      setPhone(
        (result.phone ?? "").replace(/\D/g, "").replace(/^380/, "").slice(0, 9),
      );

      setImage(result.profile_image ? `${API_URL}${result.profile_image}` : "");

      setImageFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAccount() {
    try {
      const res = await fetch(`${API_URL}/api/accounts/me`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setUserEmail("");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        navigate("/");
      } else {
        const result = await res.json().catch(() => null);
        throw new Error(result?.message || "Failed to delete account");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="account-settings-page" aria-label="Account settings">
      <div className="account-settings-card">
        <div className="account-settings-header">
          <div className="account-settings-avatar">
            {image && (
              <img
                src={image}
                alt="Profile"
                className="account-settings-avatar-image"
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              hidden
              onChange={handleImageChange}
            />

            <span
              className="account-settings-pencil"
              onClick={() => imageInputRef.current?.click()}
            >
              <img src={editIcon} alt="" />
            </span>
          </div>

          <div className="account-settings-identity">
            <p>{name.length >= 1 ? name : <span>Your name</span>}</p>
            <p>{userEmail}</p>
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
          <div className="account-settings-field">
            <span>Name</span>

            {isNameClicked ? (
              <div className="account-settings-input-wrap">
                <input
                  type="text"
                  className="name-edit-input"
                  ref={nameInputRef}
                  value={name}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="account-settings-input-clear"
                  aria-label="Cancel name editing"
                  onClick={() => setIsNameClicked(false)}
                >
                  ×
                </button>
              </div>
            ) : (
              <span
                className="account-settings-value"
                data-tooltip="Edit name"
                onClick={() => {
                  setIsNameClicked(true);
                  setIsPhoneClicked(false);
                }}
              >
                {name.length >= 1 ? name : <span>your name</span>}
              </span>
            )}
          </div>

          <div className="account-settings-field">
            <span>Mobile number</span>

            {isPhoneClicked ? (
              <div className="account-settings-input-wrap">
                <span className="phone-prefix">+380</span>
                <input
                  type="text"
                  ref={phoneInputRef}
                  className="phone-edit-input"
                  style={isInvalidPhone ? { border: "1px solid #fe0505" } : {}}
                  value={phone}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const digitsOnly = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 9);
                    setPhone(digitsOnly);
                  }}
                />
                <button
                  type="button"
                  className="account-settings-input-clear"
                  aria-label="Cancel mobile number editing"
                  onClick={() => setIsPhoneClicked(false)}
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                <span
                  className="account-settings-value"
                  data-tooltip="Edit mobile number"
                  onClick={() => {
                    setIsPhoneClicked(true);
                    setIsNameClicked(false);
                  }}
                >
                  {phone.length >= 1 ? phone : <span>Add number</span>}
                </span>
              </div>
            )}
          </div>

          <div className="account-settings-field account-settings-danger">
            <span>Delete account</span>
            <button
              type="button"
              className="account-settings-delete"
              onClick={() => setIsDeleteConfirmationOpen(true)}
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>

        {isDeleteConfirmationOpen && (
          <div
            className="account-settings-confirmation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-delete-title"
          >
            <p id="account-delete-title">Do you want to remove your account?</p>
            <div className="account-settings-confirmation-actions">
              <button
                type="button"
                className="account-settings-confirmation-button"
                onClick={() => setIsDeleteConfirmationOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="account-settings-confirmation-button account-settings-confirmation-button--yes"
                onClick={() => {
                  setIsDeleteConfirmationOpen(false);
                  deleteAccount();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="account-settings-save"
          onClick={changeProfileData}
          disabled={isLoading}
        >
          SAVE CHANGES
        </button>
      </div>
    </section>
  );
}

export default AccountSettings;
