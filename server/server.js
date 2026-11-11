const express = require("express");

const { Client, Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");
const argon2 = require("argon2");
const session = require("express-session");
const connectPgSimple = require("connect-pg-simple");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
const { randomBytes } = require("crypto");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config({ path: "../.env" });

const dbConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

const db = new Client(dbConfig);
const sessionPool = new Pool(dbConfig);

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

if (isProduction) {
  app.set("trust proxy", 1);
}

const PgSession = connectPgSimple(session);

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool: sessionPool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());

const googleAuthConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);

if (googleAuthConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:3000/api/auth/google/callback",
        state: true,
        store: true,
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      },
    ),
  );
}

function requireAuth(req, res, next) {
  if (req.session.accountId) {
    next();
  } else {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }
}

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

function getCartOwner(req) {
  const accountId = req.session?.accountId;
  const guestId = req.get("X-Guest-ID");

  const isLoggedIn = Boolean(accountId);

  const cartOwnerId = isLoggedIn ? accountId : guestId;
  const cartOwnerColumn = isLoggedIn ? "account_id" : "guest_id";

  if (!cartOwnerId) {
    return {
      error: "Cart owner ID is missing",
    };
  }

  if (!isLoggedIn) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(guestId)) {
      return {
        error: "Invalid guest ID",
      };
    }
  }

  return {
    cartOwnerId,
    cartOwnerColumn,
  };
}

async function mergeGuestCart(guestId, accountId, existingClient = null) {
  if (!guestId) return;

  if (typeof guestId !== "string") {
    throw new Error("Invalid guest ID");
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(guestId)) {
    throw new Error("Invalid guest ID");
  }

  const ownsConnection = existingClient === null;

  const client = existingClient || (await sessionPool.connect());

  try {
    if (ownsConnection) {
      await client.query(`BEGIN`);
    }

    const guestCart = await client.query(
      `
            SELECT * FROM cart
            WHERE guest_id = $1
            FOR UPDATE
      `,
      [guestId],
    );

    if (guestCart.rows.length === 0) {
      await client.query(`COMMIT`);
      return;
    }

    for (const products of guestCart.rows) {
      const result = await client.query(
        `
              SELECT * FROM cart
              WHERE account_id = $1
              AND product_id = $2
              AND size = $3
              AND color = $4
              FOR UPDATE
        `,
        [accountId, products.product_id, products.size, products.color],
      );

      if (result.rows.length > 0) {
        const newQuantity = result.rows[0].quantity + products.quantity;

        const updateResult = await client.query(
          `
              UPDATE cart
              SET quantity = $1
              WHERE id = $2
          `,
          [newQuantity, result.rows[0].id],
        );

        if (updateResult.rowCount !== 1) {
          throw new Error("Failed to update account cart item");
        }

        const deleteResult = await client.query(
          `
            DELETE FROM cart
            WHERE id = $1 AND guest_id = $2
          `,
          [products.id, guestId],
        );

        if (deleteResult.rowCount !== 1) {
          throw new Error("Failed to delete guest cart item");
        }
      } else {
        const transferResult = await client.query(
          `
              UPDATE cart
              SET account_id = $1, guest_id = NULL
              WHERE id = $2 
          `,
          [accountId, products.id],
        );

        if (transferResult.rowCount !== 1) {
          throw new Error("Failed to transfer guest cart item");
        }
      }
    }

    if (ownsConnection) {
      await client.query(`COMMIT`);
    }
  } catch (error) {
    if (ownsConnection) {
      await client.query("ROLLBACK");
    }
    console.error("Cart merge failed:", error);
    throw error;
  } finally {
    if (ownsConnection) {
      client.release();
    }
  }
}

