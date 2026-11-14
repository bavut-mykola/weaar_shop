import { Link } from "react-router-dom";
import "../styles/returnsExchanges.scss";

const steps = [
  {
    title: "Contact us",
    text: "Let us know you want to return or exchange an item. Have your order reference ready so we can help with the next steps.",
  },
  {
    title: "Send the item",
    text: "Pack the item securely and send it via Nova Poshta. Contact us to confirm the return destination before shipping your parcel.",
  },
  {
    title: "We check it",
    text: "After receiving the item, we’ll inspect its condition and check that the tags and original packaging are included.",
  },
  {
    title: "Get a refund or exchange",
    text: "Request a refund to your original payment method or an exchange for another size or item, subject to availability.",
  },
];
const accepted = [
  "Items in original condition",
  "With all tags attached",
  "In original packaging",
  "Within 14 days of receiving the order",
];
const excluded = [
  "Items with signs of use or washing",
  "Items without tags",
  "Underwear and socks",
  "Custom or personalized items",
];

function ReturnsExchanges() {
  return (
    <article className="returns">
      <header className="returns__intro">
        <h1>
          Returns &amp;
          <br />
          exchanges
        </h1>
        <div className="returns__summary">
          <span className="returns__accent" aria-hidden="true" />
          <p>
            Not the right fit? No worries - you can return or exchange your item
            within 14 days.
          </p>
        </div>
      </header>

      <section
        className="returns__terms"
        aria-label="Return timeframe and condition"
      >
        <div>
          <h2>Timeframe</h2>
          <p className="returns__days">14 days</p>
        </div>
        <div>
          <h2>Condition</h2>
          <p>
            The item must be unworn, unwashed, with all tags and original
            packaging.
          </p>
        </div>
      </section>

      <section
        className="returns__process"
        aria-labelledby="returns-process-title"
      >
        <h2 id="returns-process-title" className="returns__heading">
          How it works
        </h2>
        <ol className="returns__steps">
          {steps.map(({ title, text }, index) => (
            <li key={title}>
              <span className="returns__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{title}</h3>
              <p>
                {index === 0 ? (
                  <>
                    <Link to="/support">Contact our support</Link> to let us
                    know you want to return or exchange an item. Have your order
                    reference ready so we can help with the next steps.
                  </>
                ) : (
                  text
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="returns__conditions"
        aria-label="Items eligible for return"
      >
        <div>
          <h2 className="returns__heading">What can be returned</h2>
          <ul>
            {accepted.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="returns__heading">What can’t be returned</h2>
          <ul>
            {excluded.map((item) => (
              <li key={item}>
                <span aria-hidden="true">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

export default ReturnsExchanges;
