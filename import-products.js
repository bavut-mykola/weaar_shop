require("dotenv").config();

const fs = require("fs");

const { Client } = require("pg");

const data = fs.readFileSync("./products.json", "utf8");

const products = JSON.parse(data).products;

const uniqueProducts = [];
const seenIds = new Set();

for (const product of products) {
  if (seenIds.has(product.id)) {
    console.log(`Skipping duplicate product ID: ${product.id}`);
    continue;
  }

  seenIds.add(product.id);
  uniqueProducts.push(product);
}

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function importProducts() {
  try {
    await client.connect();

    console.log("Connected to PostgreSQL");

    for (const product of uniqueProducts) {
      await client.query(
        `INSERT INTO products (
          id,
          name,
          price,
          old_price,
          short_description,
          category,
          subcategory,
          rating,
          reviews_count,
          is_featured,
          description
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO NOTHING`,
        [
          Number(product.id),
          product.name,
          Number(product.price),
          product.oldPrice ? Number(product.oldPrice) : null,
          product.shortDescription ?? null,
          product.category ?? null,
          product.subcategory ?? null,
          product.rating ?? null,
          product.reviewsCount ?? null,
          product.isFeatured ?? false,
          product.description ?? null,
        ],
      );

      const colorIds = new Map();

      for (const color of product.colors) {
        const colorResult = await client.query(
          `
            INSERT INTO product_colors (product_id, name, value)
            VALUES ($1, $2, $3)
            ON CONFLICT (product_id, name)
            DO UPDATE SET value = EXCLUDED.value
            RETURNING id
          `,
          [Number(product.id), color.name, color.value ?? null],
        );

        const colorId = colorResult.rows[0].id;

        colorIds.set(color.name, colorId);

        for (const [side, imageUrl] of Object.entries(color.images)) {
          await client.query(
            `
              INSERT INTO product_images (color_id, side, image_url)
              VALUES ($1, $2, $3)
              ON CONFLICT (color_id, side)
              DO UPDATE SET image_url = EXCLUDED.image_url
            `,
            [colorId, side, imageUrl],
          );
        }
      }

      const sizeIds = new Map();

      for (const size of product.sizes) {
        const sizeResult = await client.query(
          `
            INSERT INTO product_sizes (product_id, size)
            VALUES ($1, $2)
            ON CONFLICT (product_id, size)
            DO UPDATE SET size = EXCLUDED.size
            RETURNING id
          `,
          [Number(product.id), size],
        );

        const sizeId = sizeResult.rows[0].id;

        sizeIds.set(size, sizeId);
      }

      for (const item of product.inventory) {
        const colorId = colorIds.get(item.color);
        const sizeId = sizeIds.get(item.size);

        await client.query(
          `
            INSERT INTO product_inventory (
              color_id,
              size_id,
              quantity
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (color_id, size_id)
            DO UPDATE SET quantity = EXCLUDED.quantity
          `,
          [colorId, sizeId, item.quantity],
        );
      }

      await client.query(
        `
          INSERT INTO product_details (
            product_id,
            material,
            fit,
            gender,
            season,
            care,
            country
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (product_id)
          DO UPDATE SET
            material = EXCLUDED.material,
            fit = EXCLUDED.fit,
            gender = EXCLUDED.gender,
            season = EXCLUDED.season,
            care = EXCLUDED.care,
            country = EXCLUDED.country
        `,
        [
          Number(product.id),
          product.details?.material ?? null,
          product.details?.fit ?? null,
          product.details?.gender ?? null,
          product.details?.season ?? null,
          product.details?.care ?? null,
          product.details?.country ?? null,
        ],
      );

      for (const [index, feature] of product.details.features.entries()) {
        await client.query(
          `
            INSERT INTO product_features (
              product_id,
              feature,
              feature_order
            )
            VALUES ($1, $2, $3)
          `,
          [Number(product.id), feature, index + 1],
        );
      }

      for (const tag of product.tags) {
        const tagResult = await client.query(
          `
      INSERT INTO tags (name)
      VALUES ($1)
      ON CONFLICT (name)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `,
          [tag],
        );

        const tagId = tagResult.rows[0].id;

        await client.query(
          `
      INSERT INTO product_tags (
        product_id,
        tag_id
      )
      VALUES ($1, $2)
      ON CONFLICT (product_id, tag_id)
      DO NOTHING
    `,
          [Number(product.id), tagId],
        );
      }

      for (const style of product.styles) {
        const styleResult = await client.query(
          `
      INSERT INTO styles (name)
      VALUES ($1)
      ON CONFLICT (name)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `,
          [style],
        );

        const styleId = styleResult.rows[0].id;

        await client.query(
          `
      INSERT INTO product_styles (
        product_id,
        style_id
      )
      VALUES ($1, $2)
      ON CONFLICT (product_id, style_id)
      DO NOTHING
    `,
          [Number(product.id), styleId],
        );
      }
    }

    console.log(`Imported ${uniqueProducts.length} unique products`);
  } catch (error) {
    console.error("Import failed:", error);
  } finally {
    await client.end();
  }
}

importProducts();
