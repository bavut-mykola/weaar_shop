import { useEffect, useRef, useState } from "react";
import { API_URL } from "../api";
import { getGuestId } from "../utils/guestCart";
import "../styles/reviews.scss";
import arrowIcon from "../assets/icons/arrow.svg";

type ReviewsProps = {
  productId: string | number;
  language?: string;
};

type Review = {
  id: string | number;
  name?: string;
  author_name?: string;
  reviewer_name?: string;
  user_name?: string;
  review_text?: string;
  comment?: string;
  content?: string;
  text?: string;
  rating: number;
  created_at: string;
};

const copy = {
  en: {
    title: "Reviews",
    loading: "Loading reviews…",
    empty: "No reviews yet.",
    error: "Unable to load reviews.",
    retry: "Try again",
    anonymous: "Customer",
    rating: (value: number) => `${value} out of 5 stars`,
  },
  uk: {
    title: "Відгуки",
    loading: "Завантаження відгуків…",
    empty: "Відгуків поки немає.",
    error: "Не вдалося завантажити відгуки.",
    retry: "Спробувати ще раз",
    anonymous: "Покупець",
    rating: (value: number) => `${value} з 5 зірок`,
  },
};

function Reviews({ productId, language = "en" }: ReviewsProps) {
  const sortDropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeSortOnOutsideClick(event: MouseEvent) {
      const dropdown = sortDropdownRef.current;
      if (
        dropdown &&
        event.target instanceof Node &&
        !dropdown.contains(event.target)
      ) {
        dropdown.open = false;
      }
    }

    document.addEventListener("click", closeSortOnOutsideClick);
    return () => document.removeEventListener("click", closeSortOnOutsideClick);
  }, []);

  const text = language === "uk" ? copy.uk : copy.en;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailedToLoad, setIsFailedToLoad] = useState(false);
  const [retry, setRetry] = useState(0);

  const [currentPage, setCurretPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [sort, setSort] = useState<string>("newest");
  const sortOptions = [
    { value: "newest", en: "Newest", uk: "Найновіші" },
    { value: "highest", en: "Highest rating", uk: "Найвища оцінка" },
    { value: "lowest", en: "Lowest rating", uk: "Найнижча оцінка" },
  ];
  const selectedSort = sortOptions.find((option) => option.value === sort)!;

  async function getReviews() {
    try {
      setIsLoading(true);
      setIsFailedToLoad(false);

      const response = await fetch(
        `${API_URL}/api/products/${productId}/reviews?page=${currentPage}&sort=${sort}`,
      );

      if (!response.ok) {
        throw new Error(`Reviews request failed: ${response.status}`);
      }

      const data = await response.json();
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setIsFailedToLoad(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getReviews();
  }, [productId, retry, currentPage, sort]);

  const paginationPages: number[] = [];

  const startIndex: number = Math.max(0, currentPage - 2);
  const maxStartIndex: number = Math.max(0, totalPages - 4);
  const actualStartIndex: number = Math.min(startIndex, maxStartIndex);
  const endIndex: number = actualStartIndex + 4;

  for (let page = 1; page <= totalPages; page++) {
    paginationPages.push(page);
  }

  const [userName, setUserName] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [reviewError, setReviewError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!rating || !reviewText.trim() || !userName.trim()) {
      setReviewError("Enter your name, review, and a star rating.");
      return;
    }

    const reviewData = {
      userName: userName,
      reviewText: reviewText,
      rating: rating,
    };

    const guestId = getGuestId();
    setIsSubmitting(true);
    setReviewError("");
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Guest-ID": guestId,
        },
        body: JSON.stringify(reviewData),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        setReviewError("");

        setUserName("");
        setReviewText("");
        setRating(0);

        setCurretPage(1);

        setRetry(retry + 1);
      } else {
        setReviewError(result.message || "Failed to send your review");
      }
    } catch (error) {
      console.log(error);
      setReviewError("Failed to send your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="product-reviews">
      <div className="product-reviews__toolbar">
        <h2 className="product-reviews__title">{text.title}</h2>
        <div className="product-reviews__sort">
          <span>{language === "uk" ? "Сортувати за:" : "Sort by:"}</span>
          <details className="product-reviews__dropdown" ref={sortDropdownRef}>
            <summary>
              {language === "uk" ? selectedSort.uk : selectedSort.en}
              <span className="product-reviews__chevron" aria-hidden="true" />
            </summary>
            <div className="product-reviews__sort-menu">
              {sortOptions.map((option) => (
                <div
                  onClick={() => {
                    setSort(option.value);
                    setCurretPage(1);
                    if (sortDropdownRef.current) {
                      sortDropdownRef.current.open = false;
                    }
                  }}
                  key={option.value}
                  className={`product-reviews__sort-option${option.value === sort ? " product-reviews__sort-option--selected" : ""}`}
                >
                  {language === "uk" ? option.uk : option.en}
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {isLoading ? (
        <p className="product-reviews__message">{text.loading}</p>
      ) : isFailedToLoad ? (
        <div>
          <p className="product-reviews__message">{text.error}</p>
          <button
            className="product-reviews__button"
            type="button"
            onClick={() => setRetry(retry + 1)}
          >
            {text.retry}
          </button>
        </div>
      ) : reviews.length === 0 ? (
        <p className="product-reviews__message">{text.empty}</p>
      ) : (
        <>
          <div className="product-reviews__list">
            {reviews.map((review) => (
              <article className="product-reviews__card" key={review.id}>
                <div className="product-reviews__header">
                  <h3 className="product-reviews__name">
                    {review.author_name ||
                      review.reviewer_name ||
                      review.user_name ||
                      review.name ||
                      text.anonymous}
                  </h3>
                  <div
                    className="product-reviews__rating"
                    aria-label={text.rating(review.rating)}
                  >
                    <span className="product-reviews__stars" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <span
                          key={index}
                          style={{
                            color:
                              review.rating > index ? "#4b4b4b" : "#dedede",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="product-reviews__text">
                  {review.review_text ||
                    review.comment ||
                    review.content ||
                    review.text}
                </p>
                <p className="product-reviews__date">
                  {new Date(review.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    timeZone: "UTC",
                  })}
                </p>
              </article>
            ))}
          </div>
          <div className="product-reviews__pagination">
            {currentPage !== 1 && (
              <button
                type="button"
                className="product-reviews__page product-reviews__arrow product-reviews__arrow--left"
                aria-label={
                  language === "uk" ? "Попередня сторінка" : "Previous page"
                }
                onClick={() => setCurretPage(currentPage - 1)}
              >
                <img src={arrowIcon} alt="" />
              </button>
            )}
            {paginationPages.slice(actualStartIndex, endIndex).map((page) => (
              <button
                type="button"
                className={`product-reviews__page ${currentPage === page ? "active" : ""}`}
                aria-current={currentPage === page ? "page" : undefined}
                key={page}
                onClick={() => setCurretPage(page)}
              >
                {page}
              </button>
            ))}
            {paginationPages.length > 6 && totalPages > endIndex && (
              <button
                type="button"
                className={`product-reviews__page ${currentPage === totalPages ? "active" : ""}`}
                onClick={() => setCurretPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                className="product-reviews__page product-reviews__arrow product-reviews__arrow--right"
                aria-label={
                  language === "uk" ? "Наступна сторінка" : "Next page"
                }
                onClick={() => setCurretPage(currentPage + 1)}
              >
                <img src={arrowIcon} alt="" />
              </button>
            )}
          </div>
        </>
      )}

      <form
        className="review-form"
        onSubmit={(e) => {
          sendReview(e);
        }}
      >
        <h2 className="review-form__title">Leave a review</h2>

        <div
          className="review-form__stars"
          role="group"
          aria-label="Your rating"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              className="review-form__star"
              type="button"
              key={star}
              aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
              onClick={() => {
                if (rating === star) {
                  setRating(0);
                } else {
                  setRating(star);
                }
              }}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        <div className="review-form__field review-form__field--name">
          <label htmlFor="review-name">Your name *</label>
          <input
            id="review-name"
            name="name"
            type="text"
            value={userName}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length === 0) {
                setUserName("");
                return;
              } else {
                const formatedValue = value[0].toUpperCase() + value.slice(1);
                setUserName(formatedValue);
              }
            }}
          />
        </div>

        <div className="review-form__field">
          <label htmlFor="review-text">Your review *</label>
          <textarea
            id="review-text"
            name="review"
            rows={6}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          />
        </div>

        {reviewError && (
          <p className="review-form__error" role="alert">
            {reviewError}
          </p>
        )}
        <button
          className="review-form__submit"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-label={isSubmitting ? "Sending your review" : undefined}
        >
          {isSubmitting && <span className="review-form__spinner" aria-hidden="true" />}
          Leave a review
        </button>
      </form>
    </section>
  );
}

export default Reviews;
