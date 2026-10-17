import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/catalog.scss";

import { API_URL } from "../api";

const sortOptions = ["More Popular", "More Expensive", "Cheaper"];

function Catalog() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedSort, setSelectedSort] = useState("More Popular");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const sortRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);

  let sortParam = "popularity";
  if (selectedSort === "More Expensive") sortParam = "price_desc";
  if (selectedSort === "Cheaper") sortParam = "price_asc";

  async function getProducts() {
    try {
      const response = await fetch(
        `${API_URL}/api/products?page=${page}&sort=${sortParam}`,
      );

      setIsLoading(true);

      const data = await response.json();

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isFiltered) {
      applyFilter(page);
    } else {
      getProducts();
    }
  }, [page, selectedSort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sizeMap = {
    Small: "S",
    Medium: "M",
    Large: "L",
    "X-Large": "XL",
    "XX-Large": "XXL",
  };

  const totalPages = pagination.totalPages || 0;

  const startPage = Math.min(page, Math.max(totalPages - 4, 1));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  const maxLimit = 6000;

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(maxLimit);
  const [activeSize, setActiveSize] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStyle, setActiveStyle] = useState(null);

  const minPercent = (minPrice / maxLimit) * 100;
  const maxPercent = (maxPrice / maxLimit) * 100;

  const getTransformStyle = (percent) => {
    if (percent === 0) return "translateX(0%)";
    if (percent === 100) return "translateX(-100%)";
    return "translateX(-50%)";
  };

  async function applyFilter(targetPage = 1) {
    const isEverythingDefault =
      !activeCategory &&
      !activeSize &&
      !activeStyle &&
      Number(minPrice) === 0 &&
      Number(maxPrice) === maxLimit;

    if (isEverythingDefault) {
      setIsFiltered(false);
      setPage(1);
      getProducts();
      return;
    }

    const filterData = {
      category: activeCategory ? activeCategory.toLowerCase() : null,
      size: activeSize,
      styles: activeStyle ? activeStyle.toLowerCase() : null,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      page: targetPage,
      sort: sortParam,
    };

    console.log("FILTER DATA:", filterData);

    try {
      const req = await fetch(`${API_URL}/api/products/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      const res = await req.json();
      setProducts(res.products);
      setPagination(res.pagination);
      setIsFiltered(true);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  }

  return (
    <section className="catalog" id="catalog" aria-labelledby="catalog-title">
      {isLoading ? (
        <div className="catalog-skeleton">
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
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <div className="product-skeleton-box">
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
            <p className="catalog__eyebrow">CATALOG</p>
            <div className="catalog__heading-main">
              <h1 className="catalog__title" id="catalog-title">
                Casual
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
              aria-controls="catalog-filter"
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
              id="catalog-filter"
              aria-label="Catalog filters"
            >
              <div className="catalog-filter__mobile-header">
                <h2 className="catalog-filter__title-mobile">Filters</h2>
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
                  {["Pants", "Hoodies", "Jeans", "T-Shirts", "Outerwear"].map(
                    (c) => (
                      <p
                        className={`category-text${activeCategory === c ? " is-active" : ""}`}
                        key={c}
                        onClick={() =>
                          setActiveCategory((current) =>
                            current === c ? null : c,
                          )
                        }
                      >
                        {c}
                        <span>›</span>
                      </p>
                    ),
                  )}
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
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val <= maxPrice) setMinPrice(val);
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
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= minPrice) setMaxPrice(val);
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
                  {["Small", "Medium", "Large", "X-Large", "XX-Large"].map(
                    (size) => (
                      <button
                        key={size}
                        className={`catalog-filter__size-btn ${
                          activeSize === sizeMap[size] ? "active" : ""
                        }`}
                        type="button"
                        aria-pressed={activeSize === sizeMap[size]}
                        onClick={() =>
                          setActiveSize(
                            activeSize === sizeMap[size] ? null : sizeMap[size],
                          )
                        }
                      >
                        {size}
                      </button>
                    ),
                  )}
                </div>
              </section>
              <section className="catalog-filter__section catalog-filter__dress-style">
                <h2 className="catalog-filter__title">Dress Style</h2>
                <div className="catalog-filter__links">
                  {["Casual", "Formal", "Gym", "Party"].map((s) => (
                    <p
                      onClick={() => {
                        setActiveStyle((current) => (current === s ? null : s));
                      }}
                      className={`style-text ${activeStyle === s ? "is-muted" : ""}`}
                      key={s}
                    >
                      {s}
                      <span>›</span>
                    </p>
                  ))}
                </div>
              </section>
              <button
                className="catalog-filter__apply"
                type="button"
                onClick={() => {
                  setPage(1);
                  applyFilter(1);
                }}
              >
                Apply filter
              </button>
            </aside>

            <div className="catalog__products">
              <div className="products-container">
                {products.map((p) => (
                  <div key={p.id} className="product-card">
                    <div className="image-box">
                      <Link
                        to={`/catalog/product/${p.id}`}
                        className="product-images"
                      >
                        <img
                          src={p.images.front}
                          alt={p.name}
                          className="front-img"
                        />
                        <img
                          src={p.images.back}
                          alt={p.name}
                          className="back-img"
                        />
                      </Link>
                    </div>

                    <div className="product-inf">
                      <h3 className="product-name">{p.name}</h3>
                      <div className="rating-box">
                        <div className="rating-stars">
                          {[0, 1, 2, 3, 4].map((index) => {
                            const fill = Math.min(
                              Math.max(p.rating - index, 0),
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
                        <p className="rating">{p.rating} / 5</p>
                      </div>
                      <p className="product-price">${p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <nav className="catalog-pagination" aria-label="Catalog pages">
                <button
                  className="catalog-pagination__direction"
                  type="button"
                  disabled={page === 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  ‹ &nbsp; Previous
                </button>
                <ol className="catalog-pagination__pages">
                  <button type="button" onClick={() => setPage(1)}>
                    « First
                  </button>
                  {visiblePages.map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        className={pageNumber === page ? "is-current" : ""}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}

                  {startPage + 4 < totalPages && (
                    <li>
                      <button type="button" aria-label="More pages">
                        ...
                      </button>
                    </li>
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(pagination.totalPages)}
                  >
                    Last »
                  </button>
                </ol>
                <button
                  className="catalog-pagination__direction"
                  type="button"
                  disabled={page === pagination.totalPages}
                  onClick={() => {
                    setPage(page + 1);
                  }}
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

export default Catalog;
