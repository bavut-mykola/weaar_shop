import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function scrollToProduct(carousel, index, isMobile, behavior = "smooth") {
  const card = carousel?.children[index];
  if (!card) return;
  carousel.scrollTo({
    left: card.offsetLeft - (isMobile ? (carousel.clientWidth - card.clientWidth) / 2 : 0),
    behavior,
  });
}

export default function HomeCollection({ products }) {
  const carouselRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [group, setGroup] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 440px)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHidden, setIsHidden] = useState(document.hidden);
  const groupCount = Math.ceil(products.length / 3);
  const visibleProducts = products.slice(group * 3, group * 3 + 3);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 440px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMobile = () => setIsMobile(mobile.matches);
    const onMotion = () => setReducedMotion(motion.matches);
    const onVisibility = () => setIsHidden(document.hidden);
    mobile.addEventListener("change", onMobile);
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mobile.removeEventListener("change", onMobile);
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    // Keep the same product visible when the viewport or layout changes.
    const observer = new ResizeObserver(() => {
      const index = isMobile ? activeRef.current : 0;
      scrollToProduct(carousel, index, isMobile, "instant");
    });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (groupCount < 2 || reducedMotion || isPaused || isHovered || isFocused || isTouching || isHidden) return;
    const timer = window.setInterval(() => {
      setGroup((current) => (current + 1) % groupCount);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [groupCount, reducedMotion, isPaused, isHovered, isFocused, isTouching, isHidden, active]);

  function goToSlide(index) {
    const next = (index + visibleProducts.length) % visibleProducts.length;
    scrollToProduct(carouselRef.current, next, true, reducedMotion ? "instant" : "smooth");
  }

  function handleScroll() {
    const carousel = carouselRef.current;
    if (visibleProducts.length < 2) return;
    const step = carousel.children[1].offsetLeft - carousel.children[0].offsetLeft;
    const index = Math.max(0, Math.min(visibleProducts.length - 1, Math.round(carousel.scrollLeft / step)));
    activeRef.current = index;
    setActive(index);
  }

  return (
    <div
      className="home-collection__carousel"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
        setIsTouching(false);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      onPointerDown={() => setIsTouching(true)}
      onPointerUp={() => setIsTouching(false)}
      onPointerCancel={() => setIsTouching(false)}
    >
      <div
        className="home-collection__grid"
        ref={carouselRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Collection products"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const direction = event.key === "ArrowRight" ? 1 : -1;
          if (isMobile) goToSlide(active + direction);
          else setGroup((current) => (current + direction + groupCount) % groupCount);
        }}
      >
        {visibleProducts.map((product, index) => (
          <div
            className={`home-collection__card${index === active ? " is-active" : ""}`}
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${visibleProducts.length}`}
          >
            <Link to={`/catalog/product/${product.id}`}>
              <img src={product.images.front} alt={product.name} loading="eager" />
            </Link>
          </div>
        ))}
      </div>
      {(visibleProducts.length > 1 || groupCount > 1) && (
        <div className="home-collection__controls">
          <div className="home-collection__dots" aria-label="Choose collection slide">
            {visibleProducts.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === active ? "is-active" : ""}
                aria-label={`Go to product ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          {groupCount > 1 && !reducedMotion && (
            <button className="home-collection__pause" type="button" aria-pressed={isPaused} onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? "Resume slideshow" : "Pause slideshow"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
