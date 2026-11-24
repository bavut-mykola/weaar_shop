import Reviews from "../components/reviews";
import { translateProductText } from "../locales/productTranslations";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/productPage.scss";

import checkIcon from "../assets/icons/check.svg";
import arrowIcon from "../assets/icons/arrow.svg";

import { API_URL } from "../api";

import { getGuestId } from "../utils/guestCart";

import { translations, translateDisplay } from "../locales/translations";

function ProductPage({ refreshCart, language }) {
  const text = translations[language];
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
  const features = product?.features ?? product?.details?.features ?? [];

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

  const [recomendedProducts, setRecomendedProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getSimilarProducts() {
      try {
        const res = await fetch(
          `${API_URL}/api/products/${product.id}/recommendations`,
          {
            credentials: "include",
            headers: { "X-Guest-ID": getGuestId() },
            signal: controller.signal,
          },
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error);
        }

        setRecomendedProducts(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
          setRecomendedProducts([]);
        }
      }
    }

    getSimilarProducts();
    return () => controller.abort();
  }, [product]);

  const [rightCarouselDisabled, setRightCarouselDisabled] = useState(false);
  const [leftCarouselDisabled, setLeftCarouselDisabled] = useState(true);
  const carouselRef = useRef(null);

  function updateCarouselButtons(event) {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
    setLeftCarouselDisabled(scrollLeft <= 1);
    setRightCarouselDisabled(scrollWidth - clientWidth - scrollLeft <= 1);
  }

  function scrollCarousel(direction) {
    const carousel = carouselRef.current;
    if (!carousel || carousel.children.length < 2) return;

    const [firstCard, secondCard] = carousel.children;
    const cardStep =
      secondCard.getBoundingClientRect().left -
      firstCard.getBoundingClientRect().right;

    carousel.scrollBy({
      left: direction * cardStep,
      behavior: "smooth",
    });
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
          <span className="product-added-notice__text">
            {text.product.added}
          </span>
          <div className="product-added-notice__actions">
            <button
              type="button"
              className="product-added-notice__button product-added-notice__button--continue"
              onClick={() => setCartAddedNotice("closing")}
            >
              {text.product.keepBrowsing}
            </button>
            <button
              type="button"
              className="product-added-notice__button product-added-notice__button--cart"
              onClick={() => navigate("/cart")}
            >
              {text.product.goToCart}
            </button>
          </div>
          <button
            type="button"
            className="account-deleted-notice__close"
            aria-label={text.product.closeAdded}
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
        <h2>{text.product.loadError}</h2>
      ) : (
        <div className="main-product-container">
          <div className="product-images-box">
            <div className="images-options">
              {frontImage && (
                <img
                  src={frontImage}
                  alt={text.product.frontImageAlt(product.name)}
                  className={`image ${selectedImage === "front" ? "active-image" : ""}`}
                  onClick={() => setSelectedImage("front")}
                />
              )}
              {backImage && (
                <img
                  src={backImage}
                  alt={text.product.backImageAlt(product.name)}
                  className={`image ${selectedImage === "back" ? "active-image" : ""}`}
                  onClick={() => setSelectedImage("back")}
                />
              )}
            </div>
            <div className="selected-image-box">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={
                    selectedImage === "front"
                      ? text.product.frontImageAlt(product.name)
                      : text.product.backImageAlt(product.name)
                  }
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
              <p className="product-description">
                {translateProductText(product.shortDescription, language)}
              </p>
            </div>
          </div>

          <div className="product-colors-box">
            <h2 className="color-title">{text.product.selectColor}</h2>

            <div className="product-colors">
              {product.colors.map((c) => (
                <div key={c.name} className="procuct-color">
                  <div className="color-box">
                    <button
                      className={`color ${activeColor === c ? "active-color" : ""}`}
                      style={{ backgroundColor: c.value }}
                      aria-label={translateProductText(c.name, language)}
                      title={translateProductText(c.name, language)}
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
              <span className="selected-color-name">
                {translateProductText(activeColor?.name, language)}
              </span>
            </div>
          </div>

          <div
            className={`product-sizes-box ${maxQuantity === 0 ? "out-of-stock" : ""}`}
          >
            <h2 className="size-title">{text.product.selectSize}</h2>
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
                <p className="out-stock-text">{text.product.outOfStock}</p>
              )}
            </div>
          </div>

          <div className="main-product-actions-box">
            <div className="quantity-control">
              <div className="quantity-action-box">
                <button
                  className="arithmetic-btn"
                  aria-label={text.product.decreaseQuantity}
                  type="button"
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
                  aria-label={text.product.increaseQuantity}
                  type="button"
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
                  {text.product.maxQuantity}
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
                {isBeingAdded ? text.product.adding : text.product.addToCart}
              </button>
              {addError && (
                <p className="quantity-message" role="alert">
                  {translateDisplay(addError, language)}
                </p>
              )}
            </div>
          </div>

          <section
            className="product-details-panel"
            aria-label={text.product.details}
          >
            {(product.details || product.description) && (
              <details
                className="product-details-content"
                key={`details-${product.id}`}
              >
                <summary>{text.product.detailsCare}</summary>
                {product.description && (
                  <p>{translateProductText(product.description, language)}</p>
                )}
                {product.details && (
                  <dl className="product-specifications">
                    {[
                      ["Material", product.details.material],
                      ["Fit", product.details.fit],
                      ["Gender", product.details.gender],
                      ["Season", product.details.season],
                      ["Made in", product.details.country],
                      ["Care", product.details.care],
                    ]
                      .filter(([, value]) => value)
                      .map(([label, value]) => (
                        <div key={translateDisplay(label, language)}>
                          <dt>{translateDisplay(label, language)}</dt>
                          <dd>{translateProductText(value, language)}</dd>
                        </div>
                      ))}
                  </dl>
                )}
              </details>
            )}
            {features.length > 0 && (
              <details
                className="product-features-content"
                key={`features-${product.id}`}
              >
                <summary>{text.product.features}</summary>
                <ul className="product-feature-list">
                  {features.map((feature) => (
                    <li key={feature}>
                      {translateProductText(feature, language)}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        </div>
      )}

      {recomendedProducts.length > 0 && (
        <section
          className="product-recommendations"
          aria-labelledby="product-recommendations-title"
        >
          <div className="product-recommendations-header">
            <div>
              <h2
                id="product-recommendations-title"
                className="product-recommendations-title"
              >
                {text.product.recommendations}
              </h2>
              <p className="product-recommendations-subtitle">
                {text.product.recommendationsText}
              </p>
            </div>
            <div className="carousel-buttons">
              <button
                className="left-carousel-btn"
                aria-label={text.common.previousProduct}
                disabled={
                  leftCarouselDisabled || recomendedProducts.length <= 4
                }
                onClick={() => scrollCarousel(-1)}
              >
                <img src={arrowIcon} alt="" />
              </button>
              <button
                className="right-carousel-btn"
                aria-label={text.common.nextProduct}
                disabled={
                  rightCarouselDisabled || recomendedProducts.length <= 4
                }
                onClick={() => scrollCarousel(1)}
              >
                <img src={arrowIcon} alt="" />
              </button>
            </div>
          </div>
          <div
            className="product-recommendations-grid"
            ref={carouselRef}
            onScroll={updateCarouselButtons}
          >
            {recomendedProducts.map((product) => (
              <article key={product.id} className="product-recommendation">
                <Link
                  to={`/catalog/product/${product.id}`}
                  className="product-recommendation-image-link"
                >
                  <img
                    src={product.images?.front}
                    alt={product.name}
                    loading="lazy"
                    className="product-recommendation-image"
                  />
                </Link>
                <h3>{product.name}</h3>
                <div
                  className="product-recommendation-rating"
                  aria-label={text.common.rating(product.rating)}
                >
                  <span
                    className="product-recommendation-stars"
                    aria-hidden="true"
                  >
                    {[0, 1, 2, 3, 4].map((index) => (
                      <span
                        key={index}
                        style={{
                          "--fill": `${Math.min(Math.max(Number(product.rating) - index, 0), 1) * 100}%`,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span>{product.rating} / 5</span>
                </div>
                <p className="product-recommendation-price" translate="no">
                  ${Number(product.price).toFixed(2)}
                </p>
                <Link
                  to={`/catalog/product/${product.id}`}
                  className="product-recommendation-button"
                >
                  {text.common.seeProduct}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {!isLoading && !isFailedToLoad && product && (
        <Reviews key={product.id} productId={product.id} language={language} />
      )}
    </>
  );
}

export default ProductPage;