app.use("/uploads", express.static(uploadDir));

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
  const { cartOwnerId, cartOwnerColumn, error } = getCartOwner(req);

  if (error) {
    return res.status(400).json({ error });
  }

  const { product_id, quantity, size, color } = req.body;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const client = await sessionPool.connect();

  try {
    await client.query(`BEGIN`);

    const inventoryResult = await client.query(
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
      await client.query(`ROLLBACK`);
      return res.status(400).json({ error: "Недостатньо товару на складі" });
    }

    const existingCartItemResult = await client.query(
      `
        SELECT * FROM cart
        WHERE product_id = $1
          AND size = $2
          AND color = $3
          AND ${cartOwnerColumn} = $4
      `,
      [product_id, size, color, cartOwnerId],
    );

    if (existingCartItemResult.rows.length > 0) {
      const increasedQuantityResult = await client.query(
        `
          UPDATE cart
          SET quantity = quantity + $1
            WHERE product_id = $2
          AND size = $3
          AND color = $4
          AND ${cartOwnerColumn} = $5
        `,
        [quantity, product_id, size, color, cartOwnerId],
      );
    } else {
      await client.query(
        `
        INSERT INTO cart (product_id, quantity, size, color, ${cartOwnerColumn})
        VALUES ($1, $2, $3, $4, $5)
      `,
        [product_id, quantity, size, color, cartOwnerId],
      );
    }

    await client.query(`COMMIT`);

    res.status(201).json({ message: "Товар успішно додано до кошика" });
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.error("Failed to add product to cart:", error);
    res.status(500).json({ error: "Помилка сервера" });
  } finally {
    client.release();
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const { cartOwnerId, cartOwnerColumn, error } = getCartOwner(req);

    if (error) {
      return res.status(400).json({ error });
    }

    const result = await db.query(
      `
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
        WHERE cart.${cartOwnerColumn} = $1
    `,
      [cartOwnerId],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.delete("/api/cart", async (req, res) => {
  const { cartOwnerId, cartOwnerColumn, error } = getCartOwner(req);

  if (error) {
    return res.status(400).json({ error });
  }

  const client = await sessionPool.connect();

  try {
    await client.query("BEGIN");

    const cartResult = await client.query(
      `SELECT * FROM cart
       WHERE ${cartOwnerColumn} = $1
       FOR UPDATE`,
      [cartOwnerId],
    );

    const items = cartResult.rows;

    if (items.length === 0) {
      await client.query("COMMIT");
      return res.json({ message: "Кошик вже порожній" });
    }

    for (const item of items) {
      const inventoryResult = await client.query(
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

      if (inventoryResult.rowCount !== 1) {
        throw new Error(`Inventory variant not found for cart item ${item.id}`);
      }
    }

    await client.query(`DELETE FROM cart WHERE ${cartOwnerColumn} = $1`, [
      cartOwnerId,
    ]);

    await client.query("COMMIT");

    return res.json({
      message: "Кошик успішно очищено, залишки повернуто на склад",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to clear cart:", error);

    return res.status(500).json({ error: "Помилка сервера" });
  } finally {
    client.release();
  }
});

// for - button
app.patch("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const { cartOwnerId, cartOwnerColumn, error } = getCartOwner(req);

  if (error) {
    return res.status(400).json({ error });
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const client = await sessionPool.connect();

  try {
    await client.query("BEGIN");

    const cartItemResult = await client.query(
      `SELECT * FROM cart
       WHERE id = $1 AND ${cartOwnerColumn} = $2
       FOR UPDATE`,
      [id, cartOwnerId],
    );

    if (cartItemResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        error: "Product not found in your cart",
      });
    }

    const cartItem = cartItemResult.rows[0];
    const diff = quantity - cartItem.quantity;

    const inventoryResult = await client.query(
      `UPDATE product_inventory pi
       SET quantity = pi.quantity - $1
       FROM product_colors pc, product_sizes ps
       WHERE pi.color_id = pc.id
         AND pi.size_id = ps.id
         AND pc.product_id = $2
         AND pc.name = $3
         AND ps.size = $4
         AND pi.quantity >= $1
       RETURNING pi.quantity`,
      [diff, cartItem.product_id, cartItem.color, cartItem.size],
    );

    if (inventoryResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: "Not enough stock available",
      });
    }

    const result = await client.query(
      `WITH updated_cart AS (
         UPDATE cart
         SET quantity = $1
         WHERE id = $2 AND ${cartOwnerColumn} = $3
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
           JOIN product_inventory AS pi
             ON pi.color_id = c.id AND pi.size_id = s.id
           WHERE c.product_id = updated_cart.product_id
             AND c.name = updated_cart.color
           LIMIT 1
         ) AS "maxStock",
         (
           SELECT i.image_url
           FROM product_colors AS c
           JOIN product_images AS i ON i.color_id = c.id
           WHERE c.product_id = updated_cart.product_id
             AND c.name = updated_cart.color
           ORDER BY CASE WHEN i.side = 'front' THEN 0 ELSE 1 END
           LIMIT 1
         ) AS image
       FROM updated_cart
       JOIN products AS p ON p.id = updated_cart.product_id`,
      [quantity, id, cartOwnerId],
    );

    await client.query("COMMIT");

    return res.json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating cart quantity:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    client.release();
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  const { id } = req.params;

  const { cartOwnerId, cartOwnerColumn, error } = getCartOwner(req);

  if (error) {
    return res.status(400).json({ error });
  }

  const client = await sessionPool.connect();

  try {
    await client.query("BEGIN");

    const cartItemResult = await client.query(
      `SELECT * FROM cart
       WHERE id = $1 AND ${cartOwnerColumn} = $2
       FOR UPDATE`,
      [id, cartOwnerId],
    );

    if (cartItemResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        error: "Product not found in cart",
      });
    }

    const cartItem = cartItemResult.rows[0];

    const inventoryResult = await client.query(
      `
        UPDATE product_inventory pi
        SET quantity = pi.quantity + $1
        FROM product_colors c, product_sizes s
        WHERE pi.color_id = c.id
          AND pi.size_id = s.id
          AND c.product_id = $2
          AND c.name = $3
          AND s.size = $4
      `,
      [cartItem.quantity, cartItem.product_id, cartItem.color, cartItem.size],
    );

    if (inventoryResult.rowCount !== 1) {
      throw new Error(`Inventory variant not found for cart item ${id}`);
    }

    const deleteResult = await client.query(
      `DELETE FROM cart
       WHERE id = $1 AND ${cartOwnerColumn} = $2`,
      [id, cartOwnerId],
    );

    if (deleteResult.rowCount !== 1) {
      throw new Error(`Failed to delete cart item ${id}`);
    }

    await client.query("COMMIT");

    return res.json({
      message: "Product removed from cart successfully",
      id: Number(id),
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error deleting product from cart:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    client.release();
  }
});

// FILTER
app.post("/api/products/filter", async (req, res) => {
  const {
    category,
    size,
    styles,
    minPrice,
    maxPrice,
    page,
    sort,
    limit = 9,
  } = req.body;

  const limitNumber = Number(limit);
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limitNumber;

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
  const totalPages = Math.ceil(totalProducts / limitNumber);

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
      limit: limitNumber,
    },
  });
});

