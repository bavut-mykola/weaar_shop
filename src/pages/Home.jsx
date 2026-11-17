import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCollection from "../components/HomeCollection";
import { API_URL } from "../api";
import { selectHomeProducts } from "../utils/homeProducts.mjs";
import { categories } from "../../categories";
import "../styles/home.scss";
import { translations, translateDisplay } from "../locales/translations";

const collectionCards = Array.from({ length: 3 }, (_, index) => index + 1);

function Home({ language }) {
  const [homeProducts, setHomeProducts] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const text = translations[language];

  const statistics = [
    {
      value: "2,500+",
      lines: [text.home.qualityLine1, text.home.qualityLine2],
    },
    {
      value: "18,000+",
      lines: [text.home.customersLine1, text.home.customersLine2],
    },
  ];

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
          <h1 id="home-title">{text.home.title}</h1>
          <p className="home-hero__description">
            {text.home.descriptionLine1}
            <br />
            {text.home.descriptionLine2}
          </p>
          <Link className="home-button home-hero__button" to="/catalog">
            {text.home.viewCollection}
          </Link>
          <div className="home-hero__stats" aria-label={text.home.statistics}>
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
          src="/main_homePage.jpeg"
          alt={text.home.heroImageAlt}
        />
      </section>

      <section
        className="home-collection"
        id="collection"
        aria-labelledby="collection-title"
      >
        <h2 id="collection-title">{text.home.collection}</h2>
        {error ? (
          <div className="home-products-status" role="status">
            <p>{translateDisplay(error, language)}</p>
            <button
              className="home-button"
              type="button"
              onClick={() => {
                setError("");
                setAttempt((value) => value + 1);
              }}
            >
              {text.common.tryAgain}
            </button>
          </div>
        ) : !homeProducts ? (
          <div
            className="home-collection__grid"
            aria-label={text.home.loadingCollection}
            aria-busy="true"
          >
            {collectionCards.map((card) => (
              <div className="home-collection__card" key={card} />
            ))}
          </div>
        ) : homeProducts.collection.length ? (
          <HomeCollection
            products={homeProducts.collection}
            language={language}
          />
        ) : (
          <p className="home-products-status">{text.home.comingSoon}</p>
        )}
        <Link className="home-collection__all" to="/catalog">
          {text.home.viewAll}
        </Link>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <h2 id="categories-title">{text.home.shopByCategory}</h2>
        <div className="home-categories__grid">
          {categories.map(({ key, label, src }) => (
            <Link
              className="home-categories__card"
              key={key}
              to={`/catalog?category=${encodeURIComponent(key)}`}
              aria-label={`Shop ${translateDisplay(label, language)}`}
            >
              <img
                className={`home-categories__image${key === "hoodies" || key === "outerwear" ? " home-categories__image--contain" : ""}`}
                src={src}
                alt={text.categories[key]}
              />
              <span className="home-button">
                {translateDisplay(label, language)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="home-story"
        id="our-story"
        aria-labelledby="story-title"
      >
        <h2 id="story-title">{text.home.storyTitle}</h2>
        <div className="home-story__content">
          <div className="home-story__copy">
            <h3>
              {text.home.storyHeadingLine1}
              <br />
              {text.home.storyHeadingLine2}
            </h3>
            <p>{text.home.storyIntro}</p>
            <p>{text.home.storyEveryday}</p>
            <p className="home-story__tagline">{text.home.tagline}</p>
          </div>
          <img
            className="home-story__image"
            src="/about_us_2.png"
            alt={text.home.storyImageAlt}
            loading="lazy"
          />
        </div>
      </section>

      <section className="home-guide" aria-labelledby="home-guide-title">
        <h2 id="home-guide-title">{text.home.guideTitle}</h2>
        <p>{text.home.guideIntro}</p>

        <h3>{text.home.whyShop}</h3>
        <p>{text.home.benefitsIntro}</p>
        <ol>
          <li>{text.home.benefits[0]}</li>
          <li>{text.home.benefits[1]}</li>
          <li>{text.home.benefits[2]}</li>
          <li>{text.home.benefits[3]}</li>
          <li>{text.home.benefits[4]}</li>
        </ol>
        <p>{text.home.findFavourite}</p>
        <p>{text.home.staplesIntro}</p>
        <ul>
          <li>{text.home.staples[0]}</li>
          <li>{text.home.staples[1]}</li>
          <li>{text.home.staples[2]}</li>
          <li>{text.home.staples[3]}</li>
        </ul>

        <h3>{text.home.detailsTitle}</h3>
        <p>{text.home.detailsText}</p>
        <p>{text.home.detailsIntro}</p>
        <ul>
          <li>{text.home.detailsList[0]}</li>
          <li>{text.home.detailsList[1]}</li>
          <li>{text.home.detailsList[2]}</li>
          <li>{text.home.detailsList[3]}</li>
          <li>{text.home.detailsList[4]}</li>
        </ul>

        <h3>{text.home.chooseTitle}</h3>
        <p>{text.home.chooseOccasion}</p>
        <p>{text.home.chooseFilters}</p>
        <p>{text.home.chooseFit}</p>
      </section>
    </div>
  );
}

export default Home;
