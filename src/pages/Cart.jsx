import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/cart.scss";

import { API_URL } from "./api";

function Cart({ refreshCart }) {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function loadProducts() {
    try {
      const res = await fetch(`${API_URL}/api/cart`);

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function clearCart() {
    try {
      const result = await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
      });

      if (refreshCart) {
        refreshCart();
      }
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Cart products:", products);

  const sizesVariables = {
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "X-Large",
  };

  const subTotal = products.reduce(
    (t, p) => t + Number(p.price) * Number(p.quantity),
    0,
  );
  const deliveryFee =
    products.length <= 3 ? 30 : products.length <= 6 ? 50 : 75;

  const discount =
    subTotal >= 30000 ? 15 : subTotal >= 2100 ? 10 : subTotal >= 1600 ? 5 : 0;

  const priceafterDiscount = (subTotal * discount) / 100;

  const total = subTotal - priceafterDiscount + deliveryFee;

  const [isMaxStockId, setIsMaxStockId] = useState(null);

  async function increaseQuantity(p) {
    if (p.quantity >= p.maxStock) {
      setIsMaxStockId(p.id);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: p.quantity + 1 }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? updatedItem : item)),
        );
        if (refreshCart) {
          refreshCart();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [isMinQuantityId, setIsMinQuantityId] = useState(null);

  async function decreaseQuantity(p) {
    if (p.quantity === 1) {
      deleteFromCart(p);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: p.quantity - 1 }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? updatedItem : item)),
        );

        if (refreshCart) {
          refreshCart();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFromCart(p) {
    try {
      const res = await fetch(`${API_URL}/api/cart/${p.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: "",
      });

      if (!res.ok) {
        throw new Error("Failed to delete item from cart");
      }

      setProducts((prev) => prev.filter((item) => item.id !== p.id));

      if (refreshCart) {
        refreshCart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {products.length >= 1 && <h1 className="cart-title">YOUR CART</h1>}
      {products.length >= 1 ? (
        <div className="cart-main-box">
          <div className="cart-products-container">
            {products.map((p) => (
              <div className="cart-product-box" key={p.id}>
                <div className="cart-image-box">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="product-cart-image"
                    />
                  )}
                </div>
                <div className="product-cart-info-box">
                  <div className="product-cart-info-top">
                    <h2 className="product-cart-name">{p.name}</h2>
                    <p className="product-cart-size">
                      <span>Size:</span> {sizesVariables[p.size]}
                    </p>
                    <p className="product-cart-color">
                      <span>Color:</span> {p.color}
                    </p>
                  </div>
                  <div className="product-cart-info-bottom">
                    {p.oldPrice ? (
                      <h3 className="product-cart-price">
                        ${p.price} <span>${p.oldPrice}</span>
                      </h3>
                    ) : (
                      <h3 className="product-cart-price">${p.price}</h3>
                    )}
                  </div>
                </div>

                <div className="product-cart-actions-box">
                  <div className="product-cart-actions-top">
                    <svg
                      className="product-cart-delete-btn"
                      aria-hidden="true"
                      viewBox="0 0 40 40"
                      fill="none"
                      onClick={() => deleteFromCart(p)}
                    >
                      <path
                        d="M5 10H8.33333M8.33333 10H35M8.33333 10L8.33333 33.3334C8.33333 34.2174 8.68452 35.0653 9.30964 35.6904C9.93477 36.3155 10.7826 36.6667 11.6667 36.6667H28.3333C29.2174 36.6667 30.0652 36.3155 30.6904 35.6904C31.3155 35.0653 31.6667 34.2174 31.6667 33.3334V10M13.3333 10V6.66671C13.3333 5.78265 13.6845 4.93481 14.3096 4.30968C14.9348 3.68456 15.7826 3.33337 16.6667 3.33337H23.3333C24.2174 3.33337 25.0652 3.68456 25.6904 4.30968C26.3155 4.93481 26.6667 5.78265 26.6667 6.66671V10M16.6667 18.3334V28.3334M23.3333 18.3334V28.3334"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="product-cart-actions-bottom">
                    <button
                      className="product-cart-arithmetic-btn"
                      onClick={() => decreaseQuantity(p)}
                    >
                      -
                    </button>
                    <span className="product-cart-quantity">{p.quantity}</span>
                    <button
                      className="product-cart-arithmetic-btn"
                      disabled={isMaxStockId === p.id}
                      onClick={() => increaseQuantity(p)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-clear-btn-box">
              <button type="button" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="summary-main-container">
            <div className="summary-title">
              <h2>Order Summary</h2>
            </div>

            <div className="summary-price-info-boxe">
              <div className="summary-info">
                <p className="summ-info-text">Subtotal</p>
                <p className="summ-info-text">{`Discount(-${discount}%)`}</p>
                <p className="summ-info-text">Delivery Fee</p>
              </div>

              <div className="summary-prices">
                <p className="price-text">${subTotal}</p>
                <p className="discount-text">-${priceafterDiscount}</p>
                <p className="price-text">${deliveryFee}</p>
              </div>
            </div>

            <div className="total-box">
              <h3>Total</h3>
              <h4>${total}</h4>
            </div>

            <div className="checkout-btn-box">
              <button>
                Go To Checkout <span>&gt;</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty-state">
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link className="cart-empty-button" to="/catalog">
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
