const express = require("express");

const { Client } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

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

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  const {
    size,
    category,
    minPrice,
    maxPrice,
    style,
    sort,
    page = 1,
    limit = 9,
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  const result = await db.query(
    `
    SELECT
      id,
      name,
      price,
      old_price,
      rating,
      is_featured,
      category,
      subcategory,
        (
          SELECT json_object_agg(i.side, i.image_url)
          FROM product_images AS i
          WHERE i.color_id = (
            SELECT c.id
            FROM product_colors AS c
              WHERE c.product_id = p.id
                ORDER BY c.id
              LIMIT 1
            )
        ) AS images
        FROM products AS p
          WHERE
          (
              $1::text IS NULL
              OR EXISTS (
                  SELECT 1
                  FROM product_inventory AS i
                  JOIN product_sizes AS s
                      ON i.size_id = s.id
                  WHERE s.product_id = p.id
                    AND s.size = $1
                    AND i.quantity > 0
              )
          )
          AND ($2::text IS NULL OR p.category = $2)
          AND ($3::numeric IS NULL OR p.price >= $3)
          AND ($4::numeric IS NULL OR p.price <= $4)
          AND (
            $5::text IS NULL
            OR EXISTS (
                SELECT 1
                FROM product_styles AS ps
                JOIN styles AS s
                    ON ps.style_id = s.id
                WHERE ps.product_id = p.id
                  AND s.name = $5
            )
          )
            ORDER BY
              CASE WHEN $6 = 'price_asc' THEN p.price END ASC,
              CASE WHEN $6 = 'price_desc' THEN p.price END DESC,
              CASE WHEN $6 = 'popularity' THEN p.rating END DESC
              LIMIT $7
              OFFSET $8
          `,
    [size, category, minPrice, maxPrice, style, sort, limitNumber, offset],
  );

  const countResult = await db.query(
    `
    SELECT COUNT(*) 
    FROM products AS p
    WHERE
        (
            $1::text IS NULL
            OR EXISTS (
                SELECT 1
                FROM product_inventory AS i
                JOIN product_sizes AS s
                    ON i.size_id = s.id
                WHERE s.product_id = p.id
                  AND s.size = $1
                  AND i.quantity > 0
            )
        )
        AND ($2::text IS NULL OR p.category = $2)
        AND ($3::numeric IS NULL OR p.price >= $3)
        AND ($4::numeric IS NULL OR p.price <= $4)
        AND (
            $5::text IS NULL
            OR EXISTS (
                SELECT 1
                FROM product_styles AS ps
                JOIN styles AS st
                    ON ps.style_id = st.id
                WHERE ps.product_id = p.id
                  AND st.name = $5
            )
        )
    `,
    [size, category, minPrice, maxPrice, style],
  );

  const totalProducts = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalProducts / limitNumber);

  res.json({
    products: result.rows,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalProducts,
      totalPages,
    },
  });
});

