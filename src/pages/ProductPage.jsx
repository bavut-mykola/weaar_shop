import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/productPage.scss";

import checkIcon from "../assets/icons/check.svg";

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

  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        setIsFailedToLoad(false);

        const res = await fetch(`http://localhost:3000/api/products/${id}`);

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

    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || `Cart request failed: ${response.status}`,
        );
      }

      setProductQuantity(1);

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
      {isLoading ? (
        <h2>Loading product...</h2>
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
                <div>
                  <p>${product.price}</p> <p>${product.oldPrice}</p>{" "}
                </div>
              ) : (
                <p>${product.price}</p>
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
                  >
                    {s}
                  </button>
                </div>
              ))}
            </div>
            <div className="out-stock-message-slot" aria-live="polite">
              {maxQuantity === 0 && (
                <p className="out-stock-text">
                  Product with selected size and color is currently out of
                  stock
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
                disabled={isBeingAdded}
                onClick={() => {
                  setIsBeingAdded(true);
                  addProduct();
                }}
              >
                {isBeingAdded ? "Adding" : "Add to Cart"}
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
