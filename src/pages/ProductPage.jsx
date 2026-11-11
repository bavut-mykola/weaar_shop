import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/productPage.scss";

import checkIcon from "../assets/icons/check.svg";

import { API_URL } from "../api";

import { getGuestId } from "../utils/guestCart";

function ProductPage({ refreshCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFailedToLoad, setIsFailedToLoad] = useState(false);

  const [product, setProduct] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("front");

  const [productQuantity, setProductQuantity] = useState(1);
  const [addError, setAddError] = useState("");

  const [isBeingAdded, setIsBeingAdded] = useState(false);
  const [cartAddedNotice, setCartAddedNotice] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        setIsFailedToLoad(false);

        const res = await fetch(`${API_URL}/api/products/${id}`);

        if (!res.ok) {
          throw new Error(`Product request failed: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
        setSelectedColor(data.colors?.[0] ?? null);
        setSelectedSize(data.sizes?.[0] ?? null);
        setSelectedImage("front");
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsFailedToLoad(true);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  useEffect(() => {
    if (!cartAddedNotice) return;

    const timeoutId = window.setTimeout(
      () => {
        setCartAddedNotice((currentState) =>
          currentState === "open" ? "closing" : null,
        );
      },
      cartAddedNotice === "open" ? 3000 : 260,
    );

    return () => window.clearTimeout(timeoutId);
  }, [cartAddedNotice]);

  const activeColor = selectedColor ?? product?.colors?.[0];
  const frontImage = activeColor?.images?.front;
  const backImage = activeColor?.images?.back;
  const mainImage = selectedImage === "back" ? backImage : frontImage;

  const selectedInventory = product?.inventory?.find(
    (item) => item.color === activeColor?.name && item.size === selectedSize,
  );

  const maxQuantity = selectedInventory?.quantity ?? 0;

  const [isMaxQuantity, setisMaxQuantity] = useState(false);

  async function addProduct() {
    if (!product || !activeColor || !selectedSize) {
      setAddError("Choose a color and size before adding this product.");
      return;
    }

    setAddError("");
    const productData = {
      product_id: product.id,
      color: activeColor.name,
      size: selectedSize,
      quantity: productQuantity,
    };
    const quantityAdded = productQuantity;

    try {
      const guestId = getGuestId();

      const response = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Guest-ID": guestId,
        },
        body: JSON.stringify(productData),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || `Cart request failed: ${response.status}`,
        );
      }

      setProduct((currentProduct) => {
        if (!currentProduct) return currentProduct;

        return {
          ...currentProduct,
          inventory: currentProduct.inventory?.map((item) =>
            item.color === productData.color && item.size === productData.size
              ? {
                  ...item,
                  quantity: Math.max(0, item.quantity - quantityAdded),
                }
              : item,
          ),
        };
      });
      setProductQuantity(1);
      setisMaxQuantity(false);
      setCartAddedNotice("open");

      if (refreshCart) {
        refreshCart();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setAddError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to add this product to your cart. Please try again.",
      );
    } finally {
      setIsBeingAdded(false);
    }
  }

  return (
    <>
      {cartAddedNotice && (
        <div
          className={`account-deleted-notice product-added-notice${
            cartAddedNotice === "closing" ? " is-closing" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="product-added-notice__text">Added to cart.</span>
          <div className="product-added-notice__actions">
            <button
              type="button"
              className="product-added-notice__button product-added-notice__button--continue"
              onClick={() => setCartAddedNotice("closing")}
            >
              Keep browsing
            </button>
            <button
              type="button"
              className="product-added-notice__button product-added-notice__button--cart"
              onClick={() => navigate("/cart")}
            >
              Go to cart
            </button>
          </div>
          <button
            type="button"
            className="account-deleted-notice__close"
            aria-label="Close cart message"
            onClick={() => setCartAddedNotice("closing")}
          >
            ×
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="product-skeleton-container">
          <div className="left-product-skeleton-box">
            <div className="small-skeleton-images">
              <div></div>
              <div></div>
            </div>
            <div className="big-skeleton-images"></div>
          </div>

          <div className="right-product-skeleton-box">
            <div className="top-info-skeleton">
              <div className="skeleton-product-page-name"></div>
              <div className="skeleton-product-page-rating"></div>
              <div className="skeleton-product-page-price"></div>
              <div className="skeleton-product-page-description"></div>
            </div>

            <div className="colors-skeleton">
              {[1, 2, 3].map((color) => (
                <div className="skeleton-product-color" key={color}></div>
              ))}
            </div>
            <div className="sizes-skeleton">
              {[1, 2, 3, 4].map((size) => (
                <div className="skeleton-product-size" key={size}></div>
              ))}
            </div>
            <div className="skeleton-product-page-buttons">
              <div className="skeleton-arithmetic-buttons"></div>
              <div className="skeleton-add-to-cart-button"></div>
            </div>
          </div>
        </div>
      ) : isFailedToLoad || !product ? (
        <h2>Unable to load product.</h2>
      ) : (
        <div className="main-product-container">
          <div className="product-images-box">
            <div className="images-options">
              {frontImage && (
                <img
                  src={frontImage}
                  alt={`${product.name} front view`}
                  className={`image ${selectedImage === "front" ? "active-image" : ""}`}
                  onClick={() => setSelectedImage("front")}
                />
              )}
              {backImage && (
                <img
                  src={backImage}
                  alt={`${product.name} back view`}
                  className={`image ${selectedImage === "back" ? "active-image" : ""}`}
                  onClick={() => setSelectedImage("back")}
                />
              )}
            </div>
            <div className="selected-image-box">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={`${product.name} ${selectedImage} view`}
                  className="selected-img"
                />
              )}
            </div>
          </div>

          <div className="product-actions-box">
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <div className="rating-box">
                <div className="rating-stars">
                  {[0, 1, 2, 3, 4].map((index) => {
                    const fill = Math.min(
                      Math.max(product.rating - index, 0),
                      1,
                    );

                    return (
                      <span
                        key={index}
                        className="rating-star"
                        style={{ "--fill": `${fill * 100}%` }}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
                <p className="rating">{product.rating} / 5</p>
              </div>
              {product.oldPrice ? (
                <div translate="no">
                  <p>${product.price}</p>
                  <p className="product-old-price">${product.oldPrice}</p>{" "}
                </div>
              ) : (
                <p translate="no">${product.price}</p>
              )}
              <p className="product-description">{product.shortDescription}</p>
            </div>
          </div>

          <div className="product-colors-box">
            <h2 className="color-title">Select Colors</h2>

            <div className="product-colors">
              {product.colors.map((c) => (
                <div key={c.name} className="procuct-color">
                  <div className="color-box">
                    <button
                      className={`color ${activeColor === c ? "active-color" : ""}`}
                      style={{ backgroundColor: c.value }}
                      aria-label={c.name}
                      title={c.name}
                      onClick={() => {
                        if (selectedColor === c) return;
                        setSelectedColor(c);
                        setProductQuantity(1);
                        setisMaxQuantity(false);
                      }}
                    />
                    {activeColor === c && (
                      <img src={checkIcon} alt="" className="check-mark" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`product-sizes-box ${maxQuantity === 0 ? "out-of-stock" : ""}`}
          >
            <h2 className="size-title">Choose Size</h2>
            <div className="size-options">
              {(product.sizes ?? []).map((s) => (
                <div key={s} className="sizes-box">
                  <button
                    className={`size-btn ${selectedSize === s ? "active-size" : ""}`}
                    onClick={() => {
                      if (selectedSize === s) return;
                      setSelectedSize(s);
                      setProductQuantity(1);
                      setisMaxQuantity(false);
                    }}
                    translate="no"
                  >
                    {s}
                  </button>
                </div>
              ))}
            </div>
            <div className="out-stock-message-slot" aria-live="polite">
              {maxQuantity === 0 && (
                <p className="out-stock-text">
                  Product with selected size and color is currently out of stock
                </p>
              )}
            </div>
          </div>

          <div className="main-product-actions-box">
            <div className="quantity-control">
              <div className="quantity-action-box">
                <button
                  className="arithmetic-btn"
                  disabled={productQuantity <= 1}
                  onClick={() => {
                    setProductQuantity((quantity) => Math.max(1, quantity - 1));
                    setisMaxQuantity(false);
                  }}
                >
                  -
                </button>
                <span
                  className={`quantity-text ${maxQuantity === 0 ? "out-count" : ""}`}
                >
                  {productQuantity}
                </span>
                <button
                  className="arithmetic-btn"
                  disabled={maxQuantity === 0}
                  onClick={() => {
                    if (productQuantity === maxQuantity) {
                      setisMaxQuantity(true);
                      return;
                    } else {
                      setProductQuantity((quantity) => quantity + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              {isMaxQuantity && (
                <p className="quantity-message" role="status">
                  You&apos;ve reached the available quantity for this size.
                </p>
              )}
            </div>

            <div className="add-to-cart-box">
              <button
                className="add-to-cart-btn"
                disabled={isBeingAdded || maxQuantity === 0}
                onClick={() => {
                  setIsBeingAdded(true);
                  addProduct();
                }}
              >
                {isBeingAdded ? "ADDING" : "ADD TO CART"}
              </button>
              {addError && (
                <p className="quantity-message" role="alert">
                  {addError}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
