import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/adminDashboard.scss";
import { API_URL } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getadmin() {
    console.log("fuckin function is running");

    try {
      setIsLoading(true);
      console.log(`${API_URL}/api/admin/check`);

      const res = await fetch(`${API_URL}/api/admin/check`, {
        credentials: "include",
      });

      console.log(res.status);

      if (!res.ok) {
        throw new Error("fuck u");
      }

      const data = await res.json();
      console.log(data);

      if (data.isAdmin) {
        setIsAdmin(data.isAdmin);
      }
    } catch (error) {
      console.log(error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getadmin();
  }, []);

  const [orders, setOrders] = useState<number>(0);
  const [accounts, setAccounts] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [reviews, setReviews] = useState<number>(0);

  type Sale = {
    date: string;
    revenue: number;
  };

  const [sales, setSales] = useState<Sale[]>([]);

  async function getInformation() {
    try {
      const res = await fetch(`${API_URL}/api/admin/dashboard`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("suck dick");
      }

      const data = await res.json();

      console.log(data);

      setSales(data.sales);

      setOrders(data.ordersCount);
      setAccounts(data.accountsCount);
      setProducts(data.productsCount);
      setReviews(data.reviewsCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInformation();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : !isAdmin ? (
        <p>Acces denied</p>
      ) : (
        <>
          <div className="admin-page">
            <aside className="admin-sidebar" aria-label="Admin panel">
              <header className="admin-brand">
                <h1>
                  <Link to="/">WEAR</Link>
                </h1>
                <p>Admin Panel</p>
              </header>

              <section>
                <h2 className="admin-section-label">Page</h2>
                <ul className="admin-menu">
                  <li aria-current="page">
                    <img src="" alt="" />
                    Dashboard
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="admin-section-label">Functionality</h2>
                <ul className="admin-menu">
                  <li>
                    <img src="" alt="" />
                    Products
                  </li>
                  <li>
                    <img src="" alt="" />
                    Inventory
                  </li>
                  <li>
                    <img src="" alt="" />
                    Orders
                  </li>
                  <li>
                    <img src="" alt="" />
                    Customers
                  </li>
                  <li>
                    <img src="" alt="" />
                    Reviews
                  </li>
                </ul>
              </section>
            </aside>

            <main
              className="admin-dashboard"
              aria-labelledby="admin-dashboard-title"
            >
              <header className="admin-dashboard-header">
                <h2 id="admin-dashboard-title">Dashboard</h2>
                <p>General store statistics</p>
              </header>

              <div className="admin-summary">
                <section>
                  <span className="admin-summary-icon">
                    <img src="" alt="" />
                  </span>
                  <div>
                    <h3>Total Orders</h3>
                    <p className="admin-summary-total">{orders}</p>
                  </div>
                </section>
                <section>
                  <span className="admin-summary-icon">
                    <img src="" alt="" />
                  </span>
                  <div>
                    <h3>Customers</h3>
                    <p className="admin-summary-total">{accounts}</p>
                  </div>
                </section>
                <section>
                  <span className="admin-summary-icon">
                    <img src="" alt="" />
                  </span>
                  <div>
                    <h3>Products</h3>
                    <p className="admin-summary-total">{products}</p>
                  </div>
                </section>
                <section>
                  <span className="admin-summary-icon">
                    <img src="" alt="" />
                  </span>
                  <div>
                    <h3>Reviews</h3>
                    <p className="admin-summary-total">{reviews}</p>
                  </div>
                </section>
              </div>

              <div className="admin-overview">
                <section
                  className="admin-dashboard-panel admin-sales"
                  aria-labelledby="admin-sales-title"
                >
                  <h3 id="admin-sales-title">Sales Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sales}>
                      <CartesianGrid vertical={false} stroke="#E5E5E5" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#777777" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#777777" }}
                      />
                      <Tooltip />
                      <Line
                        dataKey="revenue"
                        stroke="#222222"
                        strokeWidth={2}
                        type="monotone"
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </section>

                <section
                  className="admin-dashboard-panel admin-quick-actions"
                  aria-labelledby="admin-quick-actions-title"
                >
                  <h3 id="admin-quick-actions-title">Quick Actions</h3>
                  <button type="button">
                    <img src="" alt="" />
                    Add New Product
                  </button>
                  <button type="button">
                    <img src="" alt="" />
                    View Orders
                  </button>
                  <button type="button">
                    <img src="" alt="" />
                    Manage Inventory
                  </button>
                  <button type="button">
                    <img src="" alt="" />
                    View Customers
                  </button>
                </section>
              </div>

              <div className="admin-details">
                <section
                  className="admin-dashboard-panel"
                  aria-labelledby="admin-recent-orders-title"
                >
                  <h3 id="admin-recent-orders-title">Recent Orders</h3>
                  <table aria-labelledby="admin-recent-orders-title">
                    <thead>
                      <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{/* Order number */}</td>
                        <td>{/* Customer */}</td>
                        <td>{/* Total */}</td>
                        <td>{/* Status */}</td>
                        <td>{/* Date */}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section
                  className="admin-dashboard-panel"
                  aria-labelledby="admin-low-stock-title"
                >
                  <h3 id="admin-low-stock-title">Low Stock</h3>
                  <table aria-labelledby="admin-low-stock-title">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Size</th>
                        <th scope="col">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{/* Product */}</td>
                        <td>{/* Size */}</td>
                        <td>{/* Stock */}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