// ACCOUNTS

// REGISTRATION
app.post("/api/accounts/register", async (req, res) => {
  const client = await sessionPool.connect();

  let transactionActive = false;

  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Введіть email і пароль",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        message: "Введіть коректний email",
      });
    }

    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({
        message: "Пароль має містити від 8 до 128 символів",
      });
    }

    const existingAccount = await db.query(
      "SELECT id FROM accounts WHERE email = $1",
      [normalizedEmail],
    );

    if (existingAccount.rows.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    await client.query(`BEGIN`);
    transactionActive = true;

    const result = await client.query(
      `INSERT INTO accounts (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email, created_at`,
      [normalizedEmail, passwordHash],
    );

    const account = result.rows[0];
    const guestId = req.get("X-Guest-ID");

    await mergeGuestCart(guestId, account.id, client);

    await client.query(`COMMIT`);
    transactionActive = false;

    req.session.accountId = account.id;

    try {
      await new Promise((resolve, reject) => {
        req.session.save((error) => {
          if (error) return reject(error);
          resolve();
        });
      });
    } catch (error) {
      console.error("Session save failed:", error);

      return res.status(500).json({
        message:
          "Account created successfully, but automatic login failed. Please log in manually.",
      });
    }

    return res.status(201).json({
      message: "Акаунт успішно створено",
      account: result.rows[0],
    });
  } catch (error) {
    if (transactionActive) {
      await client.query(`ROLLBACK`);
    }
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Акаунт із таким email уже існує",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Помилка сервера. Спробуйте пізніше",
    });
  } finally {
    client.release();
  }
});