app.get("/api/products/search-data", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        name,
        price,
        old_price,
        rating,
        is_featured,
        category,
        subcategory,
        (
          SELECT json_object_agg(i.side, i.image_url)
          FROM product_images AS i
          WHERE i.color_id = (
            SELECT c.id
            FROM product_colors AS c
            WHERE c.product_id = p.id
            ORDER BY c.id
            LIMIT 1
          )
        ) AS images
      FROM products AS p
      ORDER BY p.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching search data:", error);
    res.status(500).json({ error: "Failed to fetch search data" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const result = await db.query(
    `
   SELECT
    p.id,
    p.name,
    p.rating,
    p.price,
    p.old_price AS "oldPrice",
    p.short_description AS "shortDescription",
    (
      SELECT json_agg(s.size)
      FROM product_sizes AS s
      WHERE s.product_id = p.id
    ) AS sizes,
    json_agg(
        json_build_object(
            'name', c.name,
            'value', c.value,
            'images', (
                SELECT json_object_agg(i.side, i.image_url)
                FROM product_images AS i
                WHERE i.color_id = c.id
                )
            )
        ) AS colors,
         (
          SELECT json_agg(
              json_build_object(
                  'color', c.name,
                  'size', s.size,
                  'quantity', i.quantity
              )
          )
          FROM product_inventory AS i
            JOIN product_colors AS c
                ON i.color_id = c.id
            JOIN product_sizes AS s
                ON i.size_id = s.id
            WHERE c.product_id = p.id
          ) AS inventory,
           (
          SELECT json_build_object(
              'material', d.material,
              'fit', d.fit,
              'gender', d.gender,
              'season', d.season,
              'care', d.care,
              'country', d.country
              )
              FROM product_details AS d
              WHERE d.product_id = p.id
          ) AS details,
           (
              SELECT json_agg(pf.feature ORDER BY pf.feature_order)
                FROM product_features AS pf
                WHERE pf.product_id = p.id
            ) AS features,
             (
              SELECT json_agg(t.name)
                FROM product_tags AS pt
                JOIN tags AS t
                    ON pt.tag_id = t.id
                WHERE pt.product_id = p.id
            ) AS tags,
             (
              SELECT json_agg(s.name)
                FROM product_styles AS ps
                JOIN styles AS s
                    ON ps.style_id = s.id
                WHERE ps.product_id = p.id
            ) AS styles
        FROM products AS p
        JOIN product_colors AS c
            ON p.id = c.product_id
        WHERE p.id = $1
        GROUP BY p.id, p.name
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(result.rows[0]);
});

app.post("/api/cart", async (req, res) => {
  const { product_id, quantity, size, color } = req.body;

  try {
    const inventoryResult = await db.query(
      `
        UPDATE product_inventory pi
        SET quantity = quantity - $1 
        FROM product_colors pc, product_sizes ps
        WHERE pi.color_id = pc.id
          AND pi.size_id = ps.id
          AND pc.product_id = $2
          AND pc.name = $3
          AND ps.size = $4
          AND pi.quantity >= $1
      `,
      [quantity, product_id, color, size],
    );

    if (inventoryResult.rowCount === 0) {
      return res.status(400).json({ error: "Недостатньо товару на складі" });
    }

    await db.query(
      `
        INSERT INTO cart (product_id, quantity, size, color)
        VALUES ($1, $2, $3, $4)
      `,
      [product_id, quantity, size, color],
    );

    res.status(201).json({ message: "Товар успішно додано до кошика" });
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        cart.*,
        p.name,
        p.price,
        p.old_price AS "oldPrice",
        (
          SELECT pi.quantity
          FROM product_colors AS c
          JOIN product_sizes AS s ON s.size = cart.size
          JOIN product_inventory AS pi ON pi.color_id = c.id AND pi.size_id = s.id
          WHERE c.product_id = cart.product_id AND c.name = cart.color
          LIMIT 1
        ) AS "maxStock",
        (
          SELECT i.image_url
          FROM product_colors AS c
          JOIN product_images AS i ON i.color_id = c.id
          WHERE c.product_id = cart.product_id AND c.name = cart.color
          ORDER BY CASE WHEN i.side = 'front' THEN 0 ELSE 1 END
          LIMIT 1
        ) AS image
      FROM cart
      JOIN products AS p ON p.id = cart.product_id
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.delete("/api/cart", async (req, res) => {
  try {
    await db.query("BEGIN");

    const cartResult = await db.query("SELECT * FROM cart");
    const items = cartResult.rows;

    if (items.length === 0) {
      await db.query("COMMIT");
      return res.json({ message: "Кошик вже порожній" });
    }

    for (const item of items) {
      await db.query(
        `
          UPDATE product_inventory pi
          SET quantity = pi.quantity + $1
          FROM product_colors pc, product_sizes ps
          WHERE pi.color_id = pc.id
            AND pi.size_id = ps.id
            AND pc.product_id = $2
            AND pc.name = $3
            AND ps.size = $4
        `,
        [item.quantity, item.product_id, item.color, item.size],
      );
    }

    await db.query("DELETE FROM cart");

    await db.query("COMMIT");

    res.json({ message: "Кошик успішно очищено, залишки повернуто на склад" });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Failed to clear cart:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.get("/api/products/price-range", async (req, res) => {
  try {
    const result = await db.query(`
            SELECT
                MIN(price) AS min_price,
                MAX(price) AS max_price
            FROM products
        `);

    res.json({
      minPrice: result.rows[0].min_price,
      maxPrice: result.rows[0].max_price,
    });
  } catch (error) {
    console.error("Error fetching price range:", error);
    res.status(500).json({ error: "Failed to fetch price range" });
  }
});

// for + button
app.patch("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const result = await db.query(
      `
    WITH updated_cart AS (
        UPDATE cart 
        SET quantity = $1 
        WHERE id = $2 
        RETURNING *
      )
      SELECT 
        updated_cart.*,
        p.name,
        p.price,
        p.old_price AS "oldPrice",
        (
          SELECT pi.quantity
          FROM product_colors AS c
          JOIN product_sizes AS s ON s.size = updated_cart.size
          JOIN product_inventory AS pi ON pi.color_id = c.id AND pi.size_id = s.id
          WHERE c.product_id = updated_cart.product_id AND c.name = updated_cart.color
          LIMIT 1
        ) AS "maxStock",
        (
          SELECT i.image_url
          FROM product_colors AS c
          JOIN product_images AS i ON i.color_id = c.id
          WHERE c.product_id = updated_cart.product_id AND c.name = updated_cart.color
          ORDER BY CASE WHEN i.side = 'front' THEN 0 ELSE 1 END
          LIMIT 1
        ) AS image
      FROM updated_cart
      JOIN products AS p ON p.id = updated_cart.product_id;
    `,
      [quantity, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// for - button
app.patch("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItemResult = await db.query(`SELECT * FROM cart WHERE id = $1`, [
      id,
    ]);
    if (cartItemResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    const cartItem = cartItemResult.rows[0];
    const oldQuantity = cartItem.quantity;
    const diff = quantity - oldQuantity;

    if (diff > 0) {
      const stockCheck = await db.query(
        `
        SELECT pi.quantity FROM product_inventory pi
        JOIN product_colors c ON pi.color_id = c.id
        JOIN product_sizes s ON pi.size_id = s.id
        WHERE c.product_id = $1 AND c.name = $2 AND s.size = $3
        `,
        [cartItem.product_id, cartItem.color, cartItem.size],
      );
      if (stockCheck.rows.length > 0 && stockCheck.rows[0].quantity < diff) {
        return res.status(400).json({ error: "Not enough stock available" });
      }
    }

    await db.query(
      `
      UPDATE product_inventory pi
      SET quantity = pi.quantity - $1
      FROM product_colors c, product_sizes s
      WHERE pi.color_id = c.id AND pi.size_id = s.id
        AND c.product_id = $2 AND c.name = $3 AND s.size = $4
      `,
      [diff, cartItem.product_id, cartItem.color, cartItem.size],
    );

    const result = await db.query(
      `
      WITH updated_cart AS (
        UPDATE cart 
        SET quantity = $1 
        WHERE id = $2 
        RETURNING *
      )
      SELECT 
        updated_cart.*,
        p.name,
        p.price,
        p.old_price AS "oldPrice",
        (
          SELECT pi.quantity
          FROM product_colors AS c
          JOIN product_sizes AS s ON s.size = updated_cart.size
          JOIN product_inventory AS pi ON pi.color_id = c.id AND pi.size_id = s.id
          WHERE c.product_id = updated_cart.product_id AND c.name = updated_cart.color
          LIMIT 1
        ) AS "maxStock",
        (
          SELECT i.image_url
          FROM product_colors AS c
          JOIN product_images AS i ON i.color_id = c.id
          WHERE c.product_id = updated_cart.product_id AND c.name = updated_cart.color
          ORDER BY CASE WHEN i.side = 'front' THEN 0 ELSE 1 END
          LIMIT 1
        ) AS image
      FROM updated_cart
      JOIN products AS p ON p.id = updated_cart.product_id;
      `,
      [quantity, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cartItemResult = await db.query(`SELECT * FROM cart WHERE id = $1`, [
      id,
    ]);
    if (cartItemResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    const cartItem = cartItemResult.rows[0];

    await db.query(
      `
      UPDATE product_inventory pi
      SET quantity = pi.quantity + $1
      FROM product_colors c, product_sizes s
      WHERE pi.color_id = c.id AND pi.size_id = s.id
        AND c.product_id = $2 AND c.name = $3 AND s.size = $4
      `,
      [cartItem.quantity, cartItem.product_id, cartItem.color, cartItem.size],
    );

    await db.query(`DELETE FROM cart WHERE id = $1`, [id]);

    res.json({
      message: "Product removed from cart successfully",
      id: Number(id),
    });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/products/filter", async (req, res) => {
  const { category, size, styles, minPrice, maxPrice, page, sort } = req.body;

  const limit = 9;
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limit;

  const countQuery = `
    SELECT COUNT(DISTINCT p.id) 
    FROM products AS p
    WHERE
      (
        $1::text IS NULL
        OR EXISTS (
          SELECT 1
          FROM product_inventory AS i
          JOIN product_sizes AS s ON i.size_id = s.id
          WHERE s.product_id = p.id
            AND s.size = $1
            AND i.quantity > 0
        )
      )
      AND ($2::text IS NULL OR p.category = $2)
      AND ($3::numeric IS NULL OR p.price >= $3)
      AND ($4::numeric IS NULL OR p.price <= $4)
      AND (
        $5::text IS NULL
        OR EXISTS (
          SELECT 1
          FROM product_styles AS ps
          JOIN styles AS s ON ps.style_id = s.id
          WHERE ps.product_id = p.id
            AND s.name = $5
        )
      )
  `;
  const countResult = await db.query(countQuery, [
    size,
    category,
    minPrice,
    maxPrice,
    styles,
  ]);
  const totalProducts = parseInt(countResult.rows[0].count, 10);
  const totalPages = Math.ceil(totalProducts / limit);

  const dataQuery = `
    SELECT
      p.id,
      p.name,
      p.price,
      p.old_price,
      p.rating,
      p.is_featured,
      p.category,
      p.subcategory,
      (
        SELECT json_object_agg(i.side, i.image_url)
        FROM product_images AS i
        WHERE i.color_id = (
          SELECT c.id
          FROM product_colors AS c
          WHERE c.product_id = p.id
          ORDER BY c.id
          LIMIT 1
        )
      ) AS images
    FROM products AS p
    WHERE
      (
        $1::text IS NULL
        OR EXISTS (
          SELECT 1
          FROM product_inventory AS i
          JOIN product_sizes AS s ON i.size_id = s.id
          WHERE s.product_id = p.id
            AND s.size = $1
            AND i.quantity > 0
        )
      )
      AND ($2::text IS NULL OR p.category = $2)
      AND ($3::numeric IS NULL OR p.price >= $3)
      AND ($4::numeric IS NULL OR p.price <= $4)
      AND (
        $5::text IS NULL
        OR EXISTS (
          SELECT 1
          FROM product_styles AS ps
          JOIN styles AS s ON ps.style_id = s.id
          WHERE ps.product_id = p.id
            AND s.name = $5
        )
      )
    ORDER BY
      CASE WHEN $6 = 'price_asc' THEN p.price END ASC,
      CASE WHEN $6 = 'price_desc' THEN p.price END DESC,
      CASE WHEN $6 = 'popularity' THEN p.rating END DESC
    LIMIT $7
    OFFSET $8
  `;

  const result = await db.query(dataQuery, [
    size,
    category,
    minPrice,
    maxPrice,
    styles,
    sort,
    limit,
    offset,
  ]);

  res.json({
    products: result.rows,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: pageNumber,
      limit,
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
