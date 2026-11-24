import { Link } from "react-router-dom";
import "../styles/privacyPolicy.scss";
import { translations } from "../locales/translations";

function PrivacyPolicy({ language }) {
  const text = translations[language];
  return (
    <article
      className="privacy-policy home-guide"
      aria-labelledby="privacy-title"
    >
      <h1 id="privacy-title">{text.privacyPolicy.title}</h1>
      <p>
        {text.privacyPolicy.intro}
      </p>
      <p>
        {text.privacyPolicy.demoWarning}
      </p>

      <h2>{text.privacyPolicy.informationTitle}</h2>
      <p>
        {text.privacyPolicy.informationIntro}
      </p>
      <ul>
        <li>
          {text.privacyPolicy.informationItems[0]}
        </li>
        <li>
          {text.privacyPolicy.informationItems[1]}
        </li>
        <li>
          {text.privacyPolicy.informationItems[2]}
        </li>
        <li>
          {text.privacyPolicy.informationItems[3]}
        </li>
        <li>
          {text.privacyPolicy.informationItems[4]}
        </li>
      </ul>
      <p>
        {text.privacyPolicy.provideOnlyNeeded}
      </p>

      <h2>{text.privacyPolicy.usageTitle}</h2>
      <p>
        {text.privacyPolicy.accountUsage}
      </p>
      <p>
        {text.privacyPolicy.checkoutUsage}
      </p>

      <h2>{text.privacyPolicy.storageTitle}</h2>
      <p>
        {text.privacyPolicy.sessionCookies}
      </p>
      <p>{text.privacyPolicy.storageIntro}</p>
      <ol>
        <li>{text.privacyPolicy.storageItems[0]}</li>
        <li>
          {text.privacyPolicy.storageItems[1]}
        </li>
        <li>{text.privacyPolicy.storageItems[2]}</li>
      </ol>
      <p>
        {text.privacyPolicy.clearBrowserData}
      </p>

      <h2>{text.privacyPolicy.servicesTitle}</h2>
      <p>
        {text.privacyPolicy.backendStorage}
      </p>
      <p>
        {text.privacyPolicy.connectedServices}
      </p>

      <h2>{text.privacyPolicy.manageTitle}</h2>
      <p>
        {text.privacyPolicy.profileManagement}
      </p>
      <p>
        {text.privacyPolicy.retention[0]}
        <Link to="/support">{text.privacyPolicy.retention[1]}</Link>
        {text.privacyPolicy.retention[2]}
      </p>

      <h2>{text.privacyPolicy.privacyTitle}</h2>
      <p>
        {text.privacyPolicy.protectDetails}
      </p>

      <h2>{text.privacyPolicy.updatesTitle}</h2>
      <p>
        {text.privacyPolicy.questions[0]}
        <Link to="/support">{text.privacyPolicy.questions[1]}</Link>
        {text.privacyPolicy.questions[2]}
      </p>
      <p>
        {text.privacyPolicy.updates}
      </p>
    </article>
  );
}

export default PrivacyPolicy;
