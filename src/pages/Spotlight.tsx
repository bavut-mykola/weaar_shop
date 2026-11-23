import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/spotlight.scss";

function Spotlight() {
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
        <h2>The Peak Collection</h2>
        <p>
          The absolute peak of our design. The most powerful and carefully
          crafted pieces by WEA.R
        </p>
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
                      <h3>{p.colors[selectedColor[p.productId] ?? 0]?.name}</h3>
                      {p.colors.map((c, index) => (
                        <button
                          className="product-color"
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
                    Browse Product
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
