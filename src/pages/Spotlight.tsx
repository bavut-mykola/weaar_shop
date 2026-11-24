import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { translations } from "../locales/translations";
import { translateProductText } from "../locales/productTranslations";
import "../styles/spotlight.scss";

function Spotlight({ language }: { language: "en" | "uk" }) {
  const text = translations[language].spotlight;
  const [products, setProducts] = useState<product[]>([]);

  async function loadProducts() {
    try {
      const res = await fetch("/spotlight.json");
      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  type ProductColor = {
    name: string;
    value: string;
    spotlightImage: string;
  };

  type product = {
    productId: number;
    name: string;
    price: number;
    colors: ProductColor[];
  };

  const [selectedColor, setSelectedColor] = useState<Record<number, number>>(
    {},
  );

  return (
    <section className="spotlight-main">
      <header className="spotlight-header">
        <h2>{text.title}</h2>
        <p>{text.description}</p>
      </header>

      <div className="spotlight-products-box">
        {products.map((p) => (
          <div className="product-box" key={p.productId}>
            <div className="product-image-box">
              <img
                src={p.colors[selectedColor[p.productId] ?? 0]?.spotlightImage}
                alt={p.name}
              />
            </div>
            <div className="product-info-main">
              <div className="info-box-top">
                <p>{p.name}</p>
                <p>${p.price}</p>
              </div>
              <div className="info-box-bottom">
                <div className="bottom-left-info">
                  {p.colors.length > 1 ? (
                    <div>
                      <h3>
                        {translateProductText(
                          p.colors[selectedColor[p.productId] ?? 0]?.name,
                          language,
                        )}
                      </h3>
                      {p.colors.map((c, index) => (
                        <button
                          className="product-color"
                          aria-label={translateProductText(c.name, language)}
                          key={c.value}
                          onClick={() => {
                            setSelectedColor((prev) => ({
                              ...prev,
                              [p.productId]: index,
                            }));
                          }}
                        ></button>
                      ))}
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="bottom-right-info">
                  <Link
                    to={`/catalog/product/${p.productId}`}
                    className="product-button"
                  >
                    {text.browseProduct}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Spotlight;
