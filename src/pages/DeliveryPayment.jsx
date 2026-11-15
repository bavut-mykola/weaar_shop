import { Link } from "react-router-dom";
import "../styles/deliveryPayment.scss";
import { translations } from "../locales/translations";

function DeliveryPayment({ language }) {
  const text = translations[language];
  return (
    <article className="delivery-payment">
      <header className="delivery-payment__intro">
        <h1>
          Delivery &amp;
          <br />
          payment
        </h1>
        <span className="delivery-payment__accent" aria-hidden="true" />
        <p>
          {text.deliveryPayment.intro}
        </p>
      </header>

      <section
        className="delivery-payment__section"
        aria-labelledby="delivery-heading"
      >
        <h2 id="delivery-heading">
          <span>{text.deliveryPayment.delivery}</span>
        </h2>
        <div className="delivery-payment__columns">
          <div>
            <h3>{text.deliveryPayment.postOffice}</h3>
            <p>
              {text.deliveryPayment.postOfficeDescription}
            </p>
            <p>
              {text.deliveryPayment.postOfficeAdvice}
            </p>
            <dl>
              <div>
                <dt>{text.deliveryPayment.deliveryTime}</dt>
                <dd>{text.deliveryPayment.deliveryTimeValue}</dd>
              </div>
              <div>
                <dt>{text.deliveryPayment.cost}</dt>
                <dd>{text.deliveryPayment.costValue}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3>{text.deliveryPayment.homeDelivery}</h3>
            <p>
              {text.deliveryPayment.homeDescription}
            </p>
            <p>
              {text.deliveryPayment.homeAdvice}
            </p>
            <dl>
              <div>
                <dt>{text.deliveryPayment.deliveryTime}</dt>
                <dd>{text.deliveryPayment.deliveryTimeValue}</dd>
              </div>
              <div>
                <dt>{text.deliveryPayment.cost}</dt>
                <dd>{text.deliveryPayment.costValue}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        className="delivery-payment__section"
        aria-labelledby="payment-heading"
      >
        <h2 id="payment-heading">
          <span>{text.deliveryPayment.payment}</span>
        </h2>
        <div className="delivery-payment__columns">
          <div>
            <h3>{text.deliveryPayment.cash}</h3>
            <p>
              {text.deliveryPayment.cashDescription}
            </p>
            <p>
              {text.deliveryPayment.cashAdvice}
            </p>
          </div>
          <div>
            <h3>{text.deliveryPayment.onlinePayment}</h3>
            <p>
              {text.deliveryPayment.onlineDescription}
            </p>
            <p>
              {text.deliveryPayment.demoWarning}
            </p>
          </div>
        </div>
      </section>

      <section
        className="delivery-payment__section"
        aria-labelledby="delivery-information-heading"
      >
        <h2 id="delivery-information-heading">
          <span>{text.deliveryPayment.importantTitle}</span>
        </h2>
        <ul>
          <li>
            {text.deliveryPayment.importantItems[0]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[1]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[2]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[3]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[4]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[5]}
          </li>
          <li>
            {text.deliveryPayment.importantItems[6]}
          </li>
          <li>
            If you have any questions, visit our{" "}
            <Link to="/support">{text.deliveryPayment.supportLink}</Link> or use the contact details
            in the footer.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default DeliveryPayment;
