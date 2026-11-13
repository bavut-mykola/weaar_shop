import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/checkout.scss";
import { API_URL } from "../api";
import { getGuestId } from "../utils/guestCart";

function Checkout({ userEmail, isAuthenticated }) {
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

  const [isOffice, setIsOffice] = useState(true);
  const [isHome, setIsHome] = useState(false);

  const [city, setCity] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [address, setAddress] = useState("");

  const [isCash, setIsCash] = useState(true);
  const [isCard, setIsCard] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiration, setExpiration] = useState("");
  const [CVV, setCVV] = useState("");

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
                    />
                  </div>
                )}
              </div>
              {!isAuthenticated && (
                <div className="checkout-field checkout-phone-field">
                  <label htmlFor="checkout-phone">Phone number</label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+380 67 123 45 67"
                  />
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
                    setIsOffice(true);
                    setIsHome(false);
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
                    setIsOffice(false);
                    setIsHome(true);
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
                  />
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
                  />
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
                  required={isHome}
                  disabled={!isHome}
                  pattern={String.raw`[^,\s]+,\s*[^,\s]+(?:,\s*[^,\s]+)?`}
                  title="Enter street and building, with an optional apartment (maximum 3 words)."
                  onChange={(e) => {
                    const value = e.target.value;
                    const parts = value.split(/[,\s]+/).filter(Boolean).slice(0, 3);
                    const isDeleting = e.nativeEvent.inputType?.startsWith("delete");
                    const hasTrailingSeparator = !isDeleting && /[,\s]$/.test(value);
                    let formatted = parts.join(", ");

                    if (hasTrailingSeparator && parts.length > 0 && parts.length < 3) {
                      formatted += ", ";
                    }

                    setAddress(
                      formatted ? formatted[0].toUpperCase() + formatted.slice(1) : "",
                    );
                  }}
                />
              </div>
            </section>

            <section
              className="checkout-section"
              aria-labelledby="checkout-payment-title"
            >
              <h2 id="checkout-payment-title">PAYMENT</h2>
              <fieldset className="checkout-options">
                <legend>Payment method</legend>
                <label className="checkout-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    defaultChecked
                  />
                  <span>Cash on delivery</span>
                </label>
                <label className="checkout-option">
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
                      setCardNumber(e.target.value);
                    }}
                  />
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
                      setCardHolder(e.target.value);
                    }}
                  />
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
                        setExpiration(e.target.value);
                      }}
                    />
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
                        setCVV(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <button className="checkout-place-order" type="button">
              Place order
            </button>
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
