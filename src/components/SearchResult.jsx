import { useState, useEffect, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import { useSearchParams } from "react-router-dom";
import "../styles/catalog.scss";
import "../styles/search.scss";

import { API_URL } from "./api";

const sortOptions = ["More Popular", "More Expensive", "Cheaper"];

function SearchResult() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("More Popular");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const sortRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);

  const [searchProducts, setSearchProducts] = useState([]);

  const fuse = useMemo(() => {
    return new Fuse(searchProducts, {
      keys: ["name", "category", "subcategory"],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }, [searchProducts]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const itemsPerPage = 9;

  const searchResult =
    query.trim() && searchProducts.length > 0 ? fuse.search(query) : [];

  const rawDisplayedProducts = query.trim()
    ? searchResult.map((result) => result.item)
    : products;

  const sortParam =
    selectedSort === "More Expensive"
      ? "price_desc"
      : selectedSort === "Cheaper"
        ? "price_asc"
        : "popularity";

  const displayedProductResults = [...rawDisplayedProducts].sort((a, b) => {
    if (sortParam === "price_asc") return Number(a.price) - Number(b.price);
    if (sortParam === "price_desc") return Number(b.price) - Number(a.price);
    return Number(b.rating) - Number(a.rating);
  });

  async function getProducts() {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/api/products?page=${page}&sort=${sortParam}`,
      );

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
    getProducts();
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

  console.log(rawDisplayedProducts.length);

  const totalPages = query.trim()
    ? rawDisplayedProducts.length > 0
      ? Math.floor((rawDisplayedProducts.length - 1) / itemsPerPage) + 1
      : 1
    : pagination.totalPages || 1;

  const startIndex = (page - 1) * itemsPerPage;
  const displayedProducts = displayedProductResults.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page]);

  useEffect(() => {
    async function getSearchProducts() {
      try {
        const response = await fetch(`${API_URL}/api/products/search-data`);

        const data = await response.json();

        setSearchProducts(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    }

    getSearchProducts();
  }, []);

  const maxStart = Math.max(1, totalPages - 4 + 1);

  const startPage = Math.min(page, Math.max(totalPages - 4, 1));

  const visiblePages = Array.from(
    { length: Math.min(5, Math.max(0, totalPages - startPage + 1)) },
    (_, index) => startPage + index,
  );

  return (
    <section
      className="catalog search-results"
      id="catalog"
      aria-labelledby="catalog-title"
    >
      <header className="catalog__heading">
        <div className="catalog__heading-main">
          <h1
            className="catalog__title"
            id="catalog-title"
            style={{ fontSize: "20px" }}
          >
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
        <div className="catalog__products">
          {isLoading && <h2>Loading products...</h2>}
          <div className="products-container">
            {displayedProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="image-box">
                  <div className="product-marks">
                    {p.isFeatured && <span className="product-mark">Peak</span>}
                  </div>

                  <div className="product-images">
                    <img
                      src={p.images?.front || ""}
                      alt={p.name}
                      className="front-img"
                    />
                    <img
                      src={p.images?.back || ""}
                      alt={p.name}
                      className="back-img"
                    />
                  </div>
                </div>

                <div className="product-inf">
                  <h3 className="product-name">{p.name}</h3>
                  <div className="rating-box">
                    <div className="rating-stars">
                      {[0, 1, 2, 3, 4].map((index) => {
                        const fill = Math.min(Math.max(p.rating - index, 0), 1);

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

              {totalPages > 5 && startPage + 4 < totalPages && (
                <li>
                  <button type="button" aria-label="More pages">
                    ...
                  </button>
                </li>
              )}
              <button type="button" onClick={() => setPage(totalPages)}>
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
    </section>
  );
}

export default SearchResult;
