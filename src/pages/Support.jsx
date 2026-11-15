import "../styles/support.scss";
import { translations } from "../locales/translations";

function Support({ language }) {
  const text = translations[language];
  return (
    <article className="support" aria-label={text.support.label}>
      <section
        className="home-guide support__section"
        aria-labelledby="support-help"
      >
        <h1 id="support-help">{text.support.title}</h1>
        <p>
          {text.support.choosingProducts}
        </p>
        <p>
          {text.support.reviewOrder}
        </p>
        <p>
          {text.support.contactAdvice}
        </p>
        <p>
          {text.support.deliveryReturnsAdvice}
        </p>
      </section>

      <section
        className="home-guide support__section"
        aria-labelledby="support-shopping"
      >
        <h2 id="support-shopping">{text.support.shoppingTitle}</h2>
        <p>
          {text.support.browsingHelp}
        </p>
        <p>
          {text.support.signInHelp}
        </p>
        <p>
          {text.support.checkoutHelp}
        </p>
        <p>
          {text.support.feedback}
        </p>
      </section>
    </article>
  );
}

export default Support;
