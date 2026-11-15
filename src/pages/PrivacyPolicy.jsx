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
        Some information, such as order records or operational logs, may exist
        separately from your profile. This page does not promise that deleting
        an account immediately removes every related record or backup. For
        questions about stored information, corrections or deletion, use the
        contact options described on the <Link to="/support">{text.privacyPolicy.supportLink}</Link>
        . Do not send sensitive information with your initial request.
      </p>

      <h2>{text.privacyPolicy.privacyTitle}</h2>
      <p>
        {text.privacyPolicy.protectDetails}
      </p>

      <h2>{text.privacyPolicy.updatesTitle}</h2>
      <p>
        If you are unsure how a feature uses information, visit our
        <Link to="/support"> {text.privacyPolicy.supportLink}</Link> and use the contact options
        listed on the site. Explain which feature your question concerns so it
        can be understood without sharing unnecessary personal details.
      </p>
      <p>
        {text.privacyPolicy.updates}
      </p>
    </article>
  );
}

export default PrivacyPolicy;
