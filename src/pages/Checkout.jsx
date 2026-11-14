import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/checkout.scss";
import { API_URL } from "../api";
import { getGuestId } from "../utils/guestCart";
import { validateExpiration } from "../utils/validateExpiration";

function Checkout({ userEmail, isAuthenticated, refreshCart }) {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  async function loadCartData() {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        credentials: "include",
        headers: {
          "X-Guest-ID": getGuestId(),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load cart data");
      }

      const result = await res.json();

      setCartData(result);
      console.log(cartData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCartData();
  }, []);

  const subTotal = cartData.reduce(
    (t, p) => t + Number(p.price) * Number(p.quantity),
    0,
  );
  const deliveryFee =
    cartData.length <= 3 ? 30 : cartData.length <= 6 ? 50 : 75;

  const discount =
    subTotal >= 30000 ? 15 : subTotal >= 2100 ? 10 : subTotal >= 1600 ? 5 : 0;

  const priceafterDiscount = (subTotal * discount) / 100;

  const total = subTotal - priceafterDiscount + deliveryFee;

  const [deliveryPlace, setDeliveryPlace] = useState("post_office");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiration, setExpiration] = useState("");
  const [CVV, setCVV] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    city: "",
    address: "",
    branch: "",
    cardNumber: "",
    cardholderName: "",
    expiration: "",
    cvv: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  function validateEmail(email) {
    if (!email.trim()) {
      return "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    } else {
      return "";
    }
  }

  function validatePhone(phone) {
    const clearPhone = phone.replaceAll(" ", "");

    if (
      clearPhone !== "" &&
      !/^\+380\d{9}$/.test(clearPhone) &&
      clearPhone !== "+380"
    ) {
      return "Please enter a valid phone number";
    }

    return "";
  }

  function validateCity(city) {
    if (!city.trim()) {
      return "City is required";
    } else if (!/(?=.*\p{L})^[\p{L}\p{M} \-\x27’ʼ]+$/u.test(city.trim())) {
      return "Please enter a valid city name";
    } else {
      return "";
    }
  }

  function validateBranchNumber(branchNumber) {
    if (deliveryPlace !== "post_office") return "";

    if (!branchNumber.trim()) {
      return "Post office branch is required";
    } else if (!/^\d+$/.test(branchNumber) || Number(branchNumber) <= 0) {
      return "Please enter a valid branch number";
    } else {
      return "";
    }
  }

  function validateAddress(address) {
    if (deliveryPlace !== "home_delivery") return "";

    if (!address.trim()) {
      return "Delivery address is required";
    } else if (
      !/(?=.*[\p{L}\p{N}])^[\p{L}\p{M}\p{N}\s.,\x27’ʼ\-/#():№]+$/u.test(address)
    ) {
      return "Please enter a valid delivery address";
    } else {
      return "";
    }
  }

  function validateCardNumber(cardNumber) {
    if (paymentMethod !== "card") return "";

    if (!cardNumber.trim()) {
      return "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      return "Please enter a valid card number";
    } else {
      return "";
    }
  }

  function validateCardHolder(cardHolder) {
    if (paymentMethod !== "card") return "";

    if (!cardHolder.trim()) {
      return "Cardholder name is required";
    } else if (
      !/(?=.*\p{L})^[\p{L}\p{M} \-\x27’ʼ]+$/u.test(cardHolder.trim())
    ) {
      return "Please enter a valid cardholder name";
    } else {
      return "";
    }
  }

  function validateExpirationField(expiration) {
    if (paymentMethod !== "card") return "";

    if (!expiration.trim()) {
      return "Expiration date is required";
    } else if (!validateExpiration(expiration)) {
      return "Invalid expiration date";
    } else {
      return "";
    }
  }

  function validateCVV(CVV) {
    if (paymentMethod !== "card") return "";

    if (!CVV.trim()) {
      return "CVV is required";
    } else if (!/^\d{3}$/.test(CVV)) {
      return "Please enter a valid CVV";
    } else {
      return "";
    }
  }

  async function handlePlaceOrder() {
    setSubmitError("");

    const validationErrors = {
      email: validateEmail(isAuthenticated ? userEmail : email),
      phone: validatePhone(phone),
      city: validateCity(city),
      branch: validateBranchNumber(branchNumber),
      address: validateAddress(address),
      cardNumber: validateCardNumber(cardNumber),
      cardholderName: validateCardHolder(cardHolder),
      expiration: validateExpirationField(expiration),
      cvv: validateCVV(CVV),
    };

    setErrors((prev) => ({
      ...prev,
      ...validationErrors,
    }));

    if (Object.values(validationErrors).some((error) => error !== "")) {
      setSubmitError(
        "Please fill in all required fields before placing your order.",
      );
      return;
    }

    const orderData = {
      email: email,
      phone: phone ? phone : null,
      deliveryMethod: deliveryPlace,
      city: city,
      branchNumber: deliveryPlace === "post_office" ? branchNumber : null,
      address: deliveryPlace === "home_delivery" ? address : null,
      paymentMethod: paymentMethod,
    };

    try {
      setSubmitLoading(true);

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "X-Guest-ID": getGuestId(),
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.message);
        return;
      }

      refreshCart();
      navigate(`/order-confirmation/${result.orderId}`);
    } catch (error) {
      console.log(error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1 className="checkout-title">CHECKOUT</h1>
        <p>Complete your details to place your order.</p>
      </header>

      <div className="checkout-layout">
        <div className="checkout-main-column">
          <form className="checkout-form">
            <section
              className="checkout-section"
              aria-labelledby="checkout-contact-title"
            >
              <h2 id="checkout-contact-title">CONTACT DETAILS</h2>
              <div className="checkout-field">
                {isAuthenticated ? (
                  <p className="checkout-contact-email">{userEmail}</p>
                ) : (
                  <div className="checkout-field">
                    <label htmlFor="checkout-email">Email</label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      onBlur={() => {
                        setErrors((prev) => ({
                          ...prev,
                          email: validateEmail(email),
                        }));
                      }}
                    />
                    {errors.email ? (
                      <p className="checkout-error">{errors.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
              {!isAuthenticated && (
                <div className="checkout-field checkout-phone-field">
                  <label htmlFor="checkout-phone">
                    Phone number (optional)
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+380 67 123 45 67"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\+380\d{0,9}$/.test(value)) {
                        setPhone(value);
                      }
                    }}
                    onBlur={() => {
                      if (phone.replaceAll(" ", "") === "+380") {
                        setPhone("");
                      }

                      setErrors((prev) => ({
                        ...prev,
                        phone: validatePhone(phone),
                      }));
                    }}
                    onFocus={() => {
                      if (phone === "") {
                        setPhone("+380");
                      }
                    }}
                  />
                  {errors.phone ? (
                    <p className="checkout-error">{errors.phone}</p>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </section>

            <section
              className="checkout-section"
              aria-labelledby="checkout-delivery-title"
            >
              <h2 id="checkout-delivery-title">DELIVERY</h2>
              <fieldset className="checkout-options">
                <legend>Delivery method</legend>
                <label
                  className="checkout-option"
                  onClick={() => {
                    setDeliveryPlace("post_office");
                    setErrors((prev) => ({
                      ...prev,
                      address: "",
                    }));
                  }}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="post-office"
                    defaultChecked
                  />
                  <span>Post office</span>
                </label>
                <label
                  className="checkout-option"
                  onClick={() => {
                    setDeliveryPlace("home_delivery");
                    setErrors((prev) => ({
                      ...prev,
                      branch: "",
                    }));
                  }}
                >
                  <input type="radio" name="delivery" value="home" />
                  <span>Home delivery</span>
                </label>
              </fieldset>
              <div className="checkout-fields-row">
                <div className="checkout-field">
                  <label htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value.length === 0) {
                        setCity("");
                      } else {
                        const finalValue =
                          value[0].toUpperCase() + value.slice(1);
                        setCity(finalValue);
                      }
                    }}
                    onBlur={() => {
                      setErrors((prev) => ({
                        ...prev,
                        city: validateCity(city),
                      }));
                    }}
                  />
                  {errors.city ? (
                    <p className="checkout-error">{errors.city}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="checkout-field checkout-branch-field">
                  <label htmlFor="checkout-branch">Branch number</label>
                  <input
                    id="checkout-branch"
                    name="branch"
                    type="text"
                    placeholder="e.g. 12"
                    value={branchNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!/^(?:[1-9]\d*)?$/.test(value) || value.length > 4) {
                      } else {
                        setBranchNumber(value);
                      }
                    }}
                    onBlur={() => {
                      setErrors((prev) => ({
                        ...prev,
                        branch: validateBranchNumber(branchNumber),
                      }));
                    }}
                  />
                  {errors.branch ? (
                    <p className="checkout-error">{errors.branch}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="checkout-field checkout-address-field">
                <label htmlFor="checkout-address">Home address</label>
                <input
                  id="checkout-address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Street, building, apartment"
                  value={address}
                  required={deliveryPlace === "home_delivery"}
                  disabled={deliveryPlace !== "home_delivery"}
                  pattern={String.raw`[^,\s]+,\s*[^,\s]+(?:,\s*[^,\s]+)?`}
                  title="Enter street and building, with an optional apartment (maximum 3 words)."
                  onChange={(e) => {
                    const value = e.target.value;
                    const parts = value
                      .split(/[,\s]+/)
                      .filter(Boolean)
                      .slice(0, 3);
                    const isDeleting =
                      e.nativeEvent.inputType?.startsWith("delete");
                    const hasTrailingSeparator =
                      !isDeleting && /[,\s]$/.test(value);
                    let formatted = parts.join(", ");

                    if (
                      hasTrailingSeparator &&
                      parts.length > 0 &&
                      parts.length < 3
                    ) {
                      formatted += ", ";
                    }

                    setAddress(
                      formatted
                        ? formatted[0].toUpperCase() + formatted.slice(1)
                        : "",
                    );
                  }}
                  onBlur={() => {
                    setErrors((prev) => ({
                      ...prev,
                      address: validateAddress(address),
                    }));
                  }}
                />
                {errors.address ? (
                  <p className="checkout-error">{errors.address}</p>
                ) : (
                  ""
                )}
              </div>
            </section>

            <section
              className="checkout-section"
              aria-labelledby="checkout-payment-title"
            >
              <h2 id="checkout-payment-title">PAYMENT</h2>
              <fieldset className="checkout-options">
                <legend>Payment method</legend>
                <label
                  className="checkout-option"
                  onClick={() => {
                    setPaymentMethod("cash");
                    setErrors((prev) => ({
                      ...prev,
                      cardNumber: "",
                      cardholderName: "",
                      expiration: "",
                      cvv: "",
                    }));
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    defaultChecked
                  />
                  <span>Cash on delivery</span>
                </label>
                <label
                  className="checkout-option"
                  onClick={() => {
                    setPaymentMethod("card");
                  }}
                >
                  <input type="radio" name="payment" value="card" />
                  <span>Card</span>
                </label>
              </fieldset>
              <div className="checkout-card-fields">
                <div className="checkout-field">
                  <label htmlFor="checkout-card-number">Card number</label>
                  <input
                    id="checkout-card-number"
                    name="cardNumber"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^(?:\d\s*){0,16}$/.test(value)) {
                        const formatedValue = value.replace(
                          /(\d{4})(?=\d)/g,
                          "$1 ",
                        );
                        setCardNumber(formatedValue);
                      } else {
                        return;
                      }
                    }}
                    onBlur={() => {
                      setErrors((prev) => ({
                        ...prev,
                        cardNumber: validateCardNumber(cardNumber),
                      }));
                    }}
                  />
                  {errors.cardNumber ? (
                    <p className="checkout-error">{errors.cardNumber}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="checkout-field">
                  <label htmlFor="checkout-card-name">Cardholder name</label>
                  <input
                    id="checkout-card-name"
                    name="cardName"
                    type="text"
                    autoComplete="cc-name"
                    placeholder="Name as shown on card"
                    value={cardHolder}
                    onChange={(e) => {
                      const value = e.target.value;
                      const upperCasedValue = value.toUpperCase();
                      const finalValue = upperCasedValue.replace(
                        /\s{2,}/g,
                        " ",
                      );
                      setCardHolder(finalValue);
                    }}
                    onBlur={() => {
                      setErrors((prev) => ({
                        ...prev,
                        cardholderName: validateCardHolder(cardHolder),
                      }));
                    }}
                  />
                  {errors.cardholderName ? (
                    <p className="checkout-error">{errors.cardholderName}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="checkout-fields-row">
                  <div className="checkout-field">
                    <label htmlFor="checkout-card-expiry">
                      Expiration date
                    </label>
                    <input
                      id="checkout-card-expiry"
                      name="cardExpiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={expiration}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (!/^\d{0,2}(\/\d{0,2})?$/.test(value)) return;

                        if (value.length < expiration.length) {
                          setExpiration(value);
                          return;
                        }

                        if (
                          value.length === 1 &&
                          Number(value) >= 2 &&
                          Number(value) <= 9
                        ) {
                          setExpiration("0" + value + "/");
                          return;
                        }

                        if (value.length <= 5) {
                          const formattedValue = value.replace(
                            /^(\d{2})$/,
                            "$1/",
                          );
                          setExpiration(formattedValue);
                        } else {
                          return;
                        }
                      }}
                      onBlur={() => {
                        setErrors((prev) => ({
                          ...prev,
                          expiration: validateExpirationField(expiration),
                        }));
                      }}
                    />
                    {errors.expiration ? (
                      <p className="checkout-error">{errors.expiration}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="checkout-card-cvv">CVV</label>
                    <input
                      id="checkout-card-cvv"
                      name="cardCvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={CVV}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,3}$/.test(value)) {
                          setCVV(value);
                        }
                      }}
                      onBlur={() => {
                        setErrors((prev) => ({
                          ...prev,
                          cvv: validateCVV(CVV),
                        }));
                      }}
                    />
                    {errors.cvv ? (
                      <p className="checkout-error">{errors.cvv}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </section>

            <button
              className="checkout-place-order"
              type="button"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
            <p className="checkout-error">{submitError}</p>
          </form>

          <nav className="checkout-navigation" aria-label="Continue shopping">
            <Link className="checkout-navigation-link" to="/">
              Home
            </Link>
            <Link className="checkout-navigation-link" to="/catalog">
              Catalog
            </Link>
          </nav>
        </div>

        <aside
          className="checkout-summary summary-main-container"
          aria-labelledby="checkout-summary-title"
        >
          <div className="summary-title">
            <h2 id="checkout-summary-title">Order Summary</h2>
          </div>
          <div className="checkout-summary-products">
            {cartData.map((p) => (
              <div className="checkout-summary-product" key={p.id}>
                <div className="checkout-product-image">
                  <img
                    className="checkout-product-thumbnail"
                    src={p.image}
                    alt={p.name}
                  />
                </div>
                <div className="checkout-product-details">
                  <h3 className="checkout-product-name">{p.name}</h3>
                  <p className="checkout-product-variant">{`${p.color} - ${p.size}`}</p>
                </div>
                <span className="checkout-product-quantity">x{p.quantity}</span>
                <span className="checkout-product-price">{`$${p.price * p.quantity}`}</span>
              </div>
            ))}
          </div>
          <div className="summary-price-info-boxe">
            <div className="summary-info">
              <p>Subtotal</p>
              <p>Discount(-{discount}%)</p>
              <p>Delivery Fee</p>
            </div>
            <div className="summary-prices">
              <p>${subTotal}</p>
              <p className="discount-text">${priceafterDiscount}</p>
              <p>${deliveryFee}</p>
            </div>
          </div>
          <div className="total-box">
            <h3>Total</h3>
            <h4>${total}</h4>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
