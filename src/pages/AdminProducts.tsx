import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/adminDashboard.scss";
import "../styles/adminProducts.scss";

export default function AdminProducts() {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [oldPrice, setOldPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [fit, setFit] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [care, setCare] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [styles, setStyles] = useState<string>("");

  type Size = {
    size: string;
    quantity: string;
  };

  type Color = {
    name: string;
    value: string;
    front: File | null;
    back: File | null;
    sizes: Size[];
  };
  const [newColor, setNewColor] = useState<Color>({
    name: "",
    value: "",
    front: null,
    back: null,
    sizes: [
      {
        size: "S",
        quantity: "",
      },
      {
        size: "M",
        quantity: "",
      },
      {
        size: "L",
        quantity: "",
      },
      {
        size: "XL",
        quantity: "",
      },
    ],
  });

  const [colors, setColors] = useState<Color[]>([]);

  function addColor() {
    if (!newColor.name.trim() || !newColor.value.trim()) {
      for (let i = 0; i <= 10; i++) {
        alert("пішов ти нахуй сучара");
      }
      return;
    }
    setColors([...colors, newColor]);

    setNewColor({
      name: "",
      value: "",
      front: null,
      back: null,
      sizes: [
        {
          size: "S",
          quantity: "",
        },
        {
          size: "M",
          quantity: "",
        },
        {
          size: "L",
          quantity: "",
        },
        {
          size: "XL",
          quantity: "",
        },
      ],
    });
  }

  function updateQuantity(
    colorIndex: number,
    sizeIndex: number,
    quantity: string,
  ) {
    const updatedColors = colors.map((color, index) => {
      if (index !== colorIndex) {
        return color;
      }

      const updatedSizes = color.sizes.map((size, index) => {
        if (index !== sizeIndex) {
          return size;
        }

        return {
          ...size,
          quantity: quantity,
        };
      });

      return {
        ...color,
        sizes: updatedSizes,
      };
    });

    setColors(updatedColors);
  }

  return (
    <div className="admin-products">
      <aside className="admin-sidebar" aria-label="Admin panel">
        <header className="admin-brand">
          <h1>
            <Link to="/">WEAR</Link>
          </h1>
          <p>Admin Panel</p>
        </header>

        <section>
          <h2 className="admin-section-label">Page</h2>
          <ul className="admin-menu">
            <li aria-current="page">
              <img src="" alt="" />
              Products
            </li>
          </ul>
        </section>

        <section>
          <h2 className="admin-section-label">Functionality</h2>
          <ul className="admin-menu">
            <li>
              <img src="" alt="" />
              Dashboard
            </li>
            <li>
              <img src="" alt="" />
              Inventory
            </li>
            <li>
              <img src="" alt="" />
              Orders
            </li>
            <li>
              <img src="" alt="" />
              Customers
            </li>
            <li>
              <img src="" alt="" />
              Reviews
            </li>
          </ul>
        </section>
      </aside>

      <main className="admin-products-content">
        <header className="admin-products-heading">
          <h1>Add product</h1>
          <p>Create a new product in the store</p>
        </header>

        <div className="admin-products-columns">
          <section
            className="admin-products-basic"
            aria-labelledby="product-basic-heading"
          >
            <h2 id="product-basic-heading">Basic information</h2>
            <label>
              Product name *
              <input
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </label>
            <div className="admin-products-fields">
              <label>
                Price *
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </label>
              <label>
                Old price
                <input
                  type="number"
                  value={oldPrice}
                  onChange={(e) => {
                    setOldPrice(e.target.value);
                  }}
                />
              </label>
              <label>
                Category *
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="" />
                  <option value="pants">Pants</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="outerwear">Outerwear</option>
                </select>
              </label>
              <label>
                Subcategory
                <select
                  value={subCategory}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  <option value="" />
                  {category === "pants" && (
                    <optgroup label="Pants">
                      <option value="sweatpants">Sweatpants</option>
                      <option value="cargo">Cargo</option>
                      <option value="trousers">Trousers</option>
                    </optgroup>
                  )}
                  {category === "t-shirts" && (
                    <optgroup label="T-Shirts">
                      <option value="crop-top">Crop Top</option>
                      <option value="basic">Basic</option>
                      <option value="graphic">Graphic</option>
                      <option value="shirts">Shirts</option>
                    </optgroup>
                  )}
                  {category === "jeans" && (
                    <optgroup label="Jeans">
                      <option value="baggy">Baggy</option>
                      <option value="flare">Flare</option>
                      <option value="bootcut">Bootcut</option>
                    </optgroup>
                  )}
                  {category === "hoodies" && (
                    <optgroup label="Hoodies">
                      <option value="zip-up">Zip Up</option>
                      <option value="pullover">Pullover</option>
                    </optgroup>
                  )}
                  {category === "outerwear" && (
                    <optgroup label="Outerwear">
                      <option value="bombers">Bombers</option>
                      <option value="windbreakers">Windbreakers</option>
                      <option value="puffer-jackets">Puffer Jackets</option>
                    </optgroup>
                  )}
                </select>
              </label>
            </div>

            <div className="admin-products-descriptions">
              <label>
                Short description *
                <textarea
                  rows={4}
                  maxLength={160}
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                  }}
                />
              </label>
              <label>
                Full description *
                <textarea
                  rows={5}
                  maxLength={2000}
                  value={fullDescription}
                  onChange={(e) => {
                    setFullDescription(e.target.value);
                  }}
                />
              </label>
            </div>
          </section>

          <div className="admin-products-details">
            <section aria-labelledby="product-images-heading">
              <h2 id="product-images-heading">Product images</h2>
              <div className="admin-products-images">
                <label>
                  <span>Front image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setNewColor({
                          ...newColor,
                          front: file,
                        });
                      }
                    }}
                  />
                </label>
                <label>
                  <span>Back image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setNewColor({
                          ...newColor,
                          back: file,
                        });
                      }
                    }}
                  />
                </label>
              </div>
            </section>

            <section
              className="admin-products-colors"
              aria-labelledby="product-colors-heading"
            >
              <h3 id="product-colors-heading">Colors</h3>
              <div className="admin-products-color">
                <label>
                  Color name
                  <input
                    type="text"
                    value={newColor.name}
                    onChange={(e) => {
                      setNewColor({
                        ...newColor,
                        name: e.target.value,
                      });
                    }}
                  />
                </label>
                <label>
                  Hex code
                  <input
                    type="text"
                    value={newColor.value}
                    onChange={(e) => {
                      setNewColor({
                        ...newColor,
                        value: e.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <button type="button" onClick={addColor}>
                <span aria-hidden="true">+</span> Add color
              </button>
            </section>

            <section aria-labelledby="product-sizes-heading">
              <h3 id="product-sizes-heading">Sizes</h3>
            </section>

            <section aria-labelledby="product-inventory-heading">
              <h3 id="product-inventory-heading">Inventory (quantity)</h3>
              <table
                className="admin-products-inventory"
                aria-labelledby="product-inventory-heading"
              >
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">S</th>
                    <th scope="col">M</th>
                    <th scope="col">L</th>
                    <th scope="col">XL</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.map((q, index) => (
                    <tr key={index}>
                      <th>{q.name}</th>

                      <td>
                        <input
                          type="number"
                          min="0"
                          aria-label="S quantity"
                          value={q.sizes[0].quantity}
                          onChange={(e) => {
                            updateQuantity(index, 0, e.target.value);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          aria-label="M quantity"
                          value={q.sizes[1].quantity}
                          onChange={(e) => {
                            updateQuantity(index, 1, e.target.value);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          aria-label="L quantity"
                          value={q.sizes[2].quantity}
                          onChange={(e) => {
                            updateQuantity(index, 2, e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          aria-label="XXL quantity"
                          value={q.sizes[3].quantity}
                          onChange={(e) => {
                            updateQuantity(index, 3, e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="admin-products-attributes">
              <details>
                <summary>Material</summary>
                <input
                  type="text"
                  aria-label="Material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </details>
              <details>
                <summary>Fit</summary>
                <input
                  type="text"
                  aria-label="Fit"
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                />
              </details>
              <details>
                <summary>Gender</summary>
                <input
                  type="text"
                  aria-label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </details>
              <details>
                <summary>Season</summary>
                <input
                  type="text"
                  aria-label="Season"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
              </details>
              <details>
                <summary>Care</summary>
                <input
                  type="text"
                  aria-label="Care"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                />
              </details>
              <details>
                <summary>Country</summary>
                <input
                  type="text"
                  aria-label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </details>
              <details>
                <summary>Features</summary>
                <input
                  type="text"
                  aria-label="Features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </details>
              <details>
                <summary>Tags</summary>
                <input
                  type="text"
                  aria-label="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </details>
              <details>
                <summary>Styles</summary>
                <input
                  type="text"
                  aria-label="Styles"
                  value={styles}
                  onChange={(e) => setStyles(e.target.value)}
                />
              </details>
            </div>
          </div>
        </div>

        <footer className="admin-products-actions">
          <button type="button">Cancel</button>
          <button type="button">Save product</button>
        </footer>
      </main>
    </div>
  );
}
