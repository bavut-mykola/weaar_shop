import { Link } from "react-router-dom";
import "../styles/privacyPolicy.scss";

function PrivacyPolicy() {
  return (
    <article className="privacy-policy home-guide" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Privacy Policy</h1>
      <p>
        This page explains how information is used when you browse W.EAR, create
        an account or try the checkout. It describes the information involved in
        these features, the role of cookies and browser storage, and where to go
        if you have a question about your data.
      </p>
      <p>
        W.EAR is a demonstration store. Please use fictional details when trying
        account and checkout features, and do not submit real personal or payment
        information. Demo submissions can still be saved by the application;
        the demonstration label does not mean that everything disappears when
        you close your browser.
      </p>

      <h2>Information you provide</h2>
      <p>The information involved depends on which features you choose to use:</p>
      <ul>
        <li>Account registration uses an email address and password. The application stores a password hash rather than the original password.</li>
        <li>Your account profile can include a name, phone number and profile image if you choose to provide them.</li>
        <li>When Google sign-in is configured and you choose to use it, the application receives account information including your Google identifier, email address and display name.</li>
        <li>Your cart contains selected products, sizes, colours and quantities, associated with a guest identifier or a signed-in account.</li>
        <li>Checkout uses recipient and contact details, a delivery destination, your chosen payment method and the items included in your order.</li>
      </ul>
      <p>
        Provide only the information needed to try a feature. If you contact the
        store about an issue, avoid including passwords, sign-in codes or card
        information in your message. An order reference and a short description
        of the issue are a better starting point.
      </p>

      <h2>How the application uses information</h2>
      <p>
        Account information supports registration, sign-in and profile
        management. Session information helps the server recognise a signed-in
        visitor. Cart information lets the application retrieve your selected
        items and connect a guest cart to your account when you sign in.
      </p>
      <p>
        The checkout records order information so the application can show an
        order confirmation and order details. Selecting a payment method is part
        of the demo flow. It does not mean a real payment has been processed or
        that a parcel will be dispatched. Please do not enter real card details
        into the demonstration checkout.
      </p>

      <h2>Cookies and browser storage</h2>
      <p>
        W.EAR uses a session cookie to connect browser requests to a server-side
        session. The current application configures this cookie with a one-day
        lifetime. Session behaviour also depends on your browser settings and
        whether you sign out or clear cookies.
      </p>
      <p>The site also uses local storage in your browser for:</p>
      <ol>
        <li>A guest identifier used to retrieve your guest cart.</li>
        <li>Cached sign-in state and the account email used by the interface.</li>
        <li>Your preference to dismiss the demo-store notice.</li>
      </ol>
      <p>
        Local storage can remain after you close a tab. You can remove it through
        your browser’s site-data settings. Clearing cookies or local storage may
        sign you out, reset the notice or disconnect the browser from a guest
        cart. Clearing browser data does not itself delete records already stored
        on the server.
      </p>

      <h2>Storage and connected services</h2>
      <p>
        Account, cart, session and order features use the application’s backend
        and database. Requests to the site also pass through the infrastructure
        used to host it. Operational logs may contain request or session-related
        information used while maintaining and troubleshooting the application.
      </p>
      <p>
        Google sign-in, when enabled, involves a connection to Google. Review
        the information shown in the sign-in flow before continuing. A delivery
        carrier’s name or a payment option shown in this demo does not by itself
        mean your information has been sent to that service.
      </p>

      <h2>Managing your information</h2>
      <p>
        You can review and edit the profile fields available in your account
        settings. The site also offers an account deletion action. Removing an
        account and clearing your browser’s site data are different actions:
        browser settings affect information on your device, while account
        deletion acts on the application’s account records.
      </p>
      <p>
        Some information, such as order records or operational logs, may exist
        separately from your profile. This page does not promise that deleting
        an account immediately removes every related record or backup. For
        questions about stored information, corrections or deletion, use the
        contact options described on the <Link to="/support">Support page</Link>.
        Do not send sensitive information with your initial request.
      </p>

      <h2>Keeping your details private</h2>
      <p>
        Use fictional information while exploring this demonstration. If you
        create a demo password, choose one you do not use elsewhere. Sign out
        after using a shared device and review saved browser data before leaving
        it for another person to use. No online application can offer an absolute
        guarantee against every security risk.
      </p>

      <h2>Questions and updates</h2>
      <p>
        If you are unsure how a feature uses information, visit our
        <Link to="/support"> Support page</Link> and use the contact options listed
        on the site. Explain which feature your question concerns so it can be
        understood without sharing unnecessary personal details.
      </p>
      <p>
        This page should be updated when the site’s account, storage, checkout
        or connected-service features change. Before using a new feature,
        review the information shown alongside it and the current version of
        this page.
      </p>
    </article>
  );
}

export default PrivacyPolicy;
