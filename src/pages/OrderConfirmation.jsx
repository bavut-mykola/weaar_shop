import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../api";
import { getGuestId } from "../utils/guestCart";
import "../styles/orderConfirmation.scss";

const money = (value) =>
  value !== null && value !== undefined && Number.isFinite(Number(value))
    ? `$${Number(value).toFixed(2)}`
    : "Unavailable";

function OrderConfirmation() {
  const { orderId } = useParams();
  const validId = /^\d+$/.test(orderId || "") && Number.isSafeInteger(Number(orderId)) && Number(orderId) > 0;
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
        if (!response.ok) {
          throw new Error(response.status === 404
            ? "This order could not be found for your account or guest session."
            : "We couldn't load your order. Please try again later.");
        }
        const data = await response.json();
        if (!data.order || !Array.isArray(data.items)) {
          throw new Error("The order details are unavailable. Please try again later.");
        }
        if (!controller.signal.aborted) setResult({ id: orderId, data });
        const productIds = [...new Set(data.items.filter((item) => !item.image).map((item) => item.product_id))];
        const products = await Promise.all(productIds.map(async (id) => {
          try {
            const response = await fetch(`${API_URL}/api/products/${id}`, { signal: controller.signal });
            return response.ok ? [id, await response.json()] : [id, null];
          } catch {
            return [id, null];
          }
        }));
        const productMap = new Map(products);
        const items = data.items.map((item) => {
          const product = productMap.get(item.product_id);
          const color = product?.colors?.find((color) => color.name?.toLowerCase() === item.color?.toLowerCase());
          return { ...item, image: item.image || color?.images?.front };
        });
        if (!controller.signal.aborted) setResult({ id: orderId, data: { ...data, items } });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ id: orderId, error: error.message });
      }
    }
    loadOrder();
    return () => controller.abort();
  }, [orderId, validId]);

  const current = result?.id === orderId ? result : null;
  const error = !validId ? "This link is missing a valid order number. Please check your confirmation link." : current?.error;
  const data = error ? undefined : current?.data;
  const order = data?.order;
  const delivery = order?.delivery_method === "post_office" ? "Post office" : order?.delivery_method === "home_delivery" ? "Home delivery" : "Unavailable";
  const address = order?.delivery_method === "post_office"
    ? [order.city, order.branch_number && `Branch No. ${order.branch_number}`].filter(Boolean).join(", ")
    : [order?.city, order?.address].filter(Boolean).join(", ");
  const subtotal = data?.items?.reduce((sum, item) => sum + Number(item.unit_price) * Number(item.quantity), 0);
  // Match the current checkout rules using saved order quantities and prices.
  const discountPercent = subtotal >= 30000 ? 15 : subtotal >= 2100 ? 10 : subtotal >= 1600 ? 5 : 0;
  const discount = subtotal * discountPercent / 100;
  const deliveryFee = data?.items.length <= 3 ? 30 : data?.items.length <= 6 ? 50 : 75;
  const total = subtotal - discount + deliveryFee;

  return (
    <section className="order-confirmation-page" aria-labelledby="order-confirmation-title">
      <header className="order-confirmation-header">
        <h1 id="order-confirmation-title">{data ? "ORDER CONFIRMED" : error ? "ORDER UNAVAILABLE" : "ORDER DETAILS"}</h1>
        <p>{data ? "Thank you for shopping with W.EAR." : error || "Loading your order…"}</p>
        {order && <p className="order-confirmation-number">Order #{String(order.id).padStart(6, "0")}</p>}
      </header>

      {!data && <p className="order-confirmation-state" role="status">{error ? "Please check your link or return to the catalog." : "Please wait while we retrieve your order."}</p>}

      {data && <div className="order-confirmation-layout">
        <section className="order-confirmation-card" aria-labelledby="order-details-title">
          <h2 id="order-details-title">ORDER DETAILS</h2>
          <dl className="order-confirmation-details">
            <div><dt>Order status</dt><dd>{order.status || "Confirmed"}</dd></div>
            <div><dt>Delivery method</dt><dd>{delivery}</dd></div>
            <div><dt>Delivery address</dt><dd>{address || "Unavailable"}</dd></div>
            <div><dt>Payment method</dt><dd>{order.payment_method === "cash" ? "Cash on delivery" : order.payment_method === "card" ? "Card" : "Unavailable"}</dd></div>
            <div><dt>Contact email</dt><dd>{order.email || "Unavailable"}</dd></div>
          </dl>
        </section>
        <section className="order-confirmation-card" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">ORDER SUMMARY</h2>
          <div className="order-confirmation-products">
            {data.items.map((item) => <article className="order-confirmation-product" key={item.id}>
              {item.image ? <img src={item.image} alt={item.product_name} /> : <div className="order-confirmation-image-placeholder" aria-label="Product image unavailable">W.EAR</div>}
              <div>
                <h3>{item.product_name}</h3>
                <p>{[item.color, item.size].filter(Boolean).join(" – ")} · Qty: {item.quantity}</p>
                <strong>{money(Number(item.unit_price) * Number(item.quantity))}</strong>
              </div>
            </article>)}
            {data.items.length === 0 && <p>No order items available.</p>}
          </div>
          <dl className="order-confirmation-totals">
            <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Discount ({discountPercent}%)</dt><dd className="order-confirmation-discount">−{money(discount)}</dd></div>
            <div><dt>Delivery</dt><dd>{money(deliveryFee)}</dd></div>
          </dl>
          <div className="order-confirmation-total"><span>Total</span><strong>{money(total)}</strong></div>
        </section>
      </div>}

      <nav className="order-confirmation-actions" aria-label="Continue browsing">
        <Link className="order-confirmation-button order-confirmation-button--secondary" to="/">Home</Link>
        <Link className="order-confirmation-button" to="/catalog">Continue Shopping</Link>
      </nav>
    </section>
  );
}

export default OrderConfirmation;
