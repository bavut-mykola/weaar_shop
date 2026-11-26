import { Link } from "react-router-dom";
import "../styles/adminDashboard.scss";
import "../styles/adminProducts.scss";

export default function AdminProducts() {
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
          <section className="admin-products-basic" aria-labelledby="product-basic-heading">
            <h2 id="product-basic-heading">Basic information</h2>
            <label>Product name *<input /></label>
            <div className="admin-products-fields">
              <label>Price *<input type="number" /></label>
              <label>Old price<input type="number" /></label>
              <label>Category *<select><option value="" /></select></label>
              <label>Subcategory<select><option value="" /></select></label>
            </div>

            <div className="admin-products-descriptions">
              <label>
                Short description *
                <textarea rows={4} maxLength={160} />
              </label>
              <label>
                Full description *
                <textarea rows={5} maxLength={2000} />
              </label>
            </div>
          </section>

          <div className="admin-products-details">
            <section aria-labelledby="product-images-heading">
              <h2 id="product-images-heading">Product images</h2>
              <div className="admin-products-images">
                <label>
                  <span>Front image</span>
                  <input type="file" accept="image/*" />
                </label>
                <label>
                  <span>Back image</span>
                  <input type="file" accept="image/*" />
                </label>
              </div>
            </section>

            <section className="admin-products-colors" aria-labelledby="product-colors-heading">
              <h3 id="product-colors-heading">Colors</h3>
              <div className="admin-products-color">
                <label>Color name<input type="text" /></label>
                <label>Hex code<input type="text" /></label>
              </div>
              <button type="button"><span aria-hidden="true">+</span> Add color</button>
            </section>

            <section aria-labelledby="product-sizes-heading">
              <h3 id="product-sizes-heading">Sizes</h3>
              <div className="admin-products-sizes">
                <button type="button">S</button>
                <button type="button">M</button>
                <button type="button">L</button>
                <button type="button">XL</button>
                <button type="button">XXL</button>
              </div>
            </section>

            <section aria-labelledby="product-inventory-heading">
              <h3 id="product-inventory-heading">Inventory</h3>
              <table className="admin-products-inventory" aria-labelledby="product-inventory-heading">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">S</th>
                    <th scope="col">M</th>
                    <th scope="col">L</th>
                    <th scope="col">XL</th>
                    <th scope="col">XXL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Quantity</th>
                    <td><input type="number" min="0" aria-label="S quantity" /></td>
                    <td><input type="number" min="0" aria-label="M quantity" /></td>
                    <td><input type="number" min="0" aria-label="L quantity" /></td>
                    <td><input type="number" min="0" aria-label="XL quantity" /></td>
                    <td><input type="number" min="0" aria-label="XXL quantity" /></td>
                  </tr>
                </tbody>
              </table>
            </section>

            <div className="admin-products-attributes">
              <details>
                <summary>Material</summary>
                <input type="text" aria-label="Material" />
              </details>
              <details>
                <summary>Fit</summary>
                <input type="text" aria-label="Fit" />
              </details>
              <details>
                <summary>Gender</summary>
                <input type="text" aria-label="Gender" />
              </details>
              <details>
                <summary>Season</summary>
                <input type="text" aria-label="Season" />
              </details>
              <details>
                <summary>Care</summary>
                <input type="text" aria-label="Care" />
              </details>
              <details>
                <summary>Country</summary>
                <input type="text" aria-label="Country" />
              </details>
              <details>
                <summary>Features</summary>
                <input type="text" aria-label="Features" />
              </details>
              <details>
                <summary>Tags</summary>
                <input type="text" aria-label="Tags" />
              </details>
              <details>
                <summary>Styles</summary>
                <input type="text" aria-label="Styles" />
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
