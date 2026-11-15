import { Link } from "react-router-dom";
import "../styles/returnsExchanges.scss";
import { translations, translateDisplay } from "../locales/translations";

function ReturnsExchanges({ language }) {
  const text = translations[language];
  const { steps, accepted, excluded } = text.returnsExchanges;
  return (
    <article className="returns">
      <header className="returns__intro">
        <h1>
          {text.returnsExchanges.title}
        </h1>
        <div className="returns__summary">
          <span className="returns__accent" aria-hidden="true" />
          <p>
            {text.returnsExchanges.intro}
          </p>
        </div>
      </header>

      <section
        className="returns__terms"
        aria-label={text.returnsExchanges.termsLabel}
      >
        <div>
          <h2>{text.returnsExchanges.timeframe}</h2>
          <p className="returns__days">{text.returnsExchanges.days}</p>
        </div>
        <div>
          <h2>{text.returnsExchanges.condition}</h2>
          <p>
            {text.returnsExchanges.conditionText}
          </p>
        </div>
      </section>

      <section
        className="returns__process"
        aria-labelledby="returns-process-title"
      >
        <h2 id="returns-process-title" className="returns__heading">
          {text.returnsExchanges.howItWorks}
        </h2>
        <ol className="returns__steps">
          {steps.map(({ title, text: stepText }, index) => (
            <li key={translateDisplay(title, language)}>
              <span className="returns__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{translateDisplay(title, language)}</h3>
              <p>
                {index === 0 ? (
                  <>
                    <Link to="/support">{text.returnsExchanges.contactSupport}</Link>{text.returnsExchanges.contactSupportAfter}
                  </>
                ) : (
                  stepText
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="returns__conditions"
        aria-label={text.returnsExchanges.eligibleLabel}
      >
        <div>
          <h2 className="returns__heading">{text.returnsExchanges.acceptedTitle}</h2>
          <ul>
            {accepted.map((item) => (
              <li key={translateDisplay(item, language)}>
                <span aria-hidden="true">✓</span>
                {translateDisplay(item, language)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="returns__heading">{text.returnsExchanges.excludedTitle}</h2>
          <ul>
            {excluded.map((item) => (
              <li key={translateDisplay(item, language)}>
                <span aria-hidden="true">×</span>
                {translateDisplay(item, language)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

export default ReturnsExchanges;
