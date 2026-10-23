import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeOffIcon from "../assets/icons/eyeOff.svg";
import eyeIcon from "../assets/icons/eye.svg";
import "../styles/auth.scss";

import { API_URL } from "../api";

function Auth({ setIsAuthenticated, setUserEmail }) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);

  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [isEmptyField, setIsEmptyField] = useState({
    emptyEmail: false,
    emptyPassword: false,
  });

  const [isWrongField, setIsWrongField] = useState({
    wrongEmail: false,
    wrongPassword: false,
  });

  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isTouchedPassword, setIsTouchedPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setIsEmptyField({
        emptyEmail: !email.trim(),
        emptyPassword: !password.trim(),
      });
      return;
    }

    const emailIsWrong = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const passwordIsWrong = password.length < 8 || password.length > 128;

    setIsWrongField({
      wrongEmail: emailIsWrong,
      wrongPassword: passwordIsWrong,
    });

    if (emailIsWrong || passwordIsWrong) {
      return;
    }

    const registrationData = {
      email: email,
      password: password,
    };

    let response;

    try {
      setIsSubmiting(true);

      if (isCreatingAccount) {
        response = await fetch(`${API_URL}/api/accounts/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
          credentials: "include",
        });
      } else {
        response = await fetch(`${API_URL}/api/accounts/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
          credentials: "include",
        });
      }

      const result = await response.json();

      console.log("fuckin error:", result);

      if (response.status === 409) {
        setServerError(result.message);
        console.log("Setting serverError:", result.message);
        return;
      }

      if (!response.ok) {
        throw new Error(result.message);
      }

      setIsAuthenticated(true);
      setUserEmail(email);
      localStorage.setItem("userEmail", email);

      navigation("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setServerError(error.message);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <>
      <div className="main-form-box">
        <form className="form-content-box" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-logo">
            <h2>{isCreatingAccount ? "Create an account" : "Log in"}</h2>
          </div>
          {[
            {
              id: 1,
              type: "email",
              text: "Email",
            },
            {
              id: 2,
              type: "password",
              text: "Password",
            },
          ].map((a) => (
            <div className="form-inputs-box" key={a.id}>
              <div className="input-box">
                <label htmlFor={`form-${a.type}`}>{a.text}</label>
                <input
                  id={`form-${a.type}`}
                  type={
                    a.type === "password" && isPasswordShowing ? "text" : a.type
                  }
                  className="form-input"
                  value={a.type === "email" ? email : password}
                  ref={a.type === "email" ? emailRef : passwordRef}
                  onChange={(e) => {
                    const value = e.target.value;
                    a.type === "email" ? setEmail(value) : setPassword(value);

                    setServerError("");
                  }}
                  onBlur={() => {
                    if (a.type === "email") {
                      setIsTouchedEmail(true);

                      setIsWrongField((prev) => ({
                        ...prev,
                        wrongEmail: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          email.trim(),
                        ),
                      }));
                    } else {
                      setIsTouchedPassword(true);

                      setIsWrongField((prev) => ({
                        ...prev,
                        wrongPassword:
                          password.length < 8 || password.length > 128,
                      }));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (a.type === "email") {
                      if (e.key === "ArrowDown") {
                        passwordRef.current.focus();
                        passwordRef.current.setSelectionRange(
                          passwordRef.current.value.length,
                          passwordRef.current.value.length,
                        );
                      }
                    } else {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        requestAnimationFrame(() => {
                          emailRef.current.focus();
                          emailRef.current.setSelectionRange(
                            emailRef.current.value.length,
                            emailRef.current.value.length,
                          );
                        });
                      }
                    }
                  }}
                />
                {a.type === "password" && (
                  <button
                    type="button"
                    className="eye-btn-box"
                    aria-label={
                      isPasswordShowing ? "Hide password" : "Show password"
                    }
                    onClick={() => setIsPasswordShowing(!isPasswordShowing)}
                  >
                    <img
                      src={isPasswordShowing ? eyeIcon : eyeOffIcon}
                      alt=""
                      className="eye-btn-img"
                    />
                  </button>
                )}
              </div>
              {a.type === "email" ? (
                <div className="errors-form-box">
                  <p className="form-error">
                    {isEmptyField.emptyEmail
                      ? "Please do not leave email empty."
                      : isWrongField.wrongEmail
                        ? "Please enter a valid email address."
                        : ""}
                  </p>
                </div>
              ) : (
                <div className="errors-form-box">
                  <p className="form-error">
                    {isEmptyField.emptyPassword
                      ? "Please do not leave password empty."
                      : isWrongField.wrongPassword
                        ? "Password must contains from 8 to 128 symbols"
                        : ""}
                  </p>
                </div>
              )}
            </div>
          ))}

          {serverError && <p className="form-error">{serverError}</p>}

          <div className="form-buttons-box">
            <button
              className="account-btn"
              disabled={isSubmiting}
              type="submit"
            >
              {isSubmiting
                ? "Sending"
                : isCreatingAccount
                  ? "Create an account"
                  : "Log in"}
            </button>
            <button className="google-btn">
              <button className="auth__google-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.617z"
                  />
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  />
                  <path
                    fill="#EA4335"
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  />
                </svg>
              </button>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="form-bottom-box">
            <p className="form-bottom-text">
              Already have an accout?{" "}
              <span
                onClick={() => {
                  setIsCreatingAccount(!isCreatingAccount);
                }}
              >
                {isCreatingAccount ? "Log in" : "Register"}
              </span>
            </p>
          </div>
        </form>

        <Link to="/" className="back-to-home-box">
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default Auth;
