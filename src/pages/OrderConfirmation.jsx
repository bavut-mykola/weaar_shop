import { translateProductText } from "../locales/productTranslations";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { API_URL } from "../api";
import { getGuestId } from "../utils/guestCart";
import "../styles/orderConfirmation.scss";
import { translations } from "../locales/translations";

function OrderConfirmation({ language }) {
  const text = translations[language];
  const confirmation = text.orderConfirmation;
  const money = (value) =>
    value !== null && value !== undefined && Number.isFinite(Number(value))
      ? `$${Number(value).toFixed(2)}`
      : text.common.unavailable;
  const { orderId } = useParams();
  const fromHistory = useLocation().state?.fromHistory === true;
  const validId =
    /^\d+$/.test(orderId || "") &&
    Number.isSafeInteger(Number(orderId)) &&
    Number(orderId) > 0;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!validId) return;
    const controller = new AbortController();

    async function loadOrder() {
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
          credentials: "include",
          headers: { "X-Guest-ID": getGuestId() },
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        if (!response.ok) {
          setResult({
            id: orderId,
            error: response.status === 404 ? "notFound" : "loadError",
          });
          return;
        }
        const data = await response.json();
        if (controller.signal.aborted) return;
        if (!data.order || !Array.isArray(data.items)) {
          setResult({ id: orderId, error: "detailsUnavailable" });
          return;
        }
        if (!controller.signal.aborted) setResult({ id: orderId, data });
        const productIds = [
          ...new Set(
            data.items
              .filter((item) => !item.image)
              .map((item) => item.product_id),
          ),
        ];
        const products = await Promise.all(
          productIds.map(async (id) => {
            try {
              const response = await fetch(`${API_URL}/api/products/${id}`, {
                signal: controller.signal,
              });
              return response.ok ? [id, await response.json()] : [id, null];
            } catch {
              return [id, null];
            }
          }),
        );
        const productMap = new Map(products);
        const items = data.items.map((item) => {
          const product = productMap.get(item.product_id);
          const color = product?.colors?.find(
            (color) => color.name?.toLowerCase() === item.color?.toLowerCase(),
          );
          return { ...item, image: item.image || color?.images?.front };
        });
        if (!controller.signal.aborted)
          setResult({ id: orderId, data: { ...data, items } });
      } catch {
        if (!controller.signal.aborted)
          setResult({ id: orderId, error: "loadError" });
      }
    }
    loadOrder();
    return () => controller.abort();
  }, [orderId, validId]);

  const current = result?.id === orderId ? result : null;
  const error = !validId
    ? confirmation.invalidLink
    : confirmation[current?.error];
  const data = error ? undefined : current?.data;
  const order = data?.order;
  const delivery =
    order?.delivery_method === "post_office"
      ? text.checkout.postOffice
      : order?.delivery_method === "home_delivery"
        ? text.checkout.homeDelivery
        : text.common.unavailable;
  const address =
    order?.delivery_method === "post_office"
      ? [order.city, order.branch_number && confirmation.branch(order.branch_number)]
          .filter(Boolean)
          .join(", ")
      : [order?.city, order?.address].filter(Boolean).join(", ");
  const subtotal = data?.items?.reduce(
    (sum, item) => sum + Number(item.unit_price) * Number(item.quantity),
    0,
  );

  const discountPercent =
    subtotal >= 30000 ? 15 : subtotal >= 2100 ? 10 : subtotal >= 1600 ? 5 : 0;
  const discount = (subtotal * discountPercent) / 100;
  const deliveryFee =
    data?.items.length <= 3 ? 30 : data?.items.length <= 6 ? 50 : 75;
  const total = subtotal - discount + deliveryFee;

  return (
    <section
      className="order-confirmation-page"
      aria-labelledby="order-confirmation-title"
    >
      <header className="order-confirmation-header">
        <h1 id="order-confirmation-title">
          {data
            ? fromHistory
              ? confirmation.details
              : text.orderConfirmation.confirmed
            : error
              ? confirmation.unavailable
              : confirmation.details}
        </h1>
        <p>
          {data
            ? text.orderConfirmation.thankYou
            : error || confirmation.loading}
        </p>
        {order && (
          <p className="order-confirmation-number">
            {text.orderConfirmation.orderNumber(order.id)}
          </p>
        )}
      </header>

      {!data && (
        <p className="order-confirmation-state" role="status">
          {error
            ? text.orderConfirmation.checkLink
            : text.orderConfirmation.pleaseWait}
        </p>
      )}

      {data && (
        <div className="order-confirmation-layout">
          <section
            className="order-confirmation-card"
            aria-labelledby="order-details-title"
          >
            <h2 id="order-details-title">{text.orderConfirmation.details}</h2>
            <dl className="order-confirmation-details">
              <div>
                <dt>{text.orderConfirmation.status}</dt>
                <dd>
                  {confirmation.statuses[order.status?.toLowerCase()] ??
                    order.status ??
                    confirmation.confirmedStatus}
                </dd>
              </div>
              <div>
                <dt>{text.orderConfirmation.deliveryMethod}</dt>
                <dd>{delivery}</dd>
              </div>
              <div>
                <dt>{text.orderConfirmation.deliveryAddress}</dt>
                <dd>{address || text.common.unavailable}</dd>
              </div>
              <div>
                <dt>{text.orderConfirmation.paymentMethod}</dt>
                <dd>
                  {order.payment_method === "cash"
                    ? text.checkout.cash
                    : order.payment_method === "card"
                      ? text.checkout.card
                      : text.common.unavailable}
                </dd>
              </div>
              <div>
                <dt>{text.orderConfirmation.contactEmail}</dt>
                <dd>{order.email || text.common.unavailable}</dd>
              </div>
            </dl>
          </section>
          <section
            className="order-confirmation-card"
            aria-labelledby="order-summary-title"
          >
            <h2 id="order-summary-title">{text.common.orderSummary}</h2>
            <div className="order-confirmation-products">
              {data.items.map((item) => (
                <article className="order-confirmation-product" key={item.id}>
                  {item.image ? (
                    <img src={item.image} alt={item.product_name} />
                  ) : (
                    <div
                      className="order-confirmation-image-placeholder"
                      aria-label={text.orderConfirmation.imageUnavailable}
                    >
                      W.EAR
                    </div>
                  )}
                  <div>
                    <h3>{item.product_name}</h3>
                    <p>
                      {[translateProductText(item.color, language), item.size]
                        .filter(Boolean)
                        .join(" – ")}{" "}
                      · {confirmation.itemQuantity(item.quantity)}
                    </p>
                    <strong translate="no">
                      {money(Number(item.unit_price) * Number(item.quantity))}
                    </strong>
                  </div>
                </article>
              ))}
              {data.items.length === 0 && (
                <p>{text.orderConfirmation.noItems}</p>
              )}
            </div>
            <dl className="order-confirmation-totals">
              <div>
                <dt>{text.common.subtotal}</dt>
                <dd translate="no">{money(subtotal)}</dd>
              </div>
              <div>
                <dt>{text.common.discount} ({discountPercent}%)</dt>
                <dd className="order-confirmation-discount" translate="no">
                  −{money(discount)}
                </dd>
              </div>
              <div>
                <dt>{text.cart.deliveryTitle}</dt>
                <dd translate="no">{money(deliveryFee)}</dd>
              </div>
            </dl>
            <div className="order-confirmation-total">
              <span>{text.common.total}</span>
              <strong translate="no">{money(total)}</strong>
            </div>
          </section>
        </div>
      )}

      <nav
        className="order-confirmation-actions"
        aria-label={text.orderConfirmation.continueBrowsing}
      >
        <Link
          className="order-confirmation-button order-confirmation-button--secondary"
          to="/"
        >
          {text.common.home}
        </Link>
        <Link className="order-confirmation-button" to="/catalog">
          {text.common.continueShopping}
        </Link>
      </nav>
    </section>
  );
}

export default OrderConfirmation;
