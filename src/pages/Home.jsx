import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCollection from "../components/HomeCollection";
import { API_URL } from "../api";
import { homeCategories, selectHomeProducts } from "../utils/homeProducts.mjs";
import "../styles/home.scss";

const collectionCards = Array.from({ length: 3 }, (_, index) => index + 1);
const statistics = [
  { value: "2500+", lines: ["high-quality", "Products"] },
  { value: "18,000+", lines: ["happy", "Customers"] },
];

function Home() {
  const [homeProducts, setHomeProducts] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/api/products/search-data`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load products");
        const products = await response.json();
        if (!Array.isArray(products)) throw new Error("Invalid products response");
        setHomeProducts(selectHomeProducts(products));
      } catch (error) {
        if (error.name !== "AbortError") setError("We couldn’t load the products. Please try again.");
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [attempt]);

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <h1 id="home-title">Wear what feels right</h1>
          <p className="home-hero__description">
            Simple clothes for every day.<br />Made to fit your style.
          </p>
          <Link className="home-button home-hero__button" to="/catalog">View collection</Link>
          <div className="home-hero__stats" aria-label="Store statistics">
            {statistics.map(({ value, lines }) => (
              <div className="home-hero__stat" key={value}>
                <strong>{value}</strong>
                <span>{lines[0]}<br />{lines[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <img className="home-hero__image" src="/images/home_background.png" alt="Model wearing a black zip-up hoodie" />
      </section>

      <section className="home-collection" id="collection" aria-labelledby="collection-title">
        <h2 id="collection-title">The Collection</h2>
        {error ? (
          <div className="home-products-status" role="status">
            <p>{error}</p>
            <button className="home-button" type="button" onClick={() => {
              setError("");
              setAttempt((value) => value + 1);
            }}>Try again</button>
          </div>
        ) : !homeProducts ? (
          <div className="home-collection__grid" aria-label="Loading collection" aria-busy="true">
            {collectionCards.map((card) => <div className="home-collection__card" key={card} />)}
          </div>
        ) : homeProducts.collection.length ? (
          <HomeCollection products={homeProducts.collection} />
        ) : <p className="home-products-status">New products are coming soon.</p>}
        <Link className="home-collection__all" to="/catalog">View All</Link>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <h2 id="categories-title">SHOP BY CATEGORY</h2>
        <div className="home-categories__grid">
          {(homeProducts?.categories ?? homeCategories).map(({ key, label, product }) => (
            <Link className="home-categories__card" key={key} to={`/catalog?category=${encodeURIComponent(key)}`} aria-label={`Shop ${label}`}>
              {product && <img className="home-categories__image" src={product.images.front} alt={product.name} loading="lazy" />}
              <span className="home-button">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-story" id="our-story" aria-labelledby="story-title">
        <h2 id="story-title">OUR STORY</h2>
        <div className="home-story__content">
          <div className="home-story__copy">
            <h3>EVERYDAY CLOTHING.<br />INDIVIDUAL STYLE.</h3>
            <p>W.EAR brings together everyday pieces with a simple idea: getting dressed should feel natural. Familiar shapes, understated colours, and room to make each look your own.</p>
            <p>From the jeans you reach for every morning to the layer you take everywhere, we’re drawn to clothing that fits into your life. Easy to combine, easy to wear, and always open to a different interpretation.</p>
            <p className="home-story__tagline">Wear it your way.</p>
          </div>
          <img className="home-story__image" src="/about_us_2.png" alt="Everyday clothing hanging on a rack" loading="lazy" />
        </div>
      </section>
    </div>
  );
}

export default Home;
