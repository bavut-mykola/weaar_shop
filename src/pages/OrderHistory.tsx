import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import { translations } from "../locales/translations";
import packageIcon from "../assets/icons/package.svg";
import "../styles/orderHistory.scss";

type Order = {
  id: number;
  created_at: string;
  total_price: number | string;
  items: {
    quantity: number;
    image: string | null;
  }[];
};

function OrderHistory({ language }: { language: "en" | "uk" }) {
  const text = translations[language].orderHistory;
  const [orders, setOrders] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getOrders() {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/api/order/history`, {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error("Failed to get products");
      }

      setOrders(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="order-history-main">
      <header className="order-header">
        <h1>{text.title}</h1>
        <p>{text.description}</p>
      </header>

      {isLoading && <p role="status">{text.loading}</p>}
      {orders?.length === 0 && <p>{text.empty}</p>}

      <div className="orders-box">
        {orders?.map((order) => {
          const count = order.items.reduce(
            (sum, item) => sum + Number(item.quantity),
            0,
          );
          const previews = order.items.slice(0, 2);
          const remaining = count - previews.length;

          return (
            <article className="order-box" key={order.id}>
              <div className="order-card-heading">
                <h2>{text.order(order.id)}</h2>
                <time dateTime={order.created_at}>
                  {new Date(order.created_at).toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
                    dateStyle: "medium",
                  })}
                </time>
              </div>
              <div className="order-thumbnails" aria-hidden="true">
                {previews.map((item, index) => (
                  <span className="order-thumbnail" key={index}>
                    <img
                      src={item.image || packageIcon}
                      alt=""
                      className={
                        item.image ? undefined : "order-thumbnail-placeholder"
                      }
                    />
                  </span>
                ))}
                {remaining > 0 && (
                  <span className="order-thumbnail order-thumbnail-more">
                    +{remaining}
                  </span>
                )}
              </div>
              <span className="order-item-count">
                {text.itemCount(count)}
              </span>
              <div className="order-card-total">
                <strong className="order-total">
                  ${Number(order.total_price).toFixed(2)}
                </strong>
                <Link
                  className="order-details-link"
                  to={`/order-confirmation/${order.id}`}
                  aria-label={text.viewOrder(order.id)}
                  state={{ fromHistory: true }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default OrderHistory;
