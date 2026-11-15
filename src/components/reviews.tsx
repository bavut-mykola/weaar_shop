import { useEffect, useState } from "react";
import { API_URL } from "../api";
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
  const text = language === "uk" ? copy.uk : copy.en;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailedToLoad, setIsFailedToLoad] = useState(false);
  const [retry, setRetry] = useState(0);

  const [currentPage, setCurretPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setIsFailedToLoad(false);

        const response = await fetch(
          `${API_URL}/api/products/${productId}/reviews?page=${currentPage}`,
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

    getReviews();
  }, [productId, retry, currentPage]);

  const paginationPages: number[] = [];

  const startIndex: number = Math.max(0, currentPage - 2);
  const maxStartIndex: number = Math.max(0, totalPages - 4);
  const actualStartIndex: number = Math.min(startIndex, maxStartIndex);
  const endIndex: number = actualStartIndex + 4;

  for (let page = 1; page <= totalPages; page++) {
    paginationPages.push(page);
  }

  return (
    <section className="product-reviews">
      <h2 className="product-reviews__title">{text.title}</h2>

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
                aria-label={language === "uk" ? "Попередня сторінка" : "Previous page"}
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
                aria-label={language === "uk" ? "Наступна сторінка" : "Next page"}
                onClick={() => setCurretPage(currentPage + 1)}
              >
                <img src={arrowIcon} alt="" />
              </button>
            )}
          </div>
        </>
      )}

      <form className="review-form">
        <h2 className="review-form__title">Leave a review</h2>

        <div className="review-form__stars" role="group" aria-label="Your rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              className="review-form__star"
              type="button"
              key={star}
              aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            >
              ☆
            </button>
          ))}
        </div>

        <div className="review-form__field review-form__field--name">
          <label htmlFor="review-name">Your name *</label>
          <input id="review-name" name="name" type="text" />
        </div>

        <div className="review-form__field">
          <label htmlFor="review-text">Your review *</label>
          <textarea id="review-text" name="review" rows={6} />
        </div>

        <button className="review-form__submit" type="button">
          Leave a review
        </button>
      </form>
    </section>
  );
}

export default Reviews;
