require("dotenv").config();

const fs = require("fs");
const { Client } = require("pg");

const data = fs.readFileSync("./products.json", "utf8");
const products = JSON.parse(data).products;

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function updateReviewsCount() {
  try {
    await client.connect();
    await client.query("BEGIN");

    const seenIds = new Set();

    for (const product of products) {
      const id = Number(product.id);

      if (seenIds.has(id)) continue;
      seenIds.add(id);

      await client.query(
        `UPDATE products
         SET reviews_count = $1
         WHERE id = $2`,
        [product.reviewsCount, id],
      );
    }

    await client.query("COMMIT");
    console.log("Reviews counts updated successfully");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Update failed:", error);
  } finally {
    await client.end();
  }
}

updateReviewsCount();
