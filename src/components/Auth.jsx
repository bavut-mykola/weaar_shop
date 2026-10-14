import { useState } from "react";
import eyeOffIcon from "../assets/icons/eyeOff.svg";
import eyeIcon from "../assets/icons/eye.svg";
import "../styles/auth.scss";

function Auth() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);

  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  return (
    <>
      <div className="main-form-box">
        <div className="form-content-box">
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
            </div>
          ))}

          <div className="form-buttons-box">
            <button className="account-btn">
              {isCreatingAccount ? "Create an account" : "Log in"}
            </button>
            <button className="google-btn">Continue with Google</button>
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
        </div>
      </div>
    </>
  );
}

export default Auth;
