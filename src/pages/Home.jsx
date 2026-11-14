import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCollection from "../components/HomeCollection";
import { API_URL } from "../api";
import { selectHomeProducts } from "../utils/homeProducts.mjs";
import { categories } from "../../categories";
import "../styles/home.scss";

const collectionCards = Array.from({ length: 3 }, (_, index) => index + 1);
const statistics = [
  { value: "2,500+", lines: ["high-quality", "Products"] },
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
        if (!Array.isArray(products))
          throw new Error("Invalid products response");
        setHomeProducts(selectHomeProducts(products));
      } catch (error) {
        if (error.name !== "AbortError")
          setError("We couldn’t load the products. Please try again.");
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
            Simple clothes for every day.
            <br />
            Made to fit your style.
          </p>
          <Link className="home-button home-hero__button" to="/catalog">
            View collection
          </Link>
          <div className="home-hero__stats" aria-label="Store statistics">
            {statistics.map(({ value, lines }) => (
              <div className="home-hero__stat" key={value}>
                <strong>{value}</strong>
                <span>
                  {lines[0]}
                  <br />
                  {lines[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <img
          className="home-hero__image"
          src="/images/home_background.png"
          alt="Model wearing a black zip-up hoodie"
        />
      </section>

      <section
        className="home-collection"
        id="collection"
        aria-labelledby="collection-title"
      >
        <h2 id="collection-title">The Collection</h2>
        {error ? (
          <div className="home-products-status" role="status">
            <p>{error}</p>
            <button
              className="home-button"
              type="button"
              onClick={() => {
                setError("");
                setAttempt((value) => value + 1);
              }}
            >
              Try again
            </button>
          </div>
        ) : !homeProducts ? (
          <div
            className="home-collection__grid"
            aria-label="Loading collection"
            aria-busy="true"
          >
            {collectionCards.map((card) => (
              <div className="home-collection__card" key={card} />
            ))}
          </div>
        ) : homeProducts.collection.length ? (
          <HomeCollection products={homeProducts.collection} />
        ) : (
          <p className="home-products-status">New products are coming soon.</p>
        )}
        <Link className="home-collection__all" to="/catalog">
          View All
        </Link>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <h2 id="categories-title">SHOP BY CATEGORY</h2>
        <div className="home-categories__grid">
          {categories.map(({ key, label, src, alt }) => (
            <Link
              className="home-categories__card"
              key={key}
              to={`/catalog?category=${encodeURIComponent(key)}`}
              aria-label={`Shop ${label}`}
            >
              <img
                className={`home-categories__image${key === "hoodies" || key === "outerwear" ? " home-categories__image--contain" : ""}`}
                src={src}
                alt={alt}
              />
              <span className="home-button">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="home-story"
        id="our-story"
        aria-labelledby="story-title"
      >
        <h2 id="story-title">OUR STORY</h2>
        <div className="home-story__content">
          <div className="home-story__copy">
            <h3>
              EVERYDAY CLOTHING.
              <br />
              INDIVIDUAL STYLE.
            </h3>
            <p>
              W.EAR brings together everyday pieces with a simple idea: getting
              dressed should feel natural. Familiar shapes, understated colours,
              and room to make each look your own.
            </p>
            <p>
              From the jeans you reach for every morning to the layer you take
              everywhere, we’re drawn to clothing that fits into your life. Easy
              to combine, easy to wear, and always open to a different
              interpretation.
            </p>
            <p className="home-story__tagline">Wear it your way.</p>
          </div>
          <img
            className="home-story__image"
            src="/about_us_2.png"
            alt="Everyday clothing hanging on a rack"
            loading="lazy"
          />
        </div>
      </section>

      <section className="home-guide" aria-labelledby="home-guide-title">
        <h2 id="home-guide-title">Welcome to the W.EAR online store</h2>
        <p>
          Discover everyday clothing that fits your life and your style. Explore
          our collection of jeans, T-shirts, hoodies, and outerwear, and put
          together a wardrobe you’ll love to wear.
        </p>

        <h3>Why shop at W.EAR?</h3>
        <p>
          Great outfits start with pieces that feel right. When choosing your
          next wardrobe essential, look for:
        </p>
        <ol>
          <li>Quality. Well-finished details and fabrics suited to everyday wear.</li>
          <li>Versatility. Simple pieces that work with the clothes you already own.</li>
          <li>Style. Familiar silhouettes with room for your own interpretation.</li>
          <li>Practicality. Layers and essentials for different seasons and occasions.</li>
          <li>Comfort. A fit that lets you move freely throughout your day.</li>
        </ol>
        <p>
          Browse the collection to find a new favourite or build a look around
          the essentials. A few thoughtfully chosen pieces can open up plenty
          of possibilities.
        </p>
        <p>Explore the everyday staples in our online store:</p>
        <ul>
          <li>T-shirts — an easy starting point for casual outfits and layering.</li>
          <li>Jeans — a wardrobe staple to dress up or keep relaxed.</li>
          <li>Hoodies — comfortable layers for laid-back days.</li>
          <li>Outerwear — the finishing touch when the temperature drops.</li>
        </ul>

        <h3>The details that make a difference</h3>
        <p>
          The right clothing balances how it looks with how it feels. Check each
          product’s description and photos to get to know its fabric, shape, and
          finishing details before you choose.
        </p>
        <p>Here are a few things to consider:</p>
        <ul>
          <li>Fabric — choose a material that suits the weather and your routine.</li>
          <li>Fit — compare relaxed, regular, and fitted shapes to find your preference.</li>
          <li>Layers — leave enough room to wear your favourite pieces together.</li>
          <li>Details — look at pockets, fastenings, cuffs, and seams.</li>
          <li>Care — follow the garment’s care label to help keep it looking its best.</li>
        </ul>

        <h3>How to choose your next everyday favourite</h3>
        <p>
          Start with how you’ll wear it. Whether you’re getting dressed for a
          busy day, a relaxed weekend, or a change in season, choose pieces that
          suit your plans and feel natural to you.
        </p>
        <p>
          Use the catalog’s categories and filters to narrow down your options.
          Take a closer look at the product photos and available sizes, and
          consider how each piece will work with the rest of your wardrobe.
        </p>
        <p>
          Think about your preferred fit, too. Allow room for movement and any
          layers you plan to wear underneath. Finish with colours and shapes
          you enjoy, and make the look your own.
        </p>
      </section>
    </div>
  );
}

export default Home;
