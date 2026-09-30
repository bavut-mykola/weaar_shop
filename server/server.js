const express = require("express");

const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

const app = express();

app.get("/api/products", async (req, res) => {
  const result = await db.query("SELECT * FROM products");

  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
