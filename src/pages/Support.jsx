import "../styles/support.scss";
import { translations } from "../locales/translations";

function Support({ language }) {
  const text = translations[language];
  return (
    <article className="support" aria-label="Customer support">
      <section
        className="home-guide support__section"
        aria-labelledby="support-help"
      >
        <h1 id="support-help">How can we help?</h1>
        <p>
          Finding the right everyday pieces should feel simple. If you have a
          question about shopping at W.EAR, start with the information on the
          product page and the details in your cart. Product descriptions,
          available sizes, colours and photos can help you compare your options
          and decide which piece fits your wardrobe. Before choosing a size,
          consider the fit you prefer and any measurements provided for that
          item, especially if you plan to wear it over another layer.
        </p>
        <p>
          When you are ready to order, review your selected items, sizes and
          quantities in the cart. Check your contact and delivery details before
          completing checkout so that the information attached to your order is
          accurate. If you are signed in, your account is a useful place to
          check the order information available to you. Keep your order
          confirmation handy whenever you need help with a particular purchase.
        </p>
        <p>
          For questions about an item, include its name and the size or colour
          you are considering. For an existing order, have your order reference
          and a short description of the question ready. These details make it
          easier to understand what you need, whether you are checking a
          product, reviewing an order or asking about the next step. You can
          find the store’s contact information through the phone icon at the top
          of the page and in the Contacts section of the footer.
        </p>
        <p>
          If your question concerns delivery, payment, a return or an exchange,
          describe your situation clearly and check the information associated
          with your order. Availability and the options that apply can depend on
          the item and the stage of your purchase. Contact the store to clarify
          the details before making arrangements or sending an item back.
        </p>
      </section>

      <section
        className="home-guide support__section"
        aria-labelledby="support-shopping"
      >
        <h2 id="support-shopping">Help with your shopping experience</h2>
        <p>
          If something does not look right while browsing, try refreshing the
          page and checking your internet connection. If a product is not
          appearing where you expected it, revisit the catalog and review any
          search terms or filters you have selected. Opening the product again
          can help you check its current details before adding it to the cart.
          Take a moment to confirm your chosen options whenever you change a
          size, colour or quantity.
        </p>
        <p>
          If you have trouble signing in, check that you are using the correct
          email address and the sign-in method associated with your account.
          Avoid sharing passwords, verification codes or full payment details
          when asking for assistance. A description of the issue and the page
          where it happened is usually a better starting point. If there is an
          error message, note its wording so you can explain exactly what you
          saw.
        </p>
        <p>
          If checkout appears to stop or you are unsure whether an order was
          completed, check for an order confirmation and review any order
          details available in your account before trying again. Make a note of
          what happened and contact the store if the status remains unclear.
          Include an order reference if you have one, along with the approximate
          time of the attempt, so the question can be connected to the right
          purchase.
        </p>
        <p>
          Your feedback also helps identify parts of the shopping experience
          that could be clearer. If a description leaves you with questions or a
          page is difficult to use, explain what you were trying to do and what
          happened instead. Mention whether you were using a phone, tablet or
          computer and which browser you used. Clear, practical details make it
          easier to understand the problem and help you find a way forward.
          Whatever brings you here, our aim is to make your next step easier to
          understand.
        </p>
      </section>
    </article>
  );
}

export default Support;
