import "../styles/home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero__copy">
        <h1 className="home-hero__title" id="home-title">
          Wear what feels right
        </h1>

        <p className="home-hero__description">
          Simple clothes for every day.
          <br />
          Made to fit your style.
        </p>

        <Link className="home-hero__button" to="/catalog">
          View collection
        </Link>

        <div className="home-hero__stats" aria-label="Store statistics">
          <div className="home-hero__stat">
            <strong>2500+</strong>
            <span>
              high-quality
              <br />
              Products
            </span>
          </div>
          <div className="home-hero__stat">
            <strong>18,000+</strong>
            <span>
              happy
              <br />
              Customers
            </span>
          </div>
        </div>
      </div>

      <div className="home-hero__placeholder" aria-hidden="true" />
    </section>
  );
}

export default Home;
