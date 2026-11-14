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
          Find out how we deliver your order and which payment options are
          available. Choose the option that fits your day and review all order
          details before completing checkout.
        </p>
      </header>

      <section
        className="delivery-payment__section"
        aria-labelledby="delivery-heading"
      >
        <h2 id="delivery-heading">
          <span>Delivery</span>
        </h2>
        <div className="delivery-payment__columns">
          <div>
            <h3>Post office</h3>
            <p>
              Delivery to a Nova Poshta branch in Ukraine. Select post office
              delivery at checkout and enter your city and branch number so the
              destination is clear.
            </p>
            <p>
              Check the branch details and recipient information before placing
              your order. Choose a location that is convenient for you to visit
              and check its opening hours before collecting your parcel.
            </p>
            <dl>
              <div>
                <dt>Delivery time</dt>
                <dd>Depends on destination and carrier availability</dd>
              </div>
              <div>
                <dt>Cost</dt>
                <dd>Shown in your order summary</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3>Home delivery</h3>
            <p>
              Choose home delivery to have your order sent to your address.
              Enter your city and full street address, including the building
              and apartment number where applicable.
            </p>
            <p>
              Use a phone number where you can be reached about the delivery.
              Review the address carefully, and contact support if you notice an
              error after placing your order so the available next steps can be
              checked.
            </p>
            <dl>
              <div>
                <dt>Delivery time</dt>
                <dd>Depends on destination and carrier availability</dd>
              </div>
              <div>
                <dt>Cost</dt>
                <dd>Shown in your order summary</dd>
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
          <span>Payment</span>
        </h2>
        <div className="delivery-payment__columns">
          <div>
            <h3>Cash on delivery</h3>
            <p>
              Select cash on delivery at checkout to choose payment upon
              receiving your order. Review the items, quantities and total
              before confirming your purchase.
            </p>
            <p>
              Check the payment arrangements available at your selected branch
              or with the courier before collection. If you have questions about
              the amount or any applicable carrier fees, clarify them before
              accepting the parcel.
            </p>
          </div>
          <div>
            <h3>Online payment</h3>
            <p>
              The checkout also includes a card payment option. Select your
              preferred payment method and review the order summary, including
              discounts and the delivery fee, before submitting your order.
            </p>
            <p>
              W.EAR is currently a demo store. Please do not enter real payment
              details or personal information. The card fields demonstrate the
              checkout experience; they do not represent a live payment service.
            </p>
          </div>
        </div>
      </section>

      <section
        className="delivery-payment__section"
        aria-labelledby="delivery-information-heading"
      >
        <h2 id="delivery-information-heading">
          <span>Important information</span>
        </h2>
        <ul>
          <li>
            Review your chosen sizes, colours and quantities before placing an
            order.
          </li>
          <li>
            Check the recipient’s name, phone number and delivery destination
            carefully.
          </li>
          <li>
            Delivery timing depends on your region, carrier operations and the
            availability of the selected service.
          </li>
          <li>
            The delivery fee included in your purchase is displayed in the cart
            and checkout summary.
          </li>
          <li>
            Keep your order confirmation and reference handy when asking about a
            purchase.
          </li>
          <li>
            If tracking information is provided, use it to check your parcel’s
            progress with the carrier.
          </li>
          <li>
            For an address change or an unclear order status, contact support
            before placing a second order.
          </li>
          <li>
            If you have any questions, visit our{" "}
            <Link to="/support">Support page</Link> or use the contact details
            in the footer.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default DeliveryPayment;
