import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { selectHomeProducts } from "../src/utils/homeProducts.mjs";

// Use the repository's real categories and product images as the API fixture.
const { products } = JSON.parse(readFileSync(new URL("../products.json", import.meta.url)));
const apiProducts = products.map((product) => ({ ...product, images: product.colors[0].images }));

test("selects 12 distinct products without changing the source order", () => {
  const originalIds = apiProducts.map((product) => product.id);
  const { collection } = selectHomeProducts(apiProducts);
  assert.equal(collection.length, 12);
  assert.equal(new Set(collection.map((product) => product.id)).size, 12);
  assert.deepEqual(apiProducts.map((product) => product.id), originalIds);
});

test("handles empty or small catalogs and skips missing images", () => {
  assert.deepEqual(selectHomeProducts([]), { collection: [] });
  const result = selectHomeProducts([apiProducts[0], { id: "missing", category: "pants" }]);
  assert.equal(result.collection.length, 1);
});
