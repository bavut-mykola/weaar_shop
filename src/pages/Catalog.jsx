import { useState, useEffect, useRef, useEffectEvent, act } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { homeCategories } from "../utils/homeProducts.mjs";
import "../styles/catalog.scss";

import { API_URL } from "../api";

import { translations, translateDisplay } from "../locales/translations";

const sortOptions = ["More Popular", "More Expensive", "Cheaper"];

function Catalog({ language, setIsFilterOpen, isFilterOpen }) {
  const text = translations[language];
  const [searchParams] = useSearchParams();
  const initialCategory =
    homeCategories.find(
      (category) => category.key === searchParams.get("category"),
    )?.label ?? null;

  const [isFiltered, setIsFiltered] = useState(Boolean(initialCategory));

  const [isLoading, setIsLoading] = useState(false);
  const [isFailedToLoad, setIsFailedToLoad] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFilterOpen]);

  const [isTryingAgain, setIsTryingAgain] = useState(false);

  const timeRef = useRef(null);

  const [selectedSort, setSelectedSort] = useState("More Popular");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const sortRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const page = location.state?.catalogPage ?? 1;

  function setPage(number) {
    navigate(location, {
      replace: true,
      state: { catalogPage: number },
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  let sortParam = "popularity";
  if (selectedSort === "More Expensive") sortParam = "price_desc";
  if (selectedSort === "Cheaper") sortParam = "price_asc";

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(width <= 768px)").matches,
  );

  const productsPerPage = isMobile ? 10 : 9;
  const visiblePageCount = isMobile ? 3 : 5;

  const totalPages = pagination.totalPages || 0;
  const hasNoFilterResults = isFiltered && products.length === 0;

  const startPage = Math.min(
    Math.max(page - Math.floor(visiblePageCount / 2), 1),
    Math.max(totalPages - (visiblePageCount - 1), 1),
  );

  const visiblePages = Array.from(
    { length: Math.min(visiblePageCount, totalPages) },
    (_, index) => startPage + index,
  );

  async function getProducts(targetPage = page) {
    try {
      setIsLoading(true);
      setIsFailedToLoad(false);

      timeRef.current = setTimeout(() => {
        setIsFailedToLoad(true);
        setIsLoading(false);
      }, 8000);

      const response = await fetch(
        `${API_URL}/api/products?page=${targetPage}&sort=${sortParam}&limit=${productsPerPage}`,
      );

      clearTimeout(timeRef.current);

      const data = await response.json();

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsFailedToLoad(true);
    } finally {
      setIsLoading(false);
      setIsTryingAgain(false);
    }
  }

  useEffect(() => {
    if (isFiltered) {
      applyFilter(page);
    } else {
      getProducts();
    }
  }, [page, selectedSort, productsPerPage]);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(width <= 768px)");

    function handleResize() {
      setIsMobile(mediaQuery.matches);
    }

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const maxLimit = 6000;

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(maxLimit);
  const [activeSize, setActiveSize] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeStyle, setActiveStyle] = useState(
    initialCategory ? null : "Casual",
  );

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
      limit: productsPerPage,
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

  function resetFilters() {
    setActiveCategory(null);
    setActiveSize(null);
    setActiveStyle("Casual");
    setMinPrice("0");
    setMaxPrice(maxLimit);
    setIsFiltered(false);
    setPage(1);
    getProducts(1);
  }

  return (
    <>
      {isFailedToLoad ? (
        <>
          <div className="failed-main-box">
            <div className="failed-text-box">
              <h2>{text.catalog.loadErrorTitle}</h2>
              <p>{text.catalog.loadError}</p>
            </div>

            <div className="failed-buttons-box">
              <button
                className="failed-try-btn"
                disabled={isTryingAgain}
                onClick={() => {
                  getProducts();
                  setIsTryingAgain(true);
                }}
              >
                {isTryingAgain ? text.common.loading : text.common.tryAgain}
              </button>
              <Link to={"/"}>
                <button className="failed-back-btn">
                  {text.common.backHome}
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <section
          className="catalog"
          id="catalog"
          aria-labelledby="catalog-title"
        >
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
              {!hasNoFilterResults && (
                <header className="catalog__heading">
                  <p className="catalog__eyebrow">{text.catalog.title}</p>
                  <div className="catalog__heading-main">
                    <h1 className="catalog__title" id="catalog-title">
                      {translateDisplay(activeStyle, language)}
                    </h1>
                    <div className="catalog__sort-wrap" ref={sortRef}>
                      <button
                        className={`catalog__sort${isSortOpened ? " is-open" : ""}`}
                        type="button"
                        aria-expanded={isSortOpened}
                        onClick={() => setIsSortOpened((open) => !open)}
                      >
                        <span className="catalog__sort-label">
                          {text.catalog.sortBy}
                        </span>
                        <span className="catalog__sort-value">
                          {translateDisplay(selectedSort, language)}
                        </span>
                        <span
                          className="catalog__sort-caret"
                          aria-hidden="true"
                        />
                      </button>

                      {isSortOpened && (
                        <ul
                          className="catalog__sort-menu"
                          role="listbox"
                          aria-label={text.catalog.sortLabel}
                        >
                          {sortOptions.map((sort) => (
                            <li key={translateDisplay(sort, language)}>
                              <button
                                type="button"
                                className={
                                  sort === selectedSort ? "is-selected" : ""
                                }
                                onClick={() => {
                                  setSelectedSort(sort);
                                  setIsSortOpened(false);
                                  setPage(1);
                                }}
                              >
                                {translateDisplay(sort, language)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </header>
              )}

              <div className="catalog__layout">
                <button
                  className="catalog-filter-trigger"
                  type="button"
                  aria-expanded={isFilterOpen}
                  aria-controls="catalog-filter"
                  onClick={() => setIsFilterOpen(true)}
                >
                  {text.catalog.filters} <span aria-hidden="true">›</span>
                </button>
                {isFilterOpen && (
                  <button
                    className="catalog-filter-backdrop"
                    type="button"
                    aria-label={text.catalog.closeFilters}
                    onClick={() => setIsFilterOpen(false)}
                  />
                )}
                <aside
                  className={`catalog-filter${isFilterOpen ? " is-open" : ""}`}
                  id="catalog-filter"
                  aria-label={text.catalog.filterRegion}
                >
                  <div className="catalog-filter__mobile-header">
                    <h2 className="catalog-filter__title-mobile">
                      {text.catalog.filters}
                    </h2>
                    <button
                      className="catalog-filter__close"
                      type="button"
                      aria-label={text.catalog.closeFilters}
                      onClick={() => setIsFilterOpen(false)}
                    >
                      ‹
                    </button>
                  </div>
                  <section className="catalog-filter__section">
                    <h2 className="catalog-filter__title">
                      {text.catalog.filters}
                    </h2>
                    <div className="catalog-filter__links">
                      {[
                        "Pants",
                        "Hoodies",
                        "Jeans",
                        "T-Shirts",
                        "Outerwear",
                      ].map((c) => (
                        <p
                          className={`category-text${activeCategory === c ? " is-active" : ""}`}
                          key={translateDisplay(c, language)}
                          onClick={() =>
                            setActiveCategory((current) =>
                              current === c ? null : c,
                            )
                          }
                        >
                          {translateDisplay(c, language)}
                          <span>›</span>
                        </p>
                      ))}
                    </div>
                  </section>

                  <section className="catalog-filter__section">
                    <h2 className="catalog-filter__title">
                      {text.catalog.price}
                    </h2>

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
                      translate="no"
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
                    <h2 className="catalog-filter__title">
                      {text.catalog.size}
                    </h2>
                    <div className="catalog-filter__sizes">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          className={`catalog-filter__size-btn ${
                            activeSize.includes(size) ? "active" : ""
                          }`}
                          type="button"
                          translate="no"
                          aria-pressed={activeSize.includes(size)}
                          onClick={() => {
                            if (activeSize.includes(size)) {
                              setActiveSize(
                                activeSize.filter((s) => s !== size),
                              );
                            } else {
                              setActiveSize([...activeSize, size]);
                            }
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </section>
                  <section className="catalog-filter__section catalog-filter__dress-style">
                    <h2 className="catalog-filter__title">
                      {text.catalog.dressStyle}
                    </h2>
                    <div className="catalog-filter__links">
                      {["Casual", "Formal", "Gym", "Party"].map((s) => (
                        <p
                          onClick={() => {
                            setActiveStyle((current) =>
                              current === s ? null : s,
                            );
                          }}
                          className={`style-text ${activeStyle === s ? "is-muted" : ""}`}
                          key={translateDisplay(s, language)}
                        >
                          {translateDisplay(s, language)}
                          <span>›</span>
                        </p>
                      ))}
                    </div>
                  </section>
                  <button
                    className="catalog-filter__apply"
                    type="button"
                    onClick={() => {
                      if (isMobile) {
                        setIsFilterOpen(false);
                      }
                      setPage(1);
                      applyFilter(1);
                    }}
                  >
                    {text.catalog.applyFilter}
                  </button>
                </aside>

                <div className="catalog__products">
                  <div className="products-container">
                    {products.length === 0 ? (
                      <div className="catalog-empty-state" role="status">
                        <p className="catalog-empty-state__title">
                          {text.catalog.emptyTitle}
                        </p>
                        <p className="catalog-empty-state__text">
                          {text.catalog.emptyText}
                        </p>
                        <button
                          type="button"
                          className="catalog-empty-state__reset"
                          onClick={resetFilters}
                        >
                          {text.catalog.resetFilter}
                        </button>
                      </div>
                    ) : (
                      products.map((p) => (
                        <div key={p.id} className="product-card">
                          <div className="image-box">
                            <Link
                              to={`/catalog/product/${p.id}`}
                              className="product-images"
                              onClick={() => {
                                localStorage.setItem(
                                  "currentPage",
                                  String(page),
                                );
                              }}
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
                            <p translate="no" className="product-price">
                              ${p.price}
                            </p>
                            <Link
                              to={`/catalog/product/${p.id}`}
                              className="product-card-button"
                              onClick={() => {
                                localStorage.setItem(
                                  "currentPage",
                                  String(page),
                                );
                              }}
                            >
                              {text.common.seeProduct}
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {products.length > 0 && (
                    <nav
                      className="catalog-pagination"
                      aria-label={text.pagination.label}
                    >
                      <button
                        className="catalog-pagination__boundary"
                        type="button"
                        aria-label={text.pagination.first}
                        onClick={() => setPage(1)}
                      >
                        «
                      </button>
                      <ol className="catalog-pagination__pages">
                        {visiblePages.map((pageNumber) => (
                          <li key={pageNumber}>
                            <button
                              className={
                                pageNumber === page ? "is-current" : ""
                              }
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </li>
                        ))}

                        {startPage + (visiblePageCount - 1) < totalPages && (
                          <li>
                            <button
                              className="catalog-pagination__ellipsis"
                              type="button"
                              aria-label={text.pagination.more}
                            >
                              ...
                            </button>
                          </li>
                        )}
                      </ol>
                      <button
                        className="catalog-pagination__boundary"
                        type="button"
                        aria-label={text.pagination.last}
                        onClick={() => setPage(pagination.totalPages)}
                      >
                        »
                      </button>
                    </nav>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default Catalog;