// LOG IN
app.post("/api/accounts/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Enter your email and password",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await db.query(
      "SELECT id, email, password_hash FROM accounts WHERE email = $1",
      [normalizedEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const account = result.rows[0];

    if (!account.password_hash) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordIsValid = await argon2.verify(
      account.password_hash,
      password,
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const guestId = req.get("X-Guest-ID");

    await mergeGuestCart(guestId, account.id);

    req.session.accountId = account.id;
    console.log("Login session ID:", req.sessionID);
    console.log("Login account ID:", req.session.accountId);

    return req.session.save((error) => {
      if (error) {
        console.error("Login session save failed:", error);
        return res.status(500).json({
          message: "Login failed",
        });
      }

      return res.status(200).json({
        message: "Login successful",
        account: {
          id: account.id,
          email: account.email,
        },
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

app.get("/api/accounts/me", async (req, res) => {
  const accountId = req.session.accountId;

  if (!accountId) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const result = await db.query(
      `
            SELECT id, email
            FROM accounts
            WHERE id = $1
      `,
      [accountId],
    );

    if (!result.rows[0]) {
      return res.status(401).json({
        message: "Account not found",
      });
    }

    const account = result.rows[0];

    return res.json({
      account: {
        id: account.id,
        email: account.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/accounts/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    return res.status(200).json({
      message: "Logout successful",
    });
  });
});

app.get("/api/accounts/profile", async (req, res) => {
  const accountId = req.session.accountId;

  if (!accountId) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const result = await db.query(
      `
            SELECT
              name, phone, profile_image
            FROM accounts
              WHERE id = $1
      `,
      [accountId],
    );

    if (result.rows.length <= 0) {
      return res.status(404).json({
        message: "no account found",
      });
    } else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.patch("/api/accounts/profile", upload.single("image"), async (req, res) => {
  const accountId = req.session.accountId;
  const { name, phone, profile_image } = req.body;

  if (!accountId) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const profileImage = req.file
      ? `/uploads/${req.file.filename}`
      : profile_image;

    const result = await db.query(
      `
        UPDATE accounts
        SET 
          name = $2,
          phone = $3,
          profile_image = COALESCE($4, profile_image)
        WHERE id = $1
        RETURNING name, phone, profile_image
      `,
      [accountId, name, phone, profileImage],
    );

    if (result.rows.length <= 0) {
      return res.status(404).json({
        message: "no account found",
      });
    } else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating profile:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.delete("/api/accounts/me", async (req, res) => {
  console.log("Session:", req.session);
  const accountId = req.session.accountId;

  console.log("Delete session ID:", req.sessionID);
  console.log("Delete account ID:", req.session.accountId);

  if (!accountId) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  const client = await sessionPool.connect();

  let transactionActive = false;

  try {
    await client.query(`BEGIN`);
    transactionActive = true;

    const cartItems = await client.query(
      `
          SELECT * FROM cart
          WHERE account_id = $1
          FOR UPDATE
      `,
      [accountId],
    );

    for (const cartItem of cartItems.rows) {
      const inventoryResult = await client.query(
        `
      UPDATE product_inventory pi
      SET quantity = pi.quantity + $1
      FROM product_colors c, product_sizes s
      WHERE pi.color_id = c.id
        AND pi.size_id = s.id
        AND c.product_id = $2
        AND c.name = $3
        AND s.size = $4
    `,
        [cartItem.quantity, cartItem.product_id, cartItem.color, cartItem.size],
      );

      if (inventoryResult.rowCount !== 1) {
        throw new Error(
          `Inventory variant not found for cart item ${cartItem.id}`,
        );
      }
    }

    await client.query(
      `
          DELETE FROM cart
          WHERE account_id = $1
      `,
      [accountId],
    );

    const result = await client.query(
      `
        DELETE FROM accounts
        WHERE id = $1
      `,
      [accountId],
    );

    if (result.rowCount === 0) {
      await client.query(`ROLLBACK`);
      transactionActive = false;
      return res.status(404).json({
        message: "Account not found",
      });
    }

    await client.query(`COMMIT`);
    transactionActive = false;

    req.session.destroy((error) => {
      if (error) {
        console.error("Failed to destroy session:", error);
        return res.status(500).json({
          error: "Account deleted, but session destruction failed",
        });
      }

      return res.status(200).json({
        message: "Account deleted successfully",
      });
    });
  } catch (error) {
    if (transactionActive) {
      await client.query("ROLLBACK");
    }
    console.error("Failed to delete account:", error);
    return res.status(500).json({
      error: "Failed to delete account",
    });
  } finally {
    client.release();
  }
});

function requireGoogleAuth(req, res, next) {
  if (!googleAuthConfigured) {
    return res.redirect(`${frontendUrl}/auth?error=google_unavailable`);
  }
  next();
}

async function completeGoogleLogin(req, res, accountId) {
  // Passport exposes this context only after validating the session-bound state.
  const context = req.authInfo?.state;
  if (
    !context ||
    Date.now() - context.createdAt > 10 * 60 * 1000 ||
    context.accountId !== (req.session.accountId || null)
  ) {
    return res.redirect(`${frontendUrl}/auth?error=google_auth`);
  }

  await mergeGuestCart(context.guestId, accountId);
  await new Promise((resolve, reject) => {
    req.session.regenerate((error) => (error ? reject(error) : resolve()));
  });
  req.session.accountId = accountId;
  await new Promise((resolve, reject) => {
    req.session.save((error) => (error ? reject(error) : resolve()));
  });
  return res.redirect(`${frontendUrl}/`);
}

app.get(
  "/api/auth/google/callback",
  requireGoogleAuth,
  passport.authenticate("google", {
    failureRedirect: `${frontendUrl}/auth?error=google_auth`,
    session: false,
  }),
  async (req, res) => {
    try {
      const googleId = req.user.id;
      const email = req.user.emails?.[0]?.value?.trim().toLowerCase();
      const emailVerified = req.user._json?.email_verified === true;

      if (!email || !emailVerified) {
        return res.redirect(`${frontendUrl}/auth?error=google_email`);
      }

      const googleAccount = await db.query(
        "SELECT id FROM accounts WHERE google_id = $1",
        [googleId],
      );

      if (googleAccount.rows.length > 0) {
        return await completeGoogleLogin(req, res, googleAccount.rows[0].id);
      }

      const existingAccount = await db.query(
        "SELECT id FROM accounts WHERE email = $1",
        [email],
      );

      if (existingAccount.rows.length > 0) {
        return res.redirect(`${frontendUrl}/auth?error=account_exists`);
      }

      const result = await db.query(
        `INSERT INTO accounts (email, google_id, name)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [email, googleId, req.user.displayName || null],
      );

      return await completeGoogleLogin(req, res, result.rows[0].id);
    } catch (error) {
      console.error("Google callback error:", error);
      return res.status(500).send("Google login failed");
    }
  },
);

// Prepare with a same-origin POST so a URL cannot inject a guest cart ID.
app.post("/api/auth/google/prepare", (req, res) => {
  if (req.get("Origin") !== new URL(frontendUrl).origin) {
    return res.status(403).json({ message: "Invalid request origin" });
  }
  if (!googleAuthConfigured) {
    return res.status(503).json({ message: "Google sign-in is not configured yet." });
  }

  const guestId = req.get("X-Guest-ID");
  const validGuestId =
    typeof guestId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guestId);
  const token = randomBytes(32).toString("hex");
  req.session.googleCart = {
    token,
    // Authenticated requests must never contribute a cart to another account.
    guestId: !req.session.accountId && validGuestId ? guestId : null,
    accountId: req.session.accountId || null,
    createdAt: Date.now(),
  };
  res.set("Cache-Control", "no-store");
  return req.session.save((error) => {
    if (error) {
      console.error("Google preparation session error:", error);
      return res.status(500).json({ message: "Unable to start Google sign-in" });
    }
    return res.json({ token });
  });
});

app.get(
  "/api/auth/google",
  requireGoogleAuth,
  (req, res, next) => {
    const pending = req.session.googleCart;
    delete req.session.googleCart;
    if (
      req.query.token && (
        !pending ||
        typeof req.query.token !== "string" ||
        req.query.token !== pending.token ||
        Date.now() - pending.createdAt > 10 * 60 * 1000 ||
        pending.accountId !== (req.session.accountId || null)
      )
    ) {
      return res.redirect(`${frontendUrl}/auth?error=google_auth`);
    }
    const context = req.query.token ? pending : {
      guestId: null,
      accountId: req.session.accountId || null,
      createdAt: Date.now(),
    };
    return passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: {
        guestId: context.guestId,
        accountId: context.accountId,
        createdAt: context.createdAt,
      },
    })(req, res, next);
  },
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
