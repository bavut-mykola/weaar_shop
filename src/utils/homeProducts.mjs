export const homeCategories = [
  { key: "pants", label: "Pants" },
  { key: "hoodies", label: "Hoodies" },
  { key: "jeans", label: "Jeans" },
  { key: "t-shirts", label: "T-Shirts" },
  { key: "outerwear", label: "Outerwear" },
];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectHomeProducts(products) {
  const shuffled = shuffle(products.filter((product) => product.images?.front));
  return {
    collection: shuffled.slice(0, 12),
    categories: homeCategories.flatMap((category) => {
      const product = shuffled.find((item) => item.category === category.key);
      return product ? [{ ...category, product }] : [];
    }),
  };
}
