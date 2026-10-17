import { useState, useEffect, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import { useSearchParams, Link } from "react-router-dom";
import "../styles/catalog.scss";
import "../styles/search.scss";

import { API_URL } from "../api";

const sortOptions = ["More Popular", "More Expensive", "Cheaper"];
const sizeMap = {
  Small: "S",
  Medium: "M",
  Large: "L",
  "X-Large": "XL",
  "XX-Large": "XXL",
};
const categories = ["Pants", "Hoodies", "Jeans", "T-Shirts", "Outerwear"];
const styles = ["Casual", "Formal", "Gym", "Party"];
const maxLimit = 6000;
const itemsPerPage = 9;

function SearchResult() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("More Popular");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const sortRef = useRef(null);
  const [searchProducts, setSearchProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(maxLimit);
  const [activeSize, setActiveSize] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStyle, setActiveStyle] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const normalizedQuery = query.trim();

  const fuse = useMemo(
    () =>
      new Fuse(searchProducts, {
        keys: ["name", "category", "subcategory"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [searchProducts],
  );

  const sortParam =
    selectedSort === "More Expensive"
      ? "price_desc"
      : selectedSort === "Cheaper"
        ? "price_asc"
        : "popularity";

  const minPercent = (Number(minPrice) / maxLimit) * 100;
  const maxPercent = (Number(maxPrice) / maxLimit) * 100;
  const getTransformStyle = (percent) => {
    if (percent === 0) return "translateX(0%)";
    if (percent === 100) return "translateX(-100%)";
    return "translateX(-50%)";
  };

  const matchingProducts = normalizedQuery
    ? fuse.search(normalizedQuery).map((result) => result.item)
    : searchProducts;

  const filteredProducts = matchingProducts.filter((product) => {
    if (!appliedFilters) return true;

    const categoryMatches =
      !appliedFilters.category ||
      product.category?.toLowerCase() === appliedFilters.category.toLowerCase();
    const sizeMatches =
      !appliedFilters.size || product.sizes?.includes(appliedFilters.size);
    const styleMatches =
      !appliedFilters.style ||
      product.styles?.some(
        (style) => style.toLowerCase() === appliedFilters.style.toLowerCase(),
      );
    const price = Number(product.price);
    const priceMatches =
      price >= appliedFilters.minPrice && price <= appliedFilters.maxPrice;

    return categoryMatches && sizeMatches && styleMatches && priceMatches;
  });

  const displayedProductResults = [...filteredProducts].sort((a, b) => {
    if (sortParam === "price_asc") return Number(a.price) - Number(b.price);
    if (sortParam === "price_desc") return Number(b.price) - Number(a.price);
    return Number(b.rating) - Number(a.rating);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(displayedProductResults.length / itemsPerPage),
  );
  const startIndex = (page - 1) * itemsPerPage;
  const displayedProducts = displayedProductResults.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const startPage = Math.min(page, Math.max(totalPages - 4, 1));
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  useEffect(() => {
    async function getSearchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/products/search-data`);
        if (!response.ok) {
          throw new Error(`Failed to fetch search data: ${response.status}`);
        }
        const data = await response.json();
        setSearchProducts(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getSearchProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [normalizedQuery]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilters = () => {
    const hasActiveFilters =
      activeCategory ||
      activeSize ||
      activeStyle ||
      Number(minPrice) !== 0 ||
      Number(maxPrice) !== maxLimit;

    setAppliedFilters(
      hasActiveFilters
        ? {
            category: activeCategory,
            size: activeSize,
            style: activeStyle,
            minPrice: Number(minPrice),
            maxPrice: Number(maxPrice),
          }
        : null,
    );
    setPage(1);
    setIsFilterOpen(false);
  };

  return (
    <section
      className="catalog search-results"
      id="catalog"
      aria-labelledby="catalog-title"
    >
      {isLoading ? (
        <div className="catalog-skeleton search-skeleton" aria-hidden="true">
          <div className="skeleton-left-box">
            <div className="catalog-skeleton-title"></div>
            <div className="filter-skeleton-box"></div>
          </div>
          <div className="skeleton-right-box">
            <div className="top-right-skeleton-box">
              <div className="top-skeleton"></div>
              <div className="top-skeleton"></div>
            </div>
            <div className="skeleton-products-box">
              {Array.from({ length: 6 }, (_, index) => (
                <div className="product-skeleton-box" key={index}>
                  <div className="skeleton-image"></div>
                  <div className="skeleton-name"></div>
                  <div className="skeleton-rating"></div>
                  <div className="skeleton-price"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="catalog__heading">
            <div className="catalog__heading-main">
              <h1 className="search-catalog__title" id="catalog-title">
                Results for "{query}"
              </h1>
              <div className="catalog__sort-wrap" ref={sortRef}>
                <button
                  className={`catalog__sort${isSortOpened ? " is-open" : ""}`}
                  type="button"
                  aria-expanded={isSortOpened}
                  onClick={() => setIsSortOpened((open) => !open)}
                >
                  <span className="catalog__sort-label">Sort by:</span>
                  <span className="catalog__sort-value">{selectedSort}</span>
                  <span className="catalog__sort-caret" aria-hidden="true" />
                </button>

                {isSortOpened && (
                  <ul
                    className="catalog__sort-menu"
                    role="listbox"
                    aria-label="Sort by"
                  >
                    {sortOptions.map((sort) => (
                      <li key={sort}>
                        <button
                          type="button"
                          className={sort === selectedSort ? "is-selected" : ""}
                          onClick={() => {
                            setSelectedSort(sort);
                            setPage(1);
                            setIsSortOpened(false);
                          }}
                        >
                          {sort}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </header>

          <div className="catalog__layout">
            <button
              className="catalog-filter-trigger"
              type="button"
              aria-expanded={isFilterOpen}
              aria-controls="search-filter"
              onClick={() => setIsFilterOpen(true)}
            >
              Filters <span aria-hidden="true">›</span>
            </button>
            {isFilterOpen && (
              <button
                className="catalog-filter-backdrop"
                type="button"
                aria-label="Close filters"
                onClick={() => setIsFilterOpen(false)}
              />
            )}
            <aside
              className={`catalog-filter${isFilterOpen ? " is-open" : ""}`}
              id="search-filter"
              aria-label="Search filters"
            >
              <div className="catalog-filter__mobile-header">
                <h2 className="catalog-filter__title">Filters</h2>
                <button
                  className="catalog-filter__close"
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ‹
                </button>
              </div>
              <section className="catalog-filter__section">
                <h2 className="catalog-filter__title">Filters</h2>
                <div className="catalog-filter__links">
                  {categories.map((category) => (
                    <p
                      className={`category-text${activeCategory === category ? " is-active" : ""}`}
                      key={category}
                      onClick={() =>
                        setActiveCategory((current) =>
                          current === category ? null : category,
                        )
                      }
                    >
                      {category}
                      <span>›</span>
                    </p>
                  ))}
                </div>
              </section>

              <section className="catalog-filter__section">
                <h2 className="catalog-filter__title">Price</h2>
                <div
                  className="catalog-filter__slider-container"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "40px",
                  }}
                >
                  <div
                    className="catalog-filter__range"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: 0,
                      right: 0,
                      height: "6px",
                      background: "#e0e0e0",
                      borderRadius: "3px",
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    value={minPrice}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (value <= Number(maxPrice)) setMinPrice(value);
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      pointerEvents: "none",
                      appearance: "none",
                      background: "transparent",
                      top: "10px",
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    value={maxPrice}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (value >= Number(minPrice)) setMaxPrice(value);
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      pointerEvents: "none",
                      appearance: "none",
                      background: "transparent",
                      top: "10px",
                    }}
                  />
                </div>
                <div
                  className="catalog-filter__price-labels"
                  style={{
                    position: "relative",
                    height: "24px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: `${minPercent}%`,
                      transform: getTransformStyle(minPercent),
                    }}
                  >
                    ${minPrice}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      left: `${maxPercent}%`,
                      transform: getTransformStyle(maxPercent),
                    }}
                  >
                    ${maxPrice}
                  </span>
                </div>
              </section>

              <section className="catalog-filter__section">
                <h2 className="catalog-filter__title">Size</h2>
                <div className="catalog-filter__sizes">
                  {Object.entries(sizeMap).map(([label, size]) => (
                    <button
                      key={label}
                      className={`catalog-filter__size-btn${activeSize === size ? " active" : ""}`}
                      type="button"
                      aria-pressed={activeSize === size}
                      onClick={() =>
                        setActiveSize((current) =>
                          current === size ? null : size,
                        )
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="catalog-filter__section catalog-filter__dress-style">
                <h2 className="catalog-filter__title">Dress Style</h2>
                <div className="catalog-filter__links">
                  {styles.map((style) => (
                    <p
                      key={style}
                      className={`style-text${activeStyle === style ? " is-muted" : ""}`}
                      onClick={() =>
                        setActiveStyle((current) =>
                          current === style ? null : style,
                        )
                      }
                    >
                      {style}
                      <span>›</span>
                    </p>
                  ))}
                </div>
              </section>
              <button
                className="catalog-filter__apply"
                type="button"
                onClick={applyFilters}
              >
                Apply filter
              </button>
            </aside>

            <div className="catalog__products">
              <div className="products-container">
                {displayedProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="image-box">
                      <Link
                        to={`/catalog/product/${product.id}`}
                        className="product-images"
                      >
                        <img
                          src={product.images?.front || ""}
                          alt={product.name}
                          className="front-img"
                        />
                        <img
                          src={product.images?.back || ""}
                          alt={product.name}
                          className="back-img"
                        />
                      </Link>
                    </div>
                    <div className="product-inf">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="rating-box">
                        <div className="rating-stars">
                          {[0, 1, 2, 3, 4].map((index) => {
                            const fill = Math.min(
                              Math.max(product.rating - index, 0),
                              1,
                            );
                            return (
                              <span
                                key={index}
                                className="rating-star"
                                style={{ "--fill": `${fill * 100}%` }}
                              >
                                ★
                              </span>
                            );
                          })}
                        </div>
                        <p className="rating">{product.rating} / 5</p>
                      </div>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {displayedProductResults.length === 0 && (
                <p className="search-results__empty">No products found.</p>
              )}
              <nav className="catalog-pagination" aria-label="Catalog pages">
                <button
                  className="catalog-pagination__direction"
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  ‹ &nbsp; Previous
                </button>
                <ol className="catalog-pagination__pages">
                  <li>
                    <button
                      type="button"
                      onClick={() => setPage(1)}
                      aria-label="First page"
                    >
                      « First
                    </button>
                  </li>
                  {visiblePages.map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        type="button"
                        className={pageNumber === page ? "is-current" : ""}
                        aria-current={pageNumber === page ? "page" : undefined}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  {startPage + 4 < totalPages && (
                    <li>
                      <button type="button" aria-label="More pages" disabled>
                        ...
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={() => setPage(totalPages)}
                      aria-label="Last page"
                    >
                      Last »
                    </button>
                  </li>
                </ol>
                <button
                  className="catalog-pagination__direction"
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next &nbsp; ›
                </button>
              </nav>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SearchResult;
