import { Link } from "react-router-dom";
import "../styles/about.scss";
import { translations } from "../locales/translations";

function About({ language }) {
  const text = translations[language];
  return (
    <article className="about">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero__intro">
          <p className="about-hero__eyebrow">{text.about.eyebrow}</p>
          <p className="about-hero__description">
            {text.about.intro}
          </p>
          <span className="about-hero__line" aria-hidden="true" />
        </div>
        <img
          className="about-hero__image"
          src="/about_page.png"
          alt={text.about.imageAlt}
          fetchPriority="high"
          width="1122"
          height="1402"
        />
        <h1 id="about-title" className="about-hero__title">
          <span>{text.about.title}</span>
          <span>W.EAR</span>
        </h1>
      </section>

      <section
        className="home-guide about-section"
        aria-labelledby="about-everyday"
      >
        <h2 id="about-everyday">
          {text.about.everydayTitle}
        </h2>
        <p>
          {text.about.everydayIdea}
        </p>
        <p>
          {text.about.personalStyle}
        </p>
        <p>
          {text.about.realLife}
        </p>
        <p>
          {text.about.favouriteDetails}
        </p>
        <p>
          {text.about.dailyRoutine}
        </p>
        <p>
          {text.about.familiarFoundation}
        </p>
        <p>
          {text.about.colour}
        </p>
        <p>
          {text.about.changingStyle}
        </p>
        <p>
          {text.about.exploreAtYourPace}
        </p>
      </section>

      <section
        className="home-guide about-section"
        aria-labelledby="about-details"
      >
        <h2 id="about-details">{text.about.detailsTitle}</h2>
        <p>
          {text.about.wardrobeAsWhole}
        </p>
        <h3>{text.about.comfortTitle}</h3>
        <p>
          {text.about.comfortText}
        </p>
        <h3>{text.about.essentialsTitle}</h3>
        <p>
          {text.about.versatility}
        </p>
        <p>
          {text.about.careText}
        </p>
        <p>
          {text.about.proportion}
        </p>
        <p>
          {text.about.layering}
        </p>
        <p>
          {text.about.texture}
        </p>
        <p>
          {text.about.fitReference}
        </p>
        <p>
          {text.about.differentSettings}
        </p>
        <p>
          {text.about.imagineOutfits}
        </p>
        <p>
          {text.about.careHabits}
        </p>
        <p>
          {text.about.detailsTogether}
        </p>
      </section>

      <section
        className="home-guide about-section"
        aria-labelledby="about-conclusion"
      >
        <h2 id="about-conclusion">{text.about.conclusionTitle}</h2>
        <p>
          {text.about.brandPurpose}
        </p>
        <p>
          {text.about.exploreWardrobe}
        </p>
        <p>
          {text.about.dailyPossibilities}
        </p>
        <p>
          {text.about.wardrobeStory}
        </p>
        <p>
          {text.about.yourPace}
        </p>
        <p>
          {text.about.styleFreedom}
        </p>
        <p>
          {text.about.brandSpirit}
        </p>
        <p>{text.about.tagline}</p>
        <Link className="about-section__link" to="/catalog">
          {text.about.exploreCollection} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}

export default About;
